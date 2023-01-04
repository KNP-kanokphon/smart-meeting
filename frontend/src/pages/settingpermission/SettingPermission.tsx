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
  Space,
  message,
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
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
        await DatamanagementService()
          .importPosition(newData, typefile)
          .then((response: any) => {
            message.success('import file ตำแหน่งสำเร็จ');
            // console.log(response);
            setUploading(false);
          });
      });
    } else {
      // console.log(typefile);

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
        await DatamanagementService()
          .importPosition(newData, typefile)
          .then((response: any) => {
            message.success('import file หลักสูตร');
            // console.log(response);
            setUploading(false);
          });
      });
    }
  };
  return (
    <>
      <Card style={{ width: '100%' }}>
        <Row gutter={16} hidden>
          <Col span={10}>
            <Row gutter={16}>
              <Col
                span={16}
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  textAlign: 'center',
                  marginTop: '3px',
                }}
              >
                <Typography style={{ fontWeight: 'bold' }}>
                  {'อัปโหลดไฟล์ ตำแหน่ง/หลักสูตร'}
                </Typography>
              </Col>
              <Col span={8}>
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
                type="default"
                disabled={
                  fileList.length === 1 ||
                  typefile === '' ||
                  typefile === undefined
                }
              >
                <Space>
                  <DownloadOutlined />
                  {'Select File'}
                </Space>
              </Button>
            </Upload>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              disabled={fileList.length > 1 || fileList.length === 0}
              onClick={handleUpload}
              style={{
                marginBottom: 16,
                backgroundColor: '#1E6541',
                color: 'white',
              }}
            >
              {'Confirm Upload'}
            </Button>
          </Col>
        </Row>
      </Card>
      <div style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col span={24}>
            <SettingPermissionPosition Props={props} />
          </Col>
        </Row>
      </div>
    </>
  );
};
