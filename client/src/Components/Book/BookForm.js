import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function BookForm() {
    const navigate = useNavigate();

    // Create schema for form validation
    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        book_id: yup.string().required("Book Id is required"),
        author_id: yup.number().required("Author ID is required"), // Fixed from inter() to number()
        image_url: yup.string().required("Image URL is required"),
    });

    // Create useFormik hook
    const formik = useFormik({
        initialValues: {
            title: '',
            book_id: '',
            author_id: '',
            image_url: '',
        },

        validationSchema: schema,
        onSubmit: (values) => {
            console.log("Submitting book data:", values);  // Debug statement
            fetch("http://127.0.0.1:5555/book", {
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
                <label>Title</label>
                <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name && (
                    <h3 style={{ color: "red" }}>{formik.errors.name}</h3>
                )}

                <label>Book_Id</label>
                <input
                    type="number"
                    name="book_id"
                    onChange={formik.handleChange}
                    value={formik.values.book_id}
                />
                {formik.errors.book_id && formik.touched.book_id && (
                    <h3 style={{ color: "red" }}>{formik.errors.book_id}</h3>
                )}

                <label>Author_Id</label>
                <input
                    type="number"
                    name="author_id"
                    onChange={formik.handleChange}
                    value={formik.values.author_id}
                />
                {formik.errors.author_id && formik.touched.author_id && (
                    <h3 style={{ color: "red" }}>{formik.errors.author_id}</h3>
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

export default BookForm;