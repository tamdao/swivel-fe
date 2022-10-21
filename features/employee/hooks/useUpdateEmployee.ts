import { useMutation } from '@tanstack/react-query';
import { Employee } from '../types';

const updateEmployee = async (employee: Employee) => {
  const { id, ...editEmployee } = employee;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editEmployee),
    }
  );

  if (response.ok) {
    return response.json();
  }

  const responseJson = await response.json();
  throw Error(responseJson.message);
};

export function useUpdateEmployee(options?: {
  onError: () => void;
  onSuccess: () => void;
}) {
  return useMutation(updateEmployee, options);
}
