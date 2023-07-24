import { PersonalLoanInterface } from 'interfaces/personal-loan';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  personal_loan?: PersonalLoanInterface[];
  user?: UserInterface;
  _count?: {
    personal_loan?: number;
  };
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
