// import { Layout, Button, Menu, Row, Col, Card, Typography, Space } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { Outlet, useParams, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../utils/auth';
// import { useId24 } from '../../drivers/id24/Id24Provider';
// import styles from './MainLayout.module.scss';
// import { Logo } from './Logo';
// import { DatamanagementService } from '../../stores/meeting-store';

// const { Content, Sider, Header, Footer } = Layout;
// export interface Props {
//   baseURL: string;
// }
// interface ProfileInterface {
//   id: number;
//   username: string;
//   phone: string;
//   email: string;
//   model: string;
//   position: string;
//   uuid: string;
//   idmeeting: string;
// }

// export const MainLayoutProfile: React.FC<Props> = ({ baseURL }) => {
//   const { userid } = useParams<{ userid: string }>();
//   const [userprofile, setUserprofile] = useState<ProfileInterface>();
//   const [getdataPosition, setdataPosition] = useState<any>([]);
//   useEffect(() => {
//     getDataProfile();
//     getDataPosition();
//   }, []);

//   const getDataProfile = async () => {
//     const resultProfile = await DatamanagementService().findbyid(userid);
//     setUserprofile(resultProfile[0]);
//   };

//   const getDataPosition = async () => {
//     const resultDataPosiotion = await DatamanagementService().getPositionall();
//     setdataPosition(resultDataPosiotion);
//   };

//   return (
//     <Layout className="layout">
//       <Header
//         className={styles.siteLayoutBackground}
//         style={{
//           padding: 0,
//           borderBottom: '1px solid #F0F0F0',
//         }}
//       >
//         {/* <div className="logo" /> */}
//       </Header>

//       <Content
//         style={{
//           padding: '30px 30px',
//           backgroundColor: '#F4FAF7',
//           paddingTop: '20px',
//           // paddingBottom: '30px',
//           height: '80vh',
//           overflow: 'scroll',
//         }}
//       >
//         <div className="site-card-wrapper">
//           <Row
//             gutter={16}
//             style={{
//               justifyContent: 'center',
//               display: 'flex',
//               textAlign: 'center',
//             }}
//           >
//             <Col xs={24} sm={24} md={18} lg={20}>
//               <Card style={{ textAlign: 'center' }}>
//                 <Row>
//                   <Col xs={24} sm={24} md={24} lg={24}>
//                     <Logo />
//                   </Col>
//                 </Row>
//                 <br></br>
//                 <Row>
//                   <Col xs={24} sm={24} md={24} lg={24}>
//                     <b style={{ fontSize: '18px' }}>Welcome to </b>
//                     <b style={{ fontSize: '18px', color: 'red' }}>
//                       KPIS Society
//                     </b>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col
//                     xs={24}
//                     sm={24}
//                     md={24}
//                     lg={24}
//                     style={{
//                       fontSize: '14px',
//                       textAlign: 'left',
//                       marginTop: '15px',
//                     }}
//                   >
//                     <Space>
//                       <Typography style={{ fontWeight: 'bold' }}>
//                         ชื่อ
//                       </Typography>
//                       <Typography>{userprofile?.username}</Typography>
//                     </Space>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col
//                     span={24}
//                     style={{
//                       fontSize: '14px',
//                       textAlign: 'left',
//                       marginTop: '10px',
//                     }}
//                   >
//                     <Space>
//                       <Typography style={{ fontWeight: 'bold' }}>
//                         ตำแหน่ง
//                       </Typography>
//                       <Typography>
//                         {/* {userprofile?.position ? userprofile?.position : '-'} */}
//                         {getdataPosition.map((event: any) => {
//                           if (event.uuid === userprofile?.position) {
//                             return event.uuid != null ||
//                               event.uuid != undefined ||
//                               event.uuid != ''
//                               ? event.nameposition
//                               : '-';
//                           } else {
//                             return <></>;
//                           }
//                         })}
//                       </Typography>
//                     </Space>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </Content>
//       <Footer style={{ textAlign: 'center', backgroundColor: '#F4FAF7' }}>
//         ©2022 O S D Company Limited
//       </Footer>
//     </Layout>
//   );
// };

import { Layout, Row, Col, Card, Typography, Image, Space } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  MobileOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Logogold } from './Logo';
import Background2 from '../../assets/images/BG_2.jpg';
import { DatamanagementService } from '../../stores/meeting-store';
import leam from '../../assets/images/4leam.png';

const { Content } = Layout;
export interface Props {
  baseURL: string;
}
// interface ProfileInterface {
//   id: number;
//   username: string;
//   phone: string;
//   email: string;
//   model: string;
//   position: string;
//   uuid: string;
//   idmeeting: string;
//   uuidprofile: string;
// }

