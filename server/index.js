
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
  

    ws.on('message', async message => {
       const obj = JSON.parse(message)

       if (obj.type === 'register:canvas') {
  const { data, error } = await supabase
    .from('strokes')
    .select('path_data')
    .eq('canvas_id', obj.canvasID)
  
  data.forEach(item => ws.send(JSON.stringify(item)))
} else {


       if (obj.type == 'clear:canvas') {
        const { errorr } = await supabase
        .from('strokes')
        .delete()
        .eq('canvas_id', obj.canvasID)
        console.log('55555')
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Convert buffer to string if needed
            }
          
        });
       } else {


        // Broadcast the message to all connected clients
       wss.clients.forEach(client => {
  if (client !== ws && client.readyState === WebSocket.OPEN) {
    client.send(message.toString())
  }
});
      

       
        const {data, error} = await supabase
        .from('strokes')
        .insert ({canvas_id: obj.canvasID, path_data: obj.path})
       
       // console.log(obj.canvasID)
        
        console.log(data, error)

        
        console.log(obj.type);
      }
      }
      });

    
    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', error => {
        console.error('WebSocket error:', error);
    });

    
});

console.log('WebSocket server is running on ws://localhost:8080');










// Example route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});
