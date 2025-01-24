
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import AddEmployeeComponent from './components/AddEmployeeComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className='main-container'>
        <BrowserRouter>
          <HeaderComponent/>
            <Routes>
              <Route path='/' element = { <ListEmployeeComponent/> }></Route>
              <Route path='/employee' element = { <ListEmployeeComponent/> }></Route>
              <Route path='/create' element = { <AddEmployeeComponent/> }></Route>
              <Route path='/update/:id' element = { <AddEmployeeComponent/> }></Route>
            </Routes>
            <FooterComponent/>
        </BrowserRouter>     
    </div>
  )
}

export default App
