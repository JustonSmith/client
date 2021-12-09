
import React, { useState , useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner';
import { getAllCars } from '../redux/actions/carsActions'
import { bookCar } from '../redux/actions/bookingActions'
import moment from 'moment'
import { Row , Col , Divider, DatePicker, Checkbox, Modal } from 'antd';
import StripeCheckout from 'react-stripe-checkout';
import 'aos/dist/aos.css';
import AOS from 'aos'

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
    const [showModal , setShowModal] = useState(false)


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

    function onToken(token) {
        const reqObj = {
            token,
            user : JSON.parse(localStorage.getItem('user'))._id ,
            car : car._id ,
            totalHours ,
            totalAmount ,
            driverRequired : driver ,
            bookedTimeSlots : {
                from,
                to
            }
        }

        dispatch(bookCar(reqObj))
        console.log(token)
    }

    return (
        <DefaultLayout>
            {/* { loading && (<Spinner />)} */}
            <Row justify='center' className= 'd-flex align-items-center' style= {{minHeight: '90vh'}} >
                <Col lg={10} sm={24} xs= {24} className='p-3'>
                    <img
                    data-aos='flip-left'
                    data-aos-duration='1500'
                    src= {car.image} 
                    alt="car" 
                    className= 'carimg2 bs1 w-100 p-2'/>
                </Col>
                <Col lg={10} sm={24} xs= {24}>
                    <Divider type='horizontal' dashed> Car Specs </Divider>
                    <div className= 'text-right' >
                        <p> {car.name} </p>
                        <p> Per Hour : ${car.rentPerHour} </p>
                        <p> Fuel : {car.fuelType} </p>
                        <p> Max Capacity : {car.capacity} </p>
                    </div>

                    <Divider type='horizontal' dashed> Rental Date </Divider>
                    <RangePicker showTime= {'HH:mm'} format= 'MMM DD yyyy HH:mm' onChange= {selectTimeSlots} />
                    <br />
                        <button className="btn1 mt-2" onClick= {() => {setShowModal(true)}}>See Booked Rentals</button>
                        <button className= 'btn1 m-2 text-right'><a href="/">BACK</a></button>
                    <hr />

                    {from && to && (
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
                        <h3> Total: ${totalAmount} </h3>

                        <StripeCheckout
                            shippingAddress
                            token={onToken}
                            currency='USD'
                            amount = {totalAmount * 100}
                            stripeKey="pk_test_51K38vRJxYcR9HsnhRkpHYcDXwNWiNNtYNTgaPKjYflK5hxYtBVOEGj0k22LbkUmANKan7FxpNxjVQtdKsdgUnFgD00SRlrpm0k">

                            <button className='btn1'>
                                Book Now
                                </button>
                        </StripeCheckout>
                    </div>

                    )}
                </Col>
                {car.name && ( <Modal
                    visible= {showModal} 
                    closable={false} 
                    footer={false} 
                    title='Booked time slots'
                    >

                    
                        <div className="p-2">
                        {car.bookedTimeSlots.map(slot => {
                            return (<button className="btn1 mt-2"> {slot.from} - {slot.to} </button>
                        );
                    })}

                    <div className= 'text-right mt-2'>
                        <button className= 'btn1' onClick={() => {setShowModal(false)}}>CLOSE</button>
                    </div>
                </div>
        </Modal>)}
    </Row>
        


    </DefaultLayout>
    )
}

export default BookCar
