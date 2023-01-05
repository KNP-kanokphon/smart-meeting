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
import { DetailFood } from './components/MainLayoutDetail/DetailFood';
import { SignConfirm } from './pages/signconfirm/SignConfirm';
import { MainLayoutProfile } from './components/MainLayoutDetail/profile';
import { PartyQRcodeCheckin } from './components/MainLayoutParty/PartyQRcodeCheckin';
import { PartyConfirm } from './components/MainLayoutParty/PartyConfirm';
import { PartyQRcodeCheckout } from './components/MainLayoutParty/PartyQRcodeCheckout';
import { DetailVote } from './components/MainLayoutDetail/DetailVote';

const App = () => {
  return (
    <>
      <BrowserRouter basename={'/party'}>
        <Routes>
          <Route
            path="/checkin"
            element={<PartyQRcodeCheckin baseURL={'/partymeeting/checkin'} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/partyConfirm/:userid"
            element={
              <PartyConfirm baseURL={'/partymeeting/partyConfirm/:userid'} />
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/checkout"
            element={<PartyQRcodeCheckout baseURL={'/checkout'} />}
          ></Route>
        </Routes>
      </BrowserRouter>
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
            element={<DetailAlready baseURL={'/detailalready'} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="detailalready/detailfood/:roomid/:userid"
            element={<DetailFood baseURL={'/detailfood'} />}
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

        <Routes>
          <Route
            path="/detailconfirm/:id/:userid"
            element={<DetailConfirm baseURL={'/detailconfirm'} />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <BrowserRouter basename={'/detailvote'}>
        {/* <Routes>
          <Route
            path="/:roomid/:userid"
            element={<MainLayoutProfileDetail baseURL={'/profileDetail'} />}
          ></Route> */}
        <Routes>
          <Route
            path="/:id/:userid"
            element={<DetailVote baseURL={'/detailvote'} />}
          ></Route>
        </Routes>
        {/* </Routes> */}
      </BrowserRouter>
      <BrowserRouter basename={'/profileDetail'}>
        <Routes>
          <Route
            path="/:roomid/:userid"
            element={<MainLayoutProfileDetail baseURL={'/profileDetail'} />}
          ></Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter basename={'/profile'}>
        <Routes>
          <Route
            path="/kpi/:userid"
            element={<MainLayoutProfile baseURL={'/profileDetail'} />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signconfirm/:id/:userid"
            element={<SignConfirm baseURL={'/signconfirm'} />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <BrowserRouter basename={'/meeting'}>
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
