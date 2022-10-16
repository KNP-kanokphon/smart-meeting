import { Layout, Button, Menu, Row, Col, Card, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';
import styles from './MainLayout.module.scss';
import QRCode from 'react-qr-code';
import { Logo } from './Logo';
import { DatamanagementService } from '../../stores/meeting-store';

const { Content, Sider, Header, Footer } = Layout;

export interface Props {
  baseURL: string;
}

export const DetailStepThree: React.FC<Props> = ({ baseURL }) => {
  const { id } = useParams<{ id: string }>();
  const { userid } = useParams<{ userid: string }>();
  const [userprofile, setUserprofile] = useState<any>([]);
  // console.log(id);
  // console.log(id);
  useEffect(() => {
    getDataProfile();
  }, []);
  const getDataProfile = async () => {
    const resultProfile = await DatamanagementService().getProfileByid(
      id,
      userid,
    );
    setUserprofile(resultProfile[0]);
  };
  const navigate = useNavigate();
  const onChange = () => {
    navigate(`${baseURL}/steptwo/${id}`);
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
        }}
      >
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}></Col>
            <Col span={8}>
              <Card style={{ textAlign: 'center' }}>
                <Row>
                  <Col span={24}>
                    <Logo />
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={2}></Col>
                  <Col span={20}>
                    <b style={{ fontSize: '20px', color: 'red' }}>
                      KPIS Society
                    </b>
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={2}></Col>
                  <Col span={20} style={{ fontSize: '12px' }}>
                    กรุณาแสดง QR code นี้ให้กับเจ้าหน้าที่ก่อนเข้าห้องประชุม
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={2}></Col>
                  <Col span={20} style={{ fontSize: '18px' }}>
                    <b>{userprofile?.username}</b>
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br></br>
                <Card>
                  <Row>
                    <Col span={24}>
                      <QRCode
                        value={`${window.location.host}/profileDetail/${id}/${userid}`}
                      />
                    </Col>
                  </Row>
                </Card>
              </Card>
            </Col>
            <Col span={8}></Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#F4FAF7' }}>
        ©2022 O S D Company Limited
      </Footer>
    </Layout>
  );
};
