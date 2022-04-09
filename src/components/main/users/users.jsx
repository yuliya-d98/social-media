import React from "react";
import User from "./user";
import s from './users.module.css';

const Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                username: "Sveta K.",
                location: {
                    city: "Minsk",
                    country: "Belarus",
                },
                status: "I am so pretty",
                isFollowing: false,
            },
            {
                id: 2,
                username: "Sveta K.",
                location: {
                    city: "Minsk",
                    country: "Belarus",
                },
                status: "I am so pretty",
                isFollowing: true,
            },
            {
                id: 3,
                username: "Sveta K.",
                location: {
                    city: "Minsk",
                    country: "Belarus",
                },
                status: "I am so pretty",
                isFollowing: false,
            },
            {
                id: 4,
                username: "Sveta K.",
                location: {
                    city: "Minsk",
                    country: "Belarus",
                },
                status: "I am so pretty",
                isFollowing: false,
            },
        ]);
    }

    const usersList = props.users.map(u => {
        return <User username={u.username} city={u.location.city} country={u.location.country} isFollowing={u.isFollowing} status={u.status} userId={u.id} follow={props.follow} unfollow={props.unfollow} />
    })

    return (
        <div>
            <h2>Users</h2>
            {usersList}
            <div className={s.showMoreContainer}>
                <p className={s.showMoreBtn}>Show More</p>
            </div>
        </div>
    )
}

export default Users;