import React from "react";
import UserCard from "../Components/Users/UserCard"


const UserList = ({ id, users, deleteUser }) => {
    return (
        <div>
            <h2>List of Users</h2>
            <ul className="cards">
                {users.map((user) => (
                    <UserCard 
                        key={id} 
                        user={user} 
                        deleteUser={deleteUser} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default UserList;