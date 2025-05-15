import http from 'node:http';
import { handler } from './handler';

const port = 4000;

const server = http.createServer((req, res) => {
  handler(req, res);
});

server.on('error', (err) => {
  console.log(`Server error ${err}`);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
