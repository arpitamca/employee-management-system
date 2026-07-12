
import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HelloWorld from './helloWorld'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
          <Routes> {/*HeaderComponent is placed above Routes so that the header is displayed on every page. The components inside Routes change based on the URL, while the header and footer remain constant, creating a consistent layout throughout the application. */}
            {/* http://localhost:3002 */}
            <Route path='/' element = { <ListEmployeeComponent />}></Route>
            {/*http://localhost:3002/employees*/}
            <Route path='/employees' element = { <ListEmployeeComponent />}></Route>
            {/*http://localhost:3002/add-employee*/}
            <Route path='/add-employee'element = {<EmployeeComponent/>}></Route>
            {/*http://localhost:3002/edit-employee/1*/}
            <Route path='/edit-employee/:id' element = { <EmployeeComponent />}></Route>
          </Routes>
        <FooterComponent/>
      </BrowserRouter>  
    </>
  )
}

export default App
