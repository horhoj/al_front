import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { authSlice } from '../authSlice';
// import styles from './LoginPage.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { getFormikFieldData } from '~/utils/getFormikFieldData';
import { Form } from '~/ui/Form';
import { FormField } from '~/ui/FormField';
import { Input } from '~/ui/Input';
import { Button } from '~/ui/Button';
import { routes } from '~/router/routes';
import { FormResponseErrors } from '~/ui/FormResponseErrors';
import { PageLayout } from '~/ui/PageLayout';

interface InitialValues {
  email: string;
  password: string;
}

const initialValues: InitialValues = {
  email: 'aleksei@example.com',
  password: 'lkJlkn8hj',
};

const VALIDATION_IS_EMPTY_MSG = 'required';
const VALIDATION_IS_NOT_EMAIL_MSG = 'not mail';
const VALIDATION_PASSWORD_MUST_MIN = 'Password must contain at least 8 characters';

const validationSchema: yup.ObjectSchema<InitialValues> = yup.object({
  email: yup.string().required(VALIDATION_IS_EMPTY_MSG).email(VALIDATION_IS_NOT_EMAIL_MSG),
  password: yup.string().required(VALIDATION_IS_EMPTY_MSG).min(8, VALIDATION_PASSWORD_MUST_MIN),
});

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik<InitialValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        authSlice.thunks.signInThunk({
          onSuccess: () => {
            navigate(routes.PROFILE, { replace: true });
          },
          credentials: values,
        }),
      );
    },
  });

  useEffect(
    () => () => {
      // dispatch(authSlice.actions.clear());
    },
    [],
  );

  const signInRequest = useAppSelector((state) => state.auth.signInRequest);

  const loginRequest = useAppSelector((state) => state.auth.signInRequest);

  const emailFieldData = getFormikFieldData(formik, 'email');
  const passwordFieldData = getFormikFieldData(formik, 'password');

  return (
    <PageLayout>
      <Form onSubmit={formik.handleSubmit} noValidate autoComplete={'off'}>
        {signInRequest.error && (
          <FormResponseErrors responseErrors={signInRequest.error} title={'Login request failed'} />
        )}
        <FormField title={'email'} error={emailFieldData.errorText}>
          <Input
            {...emailFieldData.fieldProps}
            placeholder={'Enter email'}
            isError={emailFieldData.isError}
            disabled={loginRequest.isLoading}
          />
        </FormField>
        <FormField title={'Password'} error={passwordFieldData.errorText}>
          <Input
            {...passwordFieldData.fieldProps}
            placeholder={'Password'}
            isError={passwordFieldData.isError}
            type={'password'}
            disabled={loginRequest.isLoading}
          />
        </FormField>
        <Button type={'submit'} disabled={loginRequest.isLoading}>
          Submit
        </Button>
      </Form>
    </PageLayout>
  );
}
