import React from "react";
import UserListCard from "./UserListCard"; 
import PropTypes from "prop-types";

const UserListContainer = ({
    userLists = [],
    onDeleteUserList,
    books = [],
    addComments,
    addRatings,
    users = [],
}) => {
    console.log("Users data:", users);

    const handleSelectedBook = (userListsId, bookId) => {
        console.log(`UserLists ID: ${userListsId}, Book ID: ${bookId}`);
    };

    return (
        <section>
            <h1>Users</h1>
            {users.length === 0 ? (
                <p>No users available</p>
            ) : (
                users.map((user) => (
                    <UserListCard 
                        key={user.id}
                        userLists={userLists} 
                        user={user} // Pass the single user object
                        books={books}
                        onSelectedBook={handleSelectedBook}
                        onDeleteUserList={onDeleteUserList}
                        addComment={addComments} 
                        addRatings={addRatings}
                    />
                ))
            )}
        </section>
    );
};

UserListContainer.propTypes = {
    userLists: PropTypes.array,
    onDeleteUserList: PropTypes.func.isRequired,
    books: PropTypes.array,
    addComments: PropTypes.func.isRequired,
    addRatings: PropTypes.func.isRequired,
    users: PropTypes.array,
};

export default UserListContainer;