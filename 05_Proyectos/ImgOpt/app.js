import fse from "fs-extra";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import imageminGifsicle from "imagemin-gifsicle";
import sharp from "sharp";

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
      let outputPath = `${outputFolder}/${file}`;

      const stats = await fse.stat(inputPath);
      if (stats.isFile()) {
        console.log(`${inputPath} is a file.`);
      } else if (stats.isDirectory()) {
        console.log(`${inputPath} is a directory.`);
      }

      await sharp(inputPath).resize(targetWidth).toFile(outputPath);

      await imagemin([outputPath], {
        destination: outputFolder,
        plugins: [
          imageminJpegtran({quality: 80}), //Comprimir imagen JPEG con calidad del 80%
          imageminPngquant(), //Comprimir imagen PNG
          imageminSvgo(), //Comprimir imagen SVG
          imageminWebp({quality: 80}), //Comprimir imagen WebP con calidad del 80%
          imageminGifsicle(), //Comprimir imagen GIF
        ],
      });
      console.log(`Se ha optimizado la imagen: ${file} a formato WebP`);
    }
    console.log("Se han optimizado todas tus imágenes");
  } catch (err) {
    console.error(err);
  }
};
processImage();