export const MainLayoutProfile: React.FC<Props> = ({ baseURL }) => {
  const { roomid } = useParams<{ roomid: string }>();
  const { userid } = useParams<{ userid: string }>();

  const [userprofile, setUserprofile] = useState<any>([]);
  const [getuserAll, setUserAll] = useState<any>([]);
  const [getdataPosition, setdataPosition] = useState<any>([]);
  // const PHONE_NUMBER = getuserAll?.phonenumber;
  useEffect(() => {
    getDataProfile();
    getDataPosition();
    onCheckin();
    dataAll();
  }, []);

  const dataAll = async () => {
    const dataall = await DatamanagementService().FindUserByID(userid);
    setUserAll(dataall[0]);
  };
  const getDataProfile = async () => {
    const resultProfile = await DatamanagementService().getProfileByid(
      roomid,
      userid,
    );
    const newData: any = [];

    resultProfile.map((x: any) => {
      newData.push({
        uuidprofile: x.uuidprofile,
        idmeeting: x.idmeeting,
        username: x.username,
      });
      setUserprofile(newData);
    });
  };

  const getDataPosition = async () => {
    const resultDataPosiotion = await DatamanagementService().getPositionall();
    const newData: any = [];
    resultDataPosiotion.map((x: any) => {
      newData.push({
        nameposition: x.nameposition,
        uuid: x.uuid,
      });
      setdataPosition(newData);
    });
  };

  // console.log(getuserAll);

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

                <Row gutter={16}>
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
                            fontSize: '16px',
                            marginBottom: '5px',
                            fontFamily: 'kanit',
                          }}
                        >
                          <Space>
                            {getuserAll?.prefix}
                            {getuserAll?.username}
                          </Space>
                        </Typography>
                      </Col>
                      <Col span={24}>
                        <Typography
                          style={{
                            fontWeight: 'bold',
                            color: '#C6A970',
                            fontSize: '16px',
                            marginBottom: '5px',
                            fontFamily: 'kanit',
                          }}
                        >
                          <Space>
                            {getuserAll?.prefixtitleeng?.toUpperCase()}
                            {getuserAll?.username_eng?.toUpperCase()}
                          </Space>
                        </Typography>
                      </Col>
                      <Col span={24} style={{ marginTop: '5px' }}>
                        <Typography
                          style={{
                            color: '#58585A',
                            fontSize: '16px',
                            fontFamily: 'kanit',
                          }}
                        >
                          {getuserAll?.position?.map((e: any, row: any) => {
                            let datanamePosition: any = '';
                            const dataAlls = getdataPosition?.find(
                              (x: any) => e === x.uuid,
                            );
                            if (getuserAll?.position.length === 1) {
                              return dataAlls.nameposition;
                            } else if (getuserAll?.position.length > 1) {
                              datanamePosition += ' ' + dataAlls.nameposition;
                              let splittt = datanamePosition;
                              return (
                                <>
                                  <div style={{ whiteSpace: 'pre-line' }}>
                                    {splittt}
                                  </div>
                                </>
                              );
                            } else {
                              return <>{'-'}</>;
                            }
                          })}
                        </Typography>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row gutter={16} style={{ marginTop: '5px' }}>
                  <Col offset={2} span={22} style={{ textAlign: 'left' }}>
                    <Row gutter={16}>
                      <Col span={2}>
                        <MobileOutlined />
                      </Col>
                      <Col span={22} style={{ textDecoration: 'underline' }}>
                        <a
                          href={`${getuserAll?.phonenumber}`}
                          style={{ color: '#C6A970' }}
                        >
                          {getuserAll?.phonenumber}
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: '5px' }}>
                  <Col offset={2} span={22} style={{ textAlign: 'left' }}>
                    <Row gutter={16}>
                      <Col span={2}>
                        <MailOutlined />
                      </Col>
                      <Col span={22}>
                        {getuserAll?.email ? getuserAll?.email : '-'}
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
                    style={{ textAlign: 'center' }}
                  >
                    <Row gutter={6} style={{ justifyContent: 'center' }}>
                      <Col style={{ textAlign: 'right' }}>
                        <a
                          style={{ color: '#1E6541' }}
                          href="http://www.kpisociety.com"
                        >
                          <GlobalOutlined />
                        </a>
                      </Col>
                      <Col style={{ textAlign: 'left' }}>
                        <a
                          style={{
                            color: '#1E6541',
                            textDecoration: 'underline',
                          }}
                          href="http://www.kpisociety.com"
                        >
                          www.kpisociety.com
                        </a>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    style={{ textAlign: 'center' }}
                  >
                    <Row style={{ marginBottom: '10px', textAlign: 'center' }}>
                      <Col
                        span={8}
                        style={{
                          fontSize: '12px',
                          color: '#C6A970',
                        }}
                      >
                        <Row gutter={2} style={{ justifyContent: 'right' }}>
                          <Col>
                            <PhoneOutlined />
                          </Col>
                          <Col style={{ textDecoration: 'underline' }}>
                            <a
                              href="tel:020966777"
                              style={{ color: '#C6A970' }}
                            >
                              02-0966777
                            </a>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        span={8}
                        style={{
                          fontSize: '12px',
                          color: '#C6A970',
                        }}
                      >
                        <Row gutter={6} style={{ justifyContent: 'center' }}>
                          <Col>|</Col>
                          <Col
                            style={{
                              textDecoration: 'underline',
                            }}
                          >
                            <a
                              href="tel:021419772"
                              style={{ color: '#C6A970' }}
                            >
                              02-1419772
                            </a>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        span={8}
                        style={{
                          fontSize: '12px',
                          color: '#C6A970',
                        }}
                      >
                        <Row gutter={1} style={{ justifyContent: 'left' }}>
                          <Col>|</Col>
                          <Col style={{ textDecoration: 'underline' }}>
                            <a
                              href="tel:0814714777"
                              style={{ color: '#C6A970' }}
                            >
                              081-4714777
                            </a>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
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
