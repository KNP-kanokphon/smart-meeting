import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Typography,
  List,
  Skeleton,
  Button,
  Avatar,
  Input,
  Col,
  Popover,
  DatePicker,
  Space,
  Select,
  Table,
  Upload,
  Tabs,
  Divider,
  message,
} from 'antd';
import { EllipsisOutlined, UploadOutlined } from '@ant-design/icons';
// import { TableMemberShip } from './components/TableMemberShip';
import { DatamanagementService } from '../../stores/meeting-store';
import readXlsxFile from 'read-excel-file';
import { v4 as uuidv4 } from 'uuid';
import { AddmemberRoute } from './components/AddmemberRoute';
import { TableAddMember } from './components/TableAddMember';

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
      rows.forEach((e: any, i: number) => {
        if (i > 0) {
          newData.push({
            uuid: e[0] === null ? uuidv4() : e[0],
            prefix: e[1] === null ? null : e[1],
            username: e[2] === null ? null : e[2],
            idcard: e[4] === null ? null : e[4],
            bridday: e[5] === null ? null : e[5],
            phonenumber: e[6] === null ? '' : e[6],
            email: e[7] === null ? null : e[7],
            // course: e[8] === null ? undefined : e[8],
            // course1: e[9] === null ? undefined : e[9],
            course: e[8] === null ? [] : [],
            course1: e[9] === null ? [] : [],
            model: e[10] === null ? null : e[10],
            position: e[11] === null ? [] : [],
            // position: e[11] === null ? undefined : e[11],
            studentid: e[12] === null ? null : e[12],
            username_eng: e[3] === null ? null : e[3],
            line: e[13] === null ? null : e[13],
          });
        }
      });
      await DatamanagementService()
        .importuser(newData)
        .then(e => {
          // console.log(e);
          message.success('Import User Success !!');
        });

      // const resualuploadpartymeeting = await DatamanagementService()
      //   .upLoadfilecsvparty(newData)
      //   .then(e => {
      //     console.log(e);
      //   });

      // console.log(rows);
      // if (typeImport === '1') {
      //   rows.forEach((e: any, i: number) => {
      //     if (i > 2) {
      //       newData.push({
      //         uuid: uuidv4(),
      //         username: e[1],
      //         phone: e[4],
      //         type: typeImport,
      //       });
      //     }
      //   });
      // } else if (typeImport === '2') {
      //   rows.forEach((e: any, i: number) => {
      //     if (i > 2) {
      //       newData.push({
      //         uuid: uuidv4(),
      //         username: e[1],
      //         phone: e[3],
      //         type: typeImport,
      //       });
      //     }
      //   });
      // } else if (typeImport === '3') {
      //   rows.forEach((e: any, i: number) => {
      //     if (i > 2) {
      //       newData.push({
      //         uuid: uuidv4(),
      //         username: e[1],
      //         phone: e[5],
      //         type: typeImport,
      //       });
      //     }
      //   });
      // } else if (typeImport === '5') {
      //   rows.forEach((e: any, i: number) => {
      //     if (i > 2) {
      //       newData.push({
      //         name: e[1],
      //         iduser: e[0].replaceAll(/-/g, ''),
      //         uuid: uuidv4(),
      //       });
      //     }
      //   });
      // }
      // if (typeImport !== '5') {
      //   const resual = await DatamanagementService()
      //     .upLoadfilecsv(newData)
      //     .then(e => {
      //       console.log(e);
      //     });
      // } else {
      //   const resualuploadpartymeeting = await DatamanagementService()
      //     .upLoadfilecsvparty(newData)
      //     .then(e => {
      //       console.log(e);
      //     });
      // }
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
      // console.log(file);
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const onChange = (key: string) => {
    // console.log(key);
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
        {/* <Tabs
          type="card"
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: `แบบฟอร์ม`,
              key: '1',
              children: (
                <>
                  <AddmemberRoute />
                </>
              ),
            },
            {
              label: `รายละเอียดผู้ใช้บริการ`,
              key: '2',
              children: (
                <>
                  <TableAddMember />
                </>
              ),
            },
          ]}
        /> */}
      </Card>
      <Card style={{ width: '100%' }}>
        <Row gutter={16} hidden>
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
                  placeholder="ประเภทสมาชิก"
                  onChange={onChangType}
                  allowClear
                >
                  <Option key={'1'}>นำเข้าสมาชิก</Option>
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
        <Divider />
        <Tabs
          type="card"
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: `แบบฟอร์ม`,
              key: '1',
              children: (
                <>
                  <AddmemberRoute />
                </>
              ),
            },
            {
              label: `รายละเอียดผู้ใช้บริการ`,
              key: '2',
              children: (
                <>
                  <TableAddMember />
                </>
              ),
            },
          ]}
        />
      </Card>
      {/* <TableMemberShip /> */}
    </Row>
  );
};
