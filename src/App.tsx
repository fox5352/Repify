import { Route, Routes } from 'react-router'

import Rootlayout from './routes/Rootlayout'
import Home from './routes/home'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Rootlayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<h2>Not Found</h2>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
