import { Layout, Button, Menu, Row, Col, Card, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';
import styles from './MainLayout.module.scss';
import QRCode from 'qrcode.react';
import { Logo } from './Logo';
import { DatamanagementService } from '../../stores/meeting-store';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';

const { Content, Sider, Header, Footer } = Layout;

export interface Props {
  baseURL: string;
}

export const DetailStepThree: React.FC<Props> = ({ baseURL }) => {
  const { id } = useParams<{ id: string }>();
  const { userid } = useParams<{ userid: string }>();
  const [userprofile, setUserprofile] = useState<any>([]);
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
  const downloadQRCode = () => {
    const canvas: any = document.getElementById('qr-gen');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const getFiles = async () => {
    const data = await DatamanagementService().getFiles(id);
    const blob = new Blob([data], { type: 'application/pdf' });
    saveAs(blob, 'เอกสารภาพประกอบการประชุม.pdf');
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
                  <Col span={24}>
                    <Logo />
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={2}></Col>
                  <Col span={20}>
                    <b style={{ fontSize: '100%', color: 'red' }}>
                      KPIS Society
                    </b>
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={24} style={{ fontSize: '80%' }}>
                    กรุณาแสดง QR code นี้ให้กับเจ้าหน้าที่ก่อนเข้าห้องประชุม
                  </Col>
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
                <Row>
                  <Col span={24}>
                    <QRCode
                      id="qr-gen"
                      size={128}
                      value={`${window.location.host}/profileDetail/${id}/${userid}`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Button
                      type="link"
                      onClick={downloadQRCode}
                      style={{
                        textAlign: 'center',
                        marginBottom: '10px',
                        marginTop: '10px',
                      }}
                    >
                      Dowload QR-Code
                      <VerticalAlignBottomOutlined />
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col span={24} style={{ fontSize: '80%' }}>
                    เอกสารภาพประกอบการประชุม
                    <Button type="link" onClick={getFiles}>
                      Dowload
                    </Button>
                  </Col>
                </Row>
                <br></br>
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
