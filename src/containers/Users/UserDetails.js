import React from "react";
import { Form, Input, Button, Row } from 'antd';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const UserDetail = () => {
    let params = useParams();
    const users = useSelector(({ allUsers }) => allUsers.users);
    let userId = params.userId;
    const userToUpdate = users?.find(user => user.id == userId);
    const userToUpdateIndexOf = users?.findIndex(user => user.id == userId);


    const onFinish = (user) => {
        users[userToUpdateIndexOf].name = user.name;
        users[userToUpdateIndexOf].email = user.email;
        console.log('users list after update Action', users);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form id="update-user-form"
            name="Update user"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                email: userToUpdate.email,
                name: userToUpdate.name
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input type='email' />
            </Form.Item>

            <Row>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button>
                        Cancel
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
}

export default UserDetail;