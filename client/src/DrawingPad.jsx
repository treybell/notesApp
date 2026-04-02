import { useEffect, useRef, useState } from 'react'
import * as fabric from 'fabric'

export default function DrawingPad() {
  const canvasRef = useRef(null)
  const fabricRef = useRef(null)
  const wsRef = useRef(null)
  const [brushColor, setBrushColor] = useState('black');
  const [activeMode, setActiveMode] = useState('draw');
  const [brushSize, setBrushSize] = useState(10); 
  
  
  function handleSize(e) {
    setBrushSize(Number(e.target.value));
  }
   function handleColor(e) {
    setBrushColor(e.target.value);
  }

  useEffect(() => {
    // Initialize Fabric canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1124,
      height: 1000,
      backgroundColor: 'white'
    })

    canvas.renderAll()

    fabricRef.current = canvas

    // TODO 1: Set isDrawingMode to true on the canvas
    canvas.isDrawingMode = true
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
    canvas.freeDrawingBrush.color = brushColor
    canvas.freeDrawingBrush.width = brushSize
    wsRef.current = new WebSocket('ws://localhost:3000')

    canvas.on('path:created', (e) => { wsRef.current.send(JSON.stringify(e))})
    wsRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.path_data) {
        canvas.add(new fabric.Path(data.path_data.path, data.path_data));
      } else {
      //const data = JSON.parse(e.data);
      const pathData = data.path;
      console.log(pathData);
    //  console.log('adding path');
      canvas.add(new fabric.Path(pathData.path, pathData));
      
      console.log(e.data.path);
      }
    };
  
    return () => canvas.dispose()

    
  }, [])

  useEffect(() => {
    if (!fabricRef.current) return

     if (activeMode === 'draw') {
      fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current)
      fabricRef.current.freeDrawingBrush.color = brushColor
    fabricRef.current.freeDrawingBrush.width = brushSize
    } else if (activeMode === 'erase') {
       fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current);
       fabricRef.current.freeDrawingBrush.color = 'white';
       fabricRef.current.freeDrawingBrush.width = 25;
    }

    

   

  }, [brushColor, brushSize, activeMode])

  return (
    <div>
      <canvas ref={canvasRef} />
      <input type="color" onChange={handleColor} />
      <input type="range" min="1" max="50" onChange={handleSize} />
      <input type="radio" 
      onChange={() => setActiveMode('draw')} 
      checked = {activeMode === 'draw'}/>

      <input type="radio" 
      onChange={() => setActiveMode('erase')} 
      checked = {activeMode === 'erase'}/>



    </div>
  )
}