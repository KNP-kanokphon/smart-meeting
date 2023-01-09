import {
  Layout,
  Button,
  Menu,
  Row,
  Col,
  Card,
  Input,
  Space,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { DatamanagementService } from '../../stores/meeting-store';
import { CheckCircleFilled } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';

const { Content, Sider, Header, Footer } = Layout;

export interface Props {
  baseURL: string;
}

export const DetailConfirm: React.FC<Props> = ({ baseURL }) => {
  const { id } = useParams<{ id: string }>();
  const { userid } = useParams<{ userid: string }>();
  const [userprofile, setUserprofile] = useState<any>([]);
  const [pathfile, setPathfile] = useState<any>([]);

  const [meetingData, setMeetingData] = useState<any>();
  const [agenda, setAgenda] = useState<any>();
  // console.log(meetingData);

  useEffect(() => {
    getDataAll();
  }, []);
  const getDataAll = async () => {
    const resultProfile = await DatamanagementService().getProfileByid(
      id,
      userid,
    );
    const result = await DatamanagementService().getMeetingByid(id);
    const resultAgenda = await DatamanagementService().getagendaByid(id);
    const resultPathfile = await DatamanagementService().getPathFilePdf(id);

    setPathfile(resultPathfile);
    setUserprofile(resultProfile[0]);
    setMeetingData(result[0]);
    setAgenda(resultAgenda);
  };
  const getFiles = async (roomid: string, step: any, namefile: string) => {
    const data = await DatamanagementService().getPathFileStep(
      roomid,
      step,
      namefile,
    );

    const url = window.URL.createObjectURL(
      new Blob([new Uint8Array(data.data).buffer]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${namefile}`);
    document.body.appendChild(link);
    link.click();
    // const blob = new Blob([data], { type: 'application/pdf' });
    // saveAs(blob, `${namefile}`);
  };
  const getfileOverviwe = async (idfile: string, namefile: string) => {
    const resultPathfile = await DatamanagementService().getFilesoverview(
      id,
      idfile,
    );
    const url = window.URL.createObjectURL(
      new Blob([new Uint8Array(resultPathfile.data).buffer]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${namefile}`);
    document.body.appendChild(link);
    link.click();
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

                <Row gutter={16}>
                  <Col span={24} style={{ marginTop: '10px' }}>
                    <b style={{ fontSize: '18px' }}>Confirm Meeting</b>
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={8}
                    sm={4}
                    md={{ span: 3, offset: 4 }}
                    lg={{ span: 3, offset: 4 }}
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
                    xs={8}
                    sm={4}
                    md={{ span: 3, offset: 4 }}
                    lg={{ span: 3, offset: 4 }}
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
                        marginTop: '5px',
                      }}
                    >
                      {'วันที่ :'}
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
                    {dayjs(meetingData?.day)
                      .add(543, 'year')
                      .format('DD/MM/YYYY')}
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={8}
                    sm={4}
                    md={{ span: 3, offset: 4 }}
                    lg={{ span: 3, offset: 4 }}
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
                      {'เวลา :'}
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
                      // marginTop: '8px',
                    }}
                  >
                    {meetingData?.starttime.substring(0, 5)} ถึง{' '}
                    {meetingData?.endtime.substring(0, 5)} น.
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={8}
                    sm={4}
                    md={{ span: 3, offset: 4 }}
                    lg={{ span: 3, offset: 4 }}
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
                      {'สถานที่ :'}
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
                    {meetingData?.building}
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={8}
                    sm={4}
                    md={{ span: 3, offset: 4 }}
                    lg={{ span: 3, offset: 4 }}
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
                      {'ชั้น :'}
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
                    {meetingData?.floor}
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={8}
                    sm={4}
                    md={{ span: 3, offset: 4 }}
                    lg={{ span: 3, offset: 4 }}
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
                      {'ห้อง :'}
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
                    {meetingData?.room}
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={{ span: 3, offset: 4 }}
                    lg={{ span: 3, offset: 4 }}
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
                      {'ดาวน์โหลดเอกสาร :'}
                    </Typography>
                  </Col>
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
                      marginTop: '8px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {pathfile.map((e: any) => {
                      console.log(e);

                      if (e.type === 'fileOverviwe') {
                        return (
                          <>
                            <Button
                              type="link"
                              onClick={() =>
                                getfileOverviwe(e.idfile, e.namefile)
                              }
                              key={`${e.uuid}.${e.idfile}`}
                            >
                              {e.namefile}
                            </Button>
                            <br></br>
                          </>
                        );
                      }
                    })}
                  </Col>
                </Row>

                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={{ span: 3, offset: 4 }}
                    lg={{ span: 3, offset: 4 }}
                    style={{
                      textAlign: 'left',
                      fontSize: '16px',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                    }}
                  >
                    <b>{'วาระ :'}</b>
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
                      marginTop: '8px',
                      // whiteSpace: 'nowrap',
                      // overflow: 'hidden',
                      // textOverflow: 'ellipsis',
                    }}
                  >
                    {agenda?.map((e: any, i: number) => {
                      return (
                        <>
                          <div
                            style={{ textAlign: 'left', marginBottom: '5px' }}
                          >
                            <Row>
                              <Col
                                xs={24}
                                sm={6}
                                md={{ span: 4 }}
                                lg={{ span: 4 }}
                                style={{
                                  textAlign: 'left',
                                  fontSize: '100%',
                                  paddingLeft: '10px',
                                  paddingRight: '10px',
                                }}
                              >
                                {'-'} {e?.agendes} :
                              </Col>
                              <Col
                                xs={24}
                                sm={18}
                                md={{ span: 20 }}
                                lg={{ span: 20 }}
                                style={{
                                  textAlign: 'left',
                                  fontSize: '100%',
                                  paddingLeft: '10px',
                                  paddingRight: '10px',
                                }}
                              >
                                {e?.detailagendes}
                              </Col>
                            </Row>
                          </div>
                          {pathfile.map((x: any) => {
                            if (x.type === 'fileAgenda' && x.step === e.step) {
                              return (
                                <Button
                                  type="link"
                                  onClick={() =>
                                    getFiles(e.uuid, e.step, x.namefile)
                                  }
                                  key={`${e.uuid}.${e.step}.${x.namefile}`}
                                >
                                  {x.namefile}
                                </Button>
                              );
                            }
                          })}
                        </>
                      );
                    })}
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
