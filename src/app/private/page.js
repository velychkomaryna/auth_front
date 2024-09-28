'use client'

import React from 'react';
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box } from '@mui/material';
import { privatePage, logout, USER_KEY } from "@/app/api.js";

const PrivatePage = () => {
    const router = useRouter();
    const { data: privateData, isLoading, isError } = useQuery("privateText", privatePage);
    const mutation = useMutation(logout, {
        onSuccess: () => {
            localStorage.removeItem(USER_KEY);
            router.push('/login');
        },
        onError: (error) => {
            console.error('Error!', error.message);
        },
    });

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography color="red">Error fetching data</Typography>;

    return (
      <Container sx={{mt: 10}}>
        <Box sx={{my: 5}}>
          <Typography sx={{fontSize: "3rem", fontWeight: 700}}> Private page for checking authorization</Typography>
          <Typography> {privateData.message} - {privateData.user} </Typography>
        </Box>
        <Button color="primary" variant="contained" onClick={mutation.mutate}>Logout</Button>
      </Container>
    );
  };
  
  export default PrivatePage;