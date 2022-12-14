import { Layout, Button, Row, Col, Card, Typography, Image } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  MobileOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
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
  uuidprofile: string;
}

export const MainLayoutProfileDetail: React.FC<Props> = ({ baseURL }) => {
  const { roomid } = useParams<{ roomid: string }>();
  const { userid } = useParams<{ userid: string }>();
  const [userprofile, setUserprofile] = useState<any>([]);
  const [getuserAll, setUserAll] = useState<any>([]);
  const [getuserAlls, setUserAlls] = useState<any>([]);
  const [getdataPosition, setdataPosition] = useState<any>([]);
  useEffect(() => {
    const dataAll = async () => {
      const dataall = await DatamanagementService().findAll();
      const newData: any = [];
      dataall.map((e: any, row: any) => {
        newData.push({
          data: {
            uuid:
              e.uuid === null || e.uuid === undefined || e.uuid === ''
                ? ''
                : e.uuid,
            email:
              e.email === null || e.email === undefined || e.email === ''
                ? ''
                : e.email,
            phonenumber:
              e.phonenumber === null ||
              e.phonenumber === undefined ||
              e.phonenumber === ''
                ? ''
                : e.phonenumber,
            prefix:
              e.prefix === null || e.prefix === undefined || e.prefix === ''
                ? ''
                : e.prefix,
            prefixtitleeng:
              e.prefixtitleeng === null ||
              e.prefixtitleeng === undefined ||
              e.prefixtitleeng === ''
                ? ''
                : e.prefixtitleeng,
            username:
              e.username === null ||
              e.username === undefined ||
              e.username === ''
                ? ''
                : e.username,
            username_eng:
              e.username_eng === null ||
              e.username_eng === undefined ||
              e.username_eng === ''
                ? ''
                : e.username_eng,
            position:
              e.position === null ||
              e.position === undefined ||
              e.position === ''
                ? ''
                : e.position,
          },
        });
        setUserAll(newData);
      });
    };
    const getDataProfile = async () => {
      const resultProfile = await DatamanagementService().getProfileByid(
        roomid,
        userid,
      );
      const newData: any = [];

      resultProfile.map((x: any, row: any) => {
        newData.push({
          uuidprofile: x.uuidprofile,
          idmeeting: x.idmeeting,
          username: x.username,
        });
        setUserprofile(newData);
      });
    };

    const getDataPosition = async () => {
      const resultDataPosiotion =
        await DatamanagementService().getPositionall();
      const newData: any = [];
      resultDataPosiotion.map((x: any, row: any) => {
        newData.push({
          // data: {
          nameposition: x.nameposition,
          uuid: x.uuid,
          // },
        });
        setdataPosition(newData);
      });
    };

    getDataProfile();
    getDataPosition();
    onCheckin();
    dataAll();
  }, []);

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
                            fontSize: '22px',
                            marginBottom: '5px',
                            fontFamily: 'kanit',
                          }}
                        >
                          {userprofile.map((e: any, row: any) => {
                            const dataresult = getuserAll?.find(
                              (x: any) => x?.data?.uuid === e.uuidprofile,
                            ) as any;
                            // console.log(dataresult?.data?.prefix);

                            return (
                              dataresult?.data?.prefix +
                              ' ' +
                              dataresult?.data?.username
                            );
                          })}
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
                          {userprofile.map((e: any, row: any) => {
                            const dataresult = getuserAll?.find(
                              (x: any) => x?.data?.uuid === e?.uuidprofile,
                            );
                            // console.log(dataresult?.data?.prefixtitleeng);
                            let prefix_eng: any = '';
                            if (dataresult?.data?.prefixtitleeng === null) {
                              prefix_eng = '';
                            } else {
                              prefix_eng =
                                dataresult?.data?.prefixtitleeng.toUpperCase();
                            }
                            return (
                              prefix_eng +
                              ' ' +
                              dataresult?.data?.username_eng.toUpperCase()
                            );
                          })}
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
                          {userprofile.map((e: any, row: any) => {
                            const dataresult = getuserAll?.find(
                              (x: any) => x?.data?.uuid === e?.uuidprofile,
                            );
                            // console.log(typeof dataresult?.data?.position);
                            if (
                              typeof dataresult?.data?.position === 'string'
                            ) {
                              return dataresult?.data?.position;
                            } else {
                              let datanamePosition: any = '';
                              dataresult?.data?.position.map(
                                (e: any, row: any) => {
                                  const dataresult = getdataPosition.filter(
                                    (x: any) => x?.uuid === e,
                                  );
                                  dataresult.map((e: any) => {
                                    datanamePosition += ' ' + e?.nameposition;
                                  });
                                },
                              );
                              let splittt = datanamePosition;
                              return (
                                <>
                                  <div style={{ whiteSpace: 'pre-line' }}>
                                    {splittt}
                                  </div>
                                </>
                              );
                            }
                          })}
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
                        {userprofile.map((e: any, row: any) => {
                          const dataresult = getuserAll?.find(
                            (x: any) => x?.data?.uuid === e?.uuidprofile,
                          );
                          return (
                            <a
                              href={`tel:${dataresult?.data?.phonenumber}`}
                              style={{ color: '#58585A' }}
                            >
                              {dataresult?.data?.phonenumber}
                            </a>
                          );
                        })}
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
                        {userprofile.map((e: any, row: any) => {
                          const dataresult = getuserAll?.find(
                            (x: any) => x?.data?.uuid === e?.uuidprofile,
                          );
                          return dataresult?.data?.email;
                        })}
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
                          href="https://www.kpi.ac.th/"
                        >
                          <GlobalOutlined />
                        </a>
                      </Col>
                      <Col style={{ textAlign: 'left' }}>
                        <a
                          style={{ color: '#1E6541' }}
                          href="https://www.kpi.ac.th/"
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
                        <Row gutter={6} style={{ justifyContent: 'center' }}>
                          <Col>|</Col>
                          <Col
                            style={{
                              textDecoration: 'underline',
                            }}
                          >
                            <a
                              href="tel:020965777"
                              style={{ color: '#C6A970' }}
                            >
                              02-0965777
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
                ??2022 O S D Company Limited
              </Typography>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};
