import React from "react";
import UserListCard from "./UserListCard"; // Import your UserListCard component
import PropTypes from "prop-types";

const UserListContainer = ({
    userLists = {}, // Default to an empty array if userLists is undefined
    onDeleteUserList,
    books = [], // Default to an empty array if books is undefined
    addComments,
    addRatings,
    users= {}, // Default to an empty array if users is undefined
}) => {
    console.log("Users data:", users);

    const handleSelectedBook = (userListsId, bookId) => {
        console.log(`UserLists ID: ${userListsId}, Book ID: ${bookId}`);
        // Your logic here
    };

    return (
        <section>
            <h1>Users</h1>
            <ul className='cards'>
                {userLists.map((userLists) => (
                    <UserListCard
                        key={userLists.id} // Use unique key for each userList
                        userLists={userLists} // Pass individual userList, not the entire array
                        users={users}
                        books={books}
                        onSelectedBook={handleSelectedBook} // Ensure this prop is used correctly
                        onDeleteUserList={onDeleteUserList}
                        addComment={addComments} // Ensure prop name matches with UserListCard
                        addRatings={addRatings}
                    />
                ))}
            </ul>
        </section>
    );
};

UserListContainer.propTypes = {
    userLists: PropTypes.array.isRequired, // Expecting userLists to be an array, not an object
    onDeleteUserList: PropTypes.func.isRequired, // Ensure onDeleteUserList is a function
    books: PropTypes.array.isRequired, // Ensure books is required
    addComments: PropTypes.func.isRequired, // Ensure addComments is required
    addRatings: PropTypes.func.isRequired, // Ensure addRatings is required
    users: PropTypes.array.isRequired, // Ensure users is required
};

export default UserListContainer;