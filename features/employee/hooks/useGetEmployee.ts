import { useQuery } from '@tanstack/react-query';
import { Employee } from '../types';

const getEmployee = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`
  );

  if (response.ok) {
    return response.json();
  }

  const responseJson = await response.json();
  throw Error(responseJson.message);
};

export function useGetEmployee(id: string, initialData: Employee) {
  return useQuery<Employee>(['employee', id], () => getEmployee(id), {
    initialData,
    enabled: !!id,
  });
}
