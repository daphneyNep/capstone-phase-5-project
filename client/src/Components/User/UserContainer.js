import React from "react";
import UserCard from "./UserCard";

function UserContainer({ users, onDeleteUser }) {
    return (
        <section>
            <ul className='cards'>
                {users.map(user => (
                    <UserCard 
                        key={user.id}  // Use user.id here
                        user={user} 
                        onDeleteUser={onDeleteUser} 
                    />
                ))}
            </ul>
        </section>
    );
}

export default UserContainer;