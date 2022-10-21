export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  gender: 'M' | 'F';
  photo?: string;
}
