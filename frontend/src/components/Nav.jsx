import {Link, Outlet, useNavigate} from "react-router-dom";
import React, { useState, useEffect, useMemo } from 'react';
import {List, Button, Avatar, ButtonGroup, Notification, TimePicker, LocaleProvider, Nav, Divider} from '@douyinfe/semi-ui';
import { IconChevronDown, IconClose, IconBriefStroked } from '@douyinfe/semi-icons';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import * as dateFns from 'date-fns';
import json from "json5";
import axios from "axios";

import etrLogo from "../images/407logo.png";
import itDeptMap from "../images/it_department_map.png";
import itTable from "../images/it_table.png";

export const MyNav = ({itemList, setItemList}) => {
    let navigate = useNavigate();
    const user = localStorage.getItem("user");
    const userid = json.parse(user)._id;
    const tokenCode = json.parse(localStorage.getItem("token"));
    const [orderExists, setOrderExists] = useState(false);
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);
    const [total, setTotal] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const formatToken = 'HH:mm:ss';

    const checkOrder = () => {
        if (!user) {
            navigate(`/login`)
            return;
        }
        if (show === false) {
            setShow(true);
        }
        else if (show === true) {
            setShow(false);
        }
    }

    const closeImages = () => {
        setShowMap(false);
        setShowTable(false);
        const notifInfo = {
            title: 'Position added!'
        };
        Notification.info({...notifInfo, position: 'top'});
    }

    useEffect(() => {
        setTotal(itemList.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0));
        if (!user) {
            navigate(`/login`)
            return;
        }
        if (itemList.length > 0) {
            setOrderExists(true);
        }
        else {
            setOrderExists(false);
        }
    }, [itemList]);

    const triggerIcon = useMemo(() => {
        return time ? (
            <IconClose
                onClick={e => {
                    e && e.stopPropagation();
                    setTime();
                }}
            />
        ) : (
            <IconChevronDown />
        );
    }, [time]);

    const checkOut = async () => {
        if (!userid || !tokenCode) {
            navigate(`/login`);
            return;
        }
        const timeString = time.toString();
        const addOrderInput = {
            accountId: userid,
            orderList: itemList,
            timestamp: timeString,
        };
        await axios.post(`http://localhost:4000/api/order/order/`, addOrderInput, {headers: { accessToken: tokenCode}})
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
        setOrderExists(false);
        setItemList([]);
        const notifInfo = {
            title: 'Thank you for placing you order!',
            content: 'Your order was for ' + timeString
        };
        Notification.info({ ...notifInfo, position: 'top' });
        
        return;
    }

    const deleteOrderDetail = (orderDetailId) => {
        const filter = itemList.filter(item => item.itemId  !== orderDetailId);
        setItemList(filter);
        if (itemList.length === 1) {
            console.log(itemList);
            setOrderExists(false);
        }
        const notifInfo = {
            title: 'Item deleted!'
        };
        Notification.info({...notifInfo, position: 'top'});
        return;
    }

    return (
        <>
            <div style={{height:59, backgroundColor:"#006BB6"}}>
                {showMap ? (<div style={{position: "fixed", zIndex: 100, left: "10%", top: "10%"}}>
                    <img src={itDeptMap} style={{height: "60%", width: "60%"}} alt='map'/>
                    <button style={{position: "fixed", zIndex: 101, left: "29%", top: "40%", fontSize: "40px", opacity: 0}} onClick={() => setShowTable(true)}>hhhhh</button>
                </div>) : null}
                {showTable ? (<div style={{position: "fixed", zIndex: 102, left: "10%", top: "10%"}}>
                    <img src={itTable} style={{height: "60%", width: "60%"}} alt='table'/>
                    <button style={{position: "fixed", zIndex: 103, left: "15%", top: "41%", fontSize: "40px", opacity: 0}} onClick={closeImages}>hhhh</button>
                </div>) : null}
                <Nav
                    renderWrapper={({itemElement, props}) => {
                        const routerMap = {
                            home: "/",
                            //explore is not implemented yet, should be a link to a page with all the items
                            explore: "",
                            menu: "/menu",
                            account: "/account",
                        };
                        return (
                            <Link
                                style={{textDecoration: "none"}}
                                to={routerMap[props.itemKey]}
                            >
                                {itemElement}
                            </Link>
                        );
                    }}
                    style={{width: '100%', position: 'fixed', zIndex: 1000}}
                    mode={'horizontal'}
                    items={[
                        {itemKey: 'home', text: 'Home'},
                        {itemKey: 'explore', text: 'Explore'},
                        {itemKey: 'menu', text: 'Menu'},
                        {itemKey: 'account', text: 'Account'},
                    ]}
                    header={{
                        logo: <img src={etrLogo} style={{height: 40}} alt='logo'/>,
                        text: '407ETR',
                        link: '/',
                    }}
                    footer={
                        <Button theme='solid'
                                icon={<IconBriefStroked/>}
                                style={{marginLeft: 20, borderRadius:5, backgroundColor:"#976332"}}
                                onClick={checkOrder}
                        >
                            My Orders
                        </Button>
                    }
                />
            </div>
            <div style={{height: 7, backgroundColor:"#006BB6", width: '100%', position: 'fixed', zIndex: 1000}}>
            </div>
            <Outlet/>
            {show ? (<div style={{position: "fixed", left: "75%", top: "7%", border: "solid #000", borderWidth: "2px", zIndex: 10, width: "24.7%", height: "92.8%", borderRadius: "2%", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center"}}>
            {orderExists ? (
            <>
            <LocaleProvider locale={en_US}>
                <TimePicker
                    value={time}
                    format={formatToken}
                    onChange={time => setTime(time)}
                    style={{flex: 0.5, marginTop: 12}}
                    triggerRender={({ placeholder }) => (
                        <Button theme={'light'} icon={triggerIcon} iconPosition={'right'}>
                            {time ? dateFns.format(time, formatToken) : placeholder}
                        </Button>
                    )}
                />
            </LocaleProvider>
            <Button
                theme='solid'
                style={{borderRadius:5, backgroundColor:"#976332"}}
                onClick={() => setShowMap(true)}
            >
                Show Map
            </Button>
            <Divider margin='5px'/>
            <List
                    dataSource={itemList}
                    style={{ marginTop: 10, width: "100%", height: "100%", backgroundColor: "white", overflow: "auto", flex: 7 }}
                    renderItem={item => (
                        <List.Item
                            header={<Avatar color="blue" src={item.image}></Avatar>}
                            main={<><div>
                                <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}><b>{item.name}</b></span>
                            </div>
                            <div>
                                <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>Price: {(item.price * item.quantity).toFixed(2)} </span>
                                <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>Qty: {item.quantity}</span>
                            </div></>}
                            extra={<ButtonGroup theme="borderless">
                                <Button onClick={() => deleteOrderDetail(item.itemId)}>delete</Button>
                            </ButtonGroup>} />
                    )} />
                    <Divider margin='5px'/>
                    <div style={{ flex: 0.5, marginTop: 10 }}>
                        <Button onClick={checkOut} style={{ width: "100%", backgroundColor: "#976332", color: "white" }}>Checkout ${(total * 1.13).toFixed(2)} = ${total.toFixed(2)} + tax (${(total * 0.13).toFixed(2)}) </Button>
                    </div></> ) : (<div style={{color: "grey"}}>No data available at the moment</div>) }
        </div>) : null}
        </>
    )
}

export default MyNav