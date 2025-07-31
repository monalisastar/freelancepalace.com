// convert-and-replace.mjs
import sharp from 'sharp';
import * as glob from 'glob';
import fs from 'fs';
import path from 'path';

// Configuration
const imageExtensions = ["png", "jpg", "jpeg"];
const imageGlob = `./public/**/*.+(${imageExtensions.join("|")})`;
const codeGlob = "./**/*.{ts,tsx,js,jsx}";
const deleteOriginals = false; // Set to true to delete originals

// Step 1: Convert all images to .webp
async function convertImagesToWebP() {
  const files = await glob.glob(imageGlob);

  for (const file of files) {
    const outputFile = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");

    try {
      await sharp(file).webp({ quality: 80 }).toFile(outputFile);
      console.log(`✅ Converted: ${file} → ${outputFile}`);

      if (deleteOriginals) {
        fs.unlinkSync(file);
        console.log(`🗑️ Deleted original: ${file}`);
      }
    } catch (err) {
      console.error(`❌ Failed to convert ${file}:`, err);
    }
  }
}

// Step 2: Replace image references in code files
async function replaceImageReferencesInCode() {
  const files = await glob.glob(codeGlob);

  for (const file of files) {
    try {
      const stat = fs.statSync(file);
      if (!stat.isFile()) continue;

      let content = fs.readFileSync(file, "utf-8");
      const regex = new RegExp(`\\.(${imageExtensions.join("|")})`, "gi");

      if (regex.test(content)) {
        const updated = content.replace(regex, ".webp");
        fs.writeFileSync(file, updated, "utf-8");
        console.log(`🔁 Updated: ${file}`);
      }
    } catch (err) {
      console.warn(`⚠️ Skipped ${file}:`, err.message);
    }
  }
}

// Run both steps
(async () => {
  console.log("🔄 Starting image conversion and code update...");
  await convertImagesToWebP();
  await replaceImageReferencesInCode();
  console.log("✅ All done!");
})();
