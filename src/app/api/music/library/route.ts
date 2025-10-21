import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parseFile } from 'music-metadata';

// Node runtime required for fs
export const runtime = 'nodejs';

function isAudioFile(name: string) {
  const lc = name.toLowerCase();
  return lc.endsWith('.mp3') || lc.endsWith('.wav') || lc.endsWith('.m4a');
}

function possibleCoverFor(basenameNoExt: string, folder: string): string | null {
  const exts = ['.jpg', '.jpeg', '.png', '.webp'];
  for (const ext of exts) {
    const candidate = path.join(folder, basenameNoExt + ext);
    if (fs.existsSync(candidate)) return candidate;
  }
  // also try generic cover.* in folder
  for (const ext of exts) {
    const candidate = path.join(folder, 'cover' + ext);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

export async function GET(_req: NextRequest) {
  try {
    const base = path.join(process.cwd(), 'public', 'ADW-music');
    if (!fs.existsSync(base)) {
      return NextResponse.json({ library: {} });
    }
    const genres = fs.readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

    const library: Record<string, Array<{ title: string; src: string; image?: string }>> = {};
    for (const genre of genres) {
      const dir = path.join(base, genre);
      const files = fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isFile()).map((d) => d.name);
      const tracks = [] as Array<{ title: string; src: string; image?: string }>;
      for (const file of files) {
        if (!isAudioFile(file)) continue;
        const title = path.parse(file).name;
        const src = `/ADW-music/${encodeURIComponent(genre)}/${encodeURIComponent(file)}`;
        const coverFs = possibleCoverFor(path.parse(file).name, dir);
        let image = coverFs ? `/ADW-music/${encodeURIComponent(genre)}/${encodeURIComponent(path.basename(coverFs))}` : undefined;
        if (!image) {
          try {
            const meta = await parseFile(path.join(dir, file));
            const pic = meta.common.picture && meta.common.picture[0];
            if (pic && pic.data) {
              const b64 = Buffer.from(pic.data).toString('base64');
              const mime = pic.format || 'image/jpeg';
              image = `data:${mime};base64,${b64}`;
            }
          } catch {}
        }
        tracks.push({ title, src, image });
      }
      if (tracks.length) library[genre] = tracks;
    }
    return NextResponse.json({ library });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to load library' }, { status: 500 });
  }
}


