import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import GridIcon from '@mui/icons-material/Grid4x4';
import ListIcon from '@mui/icons-material/List';
import { EmployeeProvider } from '@features/employee/employee.provider';
import { Employee } from '@features/employee/types';
import { Layout } from '@components';
import { useGetEmployeeList } from '@features/employee/hooks';
import {
  EmployeeCard,
  EmployeeTableHead,
  EmployeeTableRow,
} from '@features/employee/components';

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList: NextPage<EmployeeListProps> = (
  props: EmployeeListProps
) => {
  const { employees } = props;
  const router = useRouter();

  const { data: employeeData } = useGetEmployeeList(employees);

  const [dataLayout, setDataLayout] = useState<'grid' | 'table'>('grid');

  const toggleDataLayout = useCallback(() => {
    setDataLayout(dataLayout === 'grid' ? 'table' : 'grid');
  }, [dataLayout]);

  const gotoAddEmployeePage = useCallback(() => {
    router.push('/employee/add');
  }, []);

  return (
    <EmployeeProvider>
      <Layout data-test="employee-list-page" title="Employee Manager">
        <Head>
          <title>SwivelTech - Employee List</title>
        </Head>

        <main>
          <Container sx={{ py: 8 }} maxWidth="xl">
            <Stack
              sx={{ py: 2 }}
              direction="row"
              justifyContent="flex-end"
              spacing={2}
            >
              <Button
                data-test="employee-add-btn"
                variant="contained"
                onClick={gotoAddEmployeePage}
              >
                Add Employee
              </Button>
              <IconButton
                data-test="employee-toggle-data-ui"
                color="primary"
                onClick={toggleDataLayout}
              >
                {dataLayout === 'grid' ? <GridIcon /> : <ListIcon />}
              </IconButton>
            </Stack>
            {dataLayout === 'grid' ? (
              <Grid data-test="employee-data-grid" container spacing={2}>
                {employeeData.map((e) => (
                  <Grid item key={e.id} xs={12} sm={6} md={4} lg={3}>
                    <EmployeeCard employee={e} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <TableContainer data-test="employee-data-list" component={Paper}>
                <Table>
                  <EmployeeTableHead />
                  <TableBody>
                    {employeeData.map((employee) => (
                      <EmployeeTableRow key={employee.id} employee={employee} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Container>
        </main>
      </Layout>
    </EmployeeProvider>
  );
};

export async function getServerSideProps() {
  try {
    const employeesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/employees`
    );
    if (employeesResponse.ok) {
      const employees = await employeesResponse.json();

      return {
        props: {
          employees,
        },
      };
    }
    throw new Error('Load employee failed');
  } catch (error) {
    console.log('error', error);
    return {
      props: {
        employees: [],
      },
    };
  }
}

export default EmployeeList;
