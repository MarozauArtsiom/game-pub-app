const http = require('http');
const path = require('path');
const fs = require('fs');

const games = [
  {
    name: 'Game 1', 
    description: 'Description for Game 1',
    imageUrl: '/static/game1.webp',
    author: 'Author 1'
  },
  {
    name: 'Game 2', 
    description: 'Description for Game 2',
    imageUrl: '/static/game2.webp',
    author: 'Author 2'
  },
];

const server = http.createServer((req, res) => {
  if(req.url.startsWith('/static/')) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(games));
  }
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});
