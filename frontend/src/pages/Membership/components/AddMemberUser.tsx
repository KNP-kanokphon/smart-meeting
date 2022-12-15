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

// datepicker local thialand
import dayjs from 'dayjs';
import thTH from 'antd/lib/locale-provider/th_TH';
import 'dayjs/locale/th';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style';
import TextArea from 'antd/lib/input/TextArea';
import { DatamanagementService } from '../../../stores/meeting-store';
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

export const AddMemberUser: React.FC = (): React.ReactElement => {
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
  const [getDetail1, setDetail1] = useState<string>('');
  const [getDetail2, setDetail2] = useState<string>('');
  const [getDetail3, setDetail3] = useState<string>('');
  const [getAssociaton, setAssociaton] = useState<string>('');
  const [getApplyPosition, setApplyPosition] = useState<string>('');
  const [getOther, setOther] = useState<string>('');

  const onFinish = (e: any) => {
    // const data = {
    //   data: {
    //     uuid: uuidv4(),
    //     status: getStatus,
    //     title: getTitle,
    //     namelastname: getNameLastName,
    //     idcard: getIdCard,
    //     dob: getDOB,
    //     age: getAge,
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
    //     passnumber: getPassNumber,
    //     imppassnumber: getImpPassNumber,
    //     workdocument: getWorkDocument,
    //     career: getCareer,
    //     positioncareer: getPositionCareer,
    //     salary: getSalary,
    //     office: getOffice,
    //     housenumberoffice: getHouseNumberOffice,
    //     groupoffice: getGroupOffice,
    //     alleyoffice: getAlleyOffice,
    //     roadoffice: getRoadOffice,
    //     subdistrictoffice: getSubDistrictOffice,
    //     districtoffice: getDistrictOffice,
    //     provinceoffice: getProvinceOffice,
    //     postalcodeoffice: getPostalCodeOffice,
    //     phonenumberoffice: getPhoneNumberOffice,
    //     detail1: getDetail1,
    //     detail2: getDetail2,
    //     detail3: getDetail3,
    //     applyposition: getApplyPosition,
    //     association: getAssociaton,
    //     other: getOther,
    //     uploadfile: fileList,
    //     esignature: imageURLone,
    //   },
    // };

    Modal.confirm({
      title: 'ยืนยันการสมัครเป็นสมาชิก',
      icon: <ExclamationCircleOutlined />,
      content: 'โปรดตรวจสอบข้อมูลให้แน่ใจก่อนกดยืนยัน',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: async () => {
        const dataTest: any = {
          // type: "member",
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
          // bridday: getDOB,
        };
        await DatamanagementService()
          .importuser(dataTest)
          .then(e => {
            message.success('Import User Success !!');
          });
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
            <Button onClick={handleCancel}>OK</Button>
          </Col>
        </Row>
      </Modal>
      <Card
        style={{ width: '100%' }}
        title={
          <>
            <Row>
              <Col span={12} style={{ textAlign: 'left' }}>
                <Typography>
                  แบบฟอร์มรับรองบุคคลผู้จะเป็นกรรมการสมาคม
                </Typography>
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
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label={'คำนำหน้า'}>
                  <Select
                    placeholder={'เลือกคำนำหน้า'}
                    onChange={(e: string) => {
                      setTitle(e);
                    }}
                  >
                    <Option value={'นาย'}>นาย</Option>
                    <Option value={'นาง'}>นาง</Option>
                    <Option value={'นางสาว'}>นางสาว</Option>
                    <Option value={'ดร.'}>ดร.</Option>
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
              <Col span={6}>
                <Form.Item label={'วัน-เดือน-ปี'}>
                  <DatePicker
                    format={'DD-MM-BBBB'}
                    style={{ width: '100%' }}
                    onChange={(e: any) => {
                      let date: any = 0;
                      date = dayjs(e).format('YYYY-MM-DD');
                      setDOB(date);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'อายุ'}>
                  <Input
                    placeholder="อายุ"
                    onChange={(e: any) => {
                      setAge(e.target.value);
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
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={'กรณีเป็นบุคคลต่างด้าว ถือหนังสือเดินทางเลขที่'}
                >
                  <Input
                    placeholder="กรอกข้อมูล"
                    onChange={(e: any) => {
                      setPassNumber(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={
                    'ใบสำคัญถิ่นที่อยู่/ใบสาคัญประจาตัวคนต่างด้าวเลขที่ (ถ้ามี)'
                  }
                >
                  <Input
                    placeholder="กรอกข้อมูล"
                    onChange={(e: any) => {
                      setImpPassNumber(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ใบอนุญาตทำงานเลขที่ (ถ้ามี)'}>
                  <Input
                    placeholder="กรอกข้อมูล"
                    onChange={(e: any) => {
                      setWorkDocument(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label={'ข้าพเจ้าประกอบอาชีพ'}>
                  <Input
                    placeholder="ข้าพเจ้าประกอบอาชีพ"
                    onChange={(e: any) => {
                      setCareer(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำแหน่ง'}>
                  <Input
                    placeholder="ตำแหน่ง"
                    onChange={(e: any) => {
                      setPositionCareer(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'รายได้เฉลี่ยเดือนละ'}>
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={(value: any) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    stringMode
                    // step="0.01"
                    parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')}
                    placeholder="รายได้เฉลี่ยเดือนละ"
                    addonAfter="บาท"
                    onChange={(e: any) => {
                      setSalary(e);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'สถานที่ประกอบอาชีพ'}>
                  <Input
                    placeholder="สถานที่ประกอบอาชีพ"
                    onChange={(e: any) => {
                      setOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label={'เลขที่'}>
                  <Input
                    placeholder="เลขที่"
                    onChange={(e: any) => {
                      setHouseNumberOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label={'หมู่ที่'}>
                  <Input
                    placeholder="#1"
                    onChange={(e: any) => {
                      setGroupOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตรอก / ซอย'}>
                  <Input
                    placeholder="ตรอก / ซอย"
                    onChange={(e: any) => {
                      setAlleyOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ถนน'}>
                  <Input
                    placeholder="ถนน"
                    onChange={(e: any) => {
                      setRoadOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำบล / แขวง'}>
                  <Input
                    placeholder="ตำบล / แขวง"
                    onChange={(e: any) => {
                      setSubDistrictOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อำเภอ / เขต'}>
                  <Input
                    placeholder="อำเภอ / เขต"
                    onChange={(e: any) => {
                      setDistrictOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'จังหวัด'}>
                  <Input
                    placeholder="จังหวัด"
                    onChange={(e: any) => {
                      setProvinceOffice(e.target.value);
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
                      setPostalCodeOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'โทรศัพท์สถานที่ประกอบอาชีพ'}>
                  <InputNumber
                    onChange={(e: any) => {
                      setPhoneNumberOffice(e);
                    }}
                    style={{ width: '100%' }}
                    type="phone"
                    maxLength={10}
                    placeholder="โทรศัพท์สถานที่ประกอบอาชีพ"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label={'ปัจจุบันข้าพเจ้ามีทรัพย์สิน ดังต่อไปนี้'}>
                  <TextArea
                    showCount
                    onChange={(e: any) => {
                      setDetail1(e.target.value);
                    }}
                    maxLength={250}
                    placeholder="กรอกข้อมูล"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={
                    'ข้าพเจ้าเคยทำงานในสมาคมหรือองค์กรอื่นๆ มาก่อน ดังนี้ (ระบุชื่อองค์กรและตำแหน่ง)'
                  }
                >
                  <TextArea
                    onChange={(e: any) => {
                      setDetail2(e.target.value);
                    }}
                    showCount
                    maxLength={250}
                    placeholder="กรอกข้อมูล"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={
                    'ข้าพเจ้าเคยต้องหาในคดีอาญาหรือคดีแพ่งโดยศาลมีคาพิพากษาถึงที่สุดแล้ว ดังต่อไปนี้'
                  }
                >
                  <TextArea
                    onChange={(e: any) => {
                      setDetail3(e.target.value);
                    }}
                    showCount
                    maxLength={250}
                    placeholder="กรอกข้อมูล"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={'ข้าพเจ้ามีความประสงค์จะเป็น (ตำแหน่งในสมาคม)'}
                >
                  <Select
                    onChange={(e: any) => {
                      setApplyPosition(e);
                    }}
                    style={{ width: '100%' }}
                    placeholder={'ข้าพเจ้ามีความประสงค์จะเป็น (ตำแหน่งในสมาคม)'}
                  >
                    <Option value={1}>ตำแหน่ง 1</Option>
                    <Option value={2}>ตำแหน่ง 2</Option>
                    <Option value={3}>ตำแหน่ง 3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={'ของสมาคม'}>
                  <Input
                    placeholder="กรอกข้อมูล"
                    onChange={(e: any) => {
                      setAssociaton(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={'ข้อความเพิ่มเติม (ถ้ามี)'}>
                  <TextArea
                    onChange={(e: any) => {
                      setOther(e.target.value);
                    }}
                    showCount
                    maxLength={250}
                    placeholder="กรอกข้อมูล"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Typography style={{ marginBottom: '10px' }}>
              ข้าพเจ้าขอรับรองว่าข้อความที่ได้ให้ไว้ข้างต้นเป็นความจริงทุกประการ
              ทั้งนี้
              หากนายทะเบียนสมาคมตรวจสอบพบว่าข้าพเจ้ามีฐานะและความประพฤติไม่เหมาะสม
              หรือระบุข้อความใดๆ อันเป็นเท็จ
              ข้าพเจ้ายินยอมให้นายทะเบียนสมาคมดำเนินการให้เป็นไปตาม
              ระเบียบกฎหมายที่เกี่ยวข้องทุกประการ
            </Typography>
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
