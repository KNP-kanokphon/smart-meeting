import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import { MainLayoutDetail } from './components/MainLayoutDetail';
import { defaultPath, MenuItem, menuItems } from './configs/menus';
import { AuthProvider, RequireAuth } from './utils/auth';
import { Id24Provider } from './drivers/id24/Id24Provider';
import { DetailStepTwo } from './components/MainLayoutDetail/DetailStepTwo';
import { DetailStepThree } from './components/MainLayoutDetail/DetailStepThree';
import { MainLayoutProfileDetail } from './components/MainLayoutDetail/ProfileDetail';
import { Login } from './pages/Login/Login';
import { DetailAlready } from './components/MainLayoutDetail/DetailAlready';
import { DetailConfirm } from './components/MainLayoutDetail/DetailConfirm';

// const routeMapper = (x: MenuItem): React.ReactNode => (
//   <Route
//     key={x.key}
//     path={x.path}
//     element={
//       x.roles ? (
//         <RequireAuth allowedRoles={x.roles}>{x.component}</RequireAuth>
//       ) : (
//         x.component
//       )
//     }
//   >
//     {x.children?.length && (
//       <>
//         <Route index element={<Navigate to={x.children[0].path} replace />} />
//         {x.children.map(routeMapper)}
//       </>
//     )}
//   </Route>
// );

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
            path="detailalready/:roomid/:userid"
            element={<DetailAlready baseURL={'/detailAlready'} />}
          ></Route>
        </Routes>
        {/* <Routes>
          <Route
            path="/userdetail/:userid/roomid/:roomid"
            element={<MainLayoutDetail baseURL={'/detail'} />}
          ></Route>
        </Routes> */}
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

        <Routes>
          <Route
            path="/detailconfirm/:id/:userid"
            element={<DetailConfirm baseURL={'/detailconfirm'} />}
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
            {/* <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route
                  index
                  element={<Navigate to={menuItems[0].path} replace />}
                />
                {menuItems.map(x => (
                  <Route key={x.key} path={x.path} element={<Outlet />}>
                    {x.component}
                  </Route>
                ))}
              </Route>
              <Route path="*" element={<Navigate to={defaultPath} replace />} />
            </Routes> */}
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="meeting" replace />} />
                {menuItems.map(x => (
                  <Route key={x.key} path={x.path} element={<Outlet />}>
                    {x.component}
                  </Route>
                ))}
              </Route>
              <Route path="*" element={<Navigate to={defaultPath} replace />} />
            </Routes>
          </AuthProvider>
        </Id24Provider>
      </BrowserRouter>
      <BrowserRouter basename={'/'}>
        <Routes>
          <Route path="/" element={<Login baseURL={'/'} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
