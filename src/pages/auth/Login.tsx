import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

import "./login.css";

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required("Kullanıcı adı zorunludur"),
  password: Yup.string().required("Şifre zorunludur"),
});
console.log("başladı");

const LoginPage = () => {
  const initialValues = {
    userName: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRecaptcha = (value: any) => {
    // ReCAPTCHA doğrulama işlemlerini burada gerçekleştirin
    console.log("ReCAPTCHA value:", value);
  };
  const handleSubmit = (values: any) => {
    // Form submit işlemlerini burada gerçekleştirin
    console.log("Form submitted with values:", values);
  };
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Yönlendirme işlemi
    navigate("/p8-admin/dashboard");
  };

  return (
    <div className="login-page">
      <div className=" col-lg-4 mx-auto">
        <div className="login-container card-body px-5 py-5">
          <h1 className="card-title text-center mb-3 text-center login-card-text">
            P8Rent
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <div className="form-group">
                <label className="login-label">Kullanıcı Adı *</label>
                <Field
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder="Kullanıcı Adı"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label className="login-label">Şifre *</label>
                <div className="password-input">
                  <Field
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    placeholder="******"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <ErrorMessage
                  
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <button
  type="submit"
  className="btn btn-primary btn-block enter-btn"
>
  Giriş Yap
</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
