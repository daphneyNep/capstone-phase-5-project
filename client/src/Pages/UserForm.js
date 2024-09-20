import React from "react"
import { useState} from "react"
import { useNavigate } from "react-router-dom"

const UserForm = ({ addUser }) => {
  const [userForm, setUserForm] = useState({
    Id: "",
    UserName: "",
    Password: ""
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const newUser = {
      ...userForm,
      [event.target.name]: event.target.value
    };
    setUserForm(newUser);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    fetch("http://localhost:5555/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "content-Type": "application/json"
      },
      body: JSON.stringify(userForm)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`Server responded with ${response.status}: ${errorData.message}`);
          });
        }
        return response.json();
      })
      .then(addedUser => {
        addUser(addedUser);
        navigate("/Users");
      })
      .catch(error => console.error('Error adding User:', error));
  }

  return (
    <div className="new-user-form">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="preferred">
          <label className="large-label" htmlFor="UserName">UserName: </label>
          <input
            type="text"
            name="UserName"
            id="UserName"
            value={userForm.UserName} // Corrected here
            onChange={handleChange}
            required
          />
        </div><br />
        <div className="preferred">
          <label className="large-label" htmlFor="Password">Password: </label>
          <input
            type="text"
            name="Password"
            id="Password"
            value={userForm.Password} // Corrected here
            onChange={handleChange}
            required
          />
        </div><br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserForm