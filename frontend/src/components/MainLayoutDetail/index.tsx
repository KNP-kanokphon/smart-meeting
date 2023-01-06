import { Layout, Button, Menu, Row, Col, Card, Result, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';
import styles from './MainLayout.module.scss';
import { Logo } from './Logo';
import { DatamanagementService } from '../../stores/meeting-store';
import dayjs from 'dayjs';

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
  // const { room } = useParams<{ room: string }>();
  // console.log(room);

  const [meetingData, setMeetingData] = useState<MeetingInterface>();
  const [agenda, setAgenda] = useState<any>();
  useEffect(() => {
    getDataProfile();
  }, []);
  const getDataProfile = async () => {
    const result = await DatamanagementService().getMeetingByid(id);
    const resultAgenda = await DatamanagementService().getagendaByid(id);
    setAgenda(resultAgenda);
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
                    xs={8}
                    sm={4}
                    md={{ span: 2, offset: 4 }}
                    lg={{ span: 2, offset: 4 }}
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
                        // marginTop: '5px',
                      }}
                    >
                      {'หัวข้อ :'}
                    </Typography>
                  </Col>
                  <Col
                    xs={16}
                    sm={20}
                    md={8}
                    lg={8}
                    style={{
                      textAlign: 'left',
                      fontSize: '100%',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      marginTop: '1px',
                    }}
                  >
                    {meetingData?.title}
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={{ span: 2, offset: 4 }}
                    lg={{ span: 2, offset: 4 }}
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
                        // marginTop: '5px',
                      }}
                    >
                      {'กำหนดการ :'}
                    </Typography>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={18}
                    lg={18}
                    style={{
                      textAlign: 'left',
                      fontSize: '100%',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      // marginTop: '10px',
                    }}
                  >
                    <Row>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{
                          textAlign: 'left',
                          fontSize: '100%',
                        }}
                      >
                        วันที่ :{' '}
                        {dayjs(meetingData?.day)
                          .add(543, 'year')
                          .format('DD/MM/YYYY')}
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{
                          textAlign: 'left',
                          fontSize: '100%',
                        }}
                      >
                        เวลา : {meetingData?.starttime.substring(0, 5)} ถึง{' '}
                        {meetingData?.endtime.substring(0, 5)} น.
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{
                          textAlign: 'left',
                          fontSize: '100%',
                        }}
                      >
                        ณ ห้อง : {meetingData?.room}
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        style={{
                          textAlign: 'left',
                          fontSize: '100%',
                        }}
                      >
                        อาคาร : {meetingData?.building}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={{ span: 2, offset: 4 }}
                    lg={{ span: 2, offset: 4 }}
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
                        // marginBottom: '5px',
                        // marginTop: '5px',
                        marginTop: '4px',
                      }}
                    >
                      รายละเอียด :
                    </Typography>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={{ span: 16 }}
                    lg={{ span: 16 }}
                    style={{
                      textAlign: 'left',
                      fontSize: '100%',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      marginTop: '6px',
                    }}
                  >
                    {meetingData?.detail}
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={{ span: 2, offset: 4 }}
                    lg={{ span: 2, offset: 4 }}
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
                        // marginBottom: '5px',
                        // marginTop: '5px',
                        marginTop: '4px',
                      }}
                    >
                      วาระ :
                    </Typography>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={{ span: 16 }}
                    lg={{ span: 16 }}
                    style={{
                      textAlign: 'left',
                      fontSize: '100%',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      marginTop: '6px',
                    }}
                  >
                    {agenda?.map((e: any, i: number) => {
                      return (
                        <>
                          <Row key={i}>
                            {e?.agendes} : {e?.detailagendes}
                            <br></br>
                          </Row>
                        </>
                      );
                    })}
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
