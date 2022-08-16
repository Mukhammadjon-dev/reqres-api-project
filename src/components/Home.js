import React, { useEffect } from 'react'
import { getUsers } from '../redux/actions/usersAction'
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import "./Home.css"

function Home() {
    const users = useSelector(state => state.users.usersList);
    const loading = useSelector(state => state.users.loading);
    const totalPages = useSelector(state => state.users.totalPages);
    const navigate = useNavigate();

    const styles = {
        homeLoaderStyle: {
            height: "90vh",
            width: "90vw",
        }
    }

    return (
        <div>
            {loading ?
                <Stack
                    style={styles.homeLoaderStyle}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <CircularProgress />
                </Stack> : (
                    <div>
                        <h3 className="home_title">
                            Hello REQRES Fake API Users !
                        </h3>
                        {users.length !== 0 && users.map((user) => (
                            <div className="user_card" key={user.id}>
                                <div>
                                    <img className="user_card_image" src={user.avatar} />
                                </div>
                                <div>
                                    <span className="user_card_name"> {user.first_name} {user.last_name} </span>
                                    <p className="user_card_email"> <b>@Email:</b> {user.email}</p>

                                </div>
                                <div>
                                    <button onClick={() => navigate(`/users/${user.id}`)} className="user_card_button"> More info </button>
                                </div>
                            </div>
                        ))}
                        <div className='pagination_container'>
                            <Stack spacing={2}>
                                <Pagination
                                    size='small'
                                    count={totalPages}
                                    color="primary"
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={(_, page) => {
                                        if (page !== null) {
                                            getUsers(page)
                                        }
                                    }}
                                />
                            </Stack>
                        </div>
                    </div>
                )
            }
        </div >
    )
}
export default Home;