import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";

function UserListForm() {
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
            rating: '', // Initialize rating
        },

        validationSchema: schema,
        onSubmit: (values) => {
            console.log("Submitting userList data:", values);
            fetch("http://127.0.0.1:5555/List", {
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
                <label>book_id</label>
                <input
                    type="number"
                    name="book_id"
                    onChange={formik.handleChange}
                    value={formik.values.book_id} // Correct the field name
                />
                {formik.errors.book_id && formik.touched.book_id && (
                    <h3 style={{ color: "red" }}>{formik.errors.book_id}</h3>
                )}

                <label>user_id</label>
                <input
                    type="number"
                    name="user_id"
                    onChange={formik.handleChange}
                    value={formik.values.user_id} // Correct the field name
                />
                {formik.errors.user_id && formik.touched.user_id && (
                    <h3 style={{ color: "red" }}>{formik.errors.user_id}</h3>
                )}

                <label>rating</label>
                <input
                    type="number"
                    name="rating"
                    onChange={formik.handleChange}
                    value={formik.values.rating} // Ensure value is connected to formik state
                />
                {formik.errors.rating && formik.touched.rating && (
                    <h3 style={{ color: "red" }}>{formik.errors.rating}</h3>
                )}

                <input className="button" type="submit" />
            </form>
        </section>
    );
}

export default UserListForm;