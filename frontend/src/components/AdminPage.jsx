import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, List, ButtonGroup, Avatar} from "@douyinfe/semi-ui";
import json from "json5";

const AdminPage = () => {
    const [featuredItems, setFeaturedItems] = useState([]);
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const tokenCode = json.parse(token);
    const username = json.parse(user).username;

    useEffect(() => {
        async function fetchData() {
            console.log(username);
            if (username !== 'adminbrowns_407') {
                return;
            }
            await axios.get('http://localhost:4000/api/order/getall/allorder', {headers: {accessToken: tokenCode}})
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

    return (
        <div>
            <h1>Admin Page</h1>
            <List
                dataSource={featuredItems}
                renderItem={item => (
                    <List.Item
                        header={<Avatar color="blue">O</Avatar>}
                            main={
                                <div>
                                    <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>Order</span>
                                    {item._id}
                                </div>
                            }
                            extra={
                                <ButtonGroup theme="borderless">
                                    <Button>edit</Button>
                                    <Button>more</Button>
                                </ButtonGroup>
                            }
                        // <div>
                        //     <h1>{item._id}</h1>
                        //     <h2>{item.accountId}</h2>
                        //     <h3>{item.timeString}</h3>
                        //     <h3>{item.orderList}</h3>
                        //     <h3>{item.orderStatus}</h3>
                        // </div>
                    />
                )}
            />
        </div>
    )
}

export default AdminPage;