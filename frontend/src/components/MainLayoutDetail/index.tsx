import { Layout, Button, Menu, Row, Col, Card, Result } from 'antd';
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
  // console.log(id);
  const [meetingData, setMeetingData] = useState<MeetingInterface>();
  useEffect(() => {
    getDataProfile();
  }, []);
  const getDataProfile = async () => {
    const result = await DatamanagementService().getMeetingByid(id);
    setMeetingData(result[0]);
    console.log(result[0]);
  };

  const navigate = useNavigate();
  const onChange = () => {
    navigate(`/steptwo/${id}`);
  };

  function toYYYYMMDD(d: any) {
    console.log(new Date(d));

    var yyyy = new Date(d).getFullYear().toString();
    var mm = (new Date(d).getMonth() + 101).toString().slice(-2);
    var dd = (new Date(d).getDate() + 100).toString().slice(-2);
    return `${yyyy}-${mm}-${dd}`;
  }
  // console.log(baseURL);

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
                  {/* <Col span={8}></Col> */}
                  <Col span={24}>
                    <Logo />
                  </Col>
                  {/* <Col span={8}></Col> */}
                </Row>
                <br></br>
                <Row>
                  <Col span={2}></Col>
                  <Col span={20}>
                    <b style={{ fontSize: '20px' }}>Welcome to </b>
                    <b style={{ fontSize: '20px', color: 'red' }}>
                      KPIS Society
                    </b>
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <Row>
                  <Col span={2}></Col>
                  <Col span={20}>Please check in for Generate your ticket</Col>
                  <Col span={2}></Col>
                </Row>
                <br></br>
                <br></br>
                <Row style={{ textAlign: 'left' }}>
                  <Col span={2}></Col>
                  <Col span={20}>
                    <b>Title :</b>
                    {meetingData?.title}
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <Row style={{ textAlign: 'left' }}>
                  <Col span={2}></Col>
                  <Col span={20}>
                    <b>Schedual :</b>
                    วันที่ {toYYYYMMDD(meetingData?.day)}
                    เวลา {meetingData?.starttime}
                    <br></br>ณ ห้อง {meetingData?.room}
                    <br></br>
                    อาคาร {meetingData?.building}
                    <br></br>
                    รายละเอียด {meetingData?.detail}
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={6}></Col>
                  <Col span={12}>
                    <Button
                      style={{
                        width: '100%',
                        backgroundColor: '#1E6541',
                        color: '#ffffff',
                      }}
                      onClick={onChange}
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col span={6}></Col>
                </Row>
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
