import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Typography,
  List,
  Skeleton,
  Button,
  // Avatar,
  Input,
  Col,
  Popover,
  DatePicker,
  Space,
  Select,
  Table,
  Upload,
} from 'antd';
import { EllipsisOutlined, UploadOutlined } from '@ant-design/icons';
import { TableMemberShip } from './components/TableMemberShip';

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Title } = Typography;

export const MemberShipRoute: React.FC = (): React.ReactElement => {
  const [fileList, setFileList] = useState<any>([]);
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

  return (
    <Row
      gutter={[
        { xs: 8, sm: 16 },
        { xs: 8, sm: 16 },
      ]}
    >
      <Card style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}>
        <Title style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
          MEMBERSHIP
        </Title>
      </Card>
      <Card style={{ width: '100%' }}>
        <Row>
          <Col span={12}>
            คณะสมาคม:{' '}
            <Select
              style={{ width: '70%', border: 'none' }}
              placeholder="ประเภทสมาชิค"
              allowClear
            >
              <Option key={'1'}>
                คณะกรรมการบริหารสมาคมแห่งสถาบันพระปกเกล้า
              </Option>
              <Option key={'2'}>คณะกรรมการสมาคมแห่งสถาบันพระปกเกล้า</Option>
              <Option key={'3'}>คณะที่ปรึกษาสมาคม</Option>
              <Option key={'4'}>สมาชิกทั่วไป</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Upload {...props}>
              <Button
                disabled={fileList.length === 1}
                icon={<UploadOutlined />}
              >
                Select File
              </Button>
            </Upload>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button type="primary">Confirm Upload</Button>
          </Col>
        </Row>
      </Card>
      <TableMemberShip />
    </Row>
  );
};
