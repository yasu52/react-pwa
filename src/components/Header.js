import React, { useContext, useState } from "react";
import dig from "object-dig";
import { signInWithGoogle, logOut, registerWithEmail, signInWithEmail } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import { makeStyles, AppBar, Toolbar, Typography, Button, Dialog, DialogContent, TextField, DialogActions } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    toolbar: {
        justifyContent: 'space-between',
    },
    button: {
        color: '#FFF',
    },
    appbar: {
        backgroundColor: '#ff66b3',
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
    },
    loginInput: {
        marginBottom: '10px',
    },
    authButtons: {
        marginLeft: 'auto',
    },
    dialogButton: {
    backgroundColor: '#ff66b3', // ピンクの背景色
    color: '#FFF',
    '&:hover': {
        backgroundColor: '#ff4081', // ホバー時の色を少し濃く
    },
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
}));

const Header = () => {
    const currentUser = useContext(AuthContext);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // New state to toggle between Login and Signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleOpen = () => {
        setError(''); // Clear error message when opening dialog
        setOpen(true);
    };
    const handleClose = () => {
        setError(''); // Clear error message when closing dialog 
        setOpen(false);
    };

    // const handleGoogleLogin = () => {
    //     signInWithGoogle().then((res) => {
    //         console.log(res.user);
    //         handleClose();
    //     }).catch(error => {
    //         setError(error.message);
    //     });
    // };

    const handleEmailLogin = (e) => {
        e.preventDefault();
        setError(''); // Clear error message before attempting login/signup

        const authAction = isLogin ? signInWithEmail : registerWithEmail;
        authAction(email, password).then((res) => {
            console.log(res.user);
            handleClose();
        })
        .catch(error => {
            setError(error.message);
        });
        // if (isLogin) {
        //     signInWithEmail(email, password).catch(error => {
        //         setError(error.message);
        //     });
        // } else {
        //     registerWithEmail(email, password).catch(error => {
        //         setError(error.message);
        //     });
        // }
        // Don't close the dialog immediately to show error messages
        // handleClose();
    };

    const switchMode = () => {
        setError(''); // Clear error message when switching modes
        setIsLogin(!isLogin);
    };

    const authButtons = dig(currentUser, 'currentUser', 'uid') ? (
        <Button className={classes.button} variant="inherit" onClick={logOut}>LOGOUT</Button>
    ) : (
        <div className={classes.authButtons}>
            <Button className={classes.button} variant="inherit" onClick={() => { setIsLogin(false); handleOpen(); }}>SIGNUP</Button>
            <Button className={classes.button} variant="inherit" onClick={() => { setIsLogin(true); handleOpen(); }}>LOGIN</Button>  
        </div>
    );

    return (
        <>
            <AppBar className={classes.appbar} position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6">DatePlans</Typography>
                    {authButtons}
                </Toolbar>
            </AppBar>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <form className={classes.loginForm} onSubmit={handleEmailLogin}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={classes.loginInput}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={classes.loginInput}
                        />
                        <Button type="submit" className={classes.dialogButton}>
                            {isLogin ? 'Login' : 'Sign up'}
                        </Button>
                        <Button onClick={signInWithGoogle} color="default" variant="contained">
                            Login with Google
                        </Button>
                        <Button onClick={switchMode} color="secondary">
                            Switch to {isLogin ? 'Sign up' : 'Login'}
                        </Button>
                        {error && <div className={classes.error}>{error}</div>}
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Header;


// import React, { useContext, useState } from "react";
// import dig from "object-dig"
// import { signInWithGoogle, logOut, registerWithEmail, signInWithEmail } from "../service/firebase"; 
// import { AuthContext } from "../providers/AuthProvider";
// import { makeStyles } from "@material-ui/core";
// import { AppBar } from "@material-ui/core";
// import { Toolbar } from "@material-ui/core";
// import { Typography } from "@material-ui/core";
// import { Button } from "@material-ui/core";


// const useStyles = makeStyles(() => ({
//     toolbar: {
//         justifyContent: 'space-between',
//     },
//     button: {
//         color: '#FFF',
//     },
//     appbar: {
//         backgroundColor: '#ff66b3',
//     }
// }));

// const Header = () => {
//     const currentUser = useContext(AuthContext);
//     console.log(currentUser);
//     const classes = useStyles();
//     const buttonRender = () => {
//         let buttonDom
//         if( dig(currentUser, 'currentUser', 'uid') ){
//             buttonDom = <Button className={classes.button} variant="inherit" onClick={logOut}>LOGOUT</Button>
//         }else{
//             buttonDom = <Button className={classes.button} variant="inherit" onClick={signInWithGoogle}>LOGIN</Button>
//         }
//         return buttonDom
//     }
//     return(
//         <AppBar className={classes.appbar} position="static">
//             <Toolbar className={classes.toolbar}>
//                 <Typography variant="h6">
//                     DatePlans
//                 </Typography>
//                 {buttonRender()}
//             </Toolbar>
//         </AppBar>
//     )
// }
// export default Header;