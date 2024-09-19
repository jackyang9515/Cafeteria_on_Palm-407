// import {useNavigate} from "react-router-dom";
// import React, { useState, useEffect, useMemo } from 'react';
// import {List, Button, Avatar, ButtonGroup, Notification, TimePicker, LocaleProvider} from '@douyinfe/semi-ui';
// import { IconChevronDown, IconClose } from '@douyinfe/semi-icons';
// import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
// import * as dateFns from 'date-fns';
// import json from "json5";

// import axios from "axios";

// function Orders({user, token}) {
//     console.log(itemList);
//     const [orderDetailLst, setOrderDetailLst] = useState([]);
//     const [orderExists, setOrderExists] = useState(false);
//     const [time, setTime] = useState(new Date()); 
//     const userid = json.parse(user)._id;
//     const tokenCode = json.parse(token);
//     let navigate = useNavigate();
//     const formatToken = 'HH:mm:ss';
//     const [itemList, setItemList] = useState([]);

//     const triggerIcon = useMemo(() => {
//         return time ? (
//             <IconClose
//                 onClick={e => {
//                     e && e.stopPropagation();
//                     setTime();
//                 }}
//             />
//         ) : (
//             <IconChevronDown />
//         );
//     }, [time]);

//     const checkOut = async () => {
//         if (!userid || !tokenCode) {
//             navigate(`/login`);
//             return;
//         }
//         const timeString = time.toString();
//         const addOrderInput = {
//             accountId: userid,
//             orderList: orderDetailLst,
//             timeString: timeString
//         }
//         await axios.post(`http://localhost:4000/api/order/addOrder/`, addOrderInput, {headers: { accessToken: tokenCode}})
//         .then(response => {
//             console.log(response.data);
//         })
//         .catch(error => {
//             console.log(error);
//         })
//         setOrderExists(false);
//         const notifInfo = {
//             title: 'Thank you for placing you order!',
//             content: 'Your order was for ' + timeString
//         };
//         Notification.info({ ...notifInfo, position: 'top' });
//         return;
//     }

//     useEffect(() => {
//         async function fetchData() {
//             setItemList(JSON.parse(localStorage.getItem("itemList")).items);
//             if (itemList.length > 0) {
//                 setOrderExists(true);
//             }
//             setOrderDetailLst(itemList);
//         }
//         fetchData();
//     }, [itemList]);

//     const deleteOrderDetail = async (orderDetailId) => {
//         setOrderDetailLst(orderDetailLst.filter(item => item._id !== orderDetailId));
//         if (orderDetailLst.length === 1) {
//             console.log(orderDetailLst);
//             setOrderExists(false);
//         }
//         const notifInfo = {
//             title: 'Item deleted!'
//         };
//         Notification.info({...notifInfo, position: 'top'});
//         return;
//     }

//     return (
//         <div style={{position: "fixed", left: "75%", top: "7%", border: "solid #000", borderWidth: "2px", zIndex: 10, width: "24.7%", height: "92.8%", borderRadius: "2%", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center"}}>
//             {orderExists ? (
//             <>
//             <LocaleProvider locale={en_US}>
//                 <TimePicker
//                     value={time}
//                     format={formatToken}
//                     onChange={time => setTime(time)}
//                     style={{flex: 0.5}}
//                     triggerRender={({ placeholder }) => (
//                         <Button theme={'light'} icon={triggerIcon} iconPosition={'right'}>
//                             {time ? dateFns.format(time, formatToken) : placeholder}
//                         </Button>
//                     )}
//                 />
//             </LocaleProvider>
//             <List
//                     dataSource={orderDetailLst}
//                     style={{ marginTop: 10, width: "100%", height: "100%", backgroundColor: "white", overflow: "auto", flex: 7 }}
//                     renderItem={item => (
//                         <List.Item
//                             header={<Avatar color="blue">SE</Avatar>}
//                             main={<><div>
//                                 <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}><b>{item.itemId}</b></span>
//                             </div>
//                             <div>
//                                 <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>Price: {item.price.$numberDecimal}</span>
//                                 <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>Qty: {item.quantity}</span>
//                             </div></>}
//                             extra={<ButtonGroup theme="borderless">
//                                 <Button onClick={() => deleteOrderDetail(item._id)}>delete</Button>
//                             </ButtonGroup>} />
//                     )} /><div style={{ flex: 0.5, marginTop: 10 }}>
//                         <Button onClick={checkOut} style={{ width: "100%", backgroundColor: "#976332", color: "white" }}>Checkout</Button>
//                     </div></> ) : (<div style={{color: "grey"}}>No data available at the moment</div>) }
//         </div>
//     );
// };

// export default Orders;

