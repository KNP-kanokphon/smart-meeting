import { Layout, Button, Menu, Row, Col, Card, Result, Typography } from 'antd';
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
interface MeetingInterface {
  id: number;
  title: string;
  room: string;
  floor: string;
  building: string;
  meetingplace: string;
  day: string;
  starttime: string;
  endtime: string;
  uuid: string;
  detail: string;
}

export const MainLayoutDetail: React.FC<Props> = ({ baseURL }) => {
  const { id } = useParams<{ id: string }>();
  const [meetingData, setMeetingData] = useState<MeetingInterface>();
  useEffect(() => {
    getDataProfile();
  }, []);
  const getDataProfile = async () => {
    const result = await DatamanagementService().getMeetingByid(id);
    setMeetingData(result[0]);
  };

  const navigate = useNavigate();
  const onChange = () => {
    navigate(`/steptwo/${id}`);
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
                    style={{ fontSize: '14px' }}
                  >
                    Please check in for Generate your ticket
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={8}
                    lg={8}
                    style={{
                      textAlign: 'left',
                      fontSize: '100%',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        marginBottom: '5px',
                      }}
                    >
                      {'Title : '}
                    </Typography>

                    {meetingData?.title}
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={10}
                    lg={10}
                    style={{
                      textAlign: 'left',
                      fontSize: '100%',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      // display: 'flex',
                      // justifyContent: 'center',
                    }}
                  >
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        marginBottom: '5px',
                      }}
                    >
                      {'Schedual : '}
                    </Typography>
                    วันที่ {meetingData?.day}
                    <br></br>
                    เวลา {meetingData?.starttime} ถึง {meetingData?.endtime}
                    <br></br>ณ ห้อง {meetingData?.room}
                    <br></br>
                    อาคาร {meetingData?.building}
                    <br></br>
                    รายละเอียด {meetingData?.detail}
                  </Col>
                </Row>

                <br></br>
                <Row>
                  <Col span={24}>
                    <Button
                      style={{
                        textAlign: 'center',
                        width: 'auto',
                        backgroundColor: '#1E6541',
                        color: '#ffffff',
                      }}
                      onClick={onChange}
                    >
                      Submit
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
