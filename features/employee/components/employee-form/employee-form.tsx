import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';

import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import { Employee } from '../../types';

interface EmployeeFormProps {
  employee?: Employee;
  isSubmitting: boolean;
  onSubmit: (employee: Employee) => void;
}

const GENDER = [
  {
    value: 'M',
    label: 'Male',
  },
  {
    value: 'F',
    label: 'Female',
  },
];

const validationSchema = Yup.object({
  firstName: Yup.string().min(6).max(10).required().label('First name'),
  lastName: Yup.string().min(6).max(10).required().label('Last name'),
  email: Yup.string().email().required().label('Email'),
  number: Yup.string().phone('LK', true).required().label('Phone'),
  gender: Yup.string().required().label('Gender'),
});

export function EmployeeForm(props: EmployeeFormProps) {
  const { employee, onSubmit, isSubmitting } = props;
  const formik = useFormik({
    initialValues: {
      id: employee?.id || '',
      firstName: employee?.firstName || '',
      lastName: employee?.lastName || '',
      email: employee?.email || '',
      number: employee?.number || '',
      gender: employee?.gender || 'M',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Paper
      variant="outlined"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          required
          variant="filled"
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          inputProps={{
            'data-test': 'employee-form-first-name',
          }}
          FormHelperTextProps={
            {
              'data-test': 'employee-form-first-name-error',
            } as any
          }
        />
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          required
          variant="filled"
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          inputProps={{
            'data-test': 'employee-form-last-name',
          }}
          FormHelperTextProps={
            {
              'data-test': 'employee-form-last-name-error',
            } as any
          }
        />
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          required
          variant="filled"
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          inputProps={{
            'data-test': 'employee-form-email',
          }}
          FormHelperTextProps={
            {
              'data-test': 'employee-form-email-error',
            } as any
          }
        />
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          required
          variant="filled"
          id="number"
          name="number"
          label="Phone"
          value={formik.values.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
          inputProps={{
            'data-test': 'employee-form-number',
          }}
          FormHelperTextProps={
            {
              'data-test': 'employee-form-number-error',
            } as any
          }
        />
        <TextField
          id="gender"
          fullWidth
          select
          label="Gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          helperText={formik.touched.gender && formik.errors.gender}
          variant="filled"
        >
          {GENDER.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Stack
          sx={{ py: 2 }}
          direction="row"
          justifyContent="flex-end"
          spacing={2}
        >
          <LoadingButton
            color="primary"
            variant="contained"
            type="submit"
            loading={isSubmitting}
            disabled={!(formik.isValid && formik.dirty)}
            data-test="employee-submit-btn"
          >
            {employee ? 'Save' : 'Add'}
          </LoadingButton>
        </Stack>
      </form>
    </Paper>
  );
}
