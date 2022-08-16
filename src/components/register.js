import React from 'react'
import { useForm } from 'react-hook-form';
import { registerNewUser } from '../redux/actions/usersAction';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";

function Register() {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        registerNewUser(data)
        reset();
        toast.success("Successfully registered", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
    return (
        <div className='app'>
            <div className='login_forms'>
                <div className='title'> Register </div>
                <hr />
                <div className='form' >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='txt_field'>
                            <input type="text" required {...register("first_name")} />
                            <span></span>
                            <label>First Name</label>
                        </div>
                        <div className='txt_field'>
                            <input type="text" required {...register("last_name")} />
                            <span></span>
                            <label> Last Name </label>
                        </div>
                        <div className='txt_field'>
                            <input type="email" required {...register("email")} />
                            <span></span>
                            <label> Email </label>
                        </div>
                        <div className='txt_field'>
                            <input type="text" required {...register("avatar")} />
                            <span></span>
                            <label> Avatar Link </label>
                        </div>
                        <div className='txt_field'>
                            <input type="text" name="password" required defaultValue={'cityslicka'} {...register("password")} />
                            <span></span>
                            <label> Password </label>
                        </div>
                        <div className='button-container'>
                            <button className='Homepage_button' >
                                <NavLink to="/" className='Homepage_a'>
                                    <a> Homepage </a>
                                </NavLink>
                            </button>
                            <button type="submit" className='Login_button'> Register </button>
                        </div>
                    </form>
                    <div class="signup_link">
                        Already a member?
                        <NavLink to="/login">
                            <a href="#"> Login </a>
                        </NavLink>
                    </div>

                </div >
            </div >
        </div >
    )
}

export default Register;