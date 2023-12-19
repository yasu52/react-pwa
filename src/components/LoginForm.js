import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { signInWithEmail } from './firebase';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        signInWithEmail(email, password);
    };

    return (
        <div>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
        </div>
    );
};

export default LoginForm;
