import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";

function BookForm() {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        author_id: yup.string().required("Author_id is required"),
        title: yup.string().required("Title is required"),
        summary: yup.number().required("Summary is required"),
        image_url: yup.string().required("Image URL is required"),
    });

    const formik = useFormik({
        initialValues: {
            author_id: '',
            title: '',
            summary: '',
            image_url: '',
        },

        validationSchema: schema,
        onSubmit: (values) => {
            console.log("Submitting book data:", values);
            fetch("http://127.0.0.1:5555/book", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to create book");
                }
            })
            .then(data => {
                navigate(`/book/${data.id}`); // Corrected to navigate to author page
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
                <label htmlFor="author_id">Author_id</label>
                <input
                    type="number"
                    id="author_id"
                    name="author_id"
                    onChange={formik.handleChange}
                    value={formik.values.author_id}
                />
                {formik.errors.author_id && formik.touched.author_id && (
                    <h3 style={{ color: "red" }}>{formik.errors.author_id}</h3>
                )}

                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                {formik.errors.title && formik.touched.title && (
                    <h3 style={{ color: "red" }}>{formik.errors.title}</h3>
                )}

                <label htmlFor="summary">Summary</label>
                <input
                    type="textr"
                    id="summary"
                    name="summary"
                    onChange={formik.handleChange}
                    value={formik.values.summary}
                />
                {formik.errors.summary && formik.touched.summary && (
                    <h3 style={{ color: "red" }}>{formik.errors.summary}</h3>
                )}

                <label htmlFor="image_url">Image Url</label>
                <input
                    type="text"
                    id="image_url"
                    name="image_url"
                    onChange={formik.handleChange}
                    value={formik.values.image_url}
                />
                {formik.errors.image_url && formik.touched.image_url && (
                    <h3 style={{ color: "red" }}>{formik.errors.image_url}</h3>
                )}

                <input className="button" type="submit" />
            </form>
        </section>
    );
}

export default BookForm;