import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setCurrentUser, setCurrentUserLocally, updateUserData } from '../redux/actions/usersAction';
import { updateUser } from '../redux/APIFunctions';
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import "./Profile.css";
import { CircularProgress, Stack } from '@mui/material';
import { toast } from "react-toastify";

const Profile = () => {
    let { id } = useParams();
    const currentUser = useSelector(state => state.users.currentUser);
    const loading = useSelector(state => state.users.loading);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        updateUserData(id, data);
        reset();
        toast.success("Profile info successfully updated", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    const styles = {
        profileLoaderStyle: {
            height: "90vh",
            width: "90vw",
        }
    }
    useEffect(() => {
        setCurrentUser(id)
        setCurrentUserLocally(id);
        console.log('PROFILE')
    }, [])
    return (
        <div>{loading ?
            <Stack
                style={styles.profileLoaderStyle}
                direction="row"
                justifyContent="center"
                alignItems="center">
                <CircularProgress />
            </Stack> :
            <div>
                <div className='profile_app'>
                    <div className='profile_forms'>
                        <div className='profile_title'> Profile </div>
                        <hr />
                        <div className='form' >
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='profile_txt_field'>
                                    <input
                                        defaultValue={`${currentUser.first_name}`} {...register("first_name")}
                                        required />
                                    <span></span>
                                    <label>First Name</label>
                                </div>
                                <div className='profile_txt_field'>
                                    <input defaultValue={`${currentUser.last_name}`} {...register("last_name")} required />
                                    <span></span>
                                    <label>Last Name</label>
                                </div>
                                <div className='profile_txt_field'>
                                    <input defaultValue={`${currentUser.email}`} {...register("email")} type="text" required />
                                    <span></span>
                                    <label>Email</label>
                                </div>
                                <div className='profile_txt_field'>
                                    <input defaultValue={`${currentUser.avatar}`} {...register("avatar")} type="text" required />
                                    <span></span>
                                    <label>Avatar Link</label>
                                </div>

                                <div className='button-container'>
                                    <button className='Homepage_button'>
                                        <NavLink to='/' className='Homepage_a'>
                                            <a className='Homepage_a'> Homepage </a>
                                        </NavLink>
                                    </button>

                                    <button type="submit" className='Login_button'>
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div >
                    </div >
                </div >
            </div>}
        </div>
    )
}

export default Profile
