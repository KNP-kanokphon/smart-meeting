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
  const [user, setUser] = useState<any>();
  const [food, setFood] = useState<any>([]);
  useEffect(() => {
    getDataProfile();
  }, []);
  const getDataProfile = async () => {
    const result = await DatamanagementService().getMeetingByid(state);
    const resultAgenda = await DatamanagementService().getagendaByid(state);
    const resultFood = await DatamanagementService().getDetailfood(state);

    // setFood(resultFood);
    setMeetingData(result[0]);
    setAgenda(resultAgenda);
    console.log(resultAgenda);
  };
  const [activeKey, setActiveKey] = useState<any>(1);
  const onChange = (key: string) => {
    setActiveKey(key);
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
              type="editable-card"
              // onEdit={onEdit}
              items={agenda
                ?.fill(null)
                .map((_: any, index: string, data: any) => {
                  const id: any = String(index + 1);
                  return {
                    label: `ระเบียบวาระที่ ${id}`,
                    children: (
                      <DetailSumMinutes
                        Pagestep={id}
                        idstep={index}
                        idroom={state}
                      />
                    ),
                    key: id,
                    closable: false,
                  };
                })}
            />
            <Tabs.TabPane tab="สรุปรายงานการประชุม" key="5">
              <Form layout="vertical">
                <Form.Item label={'สรุปรายงานการประชุม'}>
                  <TextArea placeholder="Text" showCount maxLength={255} />
                </Form.Item>
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
                    >
                      Save
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Tabs.TabPane>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
