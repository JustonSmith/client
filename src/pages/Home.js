import React , {useState , useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Row, Col, Divider, DatePicker, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment'

// import Spinner from '../components/Spinner';

const { RangePicker } = DatePicker

function Home() {
    const {cars,} = useSelector(state=>state.carsReducer)
    const dispatch = useDispatch()
    const [totalCars , setTotalCars ] = useState([])

    useEffect(() => {
        dispatch(getAllCars())
    },[])

    useEffect(() => {

        setTotalCars(cars)
        
    }, [cars])

    function setFilter(values){

        var selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm')
        var selectedTo = moment(values[1], 'MMM DD yyyy HH:mm')

        var temp = []

        for(var car of cars){

            if(car.bookedTimeSlots.length === 0){

                temp.push(car)
            }
            else {

                for(var booking of car.bookedTimeSlots) {

                    if(selectedFrom.isBetween(booking.from , booking.to) ||
                    selectedTo.isBetween(booking.from , booking.to) ||
                    moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                    moment(booking.to).isBetween(selectedFrom , selectedTo)
                    )
                    {
                    }
                    else {
                        temp.push(car)
                    }
                }
            }
        }

        setTotalCars(temp)
    }


    return (
            <DefaultLayout>

                <Row className='mt-3' justify='center'> 
            
                    <Col lg={20} sm={24} className='d-flex justify-content-left'>

                        <RangePicker showTime = {{format : 'HH:mm'}} format = 'MMM DD yyyy HH:mm' onChange={setFilter} />

                    </Col>

                </Row>

            {/* {loading == true && (<Spinner />)} */}

                <Row justify= 'center' gutter= {16}>
                    {totalCars.map(car => {
                        return <Col lg={5} sm={24} xs={24}>
                                <div className="car p-2 bs1">
                                    <img src={car.image} alt="car" className="carimg" />
                                    <div className="car-content d-flex align-items-center justify-content-between">
                                        <div>
                                            <p>{car.name}</p>
                                            <p>{car.rentPerHour} Per Day /-</p>
                                        </div>
                                        <div>
                                            <button className="btn1 mr-2"><Link to={`/bookcar/${car._id}`}>Book Now</Link></button>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                    })}
                </Row>
            </DefaultLayout>
    )
}

export default Home
