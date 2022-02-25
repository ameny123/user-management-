import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ListUsers } from "../../redux/actions/userActions";
import { Row, Col, Table, Modal, Button } from 'antd';
import UserAddForm from "./UserAdd";
import Swal from 'sweetalert2'

const UsersList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const users = useSelector(({ allUsers }) => allUsers.users);


    // fetch user list from API
    const fetchUsers = async () => {
        const response = await axios
            .get("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data")
            .catch((error) => {
                console.log(error);
            });
        console.log('res', response);
        dispatch(ListUsers(response.data))
    }

    useEffect(() => {
        fetchUsers();
    }, [])


    // Handle add user modal
    const [isModalAddUserVisible, setIsModalAddUserVisible] = useState(false);

    const showAddUserModal = () => {
        setIsModalAddUserVisible(true);
    };

    const handleAddUserOk = () => {
        setIsModalAddUserVisible(false);
    };

    const handleAddUserCancel = () => {
        setIsModalAddUserVisible(false);
    };


    // users list table columns 
    const userColumns = [
        { dataIndex: 'id', title: 'ID' },
        { dataIndex: 'name', title: 'Name' },
        {
            dataIndex: 'username', title: 'Username', defaultSortOrder: 'descend',
            sorter: (a, b) => a.username - b.username,
        },
        { dataIndex: 'email', title: 'Email' },
        { dataIndex: 'address', title: 'City' },
        {
            title: 'Edit',
            key: 'edit',
            render: (text, record) => (
                <Button type="primary" warning onClick={() => history.push(`/user/${record.id}`)} >
                    Edit
                </Button>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <Button type="primary" danger onClick={() => Swal.fire({
                    title: 'Do you want to delete this user?',
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                }).then((result) => {
                    if (result.isConfirmed) {
                        users.pop(record);
                        console.log('users list after delete Action', users)
                    }
                })}>
                    Delete
                </Button>
            ),
        }
    ];


    return (
        <>
            <Row>
                <Col span={12}>
                    <h1>User List</h1>
                </Col>
                <Col span={12}>
                    <Button type="primary" onClick={showAddUserModal}>
                        Add new user
                    </Button>
                </Col>
            </Row>
            <Row>

                <Col span={18}>
                    <Table dataSource={users} columns={userColumns} />;
                </Col>

                <Modal
                    title="Add new user"
                    visible={isModalAddUserVisible}
                    onOk={handleAddUserOk}
                    onCancel={handleAddUserCancel}
                    footer={[
                        <div>
                            <Button type="primary" form="add-user-form" key="submit" htmlType="submit">
                                Add
                            </Button>

                            <Button onClick={handleAddUserCancel}>
                                Cancel
                            </Button>
                        </div>
                    ]}
                >
                    <UserAddForm />
                </Modal>
            </Row>
        </>

    )
}

export default UsersList;