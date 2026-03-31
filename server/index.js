const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const http = require('http');


const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Convert buffer to string if needed
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', error => {
        console.error('WebSocket error:', error);
    });

    ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server is running on ws://localhost:8080');










// Example route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});
