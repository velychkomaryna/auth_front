"use client"

import { Container, Typography } from '@mui/material';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  return (
    <Container sx={{mt: 10}}>
      <Typography sx={{fontSize: "3rem", fontWeight: 700}}>Login</Typography>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
