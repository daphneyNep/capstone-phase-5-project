import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState, useRef } from "react";

function BookForm({addBook}) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const formikRef = useRef();

    // Validation schema
    const schema = yup.object().shape({
        author_id: yup.number().required("Author ID is required"),
        title: yup.string().required("Title is required"),
        summary: yup.string().required("Summary is required"),
        image_url: yup.string().required("Image URL is required"),
        comment: yup.string().required("Comment is required")
    });

    // Function to add a book
    const handleAddBook = (values) => {
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
            addBook(data)
            console.log(data);
            navigate('/books'); // Navigate to the new book's page
        })
        .catch(error => {
            console.error("Error creating book:", error.message);
        });
    };

    // Formik setup
    const formik = useFormik({
        initialValues: {
            author_id: '',
            title: '',
            summary: '',
            image_url: '',
            comment: ''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (isEdit) {
                fetch(`http://127.0.0.1:5555/book/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(values),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to update book");
                    return res.json();
                })
                .then(data => {
                    console.log("Book updated:", data);
                    navigate(`/book/${id}`);
                })
                .catch(err => console.error("Error updating book:", err));
            } else {
                handleAddBook(values); // Call the function to add the book
            }
        }
    });

    useEffect(() => {
        formikRef.current = formik;
    }, [formik]);

    // Fetch existing book data
    useEffect(() => {
        if (id) {
            setIsEdit(true);
            fetch(`http://127.0.0.1:5555/book/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch book");
                    return res.json();
                })
                .then(data => {
                    formikRef.current.setValues({
                        author_id: data.author_id,
                        title: data.title,
                        summary: data.summary,
                        image_url: data.image_url,
                        comment: data.comment
                    });
                })
                .catch(err => console.error("Error fetching book data:", err));
        }
    }, [id]);

    return (
        <section>
            <form onSubmit={formik.handleSubmit} className="form">
                <label htmlFor="author_id">Author ID</label>
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
                    type="text"
                    id="summary"
                    name="summary"
                    onChange={formik.handleChange}
                    value={formik.values.summary}
                />
                {formik.errors.summary && formik.touched.summary && (
                    <h3 style={{ color: "red" }}>{formik.errors.summary}</h3>
                )}

                <label htmlFor="image_url">Image URL</label>
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

                <label htmlFor="comment">Comment</label>
                <input
                    type="text"
                    id="comment"
                    name="comment"
                    onChange={formik.handleChange}
                    value={formik.values.comment}
                />
                {formik.errors.comment && formik.touched.comment && (
                    <h3 style={{ color: "red" }}>{formik.errors.comment}</h3>
                )}

                <input className="button" type="submit" value={isEdit ? "Update Book" : "Create Book"} />

                {isEdit && (
                    <button
                        type="button"
                        className="button delete-button"
                        onClick={() => {
                            fetch(`http://127.0.0.1:5555/book/${id}`, { method: "DELETE" })
                                .then(res => {
                                    if (res.ok) {
                                        navigate("/books");
                                    } else {
                                        throw new Error("Failed to delete book");
                                    }
                                })
                                .catch(err => console.error("Error deleting book:", err));
                        }}
                    >
                        Delete Book
                    </button>
                )}
            </form>
        </section>
    );
}

export default BookForm;