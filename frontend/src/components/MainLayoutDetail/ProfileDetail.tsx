import { Layout, Button, Menu, Row, Col, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';
import styles from './MainLayout.module.scss';
import { Logo } from './Logo';
import { DatamanagementService } from '../../stores/meeting-store';

const { Content, Sider, Header, Footer } = Layout;
export interface Props {
  baseURL: string;
}
interface ProfileInterface {
  id: number;
  username: string;
  phone: string;
  email: string;
  model: string;
  position: string;
  uuid: string;
  idmeeting: string;
}

export const MainLayoutProfileDetail: React.FC<Props> = ({ baseURL }) => {
  const { roomid } = useParams<{ roomid: string }>();
  const { userid } = useParams<{ userid: string }>();
  const [userprofile, setUserprofile] = useState<ProfileInterface>();

  useEffect(() => {
    getDataProfile();
  }, []);

  const getDataProfile = async () => {
    const resultProfile = await DatamanagementService().getProfileByid(
      roomid,
      userid,
    );
    setUserprofile(resultProfile[0]);
  };

  const onCheckin = async () => {
    const status = true;
    const resultProfile = await DatamanagementService().checkin(
      roomid,
      userid,
      status,
    );
  };

  return (
    <Layout className="layout">
      <Header
        className={styles.siteLayoutBackground}
        style={{
          padding: 0,
          borderBottom: '1px solid #F0F0F0',
        }}
      >
        {/* <div className="logo" /> */}
      </Header>

      <Content
        style={{
          padding: '30px 30px',
          backgroundColor: '#F4FAF7',
          paddingTop: '20px',
          // paddingBottom: '30px',
          height: '80vh',
          overflow: 'scroll',
        }}
      >
        <div className="site-card-wrapper">
          <Row
            gutter={16}
            style={{
              justifyContent: 'center',
              display: 'flex',
              textAlign: 'center',
            }}
          >
            <Col xs={24} sm={24} md={18} lg={20}>
              <Card style={{ textAlign: 'center' }}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Logo />
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <b style={{ fontSize: '18px' }}>Welcome to </b>
                    <b style={{ fontSize: '18px', color: 'red' }}>
                      KPIS Society
                    </b>
                  </Col>
                </Row>

                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    style={{ fontSize: '14px', textAlign: 'left' }}
                  >
                    <b>ชื่อ {userprofile?.username}</b>
                  </Col>
                </Row>

                <Row>
                  <Col
                    span={24}
                    style={{ fontSize: '14px', textAlign: 'left' }}
                  >
                    รุ่นที่ {userprofile?.model}
                  </Col>
                </Row>

                <Row>
                  <Col
                    span={24}
                    style={{ fontSize: '14px', textAlign: 'left' }}
                  >
                    ตำแหน่ง {userprofile?.position}
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <Button
                      style={{
                        width: 'auto',
                        backgroundColor: '#1E6541',
                        color: '#ffffff',
                      }}
                      onClick={onCheckin}
                    >
                      Check-in
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#F4FAF7' }}>
        ©2022 O S D Company Limited
      </Footer>
    </Layout>
  );
};
