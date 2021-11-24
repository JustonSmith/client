import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {Row, Col, Form, Input} from 'antd'

function Login() {
    return (
        <div className= 'login'>
                
            <Row gutter={16}>

                <Col lg={16}></Col>
                <Col lg={8} className="text-left">
                    <Form layout='vertical'>
                        <h1>Login</h1>
                        <hr />

                        <Form.Item name= 'username' label= 'username' rules={[{required:true}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name= 'password' label= 'password' rules={[{required:true}]}>
                            <Input />
                        </Form.Item>

                        <button className= "btn1">Login</button>

                    </Form>
                </Col>

            </Row>
        </div>
    )
}

export default Login
