import { useFormik } from "formik";
import React, { useEffect } from "react";
import { endpointGET } from "./application/api/axios";

export function App() {
  useEffect(() => {
    endpointGET("endpoint");
  }, []);

  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    onSubmit: async (values) => endpointGET("endpoint"),
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
