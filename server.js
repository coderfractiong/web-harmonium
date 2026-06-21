const https = require("https");
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const MAIN = "index.html";

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
  const filePath = path.join(DIR, req.url === '/' ? MAIN : decodeURIComponent(req.url));
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(2001, "0.0.0.0", () => {
  console.log("Open: https://localhost:2001");
});
