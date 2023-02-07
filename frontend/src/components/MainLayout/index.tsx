import { Layout, Button, Result, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { MainHeader } from './MainHeader';
import { MainPageHeader } from './MainPageHeader';
import { MainMenu } from './MainMenu';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Roules, useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';
import { toggleOnId24 } from '../../configs';
import { SettingProfile } from '../../pages/createprofile/settingprofile';

const { Content, Sider, Footer } = Layout;
interface Prop {
  basename: string;
}

export const MainLayout: React.FC<Prop> = ({ basename }) => {
  const [loading, setLoading] = useState(true);
  const [syncdata, setSyncdata] = useState('');
  const { authenticated, login, logout, id24Axios } = useId24();
  const [userRequestedLogout, setUserRequestedLogout] = useState(false);
  const apiBaseUrl = id24Axios(window.location.origin);
  const { roomid } = useParams<{ roomid: string }>();
  const { step } = useParams<{ step: string }>();
  if (basename === 'vote') {
    window.location.href = `${window.location.origin}/${basename}/showqrcode/${roomid}/${step}`;
  }

  function multipleInArray(arr: string[], values: Roules[]) {
    return values.some(value => {
      return arr.includes(value);
    });
  }
  // useEffect(() => {
  //   checkprofile().then((data: any) => {
  //     setSyncdata(data?.data);
  //     setLoading(false);
  //   });
  // }, []);

  const auth = useId24();
  const groupRoules: string[] = [];
  if (auth) {
    auth.tokenAccess?.userAccess.map(groupId => {
      groupId.roles.forEach(function (value, i) {
        groupRoules.push(value);
      });
    });
  }
  const uniqueNames = groupRoules.filter((val: any, id: any, array: any) => {
    return array.indexOf(val) == id;
  });

  if (!authenticated && toggleOnId24) {
    if (userRequestedLogout) {
      login(window.location.href, true);
    } else {
      login(window.location.href, false);
    }

    return (
      <Button onClick={() => login(window.location.href, false)}>Login</Button>
    );
  }
  if (!authenticated && toggleOnId24) {
    if (!multipleInArray(uniqueNames, ['Meeting-create'])) {
      return (
        <Result
          status="403"
          title="403"
          subTitle="ท่านยังไม่มีสิทธิ์ในการเข้าถึงระบบ กรุณาตรวจสอบสิทธิ์ในการเข้าถึงกับผู้ดูแลระบบ."
          extra={
            <Button onClick={() => login(window.location.href, false)}>
              Login
            </Button>
          }
        />
      );
    }
  }
  // const checkprofile = async () => {
  //   return new Promise(async (resolve, reject) => {
  //     resolve(await apiBaseUrl.post(`/user/shrinkdata`));
  //   });
  // };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Sider
          trigger={null}
          collapsible
          style={{
            overflowX: 'hidden',
            overflowY: 'auto',
            height: '100vh',
            position: 'fixed',
          }}
        >
          <MainMenu />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <MainHeader
            onLogout={() => {
              setUserRequestedLogout(true);
              logout().then(() => login(window.location.href, false));
            }}
          />
          <Content
            style={{
              paddingBottom: 24,
              paddingLeft: 24,
              paddingRight: 24,
              margin: '0px 16px',
              minHeight: '80vh',
              overflow: 'initial',
            }}
          >
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,.45)' }}>
            <p>Smart-Meeting | Version: 1.1</p>
            <p>Copyright ©2022 OSD</p>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );

  return loading ? (
    <Spin spinning={true}></Spin>
  ) : (
    <Result
      status="info"
      title="ตั่งค่าโปรไฟล์"
      extra={[<SettingProfile dataprofile={syncdata} />]}
    />
  );
};
