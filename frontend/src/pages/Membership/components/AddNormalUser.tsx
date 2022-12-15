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
import {
  EditOutlined,
  UploadOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import SignatureCanvas from 'react-signature-canvas';
import { v4 as uuidv4 } from 'uuid';
import { DatamanagementService } from '../../../stores/meeting-store';

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
  const [form] = Form.useForm();

  //   state collect data
  const [getStatus, setStatus] = useState<string>('');
  const [getTitle, setTitle] = useState<string>('');
  const [getNameLastName, setNameLastName] = useState<string>('');
  const [getIdCard, setIdCard] = useState<string>('');
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

  const onFinish = (e: any) => {
    // const data = {
    //   data: {
    //     uuid: uuidv4(),
    //     status: getStatus,
    //     title: getTitle,
    //     namelastname: getNameLastName,
    //     idcard: getIdCard,
    //     phonenumber: getPhoneNumber,
    //     email: getEmail,
    //     course: getCourse,
    //     course1: getCourse1,
    //     generation: getGeneration,
    //     position: getPosition,
    //     housenumber: getHouseNumber,
    //     roomnumber: getRoomNumber,
    //     village: getVillage,
    //     group: getGroup,
    //     alley: getAlley,
    //     road: getRoad,
    //     subdistrict: getSubDistrict,
    //     district: getDistrict,
    //     province: getProvince,
    //     postalcode: getPostalCode,
    //     uploadfile: fileList,
    //     esignature: imageURLone,
    //   },
    // };
    // console.log(data);

    Modal.confirm({
      title: 'ยืนยันการสมัครเป็นสมาชิก',
      icon: <ExclamationCircleOutlined />,
      content: 'โปรดตรวจสอบข้อมูลให้แน่ใจก่อนกดยืนยัน',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: async () => {
        const dataTest: any = {
          type: 'normal',
          uuid: uuidv4(),
          prefix: getTitle,
          username: getNameLastName,
          idcard: getIdCard,
          phonenumber: getPhoneNumber,
          email: getEmail,
          course: getCourse,
          course1: getCourse1,
          model: getGeneration,
          position: getPosition,
          active: getStatus,
        };
        await DatamanagementService()
          .importuser(dataTest)
          .then(e => {
            message.success('Import User Success !!');
            setTitle('');
            setNameLastName('');
            setIdCard('');
            setPhoneNumber('');
            setEmail('');
            setCourse('');
            setCourse1('');
            setGeneration('');
            setPosition('');
            setStatus('');
            form.resetFields();
          });
        console.log('OK');
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  };

  const props: UploadProps = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },

    onChange(info) {
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done') {
      } else if (info.file.status === 'error') {
      }
    },

    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },

    beforeUpload: (file: any) => {
      const PDFFile = file.type === 'application/pdf';
      if (file.type === 'application/pdf') {
        setFileList([...fileList, file]);
        return false;
      } else {
        message.error(`${file.name} is not a pdf file`);
        return PDFFile || Upload.LIST_IGNORE;
      }
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
        open={open}
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
            xs={{ span: 24 }}
            lg={{ span: 24 }}
            style={{ textAlign: 'center' }}
          >
            <Button
              onClick={handleCancel}
              style={{ background: '#1E6541', color: 'white' }}
            >
              OK
            </Button>
          </Col>
          {/* <Col
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
          </Col> */}
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
                  onChange={(e: string) => {
                    setStatus(e);
                  }}
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
          <Form form={form} layout="vertical" autoComplete="off">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label={'คำนำหน้า'}>
                  <Select
                    placeholder={'เลือกคำนำหน้า'}
                    onChange={(e: string) => {
                      setTitle(e);
                    }}
                  >
                    <Option value={'m'}>นาย</Option>
                    <Option value={'f'}>นาง</Option>
                    <Option value={'g'}>นางสาว</Option>
                    <Option value={'dr'}>ดร.</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ชื่อ-นามสกุล'}>
                  <Input
                    placeholder="ชื่อ สกุล"
                    onChange={(e: any) => {
                      setNameLastName(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'เลขบัตรประชาชน'}>
                  <Input
                    placeholder="เลขบัตรประชาชน"
                    onChange={(e: any) => {
                      setIdCard(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หมายเลขโทรศัพท์'}>
                  <Input
                    onChange={(e: any) => {
                      setPhoneNumber(e.target.value);
                    }}
                    type="phone"
                    // maxLength={10}
                    placeholder="หมายเลขโทรศัพท์"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อีเมลล์'}>
                  <Input
                    placeholder="อีเมลล์"
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หลักสูตร'}>
                  <Select
                    placeholder={'กรุณาเลือก'}
                    onChange={(e: string) => {
                      setCourse(e);
                    }}
                  >
                    <Option value={'1'}>หลักสูตร A</Option>
                    <Option value={'2'}>หลักสูตร B</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หลักสูตร 1'}>
                  <Select
                    placeholder={'กรุณาเลือก'}
                    onChange={(e: string) => {
                      setCourse1(e);
                    }}
                  >
                    <Option value={'1'}>หลักสูตร A</Option>
                    <Option value={'2'}>หลักสูตร B</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'รุ่น'}>
                  <Input
                    type="number"
                    placeholder="#1"
                    onChange={(e: any) => {
                      setGeneration(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'ตำแหน่งสมาคม'}>
                  <Select
                    placeholder={'กรุณาเลือก'}
                    onChange={(e: string) => {
                      setPosition(e);
                    }}
                  >
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
                  <Input
                    placeholder="บ้านเลขที่"
                    onChange={(e: any) => {
                      setHouseNumber(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'เลขที่ห้อง'}>
                  <Input
                    placeholder="เลขที่ห้อง"
                    onChange={(e: any) => {
                      setRoomNumber(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อาคาร / หมู่บ้าน'}>
                  <Input
                    placeholder="อาคาร / หมู่บ้าน"
                    onChange={(e: any) => {
                      setVillage(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'หมู่ที่'}>
                  <Input
                    placeholder="#1"
                    onChange={(e: any) => {
                      setGroup(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'ตรอก / ซอย'}>
                  <Input
                    placeholder="ตรอก / ซอย"
                    onChange={(e: any) => {
                      setAlley(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ถนน'}>
                  <Input
                    placeholder="ถนน"
                    onChange={(e: any) => {
                      setRoad(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำบล / แขวง'}>
                  <Input
                    placeholder="ตำบล / แขวง"
                    onChange={(e: any) => {
                      setSubDistrict(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อำเภอ / เขต'}>
                  <Input
                    placeholder="อำเภอ / เขต"
                    onChange={(e: any) => {
                      setDistrict(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'จังหวัด'}>
                  <Input
                    placeholder="จังหวัด"
                    onChange={(e: any) => {
                      setProvince(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'รหัสไปรษณีย์'}>
                  <Input
                    type="number"
                    placeholder="รหัสไปรษณีย์"
                    onChange={(e: any) => {
                      setPostalCode(e.target.value);
                    }}
                  />
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
                <Button
                  type="primary"
                  style={{ backgroundColor: '#1E6541' }}
                  onClick={(e: any) => {
                    onFinish(e);
                  }}
                >
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
