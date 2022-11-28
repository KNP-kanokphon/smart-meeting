import {
  Layout,
  Button,
  Menu,
  Row,
  Col,
  Card,
  Typography,
  Space,
  Image,
  Anchor,
} from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  MobileOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';
import styles from './MainLayout.module.scss';
import { Logo, Logogold } from './Logo';
import Background2 from '../../assets/images/BG_2.jpg';
import { DatamanagementService } from '../../stores/meeting-store';
import leam from '../../assets/images/4leam.png';

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
  const { Link } = Anchor;
  const { roomid } = useParams<{ roomid: string }>();
  const { userid } = useParams<{ userid: string }>();
  const [userprofile, setUserprofile] = useState<ProfileInterface>();
  const [getdataPosition, setdataPosition] = useState<any>([]);

  useEffect(() => {
    getDataProfile();
    getDataPosition();
  }, []);

  const getDataProfile = async () => {
    const resultProfile = await DatamanagementService().getProfileByid(
      roomid,
      userid,
    );
    setUserprofile(resultProfile[0]);
  };

  const getDataPosition = async () => {
    const resultDataPosiotion = await DatamanagementService().getPositionall();
    setdataPosition(resultDataPosiotion);
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
      {/* <Header
        className={styles.siteLayoutBackground}
        style={{
          padding: 0,
          borderBottom: '1px solid #F0F0F0',
        }}
      >
       
      </Header> */}

      <Content
        style={{
          // position: 'absolute',
          padding: '30px 30px',
          backgroundImage: `url(${Background2})`,
          paddingTop: '5%',
          height: '100vh',
          width: '100%',
          overflow: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
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
            <Col xs={24} sm={24} md={18} lg={12}>
              <Card
                style={{
                  textAlign: 'center',
                  backgroundColor: '#F5F4F1',
                  borderRadius: '10px',
                  boxShadow:
                    'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                }}
              >
                <Row style={{ marginBottom: '20px' }}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Logogold />
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: '20px' }}>
                  <Col span={2}>
                    <Image
                      src={leam}
                      width={10}
                      height={'auto'}
                      preview={false}
                    />
                  </Col>
                  <Col span={22} style={{ textAlign: 'left' }}>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Typography
                          style={{
                            fontWeight: 'bold',
                            color: '#1F4E3A',
                            fontSize: '22px',
                            marginBottom: '5px',
                            fontFamily: 'kanit',
                          }}
                        >
                          {userprofile?.username}
                        </Typography>
                      </Col>
                      <Col span={24}>
                        <Typography
                          style={{
                            fontWeight: 'bold',
                            color: '#C6A970',
                            fontSize: '22px',
                            marginBottom: '5px',
                            fontFamily: 'kanit',
                          }}
                        >
                          {/* {userprofile?.username} */}
                          PHIBOON NITITHAWAN
                        </Typography>
                      </Col>
                      <Col span={24}>
                        <Typography
                          style={{
                            color: '#58585A',
                            fontSize: '16px',
                            fontFamily: 'kanit',
                          }}
                        >
                          {/* {getdataPosition.map((event: any) => {
                            return event.nameposition;
                          })} */}
                          นายกเทศมนตรี
                        </Typography>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col offset={2} span={22} style={{ textAlign: 'left' }}>
                    <Row gutter={16}>
                      <Col span={2}>
                        <MobileOutlined />
                      </Col>
                      <Col span={22} style={{ textDecoration: 'underline' }}>
                        <a href="tel:0901585061" style={{ color: '#58585A' }}>
                          0901585061
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: '20px' }}>
                  <Col offset={2} span={22} style={{ textAlign: 'left' }}>
                    <Row gutter={16}>
                      <Col span={2}>
                        <MailOutlined />
                      </Col>
                      <Col span={22}>Wasmee13440@gmail.com</Col>
                    </Row>
                  </Col>
                </Row>
                <Row gutter={6} style={{ textAlign: 'center' }}>
                  <Col span={6} style={{ textAlign: 'right' }}>
                    <a
                      style={{ color: '#1E6541' }}
                      href="https://www.kpi.ac.th/"
                    >
                      <GlobalOutlined />
                    </a>
                  </Col>
                  <Col span={18} style={{ textAlign: 'left' }}>
                    <a
                      style={{ color: '#1E6541' }}
                      href="https://www.kpi.ac.th/"
                    >
                      www.kpisociety.com
                    </a>
                  </Col>
                </Row>
                <Row
                  // gutter={3}
                  style={{ marginBottom: '10px', textAlign: 'center' }}
                >
                  <Col
                    span={8}
                    style={{
                      fontSize: '12px',
                      textAlign: 'right',
                      color: '#C6A970',
                    }}
                  >
                    <Row gutter={2}>
                      <Col>
                        <PhoneOutlined />
                      </Col>
                      <Col style={{ textDecoration: 'underline' }}>
                        <a href="tel:021419772" style={{ color: '#C6A970' }}>
                          02-1419772
                        </a>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    span={8}
                    style={{
                      fontSize: '12px',
                      textAlign: 'center',
                      color: '#C6A970',
                    }}
                  >
                    <Row gutter={6}>
                      <Col>|</Col>
                      <Col style={{ textDecoration: 'underline' }}>
                        <a href="tel:020965777" style={{ color: '#C6A970' }}>
                          02-0965777
                        </a>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    span={8}
                    style={{
                      fontSize: '12px',
                      textAlign: 'left',
                      color: '#C6A970',
                    }}
                  >
                    <Row gutter={1}>
                      <Col>|</Col>
                      <Col style={{ textDecoration: 'underline' }}>
                        <a href="tel:0814714777" style={{ color: '#C6A970' }}>
                          081-4714777
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col span={24} style={{ marginTop: '15px' }}>
                    <Button
                      style={{
                        width: 'auto',
                        backgroundColor: '#1F4E3A',
                        color: '#ffffff',
                        borderRadius: '10px',
                      }}
                      onClick={onCheckin}
                    >
                      Check-in
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24} style={{ marginTop: '10%' }}>
              <Typography style={{ color: 'white', fontWeight: 'bold' }}>
                ©2022 O S D Company Limited
              </Typography>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};
