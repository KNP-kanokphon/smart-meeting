import React, { useEffect, useState } from 'react';
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
  Divider,
} from 'antd';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { DatamanagementService } from '../../stores/meeting-store';
import {
  CheckCircleFilled,
  UserOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';

const { Content, Sider, Header, Footer } = Layout;

export interface Props {
  baseURL: string;
}

export const DetailCheckin: React.FC<Props> = ({
  baseURL,
}): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { userid } = useParams<{ userid: string }>();
  const [userprofile, setUserprofile] = useState<any>([]);
  const [pathfile, setPathfile] = useState<any>([]);
  const [position, setPosition] = useState<any>([]);

  const [meetingData, setMeetingData] = useState<any>();
  const [agenda, setAgenda] = useState<any>();
  const [UserProfileContract, setUserprofileContracts] = useState<any>([]);

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
    const resultPosition = await DatamanagementService().getPositionall();
    const resultProfiles = await DatamanagementService().FindUserByID(userid);

    setPathfile(resultPathfile);
    setUserprofile(resultProfile[0]);
    setMeetingData(result[0]);
    setAgenda(resultAgenda);
    setPosition(resultPosition);
    setUserprofileContracts(resultProfiles[0]);
  };
  console.log(UserProfileContract);

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
  const getfileOverviwe = async (namefile: string) => {
    const resultPathfile = await DatamanagementService().getFilesoverview(
      id,
      namefile,
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
                    <b style={{ fontSize: '18px' }}>Meeting Checkin</b>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col
                    span={24}
                    style={{ fontSize: '14px', marginTop: '10px' }}
                  >
                    ???????????????????????????????????????????????? ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                  </Col>
                </Row>

                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={{ span: 16, offset: 4 }}
                    lg={{ span: 16, offset: 4 }}
                    span={24}
                    style={{
                      fontSize: '18px',
                      marginTop: '10px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                    }}
                  >
                    <Divider />
                    <Space>
                      {' '}
                      <UserOutlined />
                      ???????????????????????????????????????
                    </Space>
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
                      {'???????????? :'}
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
                    {UserProfileContract?.prefix}{' '}
                    {UserProfileContract?.username}
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
                      {'????????????????????? :'}
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
                    {position.map((e: any) => {
                      return UserProfileContract.position?.map((x: any) => {
                        return x === e.uuid ? e.nameposition : '';
                      });
                    })}
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
                      {'????????????????????? :'}
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
                    {UserProfileContract?.email}
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
                      {'Line :'}
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
                    {UserProfileContract?.line}
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
                      {'??????????????????????????????????????? :'}
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
                    {UserProfileContract?.phonenumber}
                  </Col>
                </Row>

                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={{ span: 16, offset: 4 }}
                    lg={{ span: 16, offset: 4 }}
                    span={24}
                    style={{
                      fontSize: '18px',
                      // marginTop: '10px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                    }}
                  >
                    <Divider />
                    <Space>
                      {' '}
                      <FileDoneOutlined />
                      ?????????????????????????????????????????????
                    </Space>
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
                      {'?????????????????? :'}
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
                        marginBottom: '5px',
                        marginTop: '5px',
                      }}
                    >
                      {'?????????????????? :'}
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
                        marginTop: '5px',
                      }}
                    >
                      {'????????????????????? :'}
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
                      {'???????????? :'}
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
                      {'???????????? :'}
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
                      {'????????????????????????????????????????????? :'}
                    </Typography>
                  </Col>
                  <Col
                    xs={16}
                    sm={20}
                    md={16}
                    lg={16}
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
                      if (e.type === 'fileOverviwe') {
                        return (
                          <Button
                            type="link"
                            onClick={() => getfileOverviwe(e.namefile)}
                            key={`${e.uuid}.${e.namefile}`}
                          >
                            {e.namefile}
                          </Button>
                        );
                      } else {
                        return <Typography>{'-'}</Typography>;
                      }
                    })}
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
                    <b>{'Agenda Item '}</b>
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
                    }}
                  >
                    {agenda?.map((e: any, i: number) => {
                      return (
                        <>
                          {e?.agendes} : {e?.detailagendes}
                          <br></br>
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
                            } else {
                              return <>-</>;
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
        ??2022 O S D Company Limited
      </Footer>
    </Layout>
  );
};
