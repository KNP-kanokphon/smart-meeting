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
} from 'antd';
import type { TabsProps } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined, LeftCircleOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';

import React, { useEffect, useState } from 'react';
import { DatamanagementService } from '../../stores/meeting-store';
import { DetailSumMinutes } from './table/detailSumMinutes';
// import { Icon } from '@iconify/react';

export const MeetingSumMinutes: React.FC = (): React.ReactElement => {
  const initialIndexValue = 1;
  const navigate = useNavigate();
  const { TextArea } = Input;
  const { state } = useLocation();

  const [meetingData, setMeetingData] = useState<any>();
  const [agenda, setAgenda] = useState<any>();
  const [detailsummary, setDetailsummary] = useState<string>('');
  const [fileList, setFileList] = useState<any>([]);
  useEffect(() => {
    getDataProfile();
  }, []);
  const getDataProfile = async () => {
    const result = await DatamanagementService().getMeetingByid(state);
    const resultAgenda = await DatamanagementService().getagendaByid(state);
    setMeetingData(result[0]);
    setAgenda(resultAgenda);
    console.log(result);
  };

  const [activeKey, setActiveKey] = useState<any>(1);
  const onChange = (key: string) => {
    setActiveKey(key);
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
  const saveSummarymeeting = async () => {
    const formData = new FormData();
    fileList.map((e: any) => {
      formData.append('file', e);
    });
    const result = await DatamanagementService().saveSummaryMeeting(
      state,
      detailsummary,
    );
    const resultfile = await DatamanagementService().saveSummaryMeetingFile(
      state,
      fileList,
    );

    // console.log(state);
    // console.log(detailsummary);
    // console.log(fileList);
  };

  return (
    <React.Fragment>
      <Row gutter={16}>
        <Card style={{ width: '100%', marginBottom: '30px' }}>
          <Row gutter={16}>
            <Col>
              <Button
                style={{
                  border: 'none',
                  width: 'auto',
                }}
                onClick={() => navigate(-1)}
              >
                <LeftCircleOutlined
                  style={{
                    color: '#1E6541',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                />
              </Button>
            </Col>
            <Col style={{ marginBottom: '10px', textAlign: 'left' }}>
              {/* <Icon/> */}
              <Typography
                style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}
              >
                Meeting Schedule
              </Typography>
            </Col>
            <Col span={24}>
              <p>{meetingData?.title}</p>
            </Col>
          </Row>
        </Card>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card>
            <Tabs
              hideAdd
              tabPosition="left"
              onChange={onChange}
              // activeKey={activeKey}
              defaultActiveKey={activeKey}
              // type="editable-card"
              // onEdit={onEdit}

              // items={agenda
              //   ?.fill(null)
              //   .map((_: any, index: string, data: any) => {
              //     const id: any = String(index + 1);
              //     return {
              //       label: `ระเบียบวาระที่ ${id}`,
              //       children: (
              //         <DetailSumMinutes
              //           Pagestep={id}
              //           idstep={index}
              //           idroom={state}
              //         />
              //       ),
              //       key: id,
              //       closable: false,
              //     };
              //   })}
            >
              {agenda?.fill(null).map((_: any, index: string, data: any) => {
                const id: any = String(index + 1);
                return (
                  <Tabs.TabPane tab={`ระเบียบวาระที่ ${id}`} key={index}>
                    <DetailSumMinutes
                      Pagestep={id}
                      idstep={index}
                      idroom={state}
                    />
                  </Tabs.TabPane>
                );
              })}
              <Tabs.TabPane tab="สรุปรายงานการประชุม" key="99">
                <Form layout="vertical">
                  <Form.Item label={'สรุปรายงานการประชุม'}>
                    <TextArea
                      placeholder="Text"
                      showCount
                      maxLength={255}
                      value={detailsummary}
                      onChange={e => setDetailsummary(e.target.value)}
                    />
                  </Form.Item>
                  <Row>
                    <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                      <Upload {...props}>
                        <Button
                          // disabled={fileList.length === 1}
                          icon={<UploadOutlined />}
                        >
                          Click To Upload
                        </Button>
                      </Upload>
                    </Col>
                  </Row>
                  <Form.Item></Form.Item>
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Space>
                      <Button
                        style={{ color: '#1E6541' }}
                        onClick={() => navigate(-1)}
                      >
                        Back
                      </Button>
                      <Button
                        htmlType="submit"
                        style={{ color: 'white', background: '#1E6541' }}
                        onClick={saveSummarymeeting}
                      >
                        Save
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
