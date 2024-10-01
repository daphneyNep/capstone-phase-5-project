import React from 'react';
import { useParams } from 'react-router-dom';

const UserListComments = () => {
    const { username } = useParams(); // Get the userList ID from the URL

    return (
        <div>
            <h2>Comments for User List username: {username}</h2>
            {/* Your logic to fetch and display comments for this user list */}
        </div>
    );
};

export default UserListComments;