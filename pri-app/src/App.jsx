
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './Home'; // Import your Home component for routing
import Create from './Create'; // Import your Create component
import Update from './Update'; // Import your Update component
import Read from './Read'; // Import your Read component
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path="/create" element={< Create />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
          <Route path="/read/:id" element={<Read />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
