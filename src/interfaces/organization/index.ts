import { FinancialAdvisorInterface } from 'interfaces/financial-advisor';
import { PersonalLoanInterface } from 'interfaces/personal-loan';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  financial_advisor?: FinancialAdvisorInterface[];
  personal_loan?: PersonalLoanInterface[];
  user?: UserInterface;
  _count?: {
    financial_advisor?: number;
    personal_loan?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
