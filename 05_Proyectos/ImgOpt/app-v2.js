import fse from "fs-extra";
import sharp from "sharp";
import path from "path";

let inputFolder = "src";
let outputFolder = "opt";
let targetWidth = 1920;

const processImage = async () => {
  try {
    const files = await fse.readdir(inputFolder);

    for (const file of files) {
      // Skip hidden files
      if (file.startsWith(".")) {
        console.log(`Skipping hidden file ${file}`);
        continue;
      }
      let inputPath = `${inputFolder}/${file}`;
      //For WebP output
      let outputPath = `${outputFolder}/${path.parse(file).name}.webp`;
      // For JPEG output
      /* let outputPath = `${outputFolder}/${path.parse(file).name}.jpeg`; */

      // For PNG output
      /* let outputPath = `${outputFolder}/${path.parse(file).name}.png`; */

      const stats = await fse.stat(inputPath);
      //For WebP output
      const data = await sharp(inputPath)
        .resize(targetWidth)
        .webp({quality: 80})
        .toBuffer();
      // For JPEG output
      /* const data = await sharp(inputPath)
        .resize(targetWidth)
        .jpeg({quality: 80})
        .toBuffer(); */

      // For PNG output
      /* const data = await sharp(inputPath)
        .resize(targetWidth)
        .png({quality: 80})
        .toBuffer(); */
      await fse.writeFile(outputPath, data);

      console.log(`Image optimized: ${file} converted to WebP format`);
    }
    console.log("All your images have been optimized");
  } catch (err) {
    console.error(err);
  }
};
processImage();
