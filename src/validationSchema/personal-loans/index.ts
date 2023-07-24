import * as yup from 'yup';

export const personalLoanValidationSchema = yup.object().shape({
  loan_amount: yup.number().integer().required(),
  extra_fees: yup.number().integer().required(),
  cashback: yup.number().integer().required(),
  customer_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
