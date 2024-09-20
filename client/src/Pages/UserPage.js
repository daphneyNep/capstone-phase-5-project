import React from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import Search from "./Search";




const UserPage = ({ users, setTerm, term, addUser, deleteUser }) => {
    return (
        <div>
            <UserForm addUser={addUser} />
            <Search setTerm={setTerm} term={term} />
            <UserList users={users} deleteuser={deleteUser} />
        </div>
    );
}

export default UserPage