import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import { MainLayoutDetail } from './components/MainLayoutDetail';
import { defaultPath, MenuItem, menuItems } from './configs/menus';
import { AuthProvider, RequireAuth } from './utils/auth';
import { Id24Provider } from './drivers/id24/Id24Provider';
import { DetailStepTwo } from './components/MainLayoutDetail/DetailStepTwo';
import { DetailStepThree } from './components/MainLayoutDetail/DetailStepThree';
import { MainLayoutProfileDetail } from './components/MainLayoutDetail/ProfileDetail';

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
    <>
      <BrowserRouter basename={'/detail'}>
        <Routes>
          <Route
            path="/:id"
            element={<MainLayoutDetail baseURL={'/detail'} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/userdetail/:userid/roomid/:roomid"
            element={<MainLayoutDetail baseURL={'/detail'} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/steptwo/:id"
            element={<DetailStepTwo baseURL={'/steptwo'} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/stepthree/:id/:userid"
            element={<DetailStepThree baseURL={'/stepthree'} />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <BrowserRouter basename={'/profileDetail'}>
        <Routes>
          <Route
            path="/:roomid/:userid"
            element={<MainLayoutProfileDetail baseURL={'/profileDetail'} />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <BrowserRouter basename={'/meeting'}>
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
    </>
  );
};

export default App;
