import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
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
import styles from './MainLayout.module.scss';
import { DatamanagementService } from '../../stores/meeting-store';
import {
  CheckCircleFilled,
  UserOutlined,
  FileDoneOutlined,
  CloseCircleFilled,
} from '@ant-design/icons';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';

const { Content, Sider, Header, Footer } = Layout;

interface Props {
  baseURL: string;
}

export const DetailNoMeeting: React.FC<Props> = ({
  baseURL,
}): React.ReactElement => {
  // let history = useNavigate();
  const navigate = useNavigate();
  let getTimeOuts = null;

  const { id } = useParams<{ id: string }>();
  const { roomid } = useParams<{ roomid: string }>();
  const { userid } = useParams<{ userid: string }>();
  // getTimeOuts = setTimeout(() => {
  //   navigator.clipboard.writeText(
  //     `${window.origin}/detail/detailalready/${roomid}/${userid}`,
  //   );
  // }, 10000);

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
                  <Col span={24}>
                    <CloseCircleFilled
                      style={{
                        color: '#880808',
                        fontSize: '100px',
                      }}
                      size={50}
                    />
                  </Col>
                </Row>

                <Row gutter={16} style={{ marginBottom: '60px' }}>
                  <Col span={24} style={{ marginTop: '10px' }}>
                    <b style={{ fontSize: '18px' }}>
                      ท่านได้ทำการเช็คอินเรียบร้อยร้อย
                    </b>
                  </Col>
                </Row>

                <Row style={{ marginBottom: '30px', justifyContent: 'center' }}>
                  <Col span={10} style={{}}>
                    <Divider></Divider>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    style={{
                      textAlign: 'center',
                      fontSize: '28px',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      marginTop: '8px',
                      fontWeight: 'bold',
                    }}
                  >
                    {UserProfileContract?.prefix}{' '}
                    {UserProfileContract?.username}
                  </Col>
                  <Col span={10} style={{}}>
                    <Divider></Divider>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '60px' }}>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    style={{
                      textAlign: 'center',
                      fontSize: '18px',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      marginTop: '8px',
                      // fontWeight: 'bold',
                    }}
                  >
                    <Typography>
                      ได้ทำการยืนยันที่จะไม่เข้าร่วมการประชุมในครั้งนี้
                    </Typography>
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
