import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Form,
  Row,
  Tabs,
  Typography,
  Input,
  Button,
  Upload,
  message,
  Space,
  Modal,
} from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { DatamanagementService } from '../../stores/meeting-store';

const { TextArea } = Input;
const { confirm } = Modal;
export const MeetingSumMinutes: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [meetingData, setMeetingData] = useState<any>();
  const [fileList, setFileList] = useState<any>([]);
  const [detailsummarymeeting, setdetailsummarymeeting] = useState<string>('');
  const [nameFileoverview, setNameFileoverview] = useState<any>([]);
  useEffect(() => {
    getDataProfile();
  }, []);
  const getDataProfile = async () => {
    await DatamanagementService()
      .getMeetingByid(state)
      .then(data => {
        setMeetingData(data[0]);
      });
    await DatamanagementService()
      .getFileoverview(state)
      .then(async data => {
        const datafile = await data.map((x: any) => {
          return {
            uid: x.idfile,
            name: x.namefile,
            status: 'done',
            response: 'Server Error 500',
            pathfile: x.pathfile,
            step: x.step,
          };
        });

        setFileList(datafile);
        setNameFileoverview(datafile);
      });
  };

  const props = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const submitpage = async () => {
    if (!meetingData?.summarychecklist) {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: 'ยืนยีนสรุปรางานการประชุม',
        onOk: async () => {
          await DatamanagementService().submitsummarypage(
            state,
            detailsummarymeeting,
          );

          if (fileList !== undefined) {
            fileList.map(async (x: any, i: number) => {
              const numberfile = Number(i) + 1;
              const formData = new FormData();
              formData.append('file', x);
              await DatamanagementService().submitfilesummarypage(
                state,
                formData,
                numberfile,
                x.name,
              );
            });
          }
        },
        onCancel() {
          Modal.destroyAll();
        },
      });
    }
  };

  if (meetingData?.summarychecklist) {
    return (
      <React.Fragment>
        <Row
          gutter={[
            { xs: 8, sm: 16 },
            { xs: 8, sm: 16 },
          ]}
        >
          <Card style={{ width: '100%', textAlign: 'left' }}>
            <Row gutter={24}>
              <Col span={8}>
                <Typography
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: '22px',
                  }}
                >
                  สรุปรายงานการประชุม
                </Typography>
              </Col>
              {/* <Col offset={14}>
                <Button
                  style={{
                    backgroundColor: '#1E6541',
                    color: '#FFFFFF',
                  }}
                  onClick={() => navigate(-1)}
                >
                  กลับ
                </Button>
              </Col> */}
            </Row>

            <Typography
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              {meetingData?.title}
            </Typography>
          </Card>
          <Card style={{ width: '100%' }} title={''}>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                สรุปรายงานการประชุม
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <TextArea
                  maxLength={1000}
                  disabled
                  // onChange={e => {
                  //   setdetailsummarymeeting(e.target.value);
                  // }}
                  value={meetingData?.summarymeeting}
                />
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                เอกสารภาพประกอบการประชุม
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Upload {...props} disabled>
                  <Button icon={<UploadOutlined />} disabled>
                    Click To Upload
                  </Button>
                </Upload>
              </Col>
            </Row>
            <br></br>
            <Row style={{ justifyContent: 'center' }}>
              <Button>กลับ</Button>
              {''}
              <Button
                disabled
                style={{
                  backgroundColor: '#1E6541',
                  color: '#FFFFFF',
                  border: 'none',
                }}
                onClick={submitpage}
              >
                ยืนยัน
              </Button>
            </Row>
          </Card>
        </Row>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Row
          gutter={[
            { xs: 8, sm: 16 },
            { xs: 8, sm: 16 },
          ]}
        >
          <Card style={{ width: '100%', textAlign: 'left' }}>
            <Row gutter={24}>
              <Col span={8}>
                <Typography
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: '22px',
                  }}
                >
                  สรุปรายงานการประชุม
                </Typography>
              </Col>
              <Col offset={14}>
                <Button
                  style={{
                    backgroundColor: '#1E6541',
                    color: '#FFFFFF',
                  }}
                  onClick={() => navigate(-1)}
                >
                  กลับ
                </Button>
              </Col>
            </Row>

            <Typography
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              {meetingData?.title}
            </Typography>
          </Card>
          <Card style={{ width: '100%' }} title={''}>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                สรุปรายงานการประชุม
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <TextArea
                  maxLength={1000}
                  onChange={e => {
                    setdetailsummarymeeting(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                เอกสารภาพประกอบการประชุม
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click To Upload</Button>
                </Upload>
              </Col>
            </Row>
            <br></br>
            <Row style={{ justifyContent: 'center' }}>
              <Button>กลับ</Button>
              {''}
              <Button
                style={{
                  backgroundColor: '#1E6541',
                  color: '#FFFFFF',
                  border: 'none',
                }}
                onClick={submitpage}
              >
                ยืนยัน
              </Button>
            </Row>
          </Card>
        </Row>
      </React.Fragment>
    );
  }
};
