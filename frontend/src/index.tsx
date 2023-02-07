import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'antd/dist/antd.min.css';
import App from './App';
import { ConfigProvider } from 'antd';
import thTH from 'antd/lib/locale-provider/th_TH';
import 'moment/locale/th';
import reportWebVitals from './reportWebVitals';
import { Id24, Id24State } from './drivers/id24/Id24';
import { AuthService } from './drivers/id24/auth-service';
import axios from 'axios';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import { AuthenticationHelper } from './drivers/id24/models/authentication-helper';
import { Id24InstanceProvider } from './drivers/id24/Id24InstanceProvider';

dayjs.extend(buddhistEra);

const app = async () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );

  try {
    const appConfig = {
      clientId:
        process.env['REACT_APP_ID24_CLIENT_ID'] ||
        '46a6652e-eb76-4563-ae07-cab233a9cf1d',
      authUrl: process.env['REACT_APP_AUTH_URL'] || 'http://localhost:8080',
    };
    const { authUrl, clientId } = appConfig;
    const id24 = Id24(
      window,
      localStorage,
      AuthService(
        axios.create({
          baseURL: authUrl,
          withCredentials: true,
        }),
      ),
      authUrl,
      clientId,
    );
    const id24Instance = await id24.init();
    const { authorize, renewAccessToken, logout, reloadPage } = id24;
    const authenticationHelper: AuthenticationHelper = {
      authorize,
      renewAccessToken: () =>
        renewAccessToken()
          .then(id24Instance => {
            return id24Instance.state === Id24State.Authorized
              ? {
                  tokenAccess: id24Instance.tokenAccess,
                  rawAccessToken: id24Instance.rawAccessToken,
                }
              : null;
          })
          .catch(() => {
            return null;
          }),
      logout,
      reloadPage,
    };
    root.render(
      // <Id24InstanceProvider
      //   instance={id24Instance}
      //   authenticationHelper={authenticationHelper}
      // >
      //   <ConfigProvider locale={thTH}>
      <App />,
      //   </ConfigProvider>
      // </Id24InstanceProvider>,
    );
    reportWebVitals();
  } catch (e) {
    // console.log(e);
  }
};

app();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
