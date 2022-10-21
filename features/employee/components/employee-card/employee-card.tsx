import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import { EmployeeActions } from '../employee-actions/employee-actions';
import { Employee } from '@features/employee/types';

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard(props: EmployeeCardProps) {
  const { employee } = props;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={
          employee.photo ? employee.photo : 'https://source.unsplash.com/random'
        }
        height={320}
        alt="random"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {employee.firstName} {employee.lastName}
        </Typography>
        <Typography>{employee.email}</Typography>
        <Typography>{employee.number}</Typography>
        <Stack direction="row" justifyContent="space-between">
          <div>
            <Typography>
              {employee.gender === 'M' ? 'Male' : 'Female'}
            </Typography>
          </div>
          <div>
            <EmployeeActions employeeId={employee.id} />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
