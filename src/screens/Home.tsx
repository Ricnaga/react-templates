import { useFormik } from 'formik';
import { useAxios } from '../application/api/axios/useAxios';

enum HomeData {
  USER = 'user',
  PASSWORD = 'password',
}

export function HomeScreen() {
  const {
    functions: { callGETMethod },
  } = useAxios();
  const formik = useFormik({
    initialValues: {
      [HomeData.USER]: '',
      [HomeData.PASSWORD]: '',
    },
    onSubmit: async () => callGETMethod<{ message: string }>({ url: '/user' }),
  });
  return (
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
  );
}
