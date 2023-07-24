import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { getPersonalLoanById, updatePersonalLoanById } from 'apiSdk/personal-loans';
import { personalLoanValidationSchema } from 'validationSchema/personal-loans';
import { PersonalLoanInterface } from 'interfaces/personal-loan';
import { CustomerInterface } from 'interfaces/customer';
import { OrganizationInterface } from 'interfaces/organization';
import { getCustomers } from 'apiSdk/customers';
import { getOrganizations } from 'apiSdk/organizations';

function PersonalLoanEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PersonalLoanInterface>(
    () => (id ? `/personal-loans/${id}` : null),
    () => getPersonalLoanById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PersonalLoanInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePersonalLoanById(id, values);
      mutate(updated);
      resetForm();
      router.push('/personal-loans');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PersonalLoanInterface>({
    initialValues: data,
    validationSchema: personalLoanValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Personal Loans',
              link: '/personal-loans',
            },
            {
              label: 'Update Personal Loan',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Personal Loan
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Loan Amount"
            formControlProps={{
              id: 'loan_amount',
              isInvalid: !!formik.errors?.loan_amount,
            }}
            name="loan_amount"
            error={formik.errors?.loan_amount}
            value={formik.values?.loan_amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('loan_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Extra Fees"
            formControlProps={{
              id: 'extra_fees',
              isInvalid: !!formik.errors?.extra_fees,
            }}
            name="extra_fees"
            error={formik.errors?.extra_fees}
            value={formik.values?.extra_fees}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('extra_fees', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Cashback"
            formControlProps={{
              id: 'cashback',
              isInvalid: !!formik.errors?.cashback,
            }}
            name="cashback"
            error={formik.errors?.cashback}
            value={formik.values?.cashback}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('cashback', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<CustomerInterface>
            formik={formik}
            name={'customer_id'}
            label={'Select Customer'}
            placeholder={'Select Customer'}
            fetcher={getCustomers}
            labelField={'id'}
          />
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/personal-loans')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'personal_loan',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PersonalLoanEditPage);
