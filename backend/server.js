import dotenv from "dotenv";
import fs from "fs";
import express from "express";
import cors from "cors";
import { build } from "vite";
import path from "path";
import JSZip from "jszip";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enable CORS for all routes
app.use(cors());

app.use(express.json()); // To parse JSON request bodies

app.use("/preview/:projectId", (req, res, next) => {
  const projectId = req.params.projectId; // Extract projectId from the URL
  const userBuildDir = path.resolve(
    __dirname,
    "../frontend/dist/preview",
    projectId
  );

  if (!fs.existsSync(userBuildDir)) {
    return res
      .status(404)
      .send({ error: "Build not found for the specified project" });
  }

  // Serve static files
  express.static(userBuildDir)(req, res, next);

  console.log(`Serving static files from: ${userBuildDir}`);
});

// Endpoint to trigger the build process
app.post("/api/build", async (req, res) => {
  console.log("Received build request:", req.body);

  try {
    const projectId = req.body.projectId || uuidv4(); // Use projectId from the request or generate a UUID

    const outputDir = path.resolve(__dirname, "projects", projectId);

    // Ensure the build directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true }); // Create the directory if it doesn't exist
    }

    const bundleTSX = `${projectId}.tsx`;
    const bundleFile = path.resolve(__dirname, "src", bundleTSX);
    const htmlFile = path.resolve(outputDir, "index.html");

    // Write the entry.tsx file
    const entryFileContent = `
      import React from "react";
      import ReactDOM from "react-dom/client"; 
      import { TEMPLATE_REGISTRY } from "@kebapp/shared/src/templates/index.js";
      import "@kebapp/shared/src/index.css"; // Import Tailwind CSS

      const config = ${JSON.stringify(req.body.templateConfig)};
      const TemplateComponent = TEMPLATE_REGISTRY["${req.body.templateId}"];

      if (!TemplateComponent) {
        throw new Error("TemplateComponent not found in TEMPLATE_REGISTRY");
      }

      const rootElement = document.getElementById("root");
      if (!rootElement) {
        throw new Error("Root element not found in the DOM");
      }

      const root = ReactDOM.createRoot(rootElement); // Use createRoot for React 18+
      root.render(React.createElement(TemplateComponent, { config }));
    `;
    fs.writeFileSync(bundleFile, entryFileContent, "utf8");

    try {
      // Use Vite to build the static files
      await build({
        root: path.resolve(__dirname, "./src"),
        build: {
          outDir: outputDir,
          //emptyOutDir: true,
          manifest: true,
          rollupOptions: {
            input: bundleFile,
          },
        },
      });
    } catch (error) {
      console.error("Build process failed:", error);
      throw error;
    }

    // Read the manifest.json file AFTER the build process
    const manifestPath = path.resolve(outputDir + "/.vite", "manifest.json");
    if (!fs.existsSync(manifestPath)) {
      throw new Error("Manifest file not found after build");
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

    // Get the output file name for the entry file
    const bundleFileName = manifest[bundleTSX]?.file;
    const cssFileName = manifest[bundleTSX]?.css[0];
    if (!bundleFileName) {
      throw new Error("Bundle file not found in manifest.json");
    }

    // Check if the entry file exists, and create it if it doesn't
    fs.writeFileSync(
      htmlFile,
      `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta http-equiv="content-type" content="text/html; charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${req.body.templateConfig.title || "Generated Page"}</title>
            <link rel="stylesheet" href="./${cssFileName}" />
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="./${bundleFileName}"></script>
          </body>
        </html>
      `,
      "utf8"
    ); // Create the file with the content

    console.log(`Created entry file at ${bundleFile}`);
    console.log(`Created HTML file at ${htmlFile}`);

    // Delete the bundle file after the build process
    if (fs.existsSync(bundleFile)) {
      fs.unlinkSync(bundleFile); // Synchronous deletion
      console.log(`Deleted temporary bundle file: ${bundleFile}`);
    }

    res
      .status(200)
      .send({ message: "Build completed successfully", projectId });

    // Copy project for preview in frontend/dist/preview
    // Define the destination directory
    const previewDir = path.resolve(
      __dirname,
      "../frontend/dist/preview",
      projectId
    );

    // Ensure the preview directory exists
    if (!fs.existsSync(path.dirname(previewDir))) {
      fs.mkdirSync(path.dirname(previewDir), { recursive: true });
    }

    // Copy the outputDir to the preview directory
    const copyDirectory = (src, dest) => {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      const entries = fs.readdirSync(src, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          copyDirectory(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };

    copyDirectory(outputDir, previewDir);
    console.log(`Copied build to ${previewDir}`);
  } catch (error) {
    console.error("Build Error:", error);
    res.status(500).send({ error: "Build failed" });
  }
});

// Endpoint to download the build as a ZIP file
app.get("/api/download", async (req, res) => {
  try {
    const zip = new JSZip();
    const outputDir = path.resolve(__dirname, "build");

    // Add files to the ZIP
    const addFilesToZip = (dir, folder) => {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          const subFolder = folder.folder(file);
          addFilesToZip(filePath, subFolder);
        } else {
          folder.file(file, fs.readFileSync(filePath));
        }
      });
    };

    addFilesToZip(outputDir, zip);

    // Generate the ZIP file
    const content = await zip.generateAsync({ type: "nodebuffer" });
    res.setHeader("Content-Disposition", "attachment; filename=build.zip");
    res.setHeader("Content-Type", "application/zip");
    res.send(content);
  } catch (error) {
    console.error("Error generating ZIP:", error);
    res.status(500).send({ error: "Failed to generate ZIP" });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit with a non-zero code if there's an error
  }
  console.log(`Server is running at http://localhost:${PORT}`);
});
