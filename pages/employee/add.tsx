import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { EmployeeForm } from '@features/employee/components';
import { Layout } from '@components';
import { useAddEmployee } from '@features/employee/hooks';

const EmployeeAdd: NextPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: addEmployee, isLoading } = useAddEmployee({
    onError: () => {
      enqueueSnackbar('Add employee failed!', {
        variant: 'error',
      });
    },
    onSuccess: () => {
      enqueueSnackbar('Add employee successfully!', {
        variant: 'success',
      });
      gotoEmployeeListPage();
    },
  });

  const gotoEmployeeListPage = useCallback(() => {
    router.push('/employee/list');
  }, []);

  return (
    <Layout data-test="employee-add-page" title="Employee Manager">
      <Head>
        <title>SwivelTech - Add Employee</title>
      </Head>

      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Stack
            sx={{ py: 2 }}
            direction="row"
            justifyContent="flex-end"
            spacing={2}
          >
            <Button
              data-test="employee-list-btn"
              variant="contained"
              onClick={gotoEmployeeListPage}
            >
              List View
            </Button>
          </Stack>
          <EmployeeForm onSubmit={addEmployee} isSubmitting={isLoading} />
        </Container>
      </main>
    </Layout>
  );
};

export default EmployeeAdd;
