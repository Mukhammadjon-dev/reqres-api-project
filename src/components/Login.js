import React from 'react'
import { useForm } from 'react-hook-form';
import { signInUserAndGetToken } from '../redux/actions/usersAction';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Login.css";
import { CircularProgress, Stack } from '@mui/material';
import { toast } from "react-toastify";

function Login() {
    const loading = useSelector(state => state.users.loading);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        signInUserAndGetToken(data)
        reset();
        toast.success("Successfully Log in, check out profile page", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    const styles = {
        loginLoaderStyle: {
            height: "90vh",
            width: "90vw",
        }
    }
    return (
        <div className='app'>
            {loading ?
                <Stack
                    style={styles.loginLoaderStyle}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <CircularProgress />
                </Stack> :
                <div className='login_forms'>
                    <div className='title'> Login </div>
                    <hr />
                    <div className='form' >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='txt_field'>
                                <input {...register("email")} type="text" required />
                                <span></span>
                                <label>Email</label>
                            </div>
                            <div className='txt_field'>
                                <input placeholder='Password' defaultValue={'cityslicka'} {...register("password")} required />
                                <span></span>
                                <label>Password</label>
                            </div>
                            <div className='pass'>Forgot Password ?</div>
                            <div className='button-container'>
                                <button className='Homepage_button'>
                                    <NavLink to='/' className='Homepage_a'>
                                        <a className='Homepage_a'> Homepage </a>
                                    </NavLink>
                                </button>
                                <button type="submit" className='Login_button'>
                                    Login
                                </button>
                            </div>
                        </form>
                        <div class="signup_link">
                            Not a member?
                            <NavLink to='/Register'>
                                <a href="#"> Register </a>
                            </NavLink>
                        </div>
                    </div >
                </div >}
        </div >
    )
}

export default Login;