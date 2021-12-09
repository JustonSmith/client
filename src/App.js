import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom'

import  Home  from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookCar from './pages/BookCar'

import 'antd/dist/antd.css';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import AdminHome from './pages/AdminHome';

function App() {
  return (
    <div className="App">

      

      <Router>
          <Routes>
          <Route path='/' element= { <Home />} />
          <Route path='/login' element= { <Login />} />
          <Route path='/register' element= { <Register />} />
          <Route path= '/addcar' element= { <AddCar />} />
          <Route path='bookcar/:carid' element= { <BookCar />} />
          <Route path= '/userbookings' element= { <UserBookings />} />
          <Route path= '/admin' element= { <AdminHome  />} />
          <Route path= '/editcar/:carid' element= { <EditCar />} />
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
