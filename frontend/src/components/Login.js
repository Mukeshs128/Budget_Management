import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Style.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                { username, password }
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", username); // Save username
            
            alert("Login successful");
            window.location.href = "/dashboard"; // Redirect to dashboard
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <Form onSubmit={handleLogin}>
                    <h2 className="log">Login</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
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
                        <Form.Label>Don't have an account? <a href="/register">Sign Up</a></Form.Label>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
