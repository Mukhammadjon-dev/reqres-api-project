import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setCurrentUser, setCurrentUserLocally, updateUserData } from '../redux/actions/usersAction';
import { NavLink } from 'react-router-dom';
import "./UserDetail.css";
import { CircularProgress, Stack } from '@mui/material';

const UserDetail = () => {
    let { id } = useParams();
    const currentUser = useSelector(state => state.users.currentUser);
    const loading = useSelector(state => state.users.loading);

    useEffect(() => {
        setCurrentUserLocally(id)
        setCurrentUser(id)
        console.log(currentUser, "Current User Details")
    }, [])
    return (
        <div>{loading ?
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center">
                <CircularProgress />
            </Stack> :
            <div className='userdetail_container'>
                <div className='userdetail_wrapper'>
                    <div className='userdetail_info'>
                        <p className='userdetail_text'> First Name: <b> {currentUser.first_name} </b></p>
                        <p className='userdetail_text'> Last Name: <b> {currentUser.last_name} </b></p>
                        <p className='userdetail_text'> Email Address: <b> {currentUser.email}</b> </p>
                        <p className='userdetail_text'> User ID: <b> {currentUser.id}</b> </p>
                    </div>
                    <div>
                        <img className='userdetail_image' src={currentUser.avatar} />
                    </div>
                </div>
                <button className='userdetail_homebutton'>
                    <NavLink to='/' className='Homepage_a'>
                        <a className='Homepage_a'> Homepage </a>
                    </NavLink>
                </button>
            </div>}
        </div >
    )
}

export default UserDetail;
