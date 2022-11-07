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
import { DatamanagementService } from '../../stores/meeting-store';
import readXlsxFile from 'read-excel-file';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Title } = Typography;

export const MemberShipRoute: React.FC = (): React.ReactElement => {
  const [fileList, setFileList] = useState<any>([]);
  const [uploading, setUploading] = useState(false);
  const [typeImport, setTypeimport] = useState<string>('');

  const handleUpload = async () => {
    setUploading(true);
    var formData = new FormData();
    formData.append('file', fileList[0]);
    const newData: any = [];
    readXlsxFile(fileList[0]).then(async (rows: any) => {
      console.log(rows);
      if (typeImport === '1') {
        rows.forEach((e: any, i: number) => {
          if (i > 2) {
            newData.push({
              uuid: uuidv4(),
              username: e[1],
              phone: e[4],
              type: typeImport,
            });
          }
        });
      } else if (typeImport === '2') {
        rows.forEach((e: any, i: number) => {
          if (i > 2) {
            newData.push({
              uuid: uuidv4(),
              username: e[1],
              phone: e[3],
              type: typeImport,
            });
          }
        });
      } else if (typeImport === '3') {
        rows.forEach((e: any, i: number) => {
          if (i > 2) {
            newData.push({
              uuid: uuidv4(),
              username: e[1],
              phone: e[5],
              type: typeImport,
            });
          }
        });
      }

      const resual = await DatamanagementService()
        .upLoadfilecsv(newData)
        .then(e => {
          console.log(e);
        });
    });
  };

  const onChangType = async (e: any) => {
    if (e === undefined) {
      setTypeimport('');
    } else {
      setTypeimport(e);
    }
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
        <Row gutter={16}>
          <Col span={10}>
            <Row gutter={16}>
              <Col
                span={4}
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  textAlign: 'center',
                  marginTop: '3px',
                }}
              >
                <Typography>คณะสมาคม :</Typography>
              </Col>
              <Col span={16}>
                <Select
                  bordered={false}
                  style={{ width: '100%' }}
                  placeholder="ประเภทสมาชิค"
                  onChange={onChangType}
                  allowClear
                >
                  <Option key={'1'}>
                    รายชื่อคณะกรรมการบริหารสมาคมแห่งสถาบันพระปกเกล้า
                  </Option>
                  <Option key={'2'}>
                    รายชื่อคณะกรรมการกลางสมาคมแห่งสถาบันพระปกเกล้า
                  </Option>
                  <Option key={'3'}>รายชื่อคณะที่ปรึกษาสมาคม</Option>
                  <Option key={'4'}>สมาชิกทั่วไป</Option>
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Upload {...props}>
              <Button
                disabled={fileList.length === 1 || typeImport === ''}
                icon={<UploadOutlined />}
              >
                Select File
              </Button>
            </Upload>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={typeImport === ''}
            >
              Confirm Upload
            </Button>
          </Col>
        </Row>
      </Card>
      <TableMemberShip />
    </Row>
  );
};
