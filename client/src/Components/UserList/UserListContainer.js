import React from "react";
import UserListCard from "./UserListCard"; // Import your UserListCard component
import PropTypes from "prop-types";

const UserListContainer = ({
    userLists = [], // Default to an empty array if userLists is undefined
    onDeleteUserList,
    onSelectedBook, // Use onSelectBook instead of onSelectedBook
    books = [], // Default to an empty array if books is undefined
    addComments,
    addRatings,
    users // Receive the users prop
}) => {
    // Log the users data here
    console.log(users); // This will log the users to the console when UserListContainer is rendered
    console.log("onSelectedBook:", onSelectedBook);


    return (
        <section>
            <h1>Users</h1>
            <ul className='cards'>
                {userLists.map((userList) => (
                    <UserListCard
                        key={userList.id} // Ensure key is unique
                        userList={userList} // Pass the entire userList object
                        users={users} // Pass the users to UserListCard if needed
                        onSelectedBook={onSelectedBook} // Pass the renamed function
                        onDeleteUserList={onDeleteUserList} // Pass onDeleteUserList function
                        books={books} // Pass the list of books
                        addComments={addComments} // Pass the addComment function
                        addRatings={addRatings} // Corrected from addRating to addRatings
                        comments={[]} // Pass comments if applicable
                        ratings={[]} // Pass ratings if applicable
                    />
                ))}
            </ul>
        </section>
    );
};

UserListContainer.propTypes = {
    userLists: PropTypes.array.isRequired, // Ensure userLists is required
    onDeleteUserList: PropTypes.func.isRequired, // Ensure onDeleteUserList is a function
    onSelectedBook: PropTypes.array.isRequired, // Ensure onSelectBook is required
    books: PropTypes.array.isRequired, // Ensure books is required
    addComments: PropTypes.func.isRequired, // Ensure addComments is required
    addRatings: PropTypes.func.isRequired, // Ensure addRatings is required
    users: PropTypes.array.isRequired, // Ensure users is required
};

export default UserListContainer;