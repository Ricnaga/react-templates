import { useFormik } from "formik";
import React from "react";

export function App() {
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    onSubmit: (values) => console.log(values),
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="USER"
          name="user"
          onChange={formik.handleChange}
        />
        <input
          type="text"
          placeholder="PASSWORD"
          name="password"
          onChange={formik.handleChange}
        />
        <button type="submit">ENVIAR</button>
      </form>
    </>
  );
}
