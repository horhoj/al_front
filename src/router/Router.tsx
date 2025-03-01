import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { InfoPage } from '~/features/info/InfoPage';
import { LoginPage } from '~/features/auth/LoginPage';
import { ProfilePage } from '~/features/profile/ProfilePage';
import { ProtectedRoute } from '~/features/auth/ProtectedRoute';

export function Router() {
  return (
    <>
      <Routes>
        <Route path={routes.ABOUT_US} element={<InfoPage />} />
        <Route path={routes.SIGN_IN} element={<LoginPage />} />
        <Route
          path={routes.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path={'*'} element={<Navigate to={routes.ABOUT_US} replace={true} />} />
      </Routes>
    </>
  );
}
