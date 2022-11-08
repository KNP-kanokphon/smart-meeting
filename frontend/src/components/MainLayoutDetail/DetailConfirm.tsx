import { Layout, Button, Menu, Row, Col, Card, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { DatamanagementService } from '../../stores/meeting-store';
import { CheckCircleFilled } from '@ant-design/icons';
import { saveAs } from 'file-saver';

const { Content, Sider, Header, Footer } = Layout;

export interface Props {
  baseURL: string;
}

export const DetailConfirm: React.FC<Props> = ({ baseURL }) => {
  const { id } = useParams<{ id: string }>();
  const { userid } = useParams<{ userid: string }>();
  const [userprofile, setUserprofile] = useState<any>([]);
  const [meetingData, setMeetingData] = useState<any>();
  const [agenda, setAgenda] = useState<any>();
  useEffect(() => {
    getDataProfile();
  }, []);
  const getDataProfile = async () => {
    const resultProfile = await DatamanagementService().getProfileByid(
      id,
      userid,
    );
    setUserprofile(resultProfile[0]);
    const result = await DatamanagementService().getMeetingByid(id);
    setMeetingData(result[0]);
    const resultAgenda = await DatamanagementService().getagendaByid(id);
    setAgenda(resultAgenda);
    console.log(resultAgenda);
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
                    <CheckCircleFilled
                      style={{
                        color: '#1E6541',
                        fontSize: '100px',
                      }}
                      size={50}
                    />
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={2}></Col>
                  <Col span={20}>
                    <b style={{ fontSize: '100%' }}>Confirm Meeting</b>
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <Row>
                  <Col span={24} style={{ fontSize: '80%' }}>
                    เช็คอินเรียบร้อย ท่านสามารถดาวน์โหลดเอกสารได้ที่หน้านี้
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ fontSize: '80%' }}>
                    เรื่อง {meetingData?.detail}
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ fontSize: '80%' }}>
                    วันที่ {meetingData?.day}
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ fontSize: '80%' }}>
                    สถานที่ อาคาร {meetingData?.building} ชั้น{' '}
                    {meetingData?.floor} ห่้อง {meetingData?.room}
                  </Col>
                </Row>
                <Row>
                  <Col span={7}></Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={10}
                    lg={10}
                    style={{
                      textAlign: 'left',
                      fontSize: '80%',
                      // display: 'flex',
                      // justifyContent: 'center',
                    }}
                  >
                    <b>{'Agenda Item :'}</b>
                    <br></br>
                    {agenda?.map((e: any, i: number) => {
                      return (
                        <Row key={i} style={{ fontSize: '80%' }}>
                          {e?.agendes} : {e?.detailagendes}
                        </Row>
                      );
                    })}
                  </Col>
                  <Col span={7}></Col>
                </Row>
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
