import React, { useEffect, useState } from 'react';
import UserListContainer from './UserListContainer';
import UserListForm from './UserListForm';
import Search from '../Search';
import { Link } from 'react-router-dom';

const UserLists = () => {
    const [userList, setUserLists] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUserLists = async () => {
            try {
                const response = await fetch('http://localhost:5555/userlist');
                if (!response.ok) {
                    throw new Error('Failed to fetch userlist');
                }
                const data = await response.json();
                setUserLists(data);
                console.log(data); // Log fetched user lists with associated users
                setError(null); // Clear error if fetch is successful
            } catch (error) {
                console.error('Error fetching userlists:', error);
                setError('Failed to fetch userlists. Please try again later.');
            }
        };

        fetchUserLists(); // Fetch user lists on component mount
    }, []);

    const addUserList = (newUserList) => {
        setUserLists((prevUserLists) => [...prevUserLists, newUserList]); // Add new userList to the list
    };

    const onDeleteUserList = async (userListId) => {
        try {
            const response = await fetch(`http://localhost:5555/userlist/${userListId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete userlist');
            }

            setUserLists((prevUserLists) => prevUserLists.filter((userLists) => userLists.id !== userListId));
            console.log(`Deleted userList with id: ${userListId}`);
        } catch (error) {
            console.error('Error deleting userList:', error);
            setError('Failed to delete userList. Please try again later.');
        }
    };

    const filteredUserLists = userList.filter(userList => 
        userList.users && userList.users.some(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <h1>User Lists</h1>
            {error && <div className="error">{error}</div>} {/* Display error message */}
            <Link to="/userLists">Go to User Lists</Link>
            <Search onSearch={setSearchTerm} />
            <UserListForm addUserList={addUserList} uniqueId={userList.length + 1} /> {/* Pass a uniqueId prop */}

            {filteredUserLists.length > 0 ? (
                <UserListContainer userLists={filteredUserLists} onDeleteUserList={onDeleteUserList} />
            ) : (
                <div>No user lists available</div>
            )}
        </div>
    );
};

export default UserLists;