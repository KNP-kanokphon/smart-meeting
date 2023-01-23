import {
  Layout,
  Button,
  Menu,
  Row,
  Col,
  Card,
  Input,
  Space,
  Modal,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';
import styles from './MainLayout.module.scss';
import QRCode from 'qrcode.react';
import { Logo } from './Logo';
import { DatamanagementService } from '../../stores/meeting-store';
import {
  VerticalAlignBottomOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { saveAs } from 'file-saver';
// const { confirm, success } = Modal;
const { Content, Sider, Header, Footer } = Layout;

export interface Props {
  baseURL: string;
}

export const DetailStepThree: React.FC<Props> = ({ baseURL }) => {
  const { id } = useParams<{ id: string }>();
  const { userid } = useParams<{ userid: string }>();
  const navigate = useNavigate();
  const [userprofile, setUserprofile] = useState<any>([]);
  const [UserProfileContract, setUserprofileContracts] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getDataProfile();

    const interval = setInterval(() => {
      autoGetapiprofile();
    }, 3000);

    return () => clearInterval(interval);
  }, [modalOpen]);

  const autoGetapiprofile = async () => {
    const resultProfile = await DatamanagementService().getProfileByid(
      id,
      userid,
    );
    setModalOpen(resultProfile[0].checkin);
    if (resultProfile[0].checkin === true && modalOpen === false) {
      showModal();
      // nextPage();
    }
  };

  const getDataProfile = async () => {
    const resultProfile = await DatamanagementService().getProfileByid(
      id,
      userid,
    );
    setUserprofile(resultProfile[0]);
    const resultProfiles = await DatamanagementService().FindUserByID(userid);
    setUserprofileContracts(resultProfiles[0]);
  };

  const nextPage = () => {
    navigate(`/detailconfirm/${id}/${userid}`);
  };
  const showModal = () => {
    let secondsToGo = 3;

    const modal = Modal.success({
      title: 'ลงทะเบียนเสร็จสิ้น',
      content: `จะปิดการแสดงผลภายในเวลา ${secondsToGo} วินาที.`,
      okButtonProps: {
        style: {
          display: 'none',
        },
      },
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `จะปิดการแสดงผลภายในเวลา ${secondsToGo} วินาที.`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      nextPage();
      modal.destroy();
    }, secondsToGo * 1000);
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

  // const getFiles = async () => {
  //   const data = await DatamanagementService().getFilesoverview(id);
  //   const blob = new Blob([data], { type: 'application/pdf' });
  //   saveAs(blob, 'เอกสารภาพประกอบการประชุม.pdf');
  // };

  return (
    <Layout className="layout">
      <Header
        className={styles.siteLayoutBackground}
        style={{
          padding: 0,
          borderBottom: '1px solid #F0F0F0',
        }}
      />

      <Content
        style={{
          padding: '30px 30px',
          backgroundColor: '#F4FAF7',
          paddingTop: '20px',
          height: '85vh',
          overflowY: 'scroll',
        }}
      >
        {/* <div className="site-card-wrapper"> */}
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
                <Col span={24}>
                  <Logo />
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col span={24}>
                  <b style={{ fontSize: '18px', color: 'red' }}>KPIS Society</b>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col span={24} style={{ fontSize: '14px' }}>
                  กรุณาแสดง QR code นี้ให้กับเจ้าหน้าที่ <br></br>
                  ก่อนเข้าห้องประชุม
                </Col>
              </Row>
              <br></br>

              <Row>
                <Col span={24} style={{ fontSize: '18px' }}>
                  <b>
                    {UserProfileContract.prefix} {UserProfileContract.username}
                  </b>
                </Col>
              </Row>
              <br></br>
              <Row style={{ justifyContent: 'center' }}>
                <Col>
                  <Card style={{ width: 'auto', backgroundColor: 'white' }}>
                    <QRCode
                      id="qr-gen"
                      size={128}
                      value={`${window.location.host}/detail/detailcheckin/${id}/${userid}`}
                    />
                  </Card>
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
                    Download QR-Code
                    <VerticalAlignBottomOutlined />
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#F4FAF7' }}>
        ©2022 O S D Company Limited
      </Footer>
    </Layout>
  );
};
