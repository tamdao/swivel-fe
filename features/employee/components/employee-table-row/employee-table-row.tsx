import React from 'react';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { EmployeeActions } from '../employee-actions/employee-actions';
import { Employee } from '@features/employee/types';

interface EmployeeTableRowProps {
  employee: Employee;
}

export function EmployeeTableRow(props: EmployeeTableRowProps) {
  const { employee } = props;
  return (
    <TableRow>
      <TableCell>
        <Avatar src={employee.photo} />
      </TableCell>
      <TableCell>{employee.firstName}</TableCell>
      <TableCell>{employee.lastName}</TableCell>
      <TableCell>{employee.email}</TableCell>
      <TableCell>{employee.number}</TableCell>
      <TableCell>{employee.gender === 'M' ? 'Male' : 'Female'}</TableCell>
      <TableCell>
        <EmployeeActions employeeId={employee.id} />
      </TableCell>
    </TableRow>
  );
}
