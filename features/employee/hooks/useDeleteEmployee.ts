import { useMutation } from '@tanstack/react-query';

const deleteEmployee = async (employeeId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/employees/${employeeId}`,
    {
      method: 'DELETE',
    }
  );
  if (response.ok) {
    return response.json();
  }

  const responseJson = await response.json();
  throw Error(responseJson.message);
};

export function useDeleteEmployee(options?: {
  onError: () => void;
  onSuccess: () => void;
}) {
  return useMutation(deleteEmployee, options);
}
