import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import { defaultPath, MenuItem, menuItems } from './configs/menus';
import { AuthProvider, RequireAuth } from './utils/auth';
import { Id24Provider } from './drivers/id24/Id24Provider';

const routeMapper = (x: MenuItem): React.ReactNode => (
  <Route
    key={x.key}
    path={x.path}
    element={
      x.roles ? (
        <RequireAuth allowedRoles={x.roles}>{x.component}</RequireAuth>
      ) : (
        x.component
      )
    }
  >
    {x.children?.length && (
      <>
        <Route index element={<Navigate to={x.children[0].path} replace />} />
        {x.children.map(routeMapper)}
      </>
    )}
  </Route>
);

const App = () => {
  const id24Config = {
    refreshTokenIntervalInSeconds: 60,
    resourceApiBaseUrl: 'http://localhost:4000',
  };
  return (
    <BrowserRouter basename={'/report'}>
      <Id24Provider config={id24Config}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route
                index
                element={<Navigate to={menuItems[0].path} replace />}
              />
              {menuItems.map(routeMapper)}
            </Route>
            <Route path="*" element={<Navigate to={defaultPath} replace />} />
          </Routes>
        </AuthProvider>
      </Id24Provider>
    </BrowserRouter>
  );
};

export default App;
