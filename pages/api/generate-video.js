import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import { randomUUID } from 'crypto';

ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(typeof ffprobeStatic === 'string' ? ffprobeStatic : ffprobeStatic.path);

const audioDir = path.join(process.cwd(), 'public', 'audio');
const imageDir = path.join(process.cwd(), 'public', 'random');
const outputDir = path.join(process.cwd(), 'public', 'output');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

export default function handler(req, res) {
  // Allow CORS pre-flight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { selected } = req.body;
  if (!selected || selected.length === 0) {
    return res.status(400).json({ message: 'No audio files selected' });
  }

  const imageFiles = fs.readdirSync(imageDir).filter(f => f.endsWith('.jpg'));
  const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
  const imagePath = path.join(imageDir, randomImage);
  
  const outputId = randomUUID();
  const outputPath = path.join(outputDir, `${outputId}.mp4`);
  
  const command = ffmpeg(imagePath)
    .inputOptions(['-loop 1'])
    .outputOptions(['-t 15']);

  const audioInputs = selected.map(audioFile => path.join(audioDir, audioFile));
  audioInputs.forEach(audioPath => {
    command.input(audioPath);
  });
  
  if (selected.length > 0) {
    const filterGraph = [];
    const amixInputs = [];

    selected.forEach((_, index) => {
      const inputIndex = index + 1;
      const streamTag = `[${inputIndex}:a]`;
      const loopedTag = `[a${index}]`;
      filterGraph.push({
          filter: 'aloop',
          options: { loop: -1, size: '2e+09' },
          inputs: streamTag,
          outputs: loopedTag,
      });
      amixInputs.push(loopedTag);
    });
    
    filterGraph.push({
      filter: 'amix',
      options: {
        inputs: selected.length,
        duration: 'first'
      },
      inputs: amixInputs,
      outputs: 'mixout'
    });
    command.complexFilter(filterGraph);
    command.outputOptions('-map', '0:v');
    command.outputOptions('-map', '[mixout]');
  }
  
  command
    .outputOptions([
        '-c:v libx264',
        '-c:a aac',
        '-strict experimental',
        '-pix_fmt yuv420p',
        '-shortest'
    ])
    .on('end', () => {
      res.status(200).json({ videoId: outputId });
    })
    .on('error', (err) => {
      console.error('ffmpeg error:', err);
      res.status(500).json({ message: 'Error generating video' });
    })
    .save(outputPath);
} 