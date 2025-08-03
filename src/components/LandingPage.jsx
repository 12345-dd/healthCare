import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, TextField, Button, Container } from '@mui/material';
import Grid from "@mui/material/Grid"
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://healthcarebackend-8uiv.onrender.com/doctors')
      .then(res => setDoctors(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, mt: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">Find a Doctor</Typography>
        <TextField
            label="Search by name or specialization"
            variant="outlined"
            fullWidth
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
            sx: {
                borderRadius: "8px",
                backgroundColor: "white"
            }
            }}
        />

        <Grid container spacing={4}>
            {filtered.map(doc => (
            <Grid item key={doc._id} xs={12} sm={6} md={3}>
                <Card
                sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                    },
                    p: 1
                }}
                >
                <CardMedia
                    component="img"
                    height="160"
                    image={doc.profileImage}
                    alt={doc.name}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">{doc.name}</Typography>
                    <Typography>{doc.specialization}</Typography>
                    <Typography color={doc.available ? 'green' : 'red'}>
                    {doc.available ? 'Available' : 'Unavailable'}
                    </Typography>
                    <Button
                    sx={{ mt: 1 }}
                    variant="contained"
                    onClick={() => navigate(`/doctor/${doc._id}`)}
                    disabled={!doc.available}
                    >
                    View Profile
                    </Button>
                </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
    </Container>

  );
};


