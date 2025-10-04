import './App.css'
import { Routes, Route } from 'react-router-dom'
import Feed from './Pages/Feed'

function App() {
    return(
        <>
        <Routes>
            <Route path='/' element={<Feed/>}/>
        </Routes>
        </>
    )
}

export default App