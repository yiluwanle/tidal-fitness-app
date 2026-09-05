const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const port = 8765;
const types = { '.html': 'text/html; charset=utf-8', '.json': 'application/json; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };
const server = http.createServer((req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  let filePath = path.join(root, url);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404); res.end('Not found'); return;
  }
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});
server.listen(port, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:' + port);
});