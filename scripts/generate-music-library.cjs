/*
  Generate a static music library JSON by scanning public/ADW-music.
  - Uses per-track images (trackname.jpg/png/webp) or folder-level cover.* if present
  - If missing, optionally extracts embedded artwork from the audio file (if music-metadata is available)
  Writes to public/music-library.json so the client can fetch it directly.
*/
const fs = require('fs');
const path = require('path');

function isAudioFile(name) {
  const lc = name.toLowerCase();
  return lc.endsWith('.mp3') || lc.endsWith('.wav') || lc.endsWith('.m4a');
}

function possibleCoverFor(basenameNoExt, folder) {
  const exts = ['.jpg', '.jpeg', '.png', '.webp'];
  for (const ext of exts) {
    const candidate = path.join(folder, basenameNoExt + ext);
    if (fs.existsSync(candidate)) return candidate;
  }
  for (const ext of exts) {
    const candidate = path.join(folder, 'cover' + ext);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function main() {
  const projectRoot = process.cwd();
  const base = path.join(projectRoot, 'public', 'ADW-music');
  const outPath = path.join(projectRoot, 'public', 'music-library.json');
  const result = {};
  if (!fs.existsSync(base)) {
    fs.writeFileSync(outPath, JSON.stringify({ library: {} }, null, 2));
    console.log('[generate-music-library] No ADW-music folder found. Wrote empty library.');
    return;
  }
  const genres = fs.readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  for (const genre of genres) {
    const dir = path.join(base, genre);
    const files = fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isFile()).map((d) => d.name);
    const tracks = [];
    for (const file of files) {
      if (!isAudioFile(file)) continue;
      const title = path.parse(file).name;
      const src = `/ADW-music/${encodeURIComponent(genre)}/${encodeURIComponent(file)}`;
      let coverFs = possibleCoverFor(path.parse(file).name, dir);
      // If missing, try extracting from embedded artwork (optional dep)
      if (!coverFs) {
        try {
          const mm = require('music-metadata');
          const meta = mm.parseFile(path.join(dir, file));
          // Handle promise or sync if library version returns promise
          if (meta && typeof meta.then === 'function') {
            // eslint-disable-next-line no-loop-func
            result.__async = true; // mark async; we'll handle below
          }
        } catch {
          // music-metadata not installed; skip extraction
        }
      }
      let image;
      if (coverFs) {
        image = `/ADW-music/${encodeURIComponent(genre)}/${encodeURIComponent(path.basename(coverFs))}`;
      } else {
        image = undefined;
      }
      tracks.push({ title, src, image });
    }
    if (tracks.length) result[genre] = tracks;
  }
  // If we marked async extraction, rerun pass with async extraction
  if (result.__async) {
    delete result.__async;
    return extractAndWrite(projectRoot, base, outPath, result);
  }
  fs.writeFileSync(outPath, JSON.stringify({ library: result }, null, 2));
  console.log(`[generate-music-library] Wrote ${outPath}`);
}

main();

async function extractAndWrite(projectRoot, base, outPath, initial) {
  const mm = require('music-metadata');
  const result = initial;
  for (const genre of Object.keys(result)) {
    const dir = path.join(base, genre);
    const tracks = result[genre];
    for (const t of tracks) {
      if (t.image) continue; // has file cover already
      try {
        const file = decodeURIComponent(t.src.replace(`/ADW-music/${encodeURIComponent(genre)}/`, ''));
        const meta = await mm.parseFile(path.join(dir, file));
        const pic = meta.common.picture && meta.common.picture[0];
        if (pic && pic.data) {
          const ext = (pic.format || 'image/jpeg').includes('png') ? '.png' : '.jpg';
          const outName = `${path.parse(file).name}-cover${ext}`;
          const outFsPath = path.join(dir, outName);
          if (!fs.existsSync(outFsPath)) {
            fs.writeFileSync(outFsPath, Buffer.from(pic.data));
          }
          t.image = `/ADW-music/${encodeURIComponent(genre)}/${encodeURIComponent(outName)}`;
        }
      } catch {}
    }
  }
  fs.writeFileSync(outPath, JSON.stringify({ library: result }, null, 2));
  console.log(`[generate-music-library] Extracted covers and wrote ${outPath}`);
}


