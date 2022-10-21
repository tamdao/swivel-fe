import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export function EmployeeTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Image</TableCell>
        <TableCell>First Name</TableCell>
        <TableCell>Last Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Gender</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}
