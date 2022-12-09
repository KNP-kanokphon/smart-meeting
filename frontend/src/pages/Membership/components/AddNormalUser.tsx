import React, { useState, useRef } from 'react';
import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
  ConfigProvider,
  InputNumber,
  Button,
  Space,
  Upload,
  message,
  Modal,
  Badge,
} from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import SignatureCanvas from 'react-signature-canvas';

// datepicker local thialand
import dayjs from 'dayjs';
import thTH from 'antd/lib/locale-provider/th_TH';
import 'dayjs/locale/th';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style';
import TextArea from 'antd/lib/input/TextArea';
const DatePicker = generatePicker(dayjsGenerateConfig);
let buddhistEra = require('dayjs/plugin/buddhistEra');
dayjs.extend(buddhistEra);
dayjs.locale('th');
const configuredLocale: any = {
  ...thTH,
  DatePicker: {
    ...thTH.DatePicker,
    dateFormat: 'YYYY-MM-DD', // DD MM BBBB
    yearFormat: 'BBBB',
    lang: {
      ...thTH.DatePicker?.lang,
      dateFormat: 'YYYY-MM-DD', // DD MM BBBB
      dateTimeFormat: 'DD MM YYYY HH:mm:ss',
      yearFormat: 'BBBB',
    },
  },
};
//

