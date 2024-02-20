const http = require('http');
const path = require('path');
const fs = require('fs');

const games = [
  {
    id: 1,
    name: 'Game 1', 
    description: 'Description for Game 1',
    imageUrl: '/static/game1.webp',
    author: 'Author 1'
  },
  {
    id: 2,
    name: 'Game 2', 
    description: 'Description for Game 2',
    imageUrl: '/static/game2.webp',
    author: 'Author 2'
  },
];


const scoreResponse = []

for (let i = 0; i < 10; i++) {
  const scoreItem = {
    id: i + 1,
    topScore: Math.floor(Math.random() * 1000),
    playerName: `Player ${i + 1}`,
    profileUrl: `https://randomuser.me/api/portraits/men/${i+10}.jpg`,
    date: new Date().toISOString(),
  };
  scoreResponse.push(scoreItem);
}

const gamesResponseAction = (res) => {
  res.setHeader('Content-Type', 'application/json');
  setTimeout(() => {
    res.end(JSON.stringify(games));
  }, 3000);
}

const scoreResponseAction = (res) => {
  res.setHeader('Content-Type', 'application/json');
  setTimeout(() => {
    res.end(JSON.stringify(scoreResponse));
  }, 3000);
}

const server = http.createServer((req, res) => {
  if(req.url.startsWith('/static/')) {
    console.log('response static file', req.url)
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
    if (req.url.startsWith('/games')) {
      console.log('response games', req.url)
      gamesResponseAction(res);
    } else if (req.url.startsWith('/scores')) {
      console.log('response scores', req.url)
      scoreResponseAction(res);
    } else {
      console.log('response not found', req.url)
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'Not Found' }));
    }
  }
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});
