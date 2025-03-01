import { useAppSelector } from '~/store/hooks';
import { Spinner } from '~/ui/Spinner';

export function AppSpinner() {
  const isLoading = useAppSelector(
    (state) =>
      state.auth.signInRequest.isLoading ||
      state.auth.signOutRequest.isLoading ||
      state.auth.checkTokenRequest.isLoading ||
      state.info.fetchInfo.isLoading ||
      state.profile.fetchProfileDataRequest.isLoading ||
      state.profile.requestingTheQuoteRequest.isLoading,
  );
  return <Spinner isShow={isLoading} />;
}
