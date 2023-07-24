import { FinancialAdvisorInterface } from 'interfaces/financial-advisor';

import { GetQueryInterface } from '../get-query.interface';

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roq_user_id: string;
  tenant_id: string;
  created_at: string;
  updated_at: string;

  financial_advisor: FinancialAdvisorInterface[];
}

export interface UserGetQueryInterface extends GetQueryInterface {
  roq_user_id?: string;
  tenant_id?: string;
}
