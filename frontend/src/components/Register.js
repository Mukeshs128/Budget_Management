import React, { useState } from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Style.css";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, username, password });
            alert(response.data.message);
            window.location.href = "/login"; // Redirect to dashboard
            // Redirect to login page or dashboard
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <Form onSubmit={handleRegister}>
                    <h2 className='log'>Register</h2>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Already have an account? <a href="/login">Login</a></Form.Label>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Register;
