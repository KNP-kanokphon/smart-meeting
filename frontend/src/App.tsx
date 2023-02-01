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
import { DetailCheckin } from './components/MainLayoutDetail/DetailCheckin';
import { DetailNoMeeting } from './components/MainLayoutDetail/DetailNoMeeting';
import { Showqrcodevote } from './pages/voteagendes/showqrcodevote';
import { Loginvoteadmin } from './pages/voteagendes/loginvoteadmin';
import { Loginvote } from './pages/voteagendes/loginvote';
import { Votedetail } from './pages/voteagendes/votestep/votedetail';
import { Voteresolution } from './pages/voteagendes/votestep/vote';
import { GolfCheckin } from './pages/GolfMeeting/GolfCheckin';
import { GolfDetail } from './pages/GolfMeeting/GolfDetail';
import { GolfForm } from './pages/GolfMeeting/GolfForm';
import { GolfQRcode } from './pages/GolfMeeting/GolfQRcode';
const App = () => {
  return (
    <>
      <BrowserRouter basename={'/admin'}>
        <Id24Provider
          config={{
            refreshTokenIntervalInSeconds: 60,
            resourceApiBaseUrl: 'http://localhost:4000',
          }}
        >
          <AuthProvider>
            <Routes>
              <Route path="/" element={<MainLayout basename={'meeting'} />}>
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
        <Routes>
          <Route
            path="/detailcheckin/:id/:userid"
            element={<DetailCheckin baseURL={'/detailcheckin'} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/detailnomeet/:roomid/:userid"
            element={<DetailNoMeeting baseURL={'/detailnomeet'} />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <BrowserRouter basename={'/detailvote'}>
        <Routes>
          <Route
            path="/:id/:userid"
            element={<DetailVote baseURL={'/detailvote'} />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <BrowserRouter basename={'/golfmeet'}>
        <Routes>
          <Route
            path="/detailform"
            element={<GolfForm baseURL={'/detailform'} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/golfdetail"
            element={<GolfDetail baseURL={'/golfdetail'} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/golfqrcode"
            element={<GolfQRcode baseURL={'/golfqrcode'} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/golfcheckin"
            element={<GolfCheckin baseURL={'/golfcheckin'} />}
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
      <BrowserRouter basename={'/profile'}>
        <Routes>
          <Route
            path="/kpi/:userid"
            element={<MainLayoutProfile baseURL={'/profileDetail'} />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <BrowserRouter basename={'/signconfirm'}>
        <Routes>
          <Route
            path="/:id/:userid"
            element={<SignConfirm baseURL={'/signconfirm'} />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <BrowserRouter basename={'/vote'}>
        <Id24Provider
          config={{
            refreshTokenIntervalInSeconds: 60,
            resourceApiBaseUrl: 'http://localhost:4000',
          }}
        >
          <AuthProvider>
            <Routes>
              <Route
                path="/:roomid/:step"
                element={<MainLayout basename={'vote'} />}
              ></Route>
              <Route
                path="/showqrcode/:roomid/:step"
                element={<Showqrcodevote />}
              ></Route>
              <Route
                path="/loginvote/:roomid/:step"
                element={<Loginvote />}
              ></Route>
              <Route
                path="/votedetail/:roomid/:step"
                element={<Votedetail />}
              ></Route>
              <Route
                path="/voteresolution/:roomid/:step"
                element={<Voteresolution />}
              ></Route>
            </Routes>
          </AuthProvider>
        </Id24Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
