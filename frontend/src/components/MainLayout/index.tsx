import { Layout, Button } from 'antd';
import React, { useState } from 'react';
import { MainHeader } from './MainHeader';
import { MainPageHeader } from './MainPageHeader';
import { MainMenu } from './MainMenu';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';

const { Content, Sider, Footer } = Layout;

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { authenticated, login, logout } = useId24();
  const [userRequestedLogout, setUserRequestedLogout] = useState(false);

  const toggleOnId24 = false;
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
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
};
