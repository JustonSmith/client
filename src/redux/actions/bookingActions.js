import axios from 'axios';
import { message } from 'antd';


export const bookCar=(reqObj) => async dispatch => {
    
    dispatch({type: 'LOADING' , payload : true})
    message.success("Your rental has sucessfully been booked.")
    try {
        await axios.post('/api/bookings/bookcar')
        dispatch({type : 'LOADING' , payload : false})
    } catch (error) {
        console.log(error)
        dispatch({type : 'LOADING' , payload : false})
        message.error("Something went wrong. Please try again later.")

    }
}