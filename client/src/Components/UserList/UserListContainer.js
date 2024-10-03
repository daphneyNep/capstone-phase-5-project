import React from "react";
import UserListCard from "./UserListCard"; 
import PropTypes from "prop-types";

const UserListContainer = ({
    userLists = [],
    onDeleteUserList,
    onSelectedBook,
    books = [],
    addComments,
    comments,
    users = []
}) => {
    // Console log for debugging userLists and users
    // console.log("UserLists data:", userLists);
    console.log("User data:", users);

    // const handleSelectedBook = (userListId, bookId) => {
    //     console.log(`UserList ID: ${userListId}, Book ID: ${bookId}`);
    // };

    // const handleAddComments = (userListId, comment) => {
    //     console.log(`Adding comment to UserList ${userListId}: ${comment}`);
    //     // Perform the necessary action
    // };

    return (
        <section>
            <h1>Users</h1>
            {userLists.length === 0 ? (
                <p>No user lists available</p>
            ) : (
                users.map((user) => (
                    <UserListCard
                        key={user.id} // Use user.id for the key
                        userLists={userLists} // Pass the correct userLists array
                        user={user} // Pass the corresponding user
                        books={books}
                        onSelectedBook={onSelectedBook}
                        onDeleteUserList={onDeleteUserList}
                        addComments={addComments}
                        comments={comments}
                    />
                ))
            )}
        </section>
    );
};

UserListContainer.propTypes = {
    userLists: PropTypes.array.isRequired,
    onDeleteUserList: PropTypes.func.isRequired,
    books: PropTypes.array,
    addComments: PropTypes.func.isRequired,
    comments: PropTypes.array,
    users: PropTypes.array,
};

export default UserListContainer;