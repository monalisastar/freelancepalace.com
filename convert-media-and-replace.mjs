import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import * as glob from 'glob';
import fs from 'fs';
import path from 'path';

// Extensions
const imageExtensions = ["png", "jpg", "jpeg"];
const videoExtensions = ["mp4", "mov", "avi", "mkv"];
const imageGlob = `./public/**/*.+(${imageExtensions.join("|")})`;
const videoGlob = `./public/**/*.+(${videoExtensions.join("|")})`;
const codeGlob = [
  "./app/**/*.{ts,tsx,js,jsx}",
  "./components/**/*.{ts,tsx,js,jsx}",
  "./pages/**/*.{ts,tsx,js,jsx}",
  "./lib/**/*.{ts,tsx,js,jsx}"
];

const deleteOriginals = false;
const enableLogging = true;
const logFile = "media-conversion-log.txt";

// Compression settings
const webpOptions = {
  quality: 65,
  effort: 5,
  nearLossless: false
};

const webmOptions = {
  crf: 30,
  bitrate: '0',
  codec: 'libvpx-vp9'
};

// Convert images to .webp
async function convertImagesToWebP() {
  const files = await glob.glob(imageGlob);
  const converted = [];

  for (const file of files) {
    const parsed = path.parse(file);
    const baseName = parsed.name
      .replace(/\.(png|jpg|jpeg)$/i, "")
      .replace(/\s+/g, "-")
      .toLowerCase()
      .trim();

    const outputFile = path.join(parsed.dir, `${baseName}.webp`);
    if (fs.existsSync(outputFile)) {
      console.log(`⏭️ Skipped (already .webp): ${outputFile}`);
      continue;
    }

    try {
      await sharp(file).webp(webpOptions).toFile(outputFile);
      console.log(`🖼️ Converted: ${file} → ${outputFile}`);
      converted.push(`🖼️ ${file} → ${outputFile}`);
      if (deleteOriginals) fs.unlinkSync(file);
    } catch (err) {
      console.error(`❌ Failed to convert image ${file}: ${err.message}`);
    }
  }

  return converted;
}

// Convert videos to .webm with cleanup
async function convertVideosToWebM() {
  const files = await glob.glob(videoGlob);
  const converted = [];

  for (const file of files) {
    try {
      const parsed = path.parse(file);
      const baseName = parsed.name
        .replace(/\.(mp4|mov|avi|mkv)$/i, "")
        .replace(/\s+/g, "-")
        .toLowerCase()
        .trim();

      const dir = parsed.dir;
      const outputFile = path.join(dir, `${baseName}.webm`);
      if (!file || !outputFile) continue;

      await new Promise((resolve, reject) => {
        ffmpeg(file)
          .videoCodec(webmOptions.codec)
          .outputOptions([
            `-crf ${webmOptions.crf}`,
            `-b:v ${webmOptions.bitrate}`,
            '-c:a libopus',
            '-deadline good',
            '-row-mt 1'
          ])
          .on('end', () => {
            console.log(`🎥 Converted: ${file} → ${outputFile}`);
            converted.push(`🎥 ${file} → ${outputFile}`);
            if (deleteOriginals) fs.unlinkSync(file);
            resolve();
          })
          .on('error', (err) => {
            console.error(`❌ Failed to convert video ${file}: ${err.message}`);
            reject(err);
          })
          .save(outputFile);
      });
    } catch (err) {
      console.error(`❌ Error processing ${file}: ${err.message}`);
    }
  }

  return converted;
}

// Replace media references in code
async function replaceMediaReferencesInCode() {
  const patterns = [...imageExtensions, ...videoExtensions];
  const regex = new RegExp(`\\.(${patterns.join("|")})`, "gi");
  const allMatches = (await Promise.all(codeGlob.map(p => glob.glob(p)))).flat();
  const updatedFiles = [];

  for (const file of allMatches) {
    try {
      const stat = fs.statSync(file);
      if (!stat.isFile()) continue;

      let content = fs.readFileSync(file, "utf-8");
      if (regex.test(content)) {
        const updated = content.replace(regex, (ext) =>
          ext.toLowerCase().match(/mp4|mov|avi|mkv/) ? ".webm" : ".webp"
        );
        fs.writeFileSync(file, updated, "utf-8");
        console.log(`🔁 Updated: ${file}`);
        updatedFiles.push(`🔁 ${file}`);
      }
    } catch (err) {
      console.warn(`⚠️ Skipped ${file}: ${err.message}`);
    }
  }

  return updatedFiles;
}

// Run all
(async () => {
  console.log("🔄 Starting full media conversion and code update...\n");

  const convertedImages = await convertImagesToWebP();
  const convertedVideos = await convertVideosToWebM();
  const updatedRefs = await replaceMediaReferencesInCode();

  if (enableLogging) {
    const logText = [
      `--- MEDIA CONVERSION LOG [${new Date().toISOString()}] ---`,
      ...convertedImages,
      ...convertedVideos,
      ...updatedRefs,
      ""
    ].join("\n");

    fs.appendFileSync(logFile, logText, "utf-8");
    console.log(`\n📝 Log saved to ${logFile}`);
  }

  console.log("\n✅ All done!");
})();
