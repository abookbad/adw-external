"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ElasticSlider from "./ElasticSlider";

type Track = { title: string; src: string; image?: string };
type Library = Record<string, Track[]>;

// Runtime-loaded library from /api/music/library
const DEFAULT_LIBRARY: Library = {};

const CONSENT_KEY = "adwMusicConsent"; // "accepted" | "dismissed"
const GENRE_KEY = "adwGenre";
const DEFAULT_GENRE = "pop - top hits"; // preferred default if present
const VOLUME_KEY = "adwVolume"; // 0-100 string
const AUTHOR_LABEL = "Agency DevWorks AI Music";

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AdwMusicBar() {
  const [library, setLibrary] = useState<Library>(DEFAULT_LIBRARY);
  const genres = useMemo(() => Object.keys(library), [library]);
  const [consent, setConsent] = useState<"accepted" | "dismissed" | null>(null);
  const [genre, setGenre] = useState<string>(DEFAULT_GENRE);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [loopOne, setLoopOne] = useState(false);
  const [volume, setVolume] = useState<number>(() => {
    if (typeof window === "undefined") return 70;
    const saved = localStorage.getItem(VOLUME_KEY);
    const n = saved ? Number(saved) : 70;
    return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 70;
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userGestureRef = useRef(false); // true after user explicitly clicks play/accept
  const lastTimeRef = useRef(0);
  const shouldBePlayingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  const tracks = library[genre] || [];
  const currentTrack = tracks[trackIndex] || tracks[0] || null;
  // Load library and set initial genre from storage
  useEffect(() => {
    (async () => {
      try {
        // Prefer static JSON generated at build to avoid hitting a serverless route
        const res = await fetch('/music-library.json', { cache: 'force-cache' });
        const data = await res.json();
        const lib: Library = data.library || {};
        setLibrary(lib);
        const availableGenres = Object.keys(lib);
        const saved = (typeof window !== 'undefined') ? (localStorage.getItem(GENRE_KEY) || '') : '';
        const mapLowerToOriginal = new Map<string, string>();
        for (const g of availableGenres) mapLowerToOriginal.set(g.toLowerCase(), g);
        const chosen = saved && mapLowerToOriginal.has(saved.toLowerCase())
          ? mapLowerToOriginal.get(saved.toLowerCase())!
          : (mapLowerToOriginal.has(DEFAULT_GENRE.toLowerCase())
              ? mapLowerToOriginal.get(DEFAULT_GENRE.toLowerCase())!
              : (availableGenres[0] || DEFAULT_GENRE));
        setGenre(chosen);
      } catch {}
    })();
  }, []);

  // Load persisted consent
  useEffect(() => {
    if (typeof window === "undefined") return;
    const c = localStorage.getItem(CONSENT_KEY) as "accepted" | "dismissed" | null;
    if (c) setConsent(c);
  }, []);

  // Persist genre and volume changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(GENRE_KEY, genre);
  }, [genre]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(VOLUME_KEY, String(volume));
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  // On mobile, force volume to 100 and persist; hide slider via CSS below
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia('(max-width: 639px)').matches; // Tailwind sm breakpoint
    if (isMobile) {
      setVolume(100);
      if (audioRef.current) audioRef.current.volume = 1;
      try { localStorage.setItem(VOLUME_KEY, '100'); } catch {}
    }
  }, []);

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => {
      const t = audio.currentTime || 0;
      // Avoid excessive state loops; only update when time actually changes
      if (Math.abs(t - lastTimeRef.current) > 0.01) {
        lastTimeRef.current = t;
        setCurrentTime(t);
      }
    };
    const onEnded = () => {
      if (!tracks.length) return;
      if (loopOne) {
        // replay same track
        audio.currentTime = 0;
        setCurrentTime(0);
        if (userGestureRef.current) audio.play().catch(() => {});
        return;
      }
      // Auto next (shuffle if enabled)
      setTrackIndex((prev) => {
        if (!shuffle || tracks.length < 2) return (prev + 1) % tracks.length;
        let next = prev;
        // ensure different index when possible
        while (next === prev) {
          next = Math.floor(Math.random() * tracks.length);
        }
        return next;
      });
      setCurrentTime(0);
      if (userGestureRef.current) setIsPlaying(true);
    };
    const onPlay = () => {
      setIsPlaying(true);
    };
    const onPause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [tracks.length, shuffle, loopOne]);

  // rAF ticker to keep UI in sync even if 'timeupdate' is throttled (e.g., incognito)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const tick = () => {
      if (audio && !audio.paused) {
        const t = audio.currentTime || 0;
        if (Math.abs(t - lastTimeRef.current) > 0.01) {
          lastTimeRef.current = t;
          setCurrentTime(t);
        }
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };
    if (isPlaying) {
      rafIdRef.current = requestAnimationFrame(tick);
    } else if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isPlaying]);

  // When track or genre changes, load without autoplay (respect user gesture rules)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.src = currentTrack.src;
    audio.load();
    setCurrentTime(0);
    if (userGestureRef.current || shouldBePlayingRef.current) {
      // try resume playback on explicit user sessions
      audio.play().catch(() => {});
    }
  }, [currentTrack?.src]);

  const acceptConsentAndPlay = useCallback(() => {
    setConsent("accepted");
    if (typeof window !== "undefined") localStorage.setItem(CONSENT_KEY, "accepted");
    userGestureRef.current = true;
    shouldBePlayingRef.current = true;
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      setIsPlaying(true);
    }
  }, []);

  const dismissConsent = useCallback(() => {
    setConsent("dismissed");
    if (typeof window !== "undefined") localStorage.setItem(CONSENT_KEY, "dismissed");
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    userGestureRef.current = true;
    if (audio.paused) {
      shouldBePlayingRef.current = true;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      shouldBePlayingRef.current = false;
      audio.pause();
    }
  }, []);

  const prevTrack = useCallback(() => {
    if (tracks.length === 0) return;
    if (shuffle && tracks.length > 1) {
      setTrackIndex((i) => {
        let next = i;
        while (next === i) next = Math.floor(Math.random() * tracks.length);
        return next;
      });
    } else {
      setTrackIndex((i) => (i - 1 + tracks.length) % tracks.length);
    }
    setCurrentTime(0);
  }, [tracks.length, shuffle]);

  const nextTrack = useCallback(() => {
    if (tracks.length === 0) return;
    if (shuffle && tracks.length > 1) {
      setTrackIndex((i) => {
        let next = i;
        while (next === i) next = Math.floor(Math.random() * tracks.length);
        return next;
      });
    } else {
      setTrackIndex((i) => (i + 1) % tracks.length);
    }
    setCurrentTime(0);
  }, [tracks.length, shuffle]);

  const seekBy = useCallback((delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = Math.max(0, Math.min((audio.duration || 0), (audio.currentTime || 0) + delta));
    audio.currentTime = t;
    setCurrentTime(t);
  }, []);

  const onProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    let pct = Number(e.target.value);
    if (!Number.isFinite(pct)) pct = 0;
    pct = Math.max(0, Math.min(100, pct));
    const t = Math.max(0, Math.min((audio.duration || 0), (pct / 100) * (audio.duration || 0)));
    audio.currentTime = t;
    setCurrentTime(t);
  }, []);

  const onKey = useCallback((e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
    } else if (e.code === "ArrowLeft") {
      e.preventDefault();
      seekBy(-10);
    } else if (e.code === "ArrowRight") {
      e.preventDefault();
      seekBy(10);
    }
  }, [togglePlay, seekBy]);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const progressPct = useMemo(() => {
    if (!duration) return 0;
    return Math.max(0, Math.min(100, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  // UI
  return (
    <div className="fixed inset-x-0 bottom-12 z-50">
      {/* Consent banner (one-time) */}
      <AnimatePresence initial={false}>
        {consent === null && (
          <motion.div
            key="consent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mb-2 w-full sm:max-w-lg px-3"
          >
            <div className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-900/60 px-3 py-1.5 shadow-xl">
              <div className="flex-1 min-w-0 text-slate-200 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">Want to listen to ADW AI-powered music?</div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
                <button onClick={acceptConsentAndPlay} className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] sm:text-xs font-[family-name:var(--font-geist-mono)] uppercase tracking-wider px-2.5 py-1 rounded-md">Play now</button>
                <button onClick={dismissConsent} className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] sm:text-xs font-[family-name:var(--font-geist-mono)] uppercase tracking-wider px-2.5 py-1 rounded-md">Not now</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music bar (hidden until user accepts or declines) */}
      <AnimatePresence initial={false}>
      {consent !== null && (
      <motion.div
        key="bar"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.25 }}
        className="mx-auto w-full sm:max-w-4xl"
      >
        <div className="m-2 rounded-xl border border-slate-700 bg-slate-900/90 shadow-2xl">
            <div className="px-2 sm:px-4 py-2 sm:py-3">
              {/* Mobile layout: 2 rows */}
              <div className="sm:hidden grid grid-cols-[auto_1fr_auto_auto] grid-rows-2 items-center gap-2">
                {/* Row-span picture */}
                <div className="row-span-2">
                  <div className="h-10 w-10 rounded-md bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
                    {currentTrack?.image ? (
                      <img src={currentTrack.image} alt="cover" className="h-full w-full object-cover" />
                    ) : (
                      <div className="text-slate-500 text-[10px]">No art</div>
                    )}
                  </div>
                </div>
                {/* Row 1: title/author (now directly after picture) */}
                <div className="min-w-0">
                  <div className="text-slate-100 text-xs font-semibold truncate">{currentTrack?.title || "—"}</div>
                  <div className="text-slate-400 text-[10px] truncate font-[family-name:var(--font-geist-mono)] uppercase tracking-wider">ADW AI Music</div>
                </div>
                {/* Row 1: controls (center) */}
                <div className="flex items-center justify-center gap-2">
                  <button onClick={prevTrack} className="h-7 w-7 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center" aria-label="Previous">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-200"><path d="M6 6h2v12H6zM9.5 12L20 6v12z"/></svg>
                  </button>
                  <button onClick={togglePlay} className="h-8 w-8 rounded-full bg-blue-700 hover:bg-blue-600 text-white flex items-center justify-center" aria-label="Play/Pause">
                    {isPlaying ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>
                  <button onClick={nextTrack} className="h-7 w-7 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center" aria-label="Next">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-200"><path d="M16 6h2v12h-2zM4 18V6l10 6z"/></svg>
                  </button>
                </div>
                {/* Row 1: genre (far right) */}
                <div className="justify-self-end">
                  <select
                    id="genre"
                    className="bg-slate-800 text-slate-100 text-[9px] rounded-md border border-slate-700 px-1.5 py-0.5 font-[family-name:var(--font-geist-mono)] uppercase tracking-wider"
                    value={genre}
                    onChange={(e) => {
                      const g = e.target.value;
                      setGenre(g);
                      setTrackIndex(0);
                    }}
                  >
                    {genres.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                {/* Row 2: progress spanning remainder */}
                <div className="col-start-2 col-span-3">
                  <ElasticSlider
                    defaultValue={Math.round(progressPct)}
                    startingValue={0}
                    maxValue={100}
                    className="w-full"
                    onChange={(pct) => {
                      const audio = audioRef.current;
                      if (!audio || !isFinite(audio.duration)) return;
                      const v = Math.max(0, Math.min(100, Number(pct)));
                      const t = (v / 100) * (audio.duration || 0);
                      audio.currentTime = t;
                      lastTimeRef.current = t;
                      setCurrentTime(t);
                    }}
                    compact
                    leftIcon={<span className="text-slate-400 text-[10px] font-[family-name:var(--font-geist-mono)]">{formatTime(currentTime)}</span>}
                    rightIcon={<span className="text-slate-400 text-[10px] font-[family-name:var(--font-geist-mono)]">{formatTime(duration)}</span>}
                  />
                </div>
              </div>

              {/* Desktop/tablet layout */}
              <div className="hidden sm:grid grid-cols-[auto_1fr_auto] items-center gap-3">
                {/* Left: art + titles */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-12 w-12 rounded-md bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
                    {currentTrack?.image ? (
                      <img src={currentTrack.image} alt="cover" className="h-full w-full object-cover" />
                    ) : (
                      <div className="text-slate-500 text-[10px]">No art</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-slate-100 text-sm font-semibold truncate">{currentTrack?.title || "—"}</div>
                    <div className="text-slate-400 text-xs truncate">{AUTHOR_LABEL}</div>
                  </div>
                </div>
                {/* Center: controls + progress */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setShuffle((s) => !s)}
                      className={`h-8 w-8 p-1 rounded-full border items-center justify-center ${shuffle ? 'bg-slate-700 border-blue-500' : 'bg-slate-800 hover:bg-slate-700 border-slate-700'}`}
                      aria-label="Shuffle"
                      title="Shuffle"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-200">
                        <polyline points="16 3 21 3 21 8"></polyline>
                        <line x1="4" y1="20" x2="21" y2="3"></line>
                        <polyline points="21 16 21 21 16 21"></polyline>
                        <line x1="15" y1="15" x2="21" y2="21"></line>
                        <line x1="4" y1="4" x2="9" y2="9"></line>
                      </svg>
                    </button>
                    <button onClick={prevTrack} className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center" aria-label="Previous">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-200"><path d="M6 6h2v12H6zM9.5 12L20 6v12z"/></svg>
                    </button>
                    <button onClick={togglePlay} className="h-9 w-9 rounded-full bg-blue-700 hover:bg-blue-600 text-white flex items-center justify-center" aria-label="Play/Pause">
                      {isPlaying ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>
                    <button onClick={nextTrack} className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center" aria-label="Next">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-200"><path d="M16 6h2v12h-2zM4 18V6l10 6z"/></svg>
                    </button>
                    <button
                      onClick={() => setLoopOne((v) => !v)}
                      className={`h-8 w-8 p-1 rounded-full border items-center justify-center ${loopOne ? 'bg-slate-700 border-blue-500' : 'bg-slate-800 hover:bg-slate-700 border-slate-700'}`}
                      aria-label="Loop"
                      title="Loop current track"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-200">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <polyline points="1 20 1 14 7 14"></polyline>
                        <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10M1 14l5.37 5.37A9 9 0 0 0 20.49 15"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-3 px-2">
                    <ElasticSlider
                      defaultValue={Math.round(progressPct)}
                      startingValue={0}
                      maxValue={100}
                      className="w-full"
                      onChange={(pct) => {
                        const audio = audioRef.current;
                        if (!audio || !isFinite(audio.duration)) return;
                        const v = Math.max(0, Math.min(100, Number(pct)));
                        const t = (v / 100) * (audio.duration || 0);
                        audio.currentTime = t;
                        lastTimeRef.current = t;
                        setCurrentTime(t);
                      }}
                      compact
                      leftIcon={<span className="text-slate-400 text-xs">{formatTime(currentTime)}</span>}
                      rightIcon={<span className="text-slate-400 text-xs">{formatTime(duration)}</span>}
                    />
                  </div>
                </div>
                {/* Right: genre + volume */}
                <div className="grid grid-cols-1 gap-2 justify-items-end">
                  <div className="flex items-center gap-2">
                    <select
                      id="genre"
                      className="bg-slate-800 text-slate-100 text-xs rounded-md border border-slate-700 px-2 py-1"
                      value={genre}
                      onChange={(e) => {
                        const g = e.target.value;
                        setGenre(g);
                        setTrackIndex(0);
                      }}
                    >
                      {genres.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <ElasticSlider
                      defaultValue={Math.round(volume)}
                      startingValue={0}
                      maxValue={100}
                      className="w-40"
                      onChange={(val) => setVolume(Math.max(0, Math.min(100, Math.round(Number(val))))) }
                      leftIcon={<span className="text-slate-400 text-xs">0%</span>}
                      rightIcon={<span className="text-slate-400 text-xs">100%</span>}
                      compact
                    />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </motion.div>
      )}
      </AnimatePresence>

      {/* Hidden audio element (only when bar is visible) */}
      {consent !== null && <audio ref={audioRef} preload="metadata" />}
    </div>
  );
}


