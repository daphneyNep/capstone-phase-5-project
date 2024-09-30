import React from 'react';
import UserCard from './UserCard';
import PropTypes from 'prop-types';

const UserContainer = ({ users = [], onDeleteUser }) => {
    
    return (
        <section>
            <h1>Users</h1>
            <ul className='cards'>
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onDeleteUser={onDeleteUser} // Pass onDeleteUser function
                        
                    />
                ))}
            </ul>
        </section>
    );
};

UserContainer.propTypes = {
    users: PropTypes.array.isRequired, // Ensure users is required
    onDeleteUser: PropTypes.func.isRequired, // Ensure onDeleteUser is a function
};

export default UserContainer;