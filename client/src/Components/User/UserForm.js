import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function UserForm() {
    const navigate = useNavigate();

    // Create schema for form validation
    const schema = yup.object().shape({
        user_id: yup.string().required("User_id is required"),
        username: yup.string().required("Username Id is required"),
        password: yup.number().required("Password ID is required"), // Fixed from inter() to number()
    });

    // Create useFormik hook
    const formik = useFormik({
        initialValues: {
            user_id: '',
            username: '',
            password: '',
        },

        validationSchema: schema,
        onSubmit: (values) => {
            console.log("Submitting user data:", values);  // Debug statement
            fetch("http://127.0.0.1:5555/user", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.error("Something went wrong with POST request");
                    throw new Error("Failed to create user");
                }
            })
            .then(data => {
                navigate(`/user/${data.id}`);
            })
            .catch(error => {
                console.error(error.message);
            });
        }
    });

    return (
        <section>
            <form onSubmit={formik.handleSubmit} className="form">
                <label>user_id</label>
                <input
                    type="number"
                    name="user_id"
                    onChange={formik.handleChange}
                    value={formik.values.user_id}
                />
                {formik.errors.user_id && formik.touched.user_id && (
                    <h3 style={{ color: "red" }}>{formik.errors.user_id}</h3>
                )}

                <label>username</label>
                <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name && (
                    <h3 style={{ color: "red" }}>{formik.errors.name}</h3>
                )}

                <label>password</label>
                <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name && (
                    <h3 style={{ color: "red" }}>{formik.errors.name}</h3>
                )}

                <input className="button" type="submit" />
            </form>
        </section>
    );
}

export default UserForm;