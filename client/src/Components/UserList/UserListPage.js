import React, { useState } from 'react';
import UserListContainer from './UserListContainer';
import UserListForm from './UserListForm';

function UserListPage() {
    const [userLists, setUserLists] = useState([]);  // Manage userLists in the parent component

    // Function to add a new userList to the list
    const addUserList = (newUserList) => {
        setUserLists([...userLists, newUserList]);
    };

    // Function to delete a userlist
    const onDeleteUserList = (id) => {
        setUserLists(userLists.filter(userList => userList.id !== id));
    };

    return (
        <div>
            {/* Pass addUserList to UserListForm */}
            <UserListForm addUserList={addUserList} />

            {/* Pass the list of userLists and deleteUserList to UserListContainer */}
            <UserListContainer userLists={userLists} onDeleteUserList={onDeleteUserList} />
        </div>
    );
}

export default UserListPage;