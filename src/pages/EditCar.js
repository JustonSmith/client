import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useParams } from 'react-router-dom'
import DefaultLayout from '../components/DefaultLayout'
import { editCar, getAllCars } from '../redux/actions/carsActions'
import { Col , Row , Form , Input } from 'antd'
import Spinner from '../components/Spinner'

function EditCar() {

    let { carid } = useParams()
    const { cars } = useSelector(state => state.carsReducer)
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)
    const [car, setcar] = useState()
    const [totalcars , settotalcars] = useState([])


    useEffect(() => {
        
        if(cars.length === 0) {
            dispatch(getAllCars())
        }
        else {
            settotalcars(cars)
        setcar(cars.find(o => o._id === carid))
        console.log(car)
            
        }
    },[cars])

    function onFinish(values) {

        values._id = car._id

        dispatch(editCar(values))
        console.log(values)
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <h1> Edit Car : </h1>
            <hr />
            <Row justify="center mt-5">
                <Col lg={12} sm={24}>
                    {totalcars.length>0 && (

                    <Form initialValues={car} className="bs1 p-2" layout='vertical' onFinish={onFinish}>

                        <Form.Item name= 'name' label= 'Car Name' rules={[{required: true}]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name= 'image' label= 'Image URL' rules={[{required: true}]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name= 'rentPerHour' label= 'Hourly Rate' rules={[{required: true}]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name= 'capacity' label= 'Capacity' rules={[{required: true}]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name= 'fuelType' label= 'Fuel Type' rules={[{required: true}]}>
                            <Input />
                        </Form.Item>

                        <div className="text-right">
                            <button className= 'btn1'>EDIT</button>
                        </div>

                    </Form>)}
                </Col>
            </Row>
        </DefaultLayout>
    )
}

export default EditCar
