import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    axios.defaults.withCredentials = true
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email: form.email,
                password: form.password
            })
            console.log(response.data)
            setForm({ email: '', password: '' });
            if(response.data.Login) {
                navigate('/dashboard')
            } else {
                navigate('/') 
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const getStudent = async () => {
        try {
            const response = await axios.get('http://localhost:3000/login');
            console.log(response.data)
        } catch (err) {
            console.log("Error in fetching user data: ", err)
        }
    }
    useEffect(() => {
        getStudent()
    }, [])

    return (
        <div className="signup-container">
            <h2>Login</h2>
            <form action="" className="signup-form" onSubmit={handleSubmit}>
                <input
                    name='email'
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleForm}
                />
                <input
                    name='password'
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleForm}
                />
                {/* <button type="button">Sign Up</button> */}
                <input type="submit" className='button' />
            </form>
            <div className="login-link">
                Don't have an account? <button>Sign up</button>
            </div>
        </div>
    )
}

export default Login