import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MenuItem from './MenuItem';
import Cart from './Cart';
import {Button, Card, Space, Typography} from "@douyinfe/semi-ui";
import json from "json5";

const MenuPage = ({itemList, setItemList}) => {
    const {Meta} = Card;
    // const {Text} = Typography;
    const [cart, setCart] = useState([]);
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const tokenCode = json.parse(token);
    const userid = json.parse(user)._id;
    console.log(user);
    console.log(token);
    const [featuredItems, setFeaturedItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:4000/api/menu/getAll', {headers: {accessToken: tokenCode}})
                .then(response => {
                    console.log(response.data);
                    setFeaturedItems(response.data);
                })
                .catch(error => {
                    console.error('Error fetching menu items:', error);
                });
        }

        fetchData();
    }, []);

    const menuPageStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '15px',
        margin: '10px',
    };
    const menuContainerStyle = {
        width: '100%',
        marginRight: '15px',
    };

    const cardContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        background: '#dddddd',
        borderRadius: '10px',
        padding: '15px',
    };


    const cardStyle = {
        // maxWidth: 340,
        margin: '20px',
        fontSize: '0.8rem',
        borderColor: "#FFD520",
        borderWidth: "4px",
        borderRadius: "10px", 
    };

    const metaContainerStyle = {
        height: '60px', // Adjust this value as required
        overflow: 'hidden',
    };

    const addToCart = (item) => {
        const existingItem = itemList.find(i => i.itemId === item._id);
        if (existingItem) {
            const updatedItemList = itemList.map(i =>
                i.itemId === item._id ? { ...i, quantity: i.quantity + 1 } : i
            );
            setItemList(updatedItemList);
        } else {
            const toBeAdded = {
                itemId: item._id,
                price: item.price.$numberDecimal,
                quantity: 1,
                name: item.name,
                image: item.image
            };
            console.log(toBeAdded);
            setItemList(prevItemList => [...prevItemList, toBeAdded]);
        }
    };

    const cartStyle = {
        width: '30%',
    };
    const titleStyle = {
        fontSize: '1.5em',
        fontWeight: 'bold',
        margin: '0.5em 0'
    };

    const categories = [
        {id: "1", name: "Breakfast"},
        {id: "2", name: "Lunch"},
        {id: "3", name: "Dinner"},
        {id: "4", name: "Desserts"},
        {id: "5", name: "Beverages"},
        {id: "6", name: "Specials"},
    ];

    return (
        <div style={menuPageStyle}>
            <div style={menuContainerStyle}>
                <h2 style={titleStyle}>Menu</h2>
                {categories.map(category => (
                    <div key={category.id}>
                        <h3>{category.name}</h3>
                        <div style={cardContainerStyle}>
                            {featuredItems
                                .filter(item => item.categoryId === category.id)
                                .map(item => (
                                    <Card
                                        key={item._id}
                                        style={cardStyle}
                                        cover={
                                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "300px", width: "100%", background:'#eeeeee'}}>
                                            <img
                                                style={{height: 'auto', width: 'auto'}}
                                                alt="example"
                                                src={item.image}
                                            />
                                        </div>
                                        }
                                        footerLine={true}
                                        footerStyle={{display: 'flex', justifyContent: 'flex-end'}}
                                        footer={
                                            <Space>
                                                {/*<Button theme='borderless' type='primary'>customize</Button>*/}
                                                <Button theme='solid' type='primary'
                                                        onClick={() => addToCart(item)}>add
                                                    to
                                                    cart</Button>
                                            </Space>
                                        }
                                    >
                                        <div style={metaContainerStyle}>
                                            <Meta
                                                title={item.name}
                                                description={item.description}
                                            />
                                        </div>
                                        ${item.price.$numberDecimal}
                                    </Card>

                                ))}
                        </div>
                    </div>))}
            </div>


        </div>
    );
};
export default MenuPage;
