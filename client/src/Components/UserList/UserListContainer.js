import React from "react";
import UserListCard from "./UserListCard"; 
import PropTypes from "prop-types";

const UserListContainer = ({
    userLists = [],
    onDeleteUserList,
    books = [],
    addComments,
    comments,
    users,
}) => {
    // Moved console.log here for debugging purposes
    console.log("User data:", users);

    const handleSelectedBook = (userListId, bookId) => {
        console.log(`UserLists ID: ${userListId}, Book ID: ${bookId}`);
    };

    const handleAddComments = (userListId, comment) => {
        console.log(`Adding comment to userList ${userListId}: ${comment}`);
        // Update the state or perform the necessary action
    };
    

    return (
        <section>
            <h1>Users</h1>
            {userLists.length === 0 ? (
                <p>No user lists available</p>
            ) : (
                userLists.map((userList) => {
                    // Find the corresponding user for each userList
                    const user = users.find(u => u.id === userList.userId); // Correctly use userList here
                    
                    return (
                        <UserListCard 
                            key={userList.id}  // Use userList.id for the key
                            userList={userList} // Pass the correct userList object
                            user={user} 
                            books={books}
                            onSelectedBook={handleSelectedBook}
                            onDeleteUserList={onDeleteUserList}
                            addComments={handleAddComments} 
                            comments={comments}
                        />
                    );
                })
            )}
        </section>
    );
};

UserListContainer.propTypes = {
    userLists: PropTypes.array,  // Specify as required
    onDeleteUserList: PropTypes.func.isRequired,
    onSelectedBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    addComments: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired // Specify as required
};

export default UserListContainer;