import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { DatamanagementService } from '../../stores/meeting-store';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const Createactivity: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [valueActivity, setValueActivity] = useState<any>([]);
  const onChangeForm = (values: any, changvalue: any) => {
    setValueActivity(changvalue);
  };
  const submitFrom = async () => {
    const result = await DatamanagementService().createactivityplan(
      valueActivity,
    );
    if (result) {
      navigate('/activity/activitylog');
    }
  };

  return (
    <>
      <Row
        gutter={[
          { xs: 8, sm: 16 },
          { xs: 8, sm: 16 },
        ]}
      >
        <Card
          style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}
        >
          <Title
            style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}
          >
            สร้างกิจกรรม
          </Title>
        </Card>
      </Row>
      <Form
        name="detail"
        onValuesChange={onChangeForm}
        layout="vertical"
        autoComplete="off"
        style={{ width: '100%' }}
      >
        <Card style={{ width: '100%' }}>
          <Row>
            <Col span={12}>
              <Form.Item
                label="ประเภทกิจกรรม"
                initialValue={'golf'}
                name={'typeactivity'}
              >
                <Select defaultValue="golf" allowClear>
                  <Option value="golf">กอล์ฟ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="หัวข้อกิจกรรม" name={'activitytopic'}>
                <Input placeholder="หัวข้อ กิจกรรม" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="รายละเอียดกิจกรรม" name={'activitydetails'}>
                <TextArea rows={4} placeholder="หัวข้อ กิจกรรม" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="กำหนดการแข่งขัน" name={'scheduleactivity'}>
                <TextArea rows={4} placeholder="กำหนดการแข่งขัน" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="สถานที่" name={'locationactivity'}>
                <TextArea rows={4} placeholder="สถานที่" />
              </Form.Item>
            </Col>
          </Row>

          <Col span={12} hidden>
            <Form.Item name={'idactivity'} initialValue={uuidv4()} />
          </Col>
          <Row>
            <Col>
              <Button
                style={{ backgroundColor: '#1E6541', border: 'none' }}
                type="primary"
                onClick={() => submitFrom()}
                block
              >
                ยืนยัน
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  );
};
