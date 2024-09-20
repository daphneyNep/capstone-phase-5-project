import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function CommentForm() {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        content: yup.string().required("Required"),
        author_id: yup.string().required("Required"),
        book_id: yup.string().required("Required"),
        user_id: yup.string().required("Required"),
        created_at: yup.string().required("Required"),
        updated_at: yup.string().required("Required"),
    });

    const formik = useFormik({
        initialValues: {
            content: "",
            author_id: "",
            book_id: "",
            user_id: "",
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
        <form onSubmit={formik.handleSubmit}         className="form">
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

                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formik.values.author_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.author_id && formik.errors.author_id ? (
                    <p style={{ color: "red" }}>{formik.errors.author_id}</p>
                ) : null}

                <label htmlFor="song">Song</label>
                <input
                    type="text"
                    id="song_id"
                    name="song_id"
                    value={formik.values.song_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.song_id && formik.errors.song_id ? (
                    <p style={{ color: "red" }}>{formik.errors.song_id}</p>
                ) : null}

                <label htmlFor="User">User</label>
                <input
                    type="text"
                    id="user_id"
                    name="user_id"
                    value={formik.values.user_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.user_id && formik.errors.user_id ? (
                    <p style={{ color: "red" }}>{formik.errors.user_id}</p>
                ) : null}

                <label htmlFor="bio">Bio</label>
                <input
                    type="text"
                    id="bio"
                    name="bio"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.bio && formik.errors.biography ? (
                    <p style={{ color: "red" }}>{formik.errors.bio}</p>
                ) : null}

                <label htmlFor="created">Created at</label>
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

                <label htmlFor="updated">Updated at</label>
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