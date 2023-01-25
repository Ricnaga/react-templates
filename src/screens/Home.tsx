import { useState } from 'react';
import { useFormik } from 'formik';
import { useAxios } from '../application/api/axios/useAxios';

enum HomeData {
  USER = 'user',
  PASSWORD = 'password',
}

type Response = { message: string };

export function HomeScreen() {
  const {
    functions: { callGETMethod },
  } = useAxios();

  const [response, setResponse] = useState<Response | null>(null);

  const formik = useFormik({
    initialValues: {
      [HomeData.USER]: '',
      [HomeData.PASSWORD]: '',
    },
    onSubmit: async () =>
      callGETMethod<Response>({ url: '/user' }).then((response) =>
        setResponse(response.data),
      ),
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="USER"
          name={HomeData.USER}
          onChange={formik.handleChange}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          name={HomeData.PASSWORD}
          onChange={formik.handleChange}
        />
        <button type="submit">ENVIAR</button>
      </form>

      {response && <h1>{response.message}</h1>}
    </div>
  );
}
