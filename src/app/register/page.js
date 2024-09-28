"use client"

import { Container, Typography } from '@mui/material';
import RegisterForm from './components/RegisterForm';

export default function RegisterPage() {
  return (
    <Container sx={{mt: 10}}>
      <Typography sx={{fontSize: "3rem", fontWeight: 700}}>Register</Typography>
      <RegisterForm />
    </Container>
  );
}
