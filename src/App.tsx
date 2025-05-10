import { Route, Routes } from 'react-router'
import './App.css'
import Rootlayout from './routes/Rootlayout'
import Home from './routes/home'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Rootlayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
