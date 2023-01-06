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
  const dataPosition = [
    {
      id: '94a7a8dc-9ed2-4df2-aad7-e86f415434a3',
      name: 'นายกสมาคม',
    },
    {
      id: 'ba5f6bc3-2d0b-4c9c-93b1-62d5839997a0',
      name: 'นายกกิตติมศักดิ์และประธานฝ่ายกิจกรรมสาธารณะประโยชน์',
    },
    {
      id: 'bdf67ff2-e00f-4995-8d3f-e8fb49b00311',
      name: 'นายกกิตติมศักดิ์',
    },
    {
      id: '48ca5981-76ff-4eea-8043-0ebe49bfdce8',
      name: 'อุปนายกฝ่ายกิจกรรมเทิดพระเกียรติและวารสาร',
    },
    {
      id: 'fbc99348-7130-4dfc-a409-34fbcc0cea8b',
      name: 'อุปนายกฝ่ายกิจกรรมพิเศษ',
    },
    {
      id: '7efbc4c7-d65d-48c5-8e78-59cdd21f1c9d',
      name: 'อุปนายกฝ่ายสมาชิกสัมพันธ์',
    },
    {
      id: 'b4045110-8c94-4e45-aaf5-62203c7f4cdb',
      name: 'อุปนายกฝ่ายสื่อสารองค์กร',
    },
    {
      id: '901c357d-a7b0-448e-929c-d197f210884d',
      name: 'อุปนายกฝ่ายวิชาการ',
    },
    {
      id: '0ed8c77e-a450-4ff9-93a4-8b635bbbe762',
      name: 'เลขาธิการ',
    },
    {
      id: '017b1e37-c30d-4c06-ad4a-dce44b58ac65',
      name: 'เหรัญญิก',
    },
    {
      id: '59c95dc6-c787-49f6-81c0-79172c0b52d8',
      name: 'ประธานฝ่ายประชาสัมพันธ์',
    },
    {
      id: '782cf1f7-7d01-4b54-ad1f-b1f74776b7e3',
      name: 'ประธานฝ่ายปฎิคม',
    },
    {
      id: '5c5125a1-5b0e-4946-9080-994376c0a7fc',
      name: 'ประธานฝ่ายทะเบียน',
    },
    {
      id: '6e138e35-e808-4f44-b75e-2931dfef57d1',
      name: 'ประธานฝ่ายเทคโนโลยีสารสนเทศ',
    },
    {
      id: '08309b72-243d-40e3-be6b-67c22b772396',
      name: 'รองเลขาธิการ',
    },
    {
      id: 'd30e3fa6-bf4e-4635-9877-4077374ed7e7',
      name: 'กรรมการบริหาร',
    },
  ];

  const handleUpload = async () => {
    setUploading(true);
    var formData = new FormData();
    formData.append('file', fileList[0]);
    const newData: any = [];
    readXlsxFile(fileList[0]).then(async (rows: any) => {
      rows.forEach((e: any, i: number) => {
        let positionid: any = [];
        dataPosition.map(x => {
          if (String(e[11]) === String(x.name)) {
            positionid = [x.id];
          }
        });
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
            uuidposition: e[11] === null ? null : positionid,
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
          แบบขึ้นทะเบียนสมาชิก
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
