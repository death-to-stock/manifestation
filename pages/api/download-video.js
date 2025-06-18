import fs from 'fs';
import path from 'path';

const outputDir = path.join(process.cwd(), 'public', 'output');

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { videoId } = req.query;
  if (!videoId) {
    return res.status(400).json({ message: 'No video ID provided' });
  }

  const filePath = path.join(outputDir, `${videoId}.mp4`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Video not found' });
  }

  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', 'attachment; filename="dtsxtina.mp4"');
  fs.createReadStream(filePath).pipe(res);
} 