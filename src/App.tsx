import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import New from './pages/New'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/new' element={<New />} />
      </Routes>
    </BrowserRouter>
  ) 
}
