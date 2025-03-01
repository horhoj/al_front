import { RequestingTheQuoteStatus } from '../types';
import styles from './RequestingModal.module.scss';
import { FormResponseErrors } from '~/ui/FormResponseErrors';
import { ApiError } from '~/api/common.types';
import { Button } from '~/ui/Button';

interface RequestingModalProps {
  step: RequestingTheQuoteStatus | null;
  onCancel: () => void;
  error: ApiError | null;
}
export function RequestingModal({ step, onCancel, error }: RequestingModalProps) {
  return (
    <div className={styles.RequestingModal}>
      <div className={styles.title}>Requesting the quote</div>
      <div className={styles.stepStatus}>
        Step 1: Requesting author.. {step !== 'requesting_autor' && <>Completed</>}
      </div>
      {step !== 'requesting_autor' && (
        <div className={styles.stepStatus}>Step 1: Requesting quote.. {step === 'complete' && <>Completed</>}</div>
      )}
      {error && (error as unknown as { message: string })?.message !== 'Aborted' && (
        <div className={styles.stepStatus}>
          <FormResponseErrors responseErrors={error} title={'Quote request failed'} />
        </div>
      )}
      <div className={styles.buttons}>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}
