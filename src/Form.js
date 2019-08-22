import React from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios"
import * as Yup from "yup";


function NewUserForm( { values, errors, isSubmitting }) {
    console.log(values.email)
    return (
      <Form>
          <Field type="name" name="name" placeholder="Full Name" />
        <Field type="email" name="email" placeholder="Email" />
        <Field type="password" name="password" placeholder="Password" />
       <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
                    Accept Terms
        </label>
        <button type="submit" disabled={isSubmitting}>Submit!</button>
      </Form>
    );
  }


  
  const FormikNewUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos}) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        tos: tos || false,

      };
    },

    //below are validations
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Name is required"),
        email: Yup.string()
          .email("Email not valid")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required")
      }),
  //end validation


    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        if (values.email === "hello@world.com"){
            setErrors({ email: "That email is taken"})
        } else {
            axios
            .post("https://reqres.in/api/users_", values)
            .then(response=>{
                console.log(response);
                resetForm();
                setSubmitting(false);
            });
        }
    }
  })(NewUserForm);
  
  export default FormikNewUserForm;