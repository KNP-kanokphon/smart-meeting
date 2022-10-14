import { Layout, Button } from 'antd';
import React, { useState } from 'react';
import { MainHeader } from './MainHeader';
import { MainPageHeader } from './MainPageHeader';
import { MainMenu } from './MainMenu';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';

const { Content, Sider } = Layout;

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
      <Layout
        className="site-layout"
        style={{ height: '100vh', overflow: 'auto' }}
      >
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <MainMenu />
        </Sider>
        <Layout>
          <MainHeader
            onLogout={() => {
              setUserRequestedLogout(true);
              logout().then(() => login(window.location.href, false));
            }}
          />
          {/* <MainPageHeader /> */}
          <Content style={{ margin: 16 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
