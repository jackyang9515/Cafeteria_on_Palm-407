import React, {useEffect, useState} from 'react';
import {Table} from '@douyinfe/semi-ui';
import {IconMore} from '@douyinfe/semi-icons';
import {Link} from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

const OrderHistory = ({mockData = false}) => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (mockData) {
            // Updated mock data
            const sampleOrders = [
                {orderNumber: '001', dateOfOrder: '2023-08-01', status: 'Shipped', totalPrice: '$100'},
                {orderNumber: '002', dateOfOrder: '2023-08-03', status: 'Processing', totalPrice: '$150'},
                {orderNumber: '003', dateOfOrder: '2023-08-05', status: 'Delivered', totalPrice: '$75'},
                {orderNumber: '004', dateOfOrder: '2023-08-07', status: 'Cancelled', totalPrice: '$50'},
            ];
            setOrders(sampleOrders);
            return;
        }

        const token = JSON.parse(localStorage.getItem('token'));
        const accountNumber = jwt_decode(token).id;

        axios.get(`http://localhost:4000/api/user/${accountNumber}/orders`, {
            headers: {'accessToken': token}
        })
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setOrders([]);
                } else {
                    console.error(error);
                    navigate('/login');
                }
            });

    }, [mockData, navigate]);

    const columns = [
        {
            title: 'Order Number',
            dataIndex: 'orderNumber',
            render: (text) => (
                <Link to={`/order-detail/${text}`}>{text}</Link>
            ),
        },
        {
            title: 'Date of Order',
            dataIndex: 'dateOfOrder',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: '',
            dataIndex: 'operate',
            render: () => <IconMore/>,
        },
    ];

    return (
        <div style={
            {
                margin: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: '20px',
                borderRadius: '5px'
            }}>
            <Table columns={columns}
                   dataSource={orders}
                   pagination={false}/>
        </div>
    );
};

export default OrderHistory;
