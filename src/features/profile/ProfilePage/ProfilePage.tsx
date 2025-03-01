import { useEffect, useRef } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { profileSlice } from '../profileSlice';
import { Avatar } from '../Avatar';
import { RequestingModal } from '../RequestingModal';
import styles from './ProfilePage.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { PageLayout } from '~/ui/PageLayout';
import { Loader } from '~/ui/Loader';
import { FormResponseErrors } from '~/ui/FormResponseErrors';
import avatarMockImg from '~/assets/avatar__mock.jpg';
import { Button } from '~/ui/Button';
import { Modal } from '~/ui/Modal';

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const fetchProfileDataRequest = useAppSelector((state) => state.profile.fetchProfileDataRequest);
  const requestingTheQuoteRequest = useAppSelector((state) => state.profile.requestingTheQuoteRequest);
  const requestingTheQuoteStatus = useAppSelector((state) => state.profile.requestingTheQuoteStatus);
  const requestingTheQuoteDIspatchPromiseRef = useRef<any | null>(null);

  useEffect(() => {
    dispatch(profileSlice.thunks.fetchProfileDataThunk());
    return () => {
      dispatch(profileSlice.actions.clear());
    };
  }, []);

  const handleUpdate = () => {
    requestingTheQuoteDIspatchPromiseRef.current = dispatch(profileSlice.thunks.requestingTheQuoteThunk());
  };

  const handleCancel = () => {
    requestingTheQuoteDIspatchPromiseRef.current.abort();
    dispatch(profileSlice.actions.setRequestingTheQuoteStatus(null));
  };

  return (
    <>
      <Modal isOpen={requestingTheQuoteStatus !== null} onClose={() => {}}>
        <RequestingModal
          step={requestingTheQuoteStatus}
          onCancel={handleCancel}
          error={requestingTheQuoteRequest.error}
        />
      </Modal>
      <PageLayout>
        {fetchProfileDataRequest.isLoading && <Loader />}
        {fetchProfileDataRequest.error && (
          <FormResponseErrors responseErrors={fetchProfileDataRequest.error} title={'Info request failed'} />
        )}
        {fetchProfileDataRequest.data && (
          <div className={styles.profile}>
            <Avatar src={avatarMockImg} />
            <div className={styles.profileData}>
              <div className={styles.profileDataTitle}>Welcome, {fetchProfileDataRequest.data.data.fullname}!</div>
              <div>
                <Button onClick={handleUpdate}>Update</Button>
              </div>
            </div>
          </div>
        )}
        {requestingTheQuoteRequest.data && <div className={styles.authorQuote}>{requestingTheQuoteRequest.data}</div>}
      </PageLayout>
    </>
  );
}
