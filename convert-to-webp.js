// convert-to-webp.js
const sharp = require("sharp");
const glob = require("glob");
const fs = require("fs");
const path = require("path");

// Supported formats
const inputFormats = ["png", "jpg", "jpeg"];
const inputGlob = `./public/**/*.+(${inputFormats.join("|")})`;

glob(inputGlob, async (err, files) => {
  if (err) throw err;

  for (const file of files) {
    const outputFile = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");

    try {
      await sharp(file)
        .webp({ quality: 80 })
        .toFile(outputFile);

      console.log(`✅ Converted: ${file} → ${outputFile}`);

      // Optionally delete the old image
      // fs.unlinkSync(file);
    } catch (err) {
      console.error(`❌ Failed to convert ${file}:`, err);
    }
  }
});
