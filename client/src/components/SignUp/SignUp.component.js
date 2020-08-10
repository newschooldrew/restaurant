import React, {useState, useContext} from 'react'
import {createUser} from '../../actions'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import AuthContext from '../../AuthContext'
import jwt from 'jsonwebtoken'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const SignUp = ({history}) => {
    const {state,dispatch} = useContext(AuthContext)
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [msg,setMsg] = useState('')
    

    const useStyles = makeStyles(theme => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

      const classes = useStyles();
    const checkState = () =>{
        console.log(state.user)
    }

    const createToken = ({username,email, password},secret, expiresIn) =>{
        
        return jwt.sign({username,email, password},secret,{expiresIn})
    }
    
    let token;
    
    const handleSubmit = async (e) =>{
        e.preventDefault()

        token = createToken({username,email, password},'jk234sf98',"1hr")
        const user = {username,email, password,phoneNumber,token}
        await createUser(user,dispatch,history)
        console.log(localStorage.getItem("sign_up_msg"))
        if(localStorage.getItem("sign_up_msg")){
            setMsg("user already exists")
            
        } else{
            localStorage.setItem('username',username)
            localStorage.setItem('token',token)
            localStorage.removeItem('sign_up_msg')
        }
        
        setUsername('')
        setEmail('')
        setPassword('')
        setPhoneNumber('')
    }


    return (
        <>    
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <div>{msg}</div>
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={e => setUsername(e.target.value)} value={username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="fname"
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                autoFocus
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                autoComplete="fname"
                name="phoneNumber"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Phone Number"
                autoFocus
                onChange={e => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                autoComplete="fname"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Email"
                autoFocus
                onChange={e => setEmail(e.target.value)}
                value={email} 
              />
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          onClick={handleSubmit}>Submit</Button>
                </Grid>
            </form>
            </div>
            <div>Have an account? Click <Link to="/sign-in">Here</Link> </div>
            </Container>
        </>
    )
}

export default withRouter(SignUp)