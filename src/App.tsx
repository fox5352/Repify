import { Route, Routes } from 'react-router'

import Rootlayout from './routes/Rootlayout'
import Home from './routes/Home'
import ProtectedRoutes from './routes/ProtectedRoute'
import Profile from './routes/Profile/Page'
import Create from './routes/Create/Page'
import Privacy from './routes/Privacy/Page'
import WorkoutsPage from './routes/Workouts/Page'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Rootlayout />}>
          <Route index element={<Home />} />

          <Route path="auth" element={<ProtectedRoutes />}>
            <Route path='user' element={<Profile />} />

            <Route path='dashboard' element={<h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id autem cum inventore aut nisi nesciunt laudantium odit atque iure. Facilis quis vitae natus aliquam, voluptatem pariatur laborum. Quidem, amet! Iusto?</h2>} />

            <Route path='create' element={<Create />} />
          </Route>

          <Route path="/workouts/:id" element={<WorkoutsPage />} />

          <Route path='/privacy' element={<Privacy />} />
          <Route path="*" element={<h2>Not Found</h2>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
