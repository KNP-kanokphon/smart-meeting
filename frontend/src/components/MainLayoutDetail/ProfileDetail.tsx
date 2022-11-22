import { Layout, Button, Menu, Row, Col, Card, Typography, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';
import styles from './MainLayout.module.scss';
import { Logo } from './Logo';
import Background2 from '../../assets/images/BG_2.jpg';
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
                  // borderRadius:"10px",
                  boxShadow:
                    'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                }}
              >
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Logo />
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Row gutter={6}>
                      <Col span={12} style={{ textAlign: 'right' }}>
                        <Typography
                          style={{ fontSize: '20px', fontWeight: 'bold' }}
                        >
                          Welcome to
                        </Typography>
                      </Col>
                      <Col span={12} style={{ textAlign: 'left' }}>
                        <Typography
                          style={{
                            fontSize: '20px',
                            color: 'red',
                            fontWeight: 'bold',
                          }}
                        >
                          KPIS Society
                        </Typography>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    style={{
                      marginLeft: '10%',
                      fontSize: '14px',
                      textAlign: 'left',
                      marginTop: '15px',
                    }}
                  >
                    <Row gutter={20}>
                      <Col span={6}>
                        <Typography style={{ fontWeight: 'bold' }}>
                          ชื่อ
                        </Typography>
                      </Col>
                      <Col>
                        <Typography style={{ fontWeight: 'bold' }}>
                          :
                        </Typography>
                      </Col>
                      <Col>
                        <Typography>{userprofile?.username}</Typography>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* <Row>
                  <Col
                    span={24}
                    style={{
                      fontSize: '14px',
                      textAlign: 'left',
                      marginTop: '10px',
                    }}
                  >
                    <Space>
                      <Typography style={{ fontWeight: 'bold' }}>
                        รุ่นที่
                      </Typography>
                      <Typography>
                        {userprofile?.model ? userprofile?.model : '-'}
                      </Typography>
                    </Space>
                  </Col>
                </Row> */}

                <Row>
                  <Col
                    span={24}
                    style={{
                      marginLeft: '10%',
                      fontSize: '14px',
                      textAlign: 'left',
                      marginTop: '10px',
                    }}
                  >
                    <Row gutter={20}>
                      <Col span={6}>
                        <Typography style={{ fontWeight: 'bold' }}>
                          Name
                        </Typography>
                      </Col>
                      <Col>
                        <Typography style={{ fontWeight: 'bold' }}>
                          :
                        </Typography>
                      </Col>
                      <Col>
                        <Typography>
                          {/* {userprofile?.position ? userprofile?.position : '-'} */}
                          {getdataPosition.map((event: any) => {
                            if (event.uuid === userprofile?.position) {
                              return event.uuid != null ||
                                event.uuid != undefined ||
                                event.uuid != ''
                                ? ': ' + event.nameposition
                                : '-';
                            } else {
                              return <></>;
                            }
                          })}
                        </Typography>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col
                    span={24}
                    style={{
                      marginLeft: '10%',
                      fontSize: '14px',
                      textAlign: 'left',
                      marginTop: '10px',
                    }}
                  >
                    <Row gutter={20}>
                      <Col span={6}>
                        <Typography style={{ fontWeight: 'bold' }}>
                          ตำแหน่ง
                        </Typography>
                      </Col>
                      <Col>
                        <Typography style={{ fontWeight: 'bold' }}>
                          :
                        </Typography>
                      </Col>
                      <Col>
                        <Typography>
                          {/* {userprofile?.position ? userprofile?.position : '-'} */}
                          {getdataPosition.map((event: any) => {
                            if (event.uuid === userprofile?.position) {
                              return event.uuid != null ||
                                event.uuid != undefined ||
                                event.uuid != ''
                                ? ': ' + event.nameposition
                                : '-';
                            } else {
                              return <></>;
                            }
                          })}
                        </Typography>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col
                    span={24}
                    style={{
                      marginLeft: '10%',
                      fontSize: '14px',
                      textAlign: 'left',
                      marginTop: '10px',
                    }}
                  >
                    <Row gutter={16}>
                      <Col span={6}>
                        <Typography style={{ fontWeight: 'bold' }}>
                          เบอร์โทรศัพท์
                        </Typography>
                      </Col>
                      <Col>
                        <Typography style={{ fontWeight: 'bold' }}>
                          :
                        </Typography>
                      </Col>
                      <Col>
                        <Typography>
                          {/* {userprofile?.position ? userprofile?.position : '-'} */}
                          {getdataPosition.map((event: any) => {
                            if (event.uuid === userprofile?.position) {
                              return event.uuid != null ||
                                event.uuid != undefined ||
                                event.uuid != ''
                                ? event.nameposition
                                : '-';
                            } else {
                              return <></>;
                            }
                          })}
                        </Typography>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col
                    span={24}
                    style={{
                      marginLeft: '10%',
                      fontSize: '14px',
                      textAlign: 'left',
                      marginTop: '10px',
                    }}
                  >
                    <Row gutter={16}>
                      <Col span={6}>
                        <Typography style={{ fontWeight: 'bold' }}>
                          อีเมล
                        </Typography>
                      </Col>
                      <Col>
                        <Typography style={{ fontWeight: 'bold' }}>
                          :
                        </Typography>
                      </Col>
                      <Col>
                        <Typography>
                          {/* {userprofile?.position ? userprofile?.position : '-'} */}
                          {getdataPosition.map((event: any) => {
                            if (event.uuid === userprofile?.position) {
                              return event.uuid != null ||
                                event.uuid != undefined ||
                                event.uuid != ''
                                ? ': ' + event.nameposition
                                : '-';
                            } else {
                              return <></>;
                            }
                          })}
                        </Typography>
                      </Col>
                    </Row>
                    {/* <Space>

                      
                    </Space> */}
                  </Col>
                </Row>

                <Row>
                  <Col span={24} style={{ marginTop: '15px' }}>
                    <Button
                      style={{
                        width: 'auto',
                        backgroundColor: '#1F4E3A',
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
