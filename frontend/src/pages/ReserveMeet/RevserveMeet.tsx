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
import { DatamanagementService } from '../../stores/meeting-store';
import readXlsxFile from 'read-excel-file';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Title } = Typography;

export const ReserveMeet: React.FC = (): React.ReactElement => {

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
      </Card>
    </Row>
  );
};
