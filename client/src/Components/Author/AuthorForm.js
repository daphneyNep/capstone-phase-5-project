import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";

function AuthorForm() {
    const navigate = useNavigate();

    // Create schema for form validation
    const schema = yup.object().shape({
        author_name: yup.string().required("Book Name is required"),
        author_genre: yup.number().required("Author Genre is required"), 
        bio: yup.content().required("Bio is required"),
        image_url: yup.string().required("Image URL is required")
    });

    // Create useFormik hook
    const formik = useFormik({
        initialValues: {
            book_name: '',
            author_genre: '',
            bio:'',
            image_url: '',
        },

        validationSchema: schema,
        onSubmit: (values) => {
            console.log("Submitting author data:", values);  // Debug statement
            fetch("http://127.0.0.1:5555/author", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.error("Something went wrong with POST request");
                    throw new Error("Failed to create book");
                }
            })
            .then(data => {
                navigate(`/book/${data.id}`);
            })
            .catch(error => {
                console.error(error.message);
            });
        }
    });

    return (
        <section>
            <form onSubmit={formik.handleSubmit} className="form">
                <label>Author_Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name && (
                    <h3 style={{ color: "red" }}>{formik.errors.name}</h3>
                )}

                <label>Author_genre</label>
                <input
                    type="text"
                    name="author_genre"
                    onChange={formik.handleChange}
                    value={formik.values.author_genre}
                />
                {formik.errors.author_genre && formik.touched.author_genre && (
                    <h3 style={{ color: "red" }}>{formik.errors.author_genre}</h3>
                )}

                <label>Bio</label>
                <input
                    type="text"
                    name="bio"
                    onChange={formik.handleChange}
                    value={formik.values.bio}
                />
                {formik.errors.bio && formik.touched.bio && (
                    <h3 style={{ color: "red" }}>{formik.errors.bio}</h3>
                )}


                <label>Image_url</label>
                <input
                    type="text"
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

export default AuthorForm;