export const AddNormalUser: React.FC = (): React.ReactElement => {
  const { Option } = Select;
  const [open, setOpen] = useState<any>();
  const [imageURLone, setImageURlone] = useState<any>(null);
  const sigCanvas = useRef<any>(null);
  const [fileList, setFileList] = useState<any>([]);
  
  //   state collect data
  const [getStatus, setStatus] = useState<string>('');
  const [getTitle, setTitle] = useState<string>('');
  const [getNameLastName, setNameLastName] = useState<string>('');
  const [getIdCard, setIdCard] = useState<string>('');
  const [getDOB, setDOB] = useState<string>('');
  const [getAge, setAge] = useState<string>('');
  const [getPhoneNumber, setPhoneNumber] = useState<string>('');
  const [getEmail, setEmail] = useState<string>('');
  const [getCourse, setCourse] = useState<string>('');
  const [getCourse1, setCourse1] = useState<string>('');
  const [getGeneration, setGeneration] = useState<string>('');
  const [getPosition, setPosition] = useState<string>('');
  const [getHouseNumber, setHouseNumber] = useState<string>('');
  const [getRoomNumber, setRoomNumber] = useState<string>('');
  const [getVillage, setVillage] = useState<string>('');
  const [getGroup, setGroup] = useState<string>('');
  const [getAlley, setAlley] = useState<string>('');
  const [getRoad, setRoad] = useState<string>('');
  const [getSubDistrict, setSubDistrict] = useState<string>('');
  const [getDistrict, setDistrict] = useState<string>('');
  const [getProvince, setProvince] = useState<string>('');
  const [getPostalCode, setPostalCode] = useState<string>('');
  const [getPassNumber, setPassNumber] = useState<string>('');
  const [getImpPassNumber, setImpPassNumber] = useState<string>('');
  const [getWorkDocument, setWorkDocument] = useState<string>('');
  const [getCareer, setCareer] = useState<string>('');
  const [getPositionCareer, setPositionCareer] = useState<string>('');
  const [getSalary, setSalary] = useState<string>('');
  const [getOffice, setOffice] = useState<string>('');
  const [getHouseNumberOffice, setHouseNumberOffice] = useState<string>('');
  const [getGroupOffice, setGroupOffice] = useState<string>('');
  const [getAlleyOffice, setAlleyOffice] = useState<string>('');
  const [getRoadOffice, setRoadOffice] = useState<string>('');
  const [getSubDistrictOffice, setSubDistrictOffice] = useState<string>('');
  const [getDistrictOffice, setDistrictOffice] = useState<string>('');
  const [getProvinceOffice, setProvinceOffice] = useState<string>('');
  const [getPostalCodeOffice, setPostalCodeOffice] = useState<string>('');
  const [getPhoneNumberOffice, setPhoneNumberOffice] = useState<string>('');
  const [getUploadFile, setUploadFile] = useState<string>('');
  const [getESignature, setESignature] = useState<string>('');

  const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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

  const showModal = (e: any) => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const endSignager: any = {
    onEnd: () => {
      const pngUrl = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL('image/png');
      setImageURlone(pngUrl);
    },
  };

  return (
    <>
      <Modal
        title={
          <div>
            <Row>
              <Space>
                <Col>
                  <EditOutlined />
                </Col>
                <Col>
                  <Typography>Signature</Typography>
                </Col>
              </Space>
            </Row>
          </div>
        }
        visible={open}
        style={{ width: '500px', height: '500px' }}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        footer={false}
      >
        <div style={{ textAlign: 'center' }}>
          <SignatureCanvas
            canvasProps={{
              width: 250,
              height: 200,
              className: 'sigCanvas',
            }}
            ref={sigCanvas}
            {...endSignager}
            backgroundColor="#EBEDF0"
          />
        </div>
        <Row gutter={14}>
          <Col
            xs={{ span: 12 }}
            lg={{ span: 12 }}
            style={{ textAlign: 'right' }}
          >
            <Button onClick={handleCancel}>Back</Button>
          </Col>
          <Col
            xs={{ span: 12 }}
            lg={{ span: 12 }}
            style={{ textAlign: 'left' }}
          >
            <Button
              style={{ background: '#1E6541', color: 'white' }}
              //   onClick={onFinish}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Modal>
      <Card
        style={{ width: '100%' }}
        title={
          <>
            <Row>
              <Col span={12} style={{ textAlign: 'left' }}>
                <Typography>แบบฟอร์มสมัครสมาชิกสมาคมทั่วไป</Typography>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Select
                  placeholder={'สถานะ'}
                  style={{ width: '20%', textAlign: 'left' }}
                >
                  <Option value="active">
                    <Badge color="green" text="Active" />
                  </Option>
                  <Option value="close">
                    <Badge color="red" text="Close" />
                  </Option>
                  <Option value="died">
                    <Badge status="default" text="Died" />
                  </Option>
                </Select>
              </Col>
            </Row>
          </>
        }
      >
        <ConfigProvider locale={configuredLocale}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label={'คำนำหน้า'}>
                  <Select placeholder={'เลือกคำนำหน้า'}>
                    <Option value={'m'}>นาย</Option>
                    <Option value={'f'}>นาง</Option>
                    <Option value={'g'}>นางสาว</Option>
                    <Option value={'dr'}>ดร.</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ชื่อ-นามสกุล'}>
                  <Input placeholder="ชื่อ สกุล" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'เลขบัตรประชาชน'}>
                  <Input placeholder="เลขบัตรประชาชน" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หมายเลขโทรศัพท์'}>
                  <InputNumber
                    type="phone"
                    maxLength={10}
                    placeholder="หมายเลขโทรศัพท์"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อีเมลล์'}>
                  <Input placeholder="อีเมลล์" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หลักสูตร'}>
                  <Select placeholder={'กรุณาเลือก'}>
                    <Option value={'1'}>หลักสูตร A</Option>
                    <Option value={'2'}>หลักสูตร B</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หลักสูตร 1'}>
                  <Select placeholder={'กรุณาเลือก'}>
                    <Option value={'1'}>หลักสูตร A</Option>
                    <Option value={'2'}>หลักสูตร B</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'รุ่น'}>
                  <Input type="number" placeholder="#1" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'ตำแหน่งสมาคม'}>
                  <Select placeholder={'กรุณาเลือก'}>
                    <Option value={'1'}>ประธานรุ่น</Option>
                    <Option value={'2'}>ผู้ประสานงาน</Option>
                    <Option value={'3'}>สมาชิกทั่วไป</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={2}>
                <Form.Item label={'บ้านเลขที่'}>
                  <Input placeholder="บ้านเลขที่" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'เลขที่ห้อง'}>
                  <Input placeholder="เลขที่ห้อง" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อาคาร / หมู่บ้าน'}>
                  <Input placeholder="อาคาร / หมู่บ้าน" />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'หมู่ที่'}>
                  <Input placeholder="#1" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'ตรอก / ซอย'}>
                  <Input type="number" placeholder="ตรอก / ซอย" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ถนน'}>
                  <Input type="number" placeholder="ถนน" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำบล / แขวง'}>
                  <Input type="number" placeholder="ตำบล / แขวง" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อำเภอ / เขต'}>
                  <Input type="number" placeholder="อำเภอ / เขต" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'จังหวัด'}>
                  <Input type="number" placeholder="จังหวัด" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'รหัสไปรษณีย์'}>
                  <Input type="number" placeholder="รหัสไปรษณีย์" />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16} style={{ marginBottom: '20px' }}>
              <Col>
                <Button
                  type="primary"
                  style={{ backgroundColor: '#1E6541' }}
                  onClick={(e: any) => showModal(e)}
                >
                  <Space>
                    <EditOutlined />
                    {'E-Signature'}
                  </Space>
                </Button>
              </Col>
              <Col>ลงลายเซ็นชื่อ ผู้จะเป็นกรรมการ</Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Col>
              <Col span={8}>
                <Typography>
                  *อัพโหลดสำเนา 3 ชุด
                  พร้อมลงลายมือชื่อด้วยปากกาสีน้ำเงินหรือสีดำเท่านั้น
                  (สำเนาบัตรประชาชน / สำเนาทะเบียนบ้าน / สำเนาบัตรข้าราชการ)
                </Typography>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{ justifyContent: 'center', display: 'flex' }}
            >
              <Col>
                <Button type="primary" style={{ backgroundColor: '#1E6541' }}>
                  ยืนยัน
                </Button>
              </Col>
            </Row>
          </Form>
        </ConfigProvider>
      </Card>
    </>
  );
};
