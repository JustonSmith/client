import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookCar from './pages/BookCar'
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">

      

      <Router>
          <Routes>
          <Route exact path='/' element= { < Home />} />
          <Route exact path='/login' element= { <Login />} />
          <Route exact path='/register' element= { <Register />} />
          <Route exact path='/bookcar' element= { <BookCar />} />
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
