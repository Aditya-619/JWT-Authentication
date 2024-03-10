import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Registration = () => {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', {
                username: form.username,
                email: form.email,
                password: form.password
            })
            console.log(response.data)
            setForm({ username: '', email: '', password: '' });
            // navigate('/login')
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
            const response = await axios.get('http://localhost:3000/register');
            console.log(response.data)
        } catch (err) {
            console.log("Error in fetching user data: ", err)
        }
    }
    useEffect(() => {
        getStudent()
    }, [])

    return (
        <>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form action="" className="signup-form" onSubmit={handleSubmit}>
                    <input
                        name='username'
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleForm}
                    />
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
                    Already have an account? <button>Login</button>
                </div>
            </div>
        </>
    )
}

export default Registration