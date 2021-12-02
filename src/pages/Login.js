import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css';

AOS.init();

function Login() {
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.alertsReducer)
    function onFinish(values) {
        dispatch(userLogin(values))
        console.log(values)
    }

    return ( 
        <div className= 'login'>
                {loading && (<Spinner />)}
            <Row gutter={16} className= 'd-flex align-items-center'>

                <Col lg={16}>
                    <img 
                    data-aos='slide-right'
                    data-aos-duration='1500'
                    className="login-img" src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" alt="login"/> 
                    <div 
                    data-aos="zoom-in"
                    data-aos-duration= "1500"
                    className="login-logo">
                        <h1>uDrive</h1>
                    </div>
                </Col>
                <Col lg={8} className="text-left p-5">
                    <Form 
                    data-aos='slide-up'
                    data-aos-duration='1500'
                    layout='vertical' 
                    className='login-form p-5' 
                    onFinish= {onFinish}>
                        <h1>Login</h1>
                        <hr />

                        <Form.Item 
                        name= 'username' 
                        label= 'username' 
                        rules={[{required:true}]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                        type="password"
                        name= 'password' 
                        label= 'password' 
                        rules={[{required:true}]}
                        >
                            <Input />
                        </Form.Item>

                        <button className= "btn1 mt-2">Login</button>
                        <hr />
                        <Link to= '/register'> Don't have an account?</Link>

                    </Form>
                </Col>

            </Row>
        </div>
    )
}

export default Login
