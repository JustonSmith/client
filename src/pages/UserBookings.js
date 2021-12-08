import React, { useState , useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../redux/actions/bookingActions'
import { Col , Row } from 'antd'
import Spinner from '../components/Spinner'
import moment from 'moment'
function UserBookings() {

    const dispatch = useDispatch()
    const { bookings } = useSelector(state => state.bookingsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect (() => {
        dispatch(getAllBookings())
    }, [dispatch])


    return (
        <DefaultLayout>
            <h3 className='text-center mt-2'>Cars Booked :  </h3>
            <hr />
            <Row justify= 'center' gutter={16}>
                    <Col lg={16} sm={24}>
                        {bookings.filter(o => o.user===user._id).map(booking => {
                            return <Row justify='center' gutter={16} className="bs1 m-2 mt-2 text-left">

                                <Col lg={6} sm={24}>
                                <p><b>{booking.car.name}</b></p>
                                <p> Total Hours : <b>{booking.totalHours}</b></p>
                                <p> Per Hour : <b>{booking.car.rentPerHour}</b></p>
                                <p> Total Amount : <b>{booking.totalAmount}</b></p>
                                </Col>

                                <Col lg={12} sm={24}>
                                <p> Transaction ID : <b>{booking.transactionId}</b></p>
                                <p> From : <b>{booking.bookedTimeSlots.from}</b></p>
                                <p> To :<b>{booking.bookedTimeSlots.to}</b></p>
                                <p> Booking Date : <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                                </Col>

                                <Col lg={6} sm={24} className='text-right'>
                                <img style={{borderRadius: 5}} src= {booking.car.image} alt="booked car" height="140" className="p-2" ></img>
                                </Col>
                            </Row>
                            })}
                    </Col>
            </Row>
        </DefaultLayout>
    )
}

export default UserBookings
