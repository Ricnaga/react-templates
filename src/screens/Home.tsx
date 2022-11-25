import { useFormik } from "formik";
import React from "react";
import { useAxios } from "../application/api/axios/useAxios";

export function HomeScreen() {
  const {
    functions: { callEndpointGET },
  } = useAxios();
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    onSubmit: async (values) =>
      callEndpointGET<{ message: string }>({ url: "/user" }).then((response) =>
        console.log(response.data.message)
      ),
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
          type="password"
          placeholder="PASSWORD"
          name="password"
          onChange={formik.handleChange}
        />
        <button type="submit">ENVIAR</button>
      </form>
    </>
  );
}
