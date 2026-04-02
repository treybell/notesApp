
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const http = require('http');


const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', async ws => {
    console.log('Client connected');

    const {data, error} = await supabase
    .from('strokes')
    .select('path_data')
    data.forEach(item => ws.send(JSON.stringify(item)));
    console.log(data, error)
  

    ws.on('message', async message => {
        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Convert buffer to string if needed
            }
            
        });

        const obj = JSON.parse(message)
        const {data, error} = await supabase
        .from('strokes')
        .insert ({canvas_id: 1, path_data: obj.path})
        console.log(data, error)
        
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
