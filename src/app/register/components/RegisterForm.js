"use client";

import { Button, TextField, Box, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from "react-query";
import { register } from "@/app/api.js";
import { useRouter } from "next/navigation";

const passwordHint = "Password must contain at least one number, a lowercase letter, an uppercase letter and a special character (@, $, !, %, *, ?, &)";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Wrong email").required("Required"),
  password1: Yup.string()
        .label("Password")
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be 20 characters or less")
        .matches(/[a-z]/, passwordHint)
        .matches(/[A-Z]/, passwordHint)
        .matches(/[0-9]/, passwordHint)
        .matches(/[@$!%*?&]/, passwordHint)
        .required(),
    password2: Yup.string()
        .label("Re-enter password")
        .oneOf([Yup.ref("password1")], "Passwords must match")
        .required(),
});

export default function RegisterForm() {
  const router = useRouter();
  const mutation = useMutation((data) => register(data), {
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error) => {
      console.log('Error', error);
    },
  });

  return (
    <Formik
      initialValues={{ username: '', email: '', password1: '', password2: '' }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        mutation.mutate(values);
        console.log("Data send")
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Box mb={2}>
            <Field
              name="username"
              as={TextField}
              label="Username"
              fullWidth
              error={touched.username && !!errors.username}
              helperText={touched.username && errors.username}
            />
          </Box>
          <Box mb={2}>
            <Field
              name="email"
              as={TextField}
              label="Email"
              fullWidth
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Box>
          <Box mb={2}>
            <Field
              name="password1"
              as={TextField}
              type="password"
              label="Password"
              fullWidth
              error={touched.password1 && !!errors.password1}
              helperText={touched.password1 && errors.password1}
            />
          </Box>
          <Box mb={2}>
            <Field
              name="password2"
              as={TextField}
              type="password"
              label="Confirm Password"
              fullWidth
              error={touched.password2 && !!errors.password2}
              helperText={touched.password2 && errors.password2}
            />
          </Box>
          <Typography color="red">{mutation.isError && mutation.error.message}</Typography>
          <Button type="submit" variant="contained" color="primary">
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  );
}
