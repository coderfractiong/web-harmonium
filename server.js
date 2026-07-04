const https = require("https");
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const MAIN = "index.html";

// Only these files are ever served. Everything else (incl. key.pem/cert.pem,
// and any path-traversal target) is refused. The app needs exactly these three.
const ALLOWED = new Set(["index.html", "harmonium-kannan-orig.wav", "reverb.wav"]);

const MIME = {
  '.html': 'text/html',
  '.wav': 'audio/wav',
  '.js': 'application/javascript',
  '.css': 'text/css',
};

const server = https.createServer({
  key: fs.readFileSync(path.join(DIR, 'key.pem')),
  cert: fs.readFileSync(path.join(DIR, 'cert.pem')),
}, (req, res) => {
  // Parse only the pathname (drops query/fragment), then decode.
  let rel;
  try {
    rel = decodeURIComponent(new URL(req.url, 'https://localhost').pathname).replace(/^\/+/, '');
  } catch {
    res.writeHead(400); res.end('Bad request'); return;
  }
  if (rel === '') rel = MAIN;

  // Allowlist check: refuse anything that is not one of the known assets.
  if (!ALLOWED.has(rel)) { res.writeHead(404); res.end('Not found'); return; }

  // Defense in depth: resolve and confirm the file stays inside DIR.
  const filePath = path.resolve(DIR, rel);
  if (filePath !== path.join(DIR, rel) || !filePath.startsWith(DIR + path.sep)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  const contentType = MIME[path.extname(filePath)] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// Bind to loopback only — this is a local dev server, not a network service.
server.listen(2001, "127.0.0.1", () => {
  console.log("Open: https://localhost:2001");
});
