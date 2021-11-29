
import React, { useState , useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import DefaultLayout from '../components/DefaultLayout'
// import Spinner from '../components/Spinner';
import { getAllCars } from '../redux/actions/carsActions'
import { bookCar } from '../redux/actions/bookingActions'
import moment from 'moment'
import { Row , Col , Divider, DatePicker, Checkbox } from 'antd';

const { RangePicker } = DatePicker

function BookCar() {
    let { carid } = useParams()
    const { cars } = useSelector(state=>state.carsReducer)
    // const {loading} = useSelector(state => state.alertReducer)
    const [car , setcar] = useState({})
    const dispatch = useDispatch()
    const [from , setFrom] = useState()
    const [to , setTo] = useState()
    const [totalHours , setTotalHours] = useState(0)
    const [driver , setDriver] = useState(false)
    const [totalAmount , setTotalAmount] = useState(0)


    useEffect(() => {
        if(cars.length === 0)
        {
            dispatch(getAllCars())
        }
        else
        {
            setcar(cars.find(o => o._id === carid ))
        }
    },[cars, carid, dispatch])


    useEffect(() => {

        setTotalAmount(( totalHours * car.rentPerHour ))
        if(driver)
        {
            setTotalAmount(totalAmount + (30 * totalHours))
        }

    },[driver, totalHours])

    function selectTimeSlots(values) {
        console.log(moment(values[0]).format('MMM DD yyyy HH:mm'))
        console.log(moment(values[1]).format ('MMM DD yyyy HH:mm'))
        setFrom((moment(values[0]).format('MMM DD yyyy HH:mm')))
        setTo((moment(values[1]).format ('MMM DD yyyy HH:mm')))

        setTotalHours(values[1].diff(values[0] , 'hours'))
        // setTotalPrice(values[1].diff(values[0]) * car.rentPerHour)

    }

    function bookNow() {

        const reqObj = {
            user : JSON.parse(localStorage.getItem('user'))._id ,
            car : car._id ,
            totalHours ,
            totalAmount ,
            driverRequire : driver ,
            bookedTimeSlots : {
                from,
                to
            }
        }

        dispatch(bookCar(reqObj))
    }

    return (
        <DefaultLayout>
            {/* {loading && (<Spinner />)} */}
            <Row justify='center' className= 'd-flex align-items-center' style= {{minHeight: '90vh'}} >
                <Col lg={10} sm={24} xs= {24}>
                    <img src= {car.image} alt="car" className= 'carimg2'/>
                </Col>
                <Col lg={10} sm={24} xs= {24}>
                    <Divider type='horizontal' dashed> Car Specs </Divider>
                    <div className= 'text-right' >
                        <p> {car.name} </p>
                        <p> Per Hour : ${car.rentPerHour} </p>
                        <p> Fuel : {car.fuelType} </p>
                        <p> Max Capacity : {car.capacity} </p>
                    <Divider type='horizontal' dashed> Rental Date </Divider>
                    <RangePicker showTime= {'HH:mm'} format= 'MMM DD yyyy HH:mm' onChange= {selectTimeSlots} />
                    </div>
                    <hr />
                    <div className="text-right">
                        <p> Total Hours : <b> {totalHours} </b></p>
                        <p> Per Hour : <b> {car.rentPerHour} </b></p>
                        <Checkbox onChange={(e) => {
                            if (e.target.checked) 
                            {
                                setDriver(true)
                            }
                            else {
                                setDriver(false)
                            }
                        }} > Driver required </Checkbox>
                        <hr />
                        <h3> Total: {totalAmount} </h3>

                        <button className='btn1' onCLick= {bookNow}>Book Rental</button>

                    </div>
                </Col>
            </Row>
        </DefaultLayout>
    )
}

export default BookCar
