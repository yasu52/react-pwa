import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { registerWithEmail } from '../service/firebase';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%', // or you can set a fixed width
        maxWidth: '400px',
        margin: 'auto',
    },
    input: {
        marginBottom: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(1),
    },
}));

const RegisterForm = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault(); // Prevent default form submission
        registerWithEmail(email, password);
    };

    return (
        <form className={classes.form} onSubmit={handleRegister}>
            <TextField
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.input}
            />
            <TextField
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.input}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
            >
                Register
            </Button>
        </form>
    );
};

export default RegisterForm;
