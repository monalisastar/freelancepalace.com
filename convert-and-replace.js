// convert-and-replace.js
const sharp = require("sharp");
const glob = require("glob");
const fs = require("fs");
const path = require("path");

// Configuration
const imageExtensions = ["png", "jpg", "jpeg"];
const imageGlob = `./public/**/*.+(${imageExtensi.joi("|")});
const codeGlob = "./**/*.{ts,tsx,js,jsx}";
const deleteOriginals = false; // Set to true if you want to remove original images

// Step 1: Convert all images to .webp
async function convertImagesToWebP() {
  return new Promise((resolve, reject) => {
    glob(imageGlob, async (err, files) => {
      if (err) return reject(err);

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

      resolve();
    });
  });
}

// Step 2: Replace references in code
function replaceImageReferencesInCode() {
  glob(codeGlob, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      let content = fs.readFileSync(file, "utf-8");
      const regex = new RegExp(`\\.(${imageExtensions.join("|")})`, "gi");

      if (regex.test(content)) {
        const updated = content.replace(regex, ".webp");
        fs.writeFileSync(file, updated, "utf-8");
        console.log(`🔁 Updated: ${file}`);
      }
    }
  });
}

// Run both steps
(async () => {
  console.log("🔄 Starting image conversion and code update...");
  await convertImagesToWebP();
  replaceImageReferencesInCode();
  console.log("✅ All done!");
})();
