import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios"
import * as Yup from "yup";


const NewUserForm =( { values, errors, touched, status }) => {
///this portion is to render the results on the screen
    const [users, setUsers] = useState([]);
    useEffect(() => {
      if (status) {
        setUsers([...users, status]);
      }
    }, [status]); //if changed to [users] this will not work

//////////
///this portion of code is the actual form and fields, pay attention to capitalization
    return (
        <div className="user-form">
            <div className="enter-to-win">ENTER TO WIN</div>
      <Form className="form-field-container">
        <Field type="name" name="name" placeholder="Full Name" />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}
        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
       <label className="checkboxContainer">
        <Field type="checkbox" name="tos" checked={values.tos} className="checkbox"/>
                    Accept Terms
        </label>

        <button type="submit">Submit!</button>
      </Form>

      {/* This portion of code is ALSO needed to render the results to the screen.  */}
{users.map(user => (
    <ul key={user.id}>
      <li>Name: {user.name}</li>
      <li>Email: {user.email}</li>
      
    </ul>
  ))}



      </div>
    );
  }


  
  const FormikNewUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos}) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        tos: tos || false

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
          .required("Password is required")
      }),
  //end validation


    handleSubmit(values, { setStatus }) {
            axios.post("https://reqres.in/api/users/", values)
            .then(response=>{
                console.log(response);
                setStatus(response.data);
            
            })
            .catch(err => console.log(err.response));
        }
    }
  )(NewUserForm);
  
  export default FormikNewUserForm;