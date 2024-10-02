import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const UserListForm = ({ addUserList, uniqueId }) => {
    const navigate = useNavigate();

    // Create schema for form validation
    const schema = yup.object().shape({
        book_id: yup.string().required("Book Id is required"),
        user_id: yup.string().required("User Id is required"),
        rating: yup
            .number()
            .required("Rating is required")
            .min(1, "Rating must be at least 1")
            .max(5, "Rating can't be more than 5"),
    });

    // Create useFormik hook
    const formik = useFormik({
        initialValues: {
            book_id: '',
            user_id: '',
            rating: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log("Submitting userList data:", values);
            fetch("http://127.0.0.1:5555/list", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to create userList");
                }
            })
            .then(data => {
                addUserList(data); // Add the newly created userList to the parent component's state
                navigate(`/userList/${data.id}`); // Navigate to the newly created user list
            })
            .catch(error => {
                console.error(error.message);
                // Optionally, you could set an error state here to inform the user
            });
        }
    });

    return (
        <section>
            <form onSubmit={formik.handleSubmit} className="form">
                <label htmlFor={`book_id-${uniqueId}`}>Book ID</label>
                <input
                    type="number"
                    id={`book_id-${uniqueId}`} // Unique ID for book_id
                    name="book_id"
                    onChange={formik.handleChange}
                    value={formik.values.book_id}
                />
                {formik.errors.book_id && formik.touched.book_id && (
                    <h3 style={{ color: "red" }}>{formik.errors.book_id}</h3>
                )}

                <label htmlFor={`user_id-${uniqueId}`}>User ID</label>
                <input
                    type="number"
                    id={`user_id-${uniqueId}`} // Unique ID for user_id
                    name="user_id"
                    onChange={formik.handleChange}
                    value={formik.values.user_id}
                />
                {formik.errors.user_id && formik.touched.user_id && (
                    <h3 style={{ color: "red" }}>{formik.errors.user_id}</h3>
                )}

                <label htmlFor={`rating-${uniqueId}`}>Rating</label>
                <input
                    type="number"
                    id={`rating-${uniqueId}`} // Unique ID for rating
                    name="rating"
                    onChange={formik.handleChange}
                    value={formik.values.rating}
                />
                {formik.errors.rating && formik.touched.rating && (
                    <h3 style={{ color: "red" }}>{formik.errors.rating}</h3>
                )}

                <input className="button" type="submit" value="Add User List" />
            </form>
        </section>
    );
}

export default UserListForm;