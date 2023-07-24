import axios from 'axios';
import queryString from 'query-string';
import { FinancialAdvisorInterface, FinancialAdvisorGetQueryInterface } from 'interfaces/financial-advisor';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFinancialAdvisors = async (
  query?: FinancialAdvisorGetQueryInterface,
): Promise<PaginatedInterface<FinancialAdvisorInterface>> => {
  const response = await axios.get('/api/financial-advisors', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFinancialAdvisor = async (financialAdvisor: FinancialAdvisorInterface) => {
  const response = await axios.post('/api/financial-advisors', financialAdvisor);
  return response.data;
};

export const updateFinancialAdvisorById = async (id: string, financialAdvisor: FinancialAdvisorInterface) => {
  const response = await axios.put(`/api/financial-advisors/${id}`, financialAdvisor);
  return response.data;
};

export const getFinancialAdvisorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/financial-advisors/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinancialAdvisorById = async (id: string) => {
  const response = await axios.delete(`/api/financial-advisors/${id}`);
  return response.data;
};
