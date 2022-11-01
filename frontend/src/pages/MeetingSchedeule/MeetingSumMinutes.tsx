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
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';

import React, { useState } from 'react';
// import { Icon } from '@iconify/react';

export const MeetingSumMinutes: React.FC = (): React.ReactElement => {
  const { TextArea } = Input;
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ]);

  const handleChange: UploadProps['onChange'] = info => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: handleChange,
    multiple: true,
  };
  return (
    <React.Fragment>
      <Row gutter={16}>
        <Card style={{ width: '100%', marginBottom: '30px' }}>
          <Row gutter={16}>
            <Col span={24} style={{ marginBottom: '10px', textAlign: 'left' }}>
              {/* <Icon/> */}
              <Typography style={{ fontSize: '30px', fontWeight: 'bold' }}>
                Meeting Schedule
              </Typography>
            </Col>
            <Col span={24}>
              <p>
                ขอเชิญประชุมคณะกรรมการบริหารสมาคมแห่งสถาบันพระปกเกล้า ครั้งที่
                5/2565{' '}
              </p>
            </Col>
          </Row>
        </Card>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card>
            <Tabs defaultActiveKey="5" tabPosition="left">
              <Tabs.TabPane tab="ระเบียบวาระที่ 1" key="1">
                Content of Tab Pane 1
              </Tabs.TabPane>
              <Tabs.TabPane tab="ระเบียบวาระที่ 2" key="2">
                Content of Tab Pane 2
              </Tabs.TabPane>
              <Tabs.TabPane tab="ระเบียบวาระที่ 3" key="3">
                Content of Tab Pane 3
              </Tabs.TabPane>
              <Tabs.TabPane tab="ระเบียบวาระที่ 4" key="4">
                Content of Tab Pane 4
              </Tabs.TabPane>
              <Tabs.TabPane tab="สรุปรายงานการประชุม" key="5">
                <Form layout="vertical">
                  <Form.Item label={'สรุปรายงานการประชุม'}>
                    <TextArea placeholder="Text" showCount maxLength={255} />
                  </Form.Item>
                  <Form.Item>
                    <Upload {...props} fileList={fileList}>
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Space>
                      <Button style={{ color: '#1E6541' }}>Back</Button>
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
            </Tabs>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
