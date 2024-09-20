import React from "react";
import UserListCard from "./UserListCard";

function UserListContainer({ user_id, book_id, rating, onDeleteUserList}) {
    return (
        <section>
            <ul className='cards'>
                {userLists.map(userList => (
                    <UserCard 
                        key={user_id} 
                        book_id={book_id} 
                        rating={rating}
                        onDeleteUser={onDeleteUserList} 
                    />
                ))}
            </ul>
        </section>
    );
}

export default UserListContainer;