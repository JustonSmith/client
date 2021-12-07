import React, { useState , useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../redux/actions/bookingActions'
import { Col , Row } from 'antd'
function UserBookings() {

    const dispatch = useDispatch()
    const { bookings } = useSelector(state => state.bookingsReducer)

    useEffect (() => {
        dispatch(getAllBookings)
    }, [])


    return (
        <DefaultLayout>
            <h3 className='text-center mt-2'>My Bookings</h3>
            <Row justify= 'center'>
                    <Col lg={20} sm={24}>
                        {bookings.map(booking => {
                            return <Row className="bs1 m-2">
                                <Col lg={7} sm={24}>
                                <p><b>{booking.car.name}</b></p>
                                </Col>
                                <Col lg={10} sm={24}></Col>
                                <Col lg={7} sm={24}></Col>
                            </Row>
                            })}
                    </Col>
            </Row>
        </DefaultLayout>
    )
}

export default UserBookings
