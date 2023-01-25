import { Button, Col, Dropdown, Layout, Menu, Row, Avatar } from 'antd';
import React from 'react';
import styles from './MainLayout.module.scss';
import { Logo } from './Logo';
import { CaretDownOutlined } from '@ant-design/icons';

type Props = {
  onLogout: () => void;
};

export const MainHeader: React.FC<Props> = ({ onLogout }) => {
  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={() => onLogout()}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header
      style={{
        padding: 0,
        borderBottom: '1px solid #F0F0F0',
        background: '#1E6541',
      }}
    >
      <Row
        style={{
          justifyContent: 'right',
          paddingLeft: '50px',
        }}
      >
        <Col style={{ marginRight: 20 }}>
          <Avatar
            style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
            size="large"
            gap={1}
          >
            admin
          </Avatar>
        </Col>
        <Col style={{ marginRight: 20 }}>
          <Dropdown overlay={menu}>
            <CaretDownOutlined style={{ color: '#ffffff' }} />
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  );
};
