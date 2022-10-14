import { Button, Col, Dropdown, Layout, Menu, Row } from 'antd';
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
      className={styles.siteLayoutBackground}
      style={{
        padding: 0,
        borderBottom: '1px solid #F0F0F0',
      }}
    >
      <Row>
        <Col>
          <Logo />
        </Col>
        <Col style={{ marginRight: 20 }}>
          <Dropdown overlay={menu}>
            <Button type="link" onClick={e => e.preventDefault()}>
              <CaretDownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  );
};
