
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const http = require('http');


const app = express();
app.use(cors())
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', async ws => {
    console.log('Client connected');
  

    ws.on('message', async message => {
       const obj = JSON.parse(message)

       if (obj.type === 'register:canvas') {
       ws.canvasId = obj.canvasID
       const { data: upsertData, error: upsertError } = await supabase.from('canvases').upsert({ id: obj.canvasID, created_at: new Date() })
      console.log('upsert result:', upsertData, upsertError)



  const { data, error } = await supabase
    .from('strokes')
    .select('path_data')
    .eq('canvas_id', obj.canvasID)
  
  ;(data || []).forEach(item => ws.send(JSON.stringify(item)))
} else {


       if (obj.type == 'clear:canvas') {
        const { errorr } = await supabase
        .from('strokes')
        .delete()
        .eq('canvas_id', obj.canvasID)
        console.log('55555')
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN && client.canvasId === obj.canvasID) {
                client.send(message.toString());
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


//called when fetching i react, it calls our expresss server and then the 
//backend uerys the database and sends the JSON string to frontend
app.get('/canvases', async (req, res) => {
  const { data } = await supabase.from('canvases').select('*').order('created_at', { ascending: false })
  res.json(data)
})



server.listen(3000, () => {
  console.log('listening on *:3000');
});
