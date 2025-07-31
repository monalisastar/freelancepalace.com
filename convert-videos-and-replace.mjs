// convert-videos-and-replace.mjs
import ffmpeg from 'fluent-ffmpeg';
import * as glob from 'glob';
import fs from 'fs';
import path from 'path';

// Video formats to convert
const videoExtensions = ["mp4", "mov", "avi", "mkv"];
const videoGlob = `./public/**/*.+(${videoExtensions.join("|")})`;

// Only include real source folders (avoid node_modules, .next, etc.)
const codeGlob = [
  "./app/**/*.{ts,tsx,js,jsx}",
  "./components/**/*.{ts,tsx,js,jsx}",
  "./pages/**/*.{ts,tsx,js,jsx}",
  "./lib/**/*.{ts,tsx,js,jsx}"
];

const deleteOriginals = false; // Set to true to remove original video files
const enableLogging = true;
const logFile = "video-conversion-log.txt";

// Step 1: Convert all videos to .webm
async function convertVideosToWebM() {
  const files = await glob.glob(videoGlob);
  const converted = [];

  for (const file of files) {
    const outputFile = file.replace(/\.(mp4|mov|avi|mkv)$/i, ".webm");

    try {
      await new Promise((resolve, reject) => {
        ffmpeg(file)
          .outputOptions('-c:v libvpx', '-b:v 1M', '-c:a libvorbis')
          .save(outputFile)
          .on('end', () => {
            console.log(`🎥 Converted: ${file} → ${outputFile}`);
            converted.push(`🎥 ${file} → ${outputFile}`);
            if (deleteOriginals) {
              fs.unlinkSync(file);
              console.log(`🗑️ Deleted original: ${file}`);
            }
            resolve();
          })
          .on('error', reject);
      });
    } catch (err) {
      console.error(`❌ Failed to convert ${file}:`, err.message);
    }
  }

  return converted;
}

// Step 2: Replace video references in code files
async function replaceVideoReferencesInCode() {
  const allMatches = (
    await Promise.all(codeGlob.map(pattern => glob.glob(pattern)))
  ).flat();

  const updatedFiles = [];

  for (const file of allMatches) {
    try {
      const stat = fs.statSync(file);
      if (!stat.isFile()) continue;

      let content = fs.readFileSync(file, "utf-8");
      const regex = new RegExp(`\\.(${videoExtensions.join("|")})`, "gi");

      if (regex.test(content)) {
        const updated = content.replace(regex, ".webm");
        fs.writeFileSync(file, updated, "utf-8");
        console.log(`🔁 Updated: ${file}`);
        updatedFiles.push(`🔁 ${file}`);
      }
    } catch (err) {
      console.warn(`⚠️ Skipped ${file}:`, err.message);
    }
  }

  return updatedFiles;
}

// Run both steps
(async () => {
  console.log("🔄 Starting safe video conversion and code update...\n");

  const converted = await convertVideosToWebM();
  const replaced = await replaceVideoReferencesInCode();

  if (enableLogging) {
    const logText = [
      `--- VIDEO CONVERSION LOG [${new Date().toISOString()}] ---`,
      ...converted,
      ...replaced,
      ""
    ].join("\n");

    fs.appendFileSync(logFile, logText, "utf-8");
    console.log(`📝 Log written to: ${logFile}`);
  }

  console.log("\n✅ All done!");
})();
