/*
  Generate a static music library JSON by scanning public/ADW-music.
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
      const coverFs = possibleCoverFor(path.parse(file).name, dir);
      const image = coverFs ? `/ADW-music/${encodeURIComponent(genre)}/${encodeURIComponent(path.basename(coverFs))}` : undefined;
      tracks.push({ title, src, image });
    }
    if (tracks.length) result[genre] = tracks;
  }
  fs.writeFileSync(outPath, JSON.stringify({ library: result }, null, 2));
  console.log(`[generate-music-library] Wrote ${outPath}`);
}

main();


