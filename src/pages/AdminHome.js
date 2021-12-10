import React , {useState , useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { deleteCar , getAllCars } from '../redux/actions/carsActions'
import { Row, Col, Divider, DatePicker, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteFilled , EditOutlined } from '@ant-design/icons';
import  { Popconfirm , message} from 'antd'

// import Spinner from '../components/Spinner';

function AdminHome() {

    const {cars,} = useSelector(state=>state.carsReducer)
    const dispatch = useDispatch()
    const [totalCars , setTotalCars ] = useState([])

    useEffect(() => {
        dispatch(getAllCars())
    },[dispatch])

    useEffect(() => {

        setTotalCars(cars)
        
    }, [cars])




    return (
            <DefaultLayout>

                <Row justify="center" gutter={16} className='mt-2'>

                    <Col lg={20} sm={24}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mt-1 mr-2">- Admin - </h3>
                            <button className="btn1"><a href="/addcar">Add Car</a></button>
                            <button className="btn1"><a href="/">BACK</a></button>
                        </div>
                    </Col>

                </Row>

            {/* {loading == true && (<Spinner />)} */}

                <Row justify= 'center' gutter= {16}>
                    {totalCars.map(car => {
                        return <Col lg={5} sm={24} xs={24}>
                                <div className="car p-2 bs1">
                                    <img src={car.image} alt="car" className="carimg" />
                                    <div className="car-content d-flex align-items-center justify-content-between">
                                        <div className="text-left pl-2">
                                            <p>{car.name}</p>
                                            <p>Per Hour : $<b>{car.rentPerHour}.00</b></p>
                                        </div>
                                        <div className="mr-4">
                                            <Link to={`/editcar/${car._id}`}>
                                                <EditOutlined 
                                                className="mr-3" 
                                                style={{color: 'black', cursor: 'pointer'}}
                                                />
                                            </Link>

                                            <Popconfirm
                                                title="Are you sure to delete this car?"
                                                onConfirm={()=> {dispatch(deleteCar({carid : car._id}))}}
                                                okText="Yes"
                                                cancelText="No"
                                                >
                                                <DeleteFilled style={{color: 'red', cursor: 'pointer'}} />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                    })}
                </Row>


            </DefaultLayout>
    )
}

export default AdminHome