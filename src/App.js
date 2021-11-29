import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom'

import  Home  from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookCar from './pages/BookCar'

import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">

      

      <Router>
          <Routes>
          <Route path='/' element= { < Home />} />
          <Route path='/login' element= { <Login />} />
          <Route path='/register' element= { <Register />} />
          <Route path='bookcar/:carid' element= { <BookCar />} />
          <Route path='bookcar/:name' element= { <BookCar />} />
        </Routes>
      </Router>


    </div>
  );
}



export default App;


export function PrivateRoute(props)
{

  if (localStorage.getItem('user'))
  {
    return <Route {...props} />
  }
  else{
    return <Navigate to= 'login' />
  }
}
