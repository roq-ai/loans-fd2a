import { CustomerInterface } from 'interfaces/customer';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface PersonalLoanInterface {
  id?: string;
  customer_id: string;
  organization_id: string;
  loan_amount: number;
  extra_fees: number;
  cashback: number;
  created_at?: any;
  updated_at?: any;

  customer?: CustomerInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface PersonalLoanGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  organization_id?: string;
}
