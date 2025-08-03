import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button, TextField, Container, Box, Avatar, Alert, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function DoctorProfile() {
  const {id} = useParams();
  const [doctor, setDoctor] = useState(null);
  const [message, setMessage] = useState('');

  const {register, handleSubmit, reset, formState:{errors}} = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://healthcarebackend-8uiv.onrender.com/doctors/${id}`)
      .then(res => setDoctor(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await axios.post('https://healthcarebackend-8uiv.onrender.com/appointments', {
        ...data,
        doctorId: id
      });
      setMessage('Appointment booked successfully!');
      reset();

      setTimeout(()=>{
        navigate("/")
      },2000)
    } catch (err) {
      console.error(err);
    }
  };

  if (!doctor) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Avatar
        alt={doctor.name}
        src={doctor.profileImage}
        sx={{ width: 120, height: 120, mb: 2 }}
      />
      <Typography variant="h4">{doctor.name}</Typography>
      <Typography variant="subtitle1">{doctor.specialization}</Typography>
      <Typography sx={{ mb: 3 }}>{doctor.bio}</Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Patient Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          {...register('patientName', { required: 'Patient name is required' })}
          error={Boolean(errors.patientName)}
          helperText={errors.patientName?.message}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          sx={{ mb: 2 }}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <TextField
          label="Date & Time"
          variant="outlined"
          type="datetime-local"
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
          {...register('dateTime', { required: 'Date & Time is required' })}
          error={Boolean(errors.dateTime)}
          helperText={errors.dateTime?.message}
        />
        <Button type="submit" variant="contained">Book Appointment</Button>
      </Box>

      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
    </Container>
  );
}
