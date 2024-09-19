import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Button, Form} from "@douyinfe/semi-ui";

import logo from "../images/407logo.png";
import loginImg from "../images/login_img.png";

export const Register = () => {
    let res = null;
    const navigate = useNavigate();

    const validateEmail = (email) => {
        if (!email) {
            return false;
        }
        const regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
        return regex.test(email);

    }

    const signupCheck = (values) => {
        let errors = {};
        if (!values.firstName) {
            errors.firstName = 'First Name is required';
        }
        if (!values.lastName) {
            errors.lastName = 'Last Name is required';
        }
        if (!values.username) {
            errors.username = 'Username is required';
        }
        if (!validateEmail(values.email)) {
            errors.email = 'Email is invalid';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
        }
        if (values.password !== values.confirmPassword && values.password && values.confirmPassword) {
            errors.confirmPassword = 'Password is not matched';
        }
        if (Object.keys(errors).length > 0) {
            return errors;
        }

        return axios.post("http://localhost:4000/api/user/register/", values)
            .then(response => {
                res = response.data;
            })
            .catch(error => {
                const ers = error.response.data
                for (const key in ers) {
                    errors[key] = ers[key][0];
                }
                return errors;
        });
    }

    const signupSuccess = (values) => {
        const loginValues = {
            username: values.username,
            password: values.password
        }
        axios.post("http://localhost:4000/api/user/login/", loginValues)
            .then(response => {
                const result = response.data;
                localStorage.setItem('token', JSON.stringify(result.token));
                const user_id = jwt_decode(result.token).id;
                // get user info
                axios.get(`http://localhost:4000/api/user/${user_id}/`, {headers: { accessToken: result.token}})
                    .then(response => {
                        localStorage.setItem("user", JSON.stringify(response.data));
                        navigate("/");
                    })
            });
        }
    
    return (
        <div style={{display: "flex", flexDirection: "row", marginTop: 70}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", flex: 1}}>
                <img src={loginImg} alt="sandwich" style={{width: "80%", height: "80%"}}/>
            </div>
            <div style={{margin: "0 auto", flex: 1.5, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img src={logo} alt="logo" style={{width: "60%", height: "60%"}}/>
                <Form style={{marginTop: 10, width: "60%"}} validateFields={values => signupCheck(values)} onSubmit={signupSuccess}>
                    <Form.Input field='firstName' label='First Name' placeholder='First Name'/>
                    <Form.Input field='lastName' label='Last Name' placeholder='Last Name'/>
                    <Form.Input field='username' label='Username' placeholder='Username'/>
                    <Form.Input field='email' label='Email' placeholder='Email' validate={validateEmail}/>
                    <Form.Input field='password' label='Password' placeholder='Password' mode='password'/>
                    <Form.Input field='confirmPassword' label='Confirm Password' placeholder='Confirm Password' mode='password'/>
                    <div style={{display: "flex", justifyContent: "center", marginTop: 10}}>
                        <Button htmlType="submit" theme="solid"
                                style={{width: 100, backgroundColor: "#976332"}}>Signup</Button>
                    </div>
                </Form>
                <Link to={"/login"} style={{display: "flex", marginTop: 20}}>
                    Already have an account? Login
                </Link>
            </div>
        </div>
    )
}

export default Register;
