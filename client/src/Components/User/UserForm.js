import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";

function UserForm({ users = [] }) { // Default to an empty array
  const navigate = useNavigate();

  // Create schema for form validation
  const schema = yup.object().shape({
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required")
  });

  const formik = useFormik({
    initialValues: {
        username: '',
        password: ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
        console.log("Submitting user data:", values);
        fetch("http://127.0.0.1:5555/user", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Failed to create user");
            }
        })
        .then(data => {
            navigate(`/user/${data.id}`);
        })
        .catch(error => {
            console.error(error.message);
        });
    }
  });

  return (
    <div className="new-user-form">
      <h2>Create User</h2>
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
        <button type="submit">Add User</button>
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