import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const zip = new JSZip();
  const assetsDir = path.resolve('./public/screens/freeassets');

  try {
    const assetFiles = fs.readdirSync(assetsDir);

    assetFiles.forEach((file) => {
      const filePath = path.join(assetsDir, file);
      const fileContent = fs.readFileSync(filePath);
      zip.file(file, fileContent);
    });

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="free-visuals.zip"');
    res.status(200).send(zipBuffer);
  } catch (error) {
    console.error('Error creating zip file:', error);
    res.status(500).json({ error: 'Error creating zip file' });
  }
} 