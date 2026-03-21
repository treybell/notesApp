import { useEffect, useRef, useState } from 'react'
import * as fabric from 'fabric'

export default function DrawingPad() {
  const canvasRef = useRef(null)
  const fabricRef = useRef(null)
  const [brushColor, setBrushColor] = useState('black');
  function handleColor(e) {
    setBrushColor(e.target.value);
  }
  const [activeMode, setActiveMode] = useState('draw');
  const [brushSize, setBrushSize] = useState(10); 

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
    return () => canvas.dispose()
  }, [])

  useEffect(() => {
    if (!fabricRef.current) return
    fabricRef.current.freeDrawingBrush.color = brushColor
    fabricRef.current.freeDrawingBrush.width = brushSize
  }, [brushColor, brushSize])

  return (
    <div>
      <canvas ref={canvasRef} />
      <input type="color" onChange={handleColor} />
    </div>
  )
}