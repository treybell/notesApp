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
    <div className="drawing-wrapper">
      <div className="toolbar">
        <div className="toolbar-group">
          <button
            className={`toolbar-btn${activeMode === 'draw' ? ' active' : ''}`}
            onClick={() => setActiveMode('draw')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            </svg>
            Draw
          </button>
          <button
            className={`toolbar-btn${activeMode === 'erase' ? ' active' : ''}`}
            onClick={() => setActiveMode('erase')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>
            </svg>
            Erase
          </button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <label className="toolbar-label">
            Color
            <input type="color" onChange={handleColor} className="color-picker" />
          </label>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <label className="toolbar-label">
            Size
            <input type="range" min="1" max="50" onChange={handleSize} className="size-slider" />
          </label>
        </div>
      </div>

      <canvas ref={canvasRef} />
    </div>
  )
}