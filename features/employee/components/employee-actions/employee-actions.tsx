import React, { useCallback, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import { useEmployeeContext } from '../../employee.provider';

interface EmployeeActionsProps {
  employeeId: string;
}

export function EmployeeActions(props: EmployeeActionsProps) {
  const { employeeId } = props;

  const { deleteEmployee } = useEmployeeContext();

  const router = useRouter();

  const gotoEditPage = useCallback(() => {
    router.push(`/employee/edit/${employeeId}`);
  }, []);

  const onDeleteEmployee = useCallback(() => {
    deleteEmployee(employeeId);
  }, []);

  return (
    <>
      <IconButton
        data-test="employee-delete-btn"
        size="small"
        color="error"
        onClick={onDeleteEmployee}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        data-test="employee-edit-btn"
        size="small"
        onClick={gotoEditPage}
      >
        <EditIcon />
      </IconButton>
    </>
  );
}
