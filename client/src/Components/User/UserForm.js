import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";

function UserForm({ users = [], userToEdit }) { // Add userToEdit prop
  const navigate = useNavigate();

  // Create schema for form validation
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  // Initialize formik with initial values based on userToEdit
  const formik = useFormik({
    initialValues: {
      username: userToEdit ? userToEdit.username : '', // Set to existing user data if editing
      password: userToEdit ? userToEdit.password : '', // Set to existing user data if editing
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const method = userToEdit ? "PUT" : "POST"; // Determine the method based on userToEdit
      const url = userToEdit
        ? `http://127.0.0.1:5555/user/${userToEdit.id}` // Update URL to include user ID
        : "http://127.0.0.1:5555/user"; // Default URL for creating a new user

      console.log("Submitting user data:", values);
      fetch(url, {
        method: method,
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Failed to create/update user");
          }
        })
        .then(data => {
          navigate(`/user/${data.id}`);
        })
        .catch(error => {
          console.error(error.message);
        });
    },
  });

  return (
    <div className="new-user-form">
      <h2>{userToEdit ? "Edit User" : "Create User"}</h2> {/* Change title based on edit */}
      <form onSubmit={formik.handleSubmit}>
        <div className="preferred">
          <label className="large-label" htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            required
          />
        </div><br />
        <div className="preferred">
          <label className="large-label" htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />
        </div><br />
        <button type="submit">{userToEdit ? "Update User" : "Add User"}</button> {/* Change button text */}
      </form>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;