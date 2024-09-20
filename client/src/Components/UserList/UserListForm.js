import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function UserListForm() {
    const navigate = useNavigate();

    // Create schema for form validation
    const schema = yup.object().shape({
        book_id: yup.string().required("Book Id is required"),
        user_id: yup.string().required("User Id is required"),
        rating: yup.number().required("Rating is required"), // Fixed from inter() to number()
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
            console.log("Submitting userList data:", values);  // Debug statement
            fetch("http://127.0.0.1:5555/userList", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.error("Something went wrong with POST request");
                    throw new Error("Failed to create userList");
                }
            })
            .then(data => {
                navigate(`/userList/${data.id}`);
            })
            .catch(error => {
                console.error(error.message);
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
                    value={formik.values.book_id}
                />
                {formik.errors.book_id && formik.touched.book_id && (
                    <h3 style={{ color: "red" }}>{formik.errors.book_id}</h3>
                )}

                <label>user_id</label>
                <input
                    type="number"
                    name="user_id"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.user_id && formik.touched.user_id && (
                    <h3 style={{ color: "red" }}>{formik.errors.user_id}</h3>
                )}

                <label>rating</label>
                <input
                    type="number"
                    name="rating"
                    onChange={formik.handleChange}
                    value={formik.values.rating}
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