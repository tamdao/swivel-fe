import React, { createContext, useCallback, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteEmployee } from './hooks';

interface EmployeeContextValue {
  deleteEmployee: (employeeId: string) => void;
}

const employeeContextValueInit = {
  deleteEmployee: () => {},
};

const EmployeeContext = createContext<EmployeeContextValue>(
  employeeContextValueInit
);

const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);

  if (context === undefined) {
    throw new Error('useEmployeeContext must be within EmployeeProvider');
  }

  return context;
};

const EmployeeProvider = ({ children }: { children: React.ReactNode }) => {
  const [confirmShow, setConfirmShow] = useState<string>('');
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: deleteEmployee, isLoading } = useDeleteEmployee({
    onError: () => {
      setConfirmShow('');
      enqueueSnackbar('Delete employee failed!', {
        variant: 'error',
      });
    },
    onSuccess: () => {
      setConfirmShow('');
      queryClient.invalidateQueries(['employee-list']);
      enqueueSnackbar('Delete employee successfully!', {
        variant: 'success',
      });
    },
  });

  const onShowDeleteEmployeeModal = useCallback((employeeId: string) => {
    setConfirmShow(employeeId);
  }, []);

  const onCloseConfirmModal = useCallback(() => {
    setConfirmShow('');
  }, []);

  const onConfirmDeleteEmployee = useCallback(() => {
    deleteEmployee(confirmShow);
  }, [confirmShow]);

  return (
    <EmployeeContext.Provider
      value={{
        deleteEmployee: onShowDeleteEmployeeModal,
      }}
    >
      {children}
      <Dialog
        data-test="employee-confirm-delete-modal"
        open={!!confirmShow}
        onClose={onCloseConfirmModal}
      >
        <DialogTitle>Delete employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee? This action
            can&apos;t rollback
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseConfirmModal}>No</Button>
          <LoadingButton
            onClick={onConfirmDeleteEmployee}
            color="error"
            loading={isLoading}
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </EmployeeContext.Provider>
  );
};

export { EmployeeProvider, useEmployeeContext };
