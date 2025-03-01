import { useEffect } from 'react';
import { infoSlice } from '../infoSlice';
import styles from './InfoPage.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { PageLayout } from '~/ui/PageLayout';
import { Spinner } from '~/ui/Spinner';
import { Loader } from '~/ui/Loader';
import { FormResponseErrors } from '~/ui/FormResponseErrors';

export function InfoPage() {
  const dispatch = useAppDispatch();
  const fetchInfoRequest = useAppSelector((state) => state.info.fetchInfo);

  useEffect(() => {
    dispatch(infoSlice.thunks.fetchInfoThunk());

    return () => {
      dispatch(infoSlice.actions.clear());
    };
  }, []);

  return (
    <PageLayout>
      <Spinner isShow={fetchInfoRequest.isLoading} />
      {fetchInfoRequest.isLoading && <Loader />}
      {fetchInfoRequest.error && (
        <FormResponseErrors responseErrors={fetchInfoRequest.error} title={'Info request failed'} />
      )}
      <div className={styles.InfoPage} dangerouslySetInnerHTML={{ __html: fetchInfoRequest.data ?? '' }} />
    </PageLayout>
  );
}
