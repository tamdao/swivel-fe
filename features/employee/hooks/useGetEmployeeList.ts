import { useQuery } from '@tanstack/react-query';
import { Employee } from '../types';

const getEmployeeList = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`);

  if (response.ok) {
    return response.json();
  }

  const responseJson = await response.json();
  throw Error(responseJson.message);
};

export function useGetEmployeeList(initialData: Employee[]) {
  return useQuery<Employee[]>(['employee-list'], getEmployeeList, {
    initialData,
  });
}
