import DrawingPad from './DrawingPad'
import HomePage from './HomePage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
 

export default function App() {
  
  return (
    <BrowserRouter>
    <nav>
    <Link to="/canvas">Canvas</Link>
    </nav>
   
   
    <Routes>
      <Route path="/" element={<HomePage> </HomePage>}/>
      <Route path="/canvas" element={<DrawingPad> </DrawingPad>}/>

    </Routes>
    </BrowserRouter>
  )
  
}