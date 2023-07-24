import axios from 'axios';
import queryString from 'query-string';
import { PersonalLoanInterface, PersonalLoanGetQueryInterface } from 'interfaces/personal-loan';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPersonalLoans = async (
  query?: PersonalLoanGetQueryInterface,
): Promise<PaginatedInterface<PersonalLoanInterface>> => {
  const response = await axios.get('/api/personal-loans', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPersonalLoan = async (personalLoan: PersonalLoanInterface) => {
  const response = await axios.post('/api/personal-loans', personalLoan);
  return response.data;
};

export const updatePersonalLoanById = async (id: string, personalLoan: PersonalLoanInterface) => {
  const response = await axios.put(`/api/personal-loans/${id}`, personalLoan);
  return response.data;
};

export const getPersonalLoanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/personal-loans/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePersonalLoanById = async (id: string) => {
  const response = await axios.delete(`/api/personal-loans/${id}`);
  return response.data;
};
