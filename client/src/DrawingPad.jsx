import { useEffect, useRef } from 'react'
import * as fabric from 'fabric'

export default function DrawingPad() {
  const canvasRef = useRef(null)
  const fabricRef = useRef(null)

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
    canvas.freeDrawingBrush.color = 'black'
    canvas.freeDrawingBrush.width = 10
    return () => canvas.dispose()
  }, [])

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  )
}