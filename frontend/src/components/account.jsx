import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Avatar, Input} from "@douyinfe/semi-ui";
import jwt_decode from "jwt-decode";

export const Account = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [account, setAccount] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        accountNumber: '',
        email: ''
    });

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        //console.log(token);
        const user_id = jwt_decode(token).id;
        axios.get(`http://localhost:4000/api/user/${user_id}/`, {
            headers: {'accessToken': token}
        })
            .then(response => {
                setAccount(response.data);
            })
            .catch(error => {
                console.error(error);
                navigate('/login');
            });
    }, [navigate]);

    const enableEditing = () => {
        setIsEditing(true);
    };

    const saveChanges = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        //console.log(token);
        const user_id = jwt_decode(token).id;
        axios.put(`http://localhost:4000/api/user/${user_id}/`, account, {
            headers: {'accessToken': token}
        })
            .then(response => {
                setIsEditing(false);
                setAccount(response.data);
            })
            .catch(error => {
                //console.log(error)
                console.error(error);
            });
    };


    const handleChange = (field, value) => {
        setAccount({
            ...account,
            [field]: value
        });
    };
    const signOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{display: 'flex', marginTop: 70}}>
            <div style={{
                width: '25%',
                padding: '20px',
                borderRight: '1px solid #ccc',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Button onClick={() => navigate('/account')} style={{marginBottom: '10px'}}>Account Details</Button>
                <Button onClick={() => navigate('/orderhistory')}>Order History</Button>
            </div>
            <div style={{width: '75%', padding: '20px'}}>
                <Button onClick={signOut} style={{float: 'right'}}>Sign Out</Button>
                <h1>Account Details <Button onClick={enableEditing}>Enable Changes</Button></h1>
                <div style={{display: 'flex'}}>
                    <div style={{width: '30%'}}>
                        <Avatar
                            size="extra-large"
                            src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
                            color="blue"
                        />

                        <div style={{padding: '20px'}}>
                            <label>Email: </label>
                            <span>{account.email}</span>
                        </div>
                    </div>
                    <div style={{width: '60%'}}>
                        <div style={{padding: '15px'}}>
                            <label>First Name: </label>
                            <Input value={account.firstName} onChange={value => handleChange('firstName', value)}
                                   disabled={!isEditing}/>
                        </div>
                        <div style={{padding: '15px'}}>
                            <label>Last Name: </label>
                            <Input value={account.lastName} onChange={value => handleChange('lastName', value)}
                                   disabled={!isEditing}/>
                        </div>
                        <div style={{padding: '15px'}}>
                            <label>User Name: </label>
                            <Input value={account.username} onChange={value => handleChange('username', value)}
                                   disabled={!isEditing}/>
                        </div>
                        <div style={{padding: '15px'}}>
                            <label>Password: </label>
                            <Input type="password" value={account.password}
                                   onChange={value => handleChange('password', value)} disabled={!isEditing}/>
                        </div>
                    </div>
                </div>
                {isEditing && <Button onClick={saveChanges}>Save</Button>}
            </div>
        </div>
    );
};

export default Account;
