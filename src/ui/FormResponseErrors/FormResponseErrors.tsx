import styles from './FormResponseErrors.module.scss';
import { getUUID } from '~/utils/getUUID';
import { ApiError } from '~/api/common.types';

interface FormResponseErrorsProps {
  responseErrors: ApiError;
  title: string;
}

interface FieldErrorItem {
  id: string;
  errors: string;
}

const ERROR_SEPARATOR = ' ';

export function FormResponseErrors({ responseErrors, title }: FormResponseErrorsProps) {
  const error = responseErrors.errorResponseMessage ?? responseErrors.errorMessage;

  return (
    <div className={styles.FormResponseErrors}>
      <div className={styles.title}>{title}</div>
      <div className={styles.errors}>{error}</div>
    </div>
  );
}
