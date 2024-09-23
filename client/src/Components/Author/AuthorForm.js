import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";

function AuthorForm() {
    const navigate = useNavigate();

    // Create schema for form validation
    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        genre: yup.string().required("Genre is required"), // Changed to yup.string()
        bio: yup.string().required("Bio is required"),
        image_url: yup.string().required("Image URL is required"),
    });

    // Create useFormik hook
    const formik = useFormik({
        initialValues: {
            name: '',
            genre: '',
            bio: '',
            image_url: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log("Submitting author data:", values);
            fetch("http://127.0.0.1:5555/author", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to create author");
                }
            })
            .then(data => {
                navigate(`/author/${data.id}`); // Corrected to navigate to author page
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
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name && (
                    <h3 style={{ color: "red" }}>{formik.errors.name}</h3>
                )}

                <label htmlFor="genre">Genre</label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    onChange={formik.handleChange}
                    value={formik.values.genre}
                />
                {formik.errors.genre && formik.touched.genre && (
                    <h3 style={{ color: "red" }}>{formik.errors.genre}</h3>
                )}

                <label htmlFor="bio">Bio</label>
                <input
                    type="text"
                    id="bio"
                    name="bio"
                    onChange={formik.handleChange}
                    value={formik.values.bio}
                />
                {formik.errors.bio && formik.touched.bio && (
                    <h3 style={{ color: "red" }}>{formik.errors.bio}</h3>
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

                <input className="button" type="submit" />
            </form>
        </section>
    );
}

export default AuthorForm;