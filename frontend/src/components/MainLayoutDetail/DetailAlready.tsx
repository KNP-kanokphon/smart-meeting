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

export const DetailAlready: React.FC<Props> = ({ baseURL }) => {
  const { roomid } = useParams<{ roomid: string }>();
  const { userid } = useParams<{ userid: string }>();
  const [meetingData, setMeetingData] = useState<MeetingInterface>();
  const [agenda, setAgenda] = useState<any>();
  const [user, setUser] = useState<any>();
  const [food, setFood] = useState<any>([]);
  const [userprofile, setUserprofile] = useState<any>([]);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [UserProfileContract, setUserprofileContracts] = useState<any>([]);

  useEffect(() => {
    getDataProfile();
  }, []);

  const nextPage = () => {
    navigate(`/stepthree/${roomid}/${userid}`);
  };

  const getDataProfile = async () => {
    const result = await DatamanagementService().getMeetingByid(roomid);
    const resultAgenda = await DatamanagementService().getagendaByid(roomid);
    const resultUser = await DatamanagementService().getProfileByid(
      roomid,
      userid,
    );
    const resultProfiles = await DatamanagementService().FindUserByID(userid);

    const resultFood = await DatamanagementService().getDetailfood(roomid);
    setFood(resultFood);
    setAgenda(resultAgenda);
    setMeetingData(result[0]);
    setUser(resultUser[0]);
    setConfirm(resultUser[0].confirm);
    if (resultUser[0].confirm === true) {
      nextPage();
    }
    setUserprofileContracts(resultProfiles[0]);
  };

  const navigate = useNavigate();
  const onChangeMeet = async () => {
    const resultUpdate = await DatamanagementService().updateStatusUser(
      roomid,
      userid,
    );
    if (food.length > 0) {
      navigate(`/detailalready/detailfood/${roomid}/${userid}`);
    } else {
      navigate(`/stepthree/${roomid}/${userid}`);
    }
  };

  const onChangeNoMeet = async () => {
    const dataNomeet = {
      data: {
        confirm: false,
        checkin: true,
      },
    };
    const resultUpdate = await DatamanagementService().updateUserNoomeet(
      roomid,
      userid,
      dataNomeet,
    );
    if (resultUpdate) {
      navigate(`/detailnomeet/${roomid}/${userid}`);
    }
  };

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
          padding: '10px 10px',
          backgroundColor: '#F4FAF7',
          paddingTop: '20px',
          height: '85vh',
          overflowY: 'scroll',
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
                <Row gutter={16}>
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
                      }}
                    >
                      {'เรียนคุณ :'}
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
                      marginTop: '2px',
                    }}
                  >
                    {UserProfileContract?.prefix}{' '}
                    {UserProfileContract?.username}
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={{ span: 20, offset: 4 }}
                    lg={{ span: 20, offset: 4 }}
                    style={{
                      textAlign: 'left',
                      fontSize: '100%',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                    }}
                  >
                    ขอเรียนเชิญประชุม
                  </Col>
                </Row>
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
                        marginTop: '5px',
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
                      marginTop: '8px',
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
                  {/* <Col
                    xs={10}
                    sm={10}
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
                        marginTop: '5px',
                      }}
                    >
                      {'วาระ :'}
                    </Typography>
                  </Col> */}
                  {/* <Col
                    xs={24}
                    sm={24}
                    md={{ span: 16 }}
                    lg={{ span: 16 }}
                    style={{
                      textAlign: 'left',
                      fontSize: '100%',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      marginTop: '8px',
                    }}
                  >
                    {agenda?.map((e: any, i: number) => {
                      return (
                        <>
                          <Row key={i}>
                            ระเบียบวาระที่ {e.step} : {e?.detailagendes}
                            <br></br>
                          </Row>
                        </>
                      );
                    })}
                  </Col> */}
                </Row>
                <br></br>
                <Row gutter={16}>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Button
                      style={{
                        textAlign: 'center',
                        width: '100px',
                        backgroundColor: '#1E6541',
                        color: '#ffffff',
                      }}
                      onClick={onChangeMeet}
                    >
                      เข้าร่วม
                    </Button>
                  </Col>
                  <Col span={12} style={{ textAlign: 'left' }}>
                    <Button
                      style={{
                        textAlign: 'center',
                        width: '100px',
                        backgroundColor: '#DB1F48',
                        color: '#ffffff',
                      }}
                      onClick={onChangeNoMeet}
                    >
                      ไม่เข้าร่วม
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
