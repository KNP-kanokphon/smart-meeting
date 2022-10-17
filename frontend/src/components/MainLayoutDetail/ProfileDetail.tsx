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
  console.log(roomid);
  console.log(userid);

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
  const navigate = useNavigate();

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
          padding: '0 50px',
          backgroundColor: '#F4FAF7',
          paddingTop: '30px',
          paddingBottom: '30px',
          height: '85vh',
        }}
      >
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={7}></Col>
            <Col xs={24} sm={24} md={10} lg={10}>
              <Card style={{ textAlign: 'center' }}>
                <Row>
                  {/* <Col span={8}></Col> */}
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Logo />
                  </Col>
                  {/* <Col span={8}></Col> */}
                </Row>
                <br></br>
                <Row>
                  <Col span={2}></Col>
                  <Col span={20}>
                    <b style={{ fontSize: '100%' }}>Welcome to </b>
                    <b style={{ fontSize: '100%', color: 'red' }}>
                      KPIS Society
                    </b>
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={2}></Col>
                  <Col
                    span={20}
                    style={{ fontSize: '100%', textAlign: 'left' }}
                  >
                    <b>ชื่อ {userprofile?.username}</b>
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={2}></Col>
                  <Col
                    span={20}
                    style={{ fontSize: '100%', textAlign: 'left' }}
                  >
                    รุ่นที่ {userprofile?.model}
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={2}></Col>
                  <Col
                    span={20}
                    style={{ fontSize: '100%', textAlign: 'left' }}
                  >
                    ตำแหน่ง {userprofile?.position}
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br></br>
                <Row>
                  {/* <Col span={6}></Col> */}
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
                  {/* <Col span={6}></Col> */}
                </Row>
              </Card>
            </Col>
            <Col span={7}></Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#F4FAF7' }}>
        ©2022 O S D Company Limited
      </Footer>
    </Layout>
  );
};
