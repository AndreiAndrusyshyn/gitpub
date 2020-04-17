import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import app from './feathersclient';
import Router from 'next/router'

const useStyles = makeStyles((theme) => ({
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function SignIn(props: any) {
    const classes = useStyles();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [nouser, setNoUser] = useState("");



    function onSignIn() {
   // let d= app.service('users').on('created', e =>{ console.log(e); kek()})
// Call the `messages` service
        app.emit('get', 'users', {email: email, password:password}, (err, data) =>{
    if(data) {
        console.log("ss")
        Router.push('/gitinfo')
    } else {
        setNoUser('error');
        }
            console.log(err)
})

        // app.service('users')
        //     .on('created', message => console.log('New message created', message));

        console.log(password)
        console.log(props.session);

        //if in db{}
        props.currentSession(email);

        //else {}



    }


    return (
        <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
    <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Sign in
        </Typography>
        <form className={classes.form} noValidate>
    <TextField
        variant="outlined"
    margin="normal"
    required
    fullWidth
    id="email"
    label="Email Address"
    name="email"
    autoComplete="email"
    autoFocus
        onChange={e => setEmail(e.target.value)}
    />
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
        onChange={e => {setPassword(e.target.value)}}
    />
    {nouser ? "wrong pass/email" : <></>}
    <Button
        // type="submit"
    fullWidth
    variant="contained"
    color="primary"
    className={classes.submit}
    onClick={() => onSignIn()}
        >
        Sign In
    </Button>
    <Grid container>
        <Grid item>
        <Link href="/signup" variant="body2">
        {"Don't have an account? Sign Up"}
        </Link>
        </Grid>
        </Grid>
        </form>
        </div>
        <Box mt={8}>
        </Box>
        </Container>
);
}
const mapStateToProps = (state: any) => ({
   session: state
});
const mapDispatchToProps = (dispatch: any) => ({
    currentSession: (email: any) => dispatch(actions.currentSession(email)),

});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
