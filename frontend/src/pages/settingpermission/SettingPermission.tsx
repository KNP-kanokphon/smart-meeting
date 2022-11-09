import React, { useState } from 'react';
import {
  Card,
  Col,
  DatePicker,
  Row,
  Select,
  Input,
  Typography,
  Upload,
  Button,
} from 'antd';
import { SettingPermissionCourse } from './SettingPermissionCourse';
import { SettingPermissionPosition } from './SettingPermissionPosition';
import readXlsxFile from 'read-excel-file';
import { DatamanagementService } from '../../stores/meeting-store';
import { v4 as uuidv4 } from 'uuid';
import { idText } from 'typescript';

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Title } = Typography;
interface EditableRowProps {
  index: number;
}

export const SettingPermission: React.FC = (): React.ReactElement => {
  const [fileList, setFileList] = useState<any>([]);
  const [uploading, setUploading] = useState(false);
  const [typefile, setTypefile] = useState<string>('');
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
  const onChangType = async (e: any) => {
    if (e === undefined) {
      setTypefile('');
    } else {
      setTypefile(e);
    }
  };
  const handleUpload = async () => {
    setUploading(true);
    var formData = new FormData();
    formData.append('file', fileList[0]);
    const newData: any = [];
    if (typefile === '1') {
      // ตำแหน่ง
      readXlsxFile(fileList[0]).then(async (rows: any) => {
        rows.forEach((e: any, i: number) => {
          if (i > 1) {
            newData.push({
              uuid: uuidv4(),
              nameposition: e[0],
              createdate: new Date(),
            });
          }
        });
        const resual = await DatamanagementService().importPosition(
          newData,
          typefile,
        );
      });
    } else {
      // หลักสูตร
      readXlsxFile(fileList[0]).then(async (rows: any) => {
        rows.forEach((e: any, i: number) => {
          if (i > 1) {
            newData.push({
              uuid: uuidv4(),
              namecourse: e[0],
              createdate: new Date(),
            });
          }
        });
        const resual = await DatamanagementService().importPosition(
          newData,
          typefile,
        );
      });
    }
  };
  return (
    <>
      <Card style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col span={10}>
            <Row gutter={16}>
              <Col
                span={10}
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  textAlign: 'center',
                  marginTop: '3px',
                }}
              >
                <Typography>นำเข้า ตำแหน่ง / หลักสูตร</Typography>
              </Col>
              <Col span={14}>
                <Select
                  bordered={false}
                  style={{ width: '100%' }}
                  placeholder="ประเภทสมาชิค"
                  onChange={onChangType}
                  allowClear
                >
                  <Option key={'1'}>ตำแหน่ง</Option>
                  <Option key={'2'}>หลักสูตร</Option>
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Upload {...props}>
              <Button
              // disabled={fileList.length === 1 || typeImport === ''}
              // icon={<UploadOutlined />}
              >
                Select File
              </Button>
            </Upload>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={handleUpload}>
              Confirm Upload
            </Button>
          </Col>
        </Row>
      </Card>
      <div style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col span={12}>
            <SettingPermissionCourse />
          </Col>
          <Col span={12}>
            <SettingPermissionPosition />
          </Col>
        </Row>
      </div>
    </>
  );
};
