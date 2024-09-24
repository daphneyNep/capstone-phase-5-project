import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import React from "react";

function CommentForm() {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        content: yup.string().required("Required"),
        book_id: yup.string().required("Required"),
        user_id: yup.string().required("Required"),
        image_url: yup.string().required("Required").url("Must be a valid URL"),
        created_at: yup.string().required("Required"),
        updated_at: yup.string().required("Required"),
    });

    const formik = useFormik({
        initialValues: {
            content: "",
            book_id: "",
            user_id: "",
            image_url: "",
            created_at: "",
            updated_at: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            fetch("/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then((res) => {
                console.log('Response Status:', res.status); 

                return res.text().then((text) => {
                    console.log('Response Text:', text); 

                    if (res.ok) {
                        const jsonResponse = JSON.parse(text); 
                        navigate(`/comments/${jsonResponse.id}`);
                    } else {
                        console.error("Error response:", text); 
                    }
                });
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
        },
    });

    return (
        <section>
            <form onSubmit={formik.handleSubmit} className="form">
                <label htmlFor="content">Comment</label>
                <input
                    type="text"
                    id="content"
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.content && formik.errors.content ? (
                    <p style={{ color: "red" }}>{formik.errors.content}</p>
                ) : null}

                <label htmlFor="book_id">Book ID</label>
                <input
                    type="number" // Use type="number" for IDs
                    id="book_id"
                    name="book_id"
                    value={formik.values.book_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.book_id && formik.errors.book_id ? (
                    <p style={{ color: "red" }}>{formik.errors.book_id}</p>
                ) : null}

                <label htmlFor="user_id">User ID</label>
                <input
                    type="number" // Use type="number" for IDs
                    id="user_id"
                    name="user_id"
                    value={formik.values.user_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.user_id && formik.errors.user_id ? (
                    <p style={{ color: "red" }}>{formik.errors.user_id}</p>
                ) : null}

                <label htmlFor="image_url">Image URL</label>
                <input
                    type="url" // Use type="url" for the image URL input
                    id="image_url"
                    name="image_url"
                    value={formik.values.image_url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.image_url && formik.errors.image_url ? (
                    <p style={{ color: "red" }}>{formik.errors.image_url}</p>
                ) : null}

                <label htmlFor="created_at">Created At</label>
                <input
                    type="text"
                    id="created_at"
                    name="created_at"
                    value={formik.values.created_at}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.created_at && formik.errors.created_at ? (
                    <p style={{ color: "red" }}>{formik.errors.created_at}</p>
                ) : null}

                <label htmlFor="updated_at">Updated At</label>
                <input
                    type="text"
                    id="updated_at"
                    name="updated_at"
                    value={formik.values.updated_at}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.updated_at && formik.errors.updated_at ? (
                    <p style={{ color: "red" }}>{formik.errors.updated_at}</p>
                ) : null}

                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default CommentForm;