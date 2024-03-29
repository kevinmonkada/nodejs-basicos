import express from "express";
import fs from "fs/promises";
import path from "path";
import markdownIt from "markdown-it";
import fm from "front-matter";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import {fileURLToPath} from "url";

const app = new express();
const port = process.env.PORT || 3000;
const __dirname = fileURLToPath(new URL(".", import.meta.url));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.set("views", path.join(__dirname, "pages"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

//Dinamic routes from files in "pages" folder

const pagesDir = path.join(__dirname, "pages");
const files = await fs.readdir(pagesDir);

// Here logic to create dinamic routes for html and md files
for (let file of files) {
  const filePath = path.join(pagesDir, file);
  let extname = path.extname(file);

  console.log(file, filePath, extname);

  if (extname === ".md" || extname === ".pug" || extname === ".html") {
    let fileName = path.basename(file, extname);
    console.log(fileName);

    app.get(`/${fileName}`, async (req, res) => {
      try {
        if (extname === ".pug") {
          res.render(fileName);
        }
        if (extname === ".html") {
          res.sendFile(filePath);
        }
        if (extname === ".md") {
          let fileContent = await fs.readFile(filePath, "utf-8");
          let {attributes: frontMatterAttributes, body} = fm(fileContent);

          let attributes = frontMatterAttributes;
          let contentHTML = markdownIt().render(body);
          res.render("layout-markdown", {...attributes, contentHTML});
        }
      } catch (err) {
        res.status(404).render("error-404");
      }
    });
  }
}
//Home page route
app.get("/", (req, res) => {
  res.render("index");
});

//404 page route
app.use((req, res) => {
  res.status(404).render("error-404");
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
