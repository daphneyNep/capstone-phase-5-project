import React, { useEffect, useState } from 'react';
import UserListContainer from './UserListContainer';
import UserListForm from './UserListForm';
import Search from '../Search';

const UserList = () => {
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUserLists = async () => {
            try {
                const response = await fetch('http://localhost:5555/userLists');
                if (!response.ok) {
                    throw new Error('Failed to fetch userLists');
                }
                const data = await response.json();
                setUserLists(data);
                console.log(data); // Log fetched user lists with associated users
                setError(null); // Clear error if fetch is successful
            } catch (error) {
                console.error('Error fetching userLists:', error);
                setError('Failed to fetch userLists. Please try again later.');
            }
        };

        fetchUserLists(); // Fetch user lists on component mount
    }, []);

    const addUserList = (newUserList) => {
        setUserLists((prevUserLists) => [...prevUserLists, newUserList]); // Add new userList to the list
    };

    const onDeleteUserList = async (userListId) => {
        try {
            const response = await fetch(`http://localhost:5555/userLists/${userListId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete userList');
            }

            setUserLists((prevUserLists) => prevUserLists.filter((userList) => userList.id !== userListId));
            console.log(`Deleted userList with id: ${userListId}`);
        } catch (error) {
            console.error('Error deleting userList:', error);
            setError('Failed to delete userList. Please try again later.');
        }
    };

    // Filter userLists by username
    const filteredUserLists = userLists.filter(userList =>
        userList.users.some(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <h1>User List</h1>
            {error && <div className="error">{error}</div>} {/* Display error message */}
            <Link to="/userLists">Go to User Lists</Link>
            <Search onSearch={setSearchTerm} />
            <UserListForm addUserList={addUserList} />
            {filteredUserLists.length > 0 ? (
                <UserListContainer userLists={filteredUserLists} onDeleteUserList={onDeleteUserList} />
            ) : (
                <div>No user lists available</div>
            )}
        </div>
    );
};

export default UserList;