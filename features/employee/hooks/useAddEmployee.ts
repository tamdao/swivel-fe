import { useMutation } from '@tanstack/react-query';
import { Employee } from '../types';

const addEmployee = async (employee: Employee) => {
  const { id, ...newEmployee } = employee;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEmployee),
  });

  if (response.ok) {
    return response.json();
  }

  const responseJson = await response.json();
  throw Error(responseJson.message);
};

export function useAddEmployee(options?: {
  onError: () => void;
  onSuccess: () => void;
}) {
  return useMutation(addEmployee, options);
}
