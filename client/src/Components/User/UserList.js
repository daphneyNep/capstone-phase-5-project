import React, { useEffect, useState } from 'react';
import UserContainer from './UserContainer';
import UserForm from './UserForm';
import Search from '../Search';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5555/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
                console.log(data); // Log fetched users
                setError(null); // Clear error if fetch is successful
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users. Please try again later.');
            }
        };

        fetchUsers(); // Fetch users on component mount
    }, []);

    const addUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]); // Add new user to the list
    };

    const onDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5555/users/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            console.log(`Deleted user with id: ${userId}`);
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user. Please try again later.');
        }
    };

    // Ensure `user.name` exists; change to the correct property if necessary
    const filteredUsers = users.filter(user =>
        user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>User List</h1>
            {error && <div className="error">{error}</div>} {/* Display error message */}
            <Search onSearch={setSearchTerm} />
            <UserForm addUser={addUser} />
            {filteredUsers.length > 0 ? (
                <UserContainer users={filteredUsers} onDeleteUser={onDeleteUser} />
            ) : (
                <div>No users available</div>
            )}
        </div>
    );
};

export default UserList;