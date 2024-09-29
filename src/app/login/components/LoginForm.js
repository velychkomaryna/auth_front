"use client"

import { Button, TextField, Box, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { useRouter } from "next/navigation";
import { login, USER_KEY } from "@/app/api.js";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Wrong email").required("Required"),
  password: Yup.string().label("Password").label("Password").required(),
});

export default function LoginForm() {
  const router = useRouter();

  const mutation = useMutation(login, {
    onSuccess: (user) => {
      localStorage.setItem(USER_KEY, user);
      router.push('/private');
   },
    onError: (error) => {
      console.log('Error: ', error.message);
    },
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        mutation.mutate(values);
        console.log("Data send")
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Box mb={2}>
            <Field
              name="email"
              as={TextField}
              label="Emamil"
              fullWidth
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Box>
          <Box mb={2}>
            <Field
              name="password"
              as={TextField}
              type="password"
              label="Password"
              fullWidth
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />
          </Box>
          <Typography color="red">{mutation.isError && mutation.error.message}</Typography>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}