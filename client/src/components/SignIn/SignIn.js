import React, {useState, useContext, useEffect} from 'react'
import {signInUser} from '../../actions'
import Avatar from '@material-ui/core/Avatar';
import AuthContext from '../../AuthContext'
import {withRouter} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

const SignIn = ({history}) => {
    const {state,dispatch} = useContext(AuthContext)
    const [username,setUsername] = useState('')
    const [msg,setMsg] = useState('')
    const [password,setPassword] = useState('')
    
    useEffect(()=>{
        console.log(state)
    },[state])

    const checkState = () =>{
        console.log(state.user)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        localStorage.removeItem('sign_in_msg')
        const user = {username, password}
        signInUser(user, history)
             
        dispatch({type:"SIGN_IN_USER",payload:user})
        
        setUsername('')
        setPassword('')

        // error messages
        if(localStorage.getItem('sign_in_msg')){
            setMsg(localStorage.getItem('sign_in_msg'))
        } else{
            localStorage.removeItem('sign_in_msg')
        }
    }

    const classes = useStyles();

    return (
        <>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <br />
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <br />
                <form className={classes.form} noValidate>
                    <div>{msg}</div>
                    {/* <label>Email</label><br /> */}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={e => setUsername(e.target.value)} value={username} 
                />
                    {/* <input onChange={e => setEmail(e.target.value)} value={email} name="email" type="text" /> */}
                    {/* <br /><label>Password</label><br /> */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password" 
                        onChange={e => setPassword(e.target.value)} 
                        value={password}
                        />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        Sign In
                    </Button>
            </form>
        </div>
        
        </Container>
        </>
    )
}

export default withRouter(SignIn)
