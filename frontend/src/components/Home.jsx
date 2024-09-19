import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Space } from '@douyinfe/semi-ui';
import axios from 'axios';

const HomePage = () => {
    const { Meta } = Card;
    const [featuredItems, setFeaturedItems] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const tokenCode = JSON.parse(token);
        axios.get('http://localhost:4000/api/menu/getAll', { headers: { accessToken: tokenCode } })
            .then(response => {
                const allItems = response.data;
                const filteredItems = allItems.filter(item => item.categoryId === '1' || item.categoryId === '2');
                const shuffledItems = filteredItems.sort(() => 0.5 - Math.random());
                const selectedItems = shuffledItems.slice(0, 10);
                setFeaturedItems(selectedItems);
            })
            .catch(error => {
                console.error('Error fetching menu items:', error);
            });
    }, []);

    const cardStyle = {
        width: '250px',
        margin: '10px',
        padding: '10px',
        display: 'inline-block',
        verticalAlign: 'top',
        boxSizing: 'border-box',
    };

    const imageContainerStyle = {
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        top: '150px',
    };

    const imageStyle = {
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: 'cover'
    };

    const nextItems = () => {
        if (startIndex + 5 < featuredItems.length) {
            setStartIndex(startIndex + 5);
        }
    };

    const prevItems = () => {
        if (startIndex - 5 >= 0) {
            setStartIndex(startIndex - 5);
        }
    };

    const featureStyle = {
        padding: '20px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#eeeeee',
        borderRadius: '10px',
    }
    return (
         
            <div style={featureStyle}>
                <Button onClick={prevItems}>L</Button>
                <div style={{ display: 'flex', overflowX: 'hidden', justifyContent: 'center' }}>
                    {featuredItems.slice(startIndex, startIndex + 5).map(item => (
                    <Card
                        key={item._id}
                        style={cardStyle}
                        title={<Meta title={item.name} description={item.description} />}
                        cover={
                            <div style={imageContainerStyle}>
                                <img alt={item.name} src={item.image} style={imageStyle} />
                            </div>
                        }
                        footerLine={true}
                        footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
                        footer={
                            <Space>
                                <Button theme='solid' type='primary' onClick={() => navigate('/menu')}>Order now</Button>
                            </Space>
                        }
                    >
                        ${item.price.$numberDecimal}
                    </Card>
                    ))}
                </div>
                <Button onClick={nextItems}>R</Button>
            </div>
    );
};

export default HomePage;
