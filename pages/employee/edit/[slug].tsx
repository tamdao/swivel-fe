import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { Layout } from '@components';
import { EmployeeForm } from '@features/employee/components';
import { Employee } from '@features/employee/types';
import { useGetEmployee, useUpdateEmployee } from '@features/employee/hooks';

interface EmployeeEditProps {
  employee: Employee;
  notFound: boolean;
}

const EmployeeEdit: NextPage<EmployeeEditProps> = (
  props: EmployeeEditProps
) => {
  const router = useRouter();
  const { employee, notFound } = props;

  const { slug } = router.query;

  const { data: employeeData, isLoading } = useGetEmployee(
    slug as string,
    employee
  );

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updateEmployee, isLoading: isUpdating } = useUpdateEmployee({
    onError: () => {
      enqueueSnackbar('Edit employee failed!', {
        variant: 'error',
      });
    },
    onSuccess: () => {
      enqueueSnackbar('Edit employee successfully!', {
        variant: 'success',
      });
      gotoEmployeeListPage();
    },
  });

  const gotoEmployeeListPage = useCallback(() => {
    router.push('/employee/list');
  }, []);

  return (
    <Layout data-test="employee-edit-page" title="Employee Manager">
      <Head>
        <title>SwivelTech - Edit Employee</title>
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
          <EmployeeForm
            employee={employeeData}
            onSubmit={updateEmployee}
            isSubmitting={isUpdating}
          />
        </Container>
      </main>
    </Layout>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { slug } = params;

    const employeeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/employees/${slug}`
    );

    if (employeeResponse.ok) {
      const employee = await employeeResponse.json();

      return {
        props: {
          employee,
        },
      };
    }
    throw Error('Employee not found');
  } catch (error) {
    console.log('error', error);
    return {
      notFound: true,
    };
  }
}

export default EmployeeEdit;
