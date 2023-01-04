import React, { useState, useRef, useEffect } from 'react';
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
  const [form] = Form.useForm();

  //  ref check value null
  const refStatus = useRef<any>(null);
  const refTitle = useRef<any>(null);
  const refAge = useRef<any>(null);
  const refDob = useRef<any>(null);
  const refUsername = useRef<any>(null);
  const refTitle_eng = useRef<any>(null);
  const refUsername_eng = useRef<any>(null);
  const refIdcard = useRef<any>(null);
  const refPhonenumber = useRef<any>(null);
  const refEmail = useRef<any>(null);
  const refCourse = useRef<any>(null);
  const refGeneration = useRef<any>(null);
  const refPosition = useRef<any>(null);
  const refHousenumber = useRef<any>(null);
  const refSubdistrict = useRef<any>(null);
  const refDistrict = useRef<any>(null);
  const refProvince = useRef<any>(null);
  const refPostalcode = useRef<any>(null);
  const refVillageNo = useRef<any>(null);
  //  end ref check value null

  //   state collect data
  // const [getStatus, setStatus] = useState<string>('');
  // const [getTitle, setTitle] = useState<string>('');
  // const [getNameLastName, setNameLastName] = useState<string>('');
  // const [getIdCard, setIdCard] = useState<string>('');
  // const [getDOB, setDOB] = useState<string>('');
  // const [getAge, setAge] = useState<string>('');
  // const [getPhoneNumber, setPhoneNumber] = useState<string>('');
  // const [getEmail, setEmail] = useState<string>('');
  // const [getCourse, setCourse] = useState<string>('');
  // const [getCourse1, setCourse1] = useState<string>('');
  // const [getGeneration, setGeneration] = useState<string>('');
  // const [getPosition, setPosition] = useState<string>('');
  // const [getHouseNumber, setHouseNumber] = useState<string>('');
  // const [getRoomNumber, setRoomNumber] = useState<string>('');
  // const [getVillage, setVillage] = useState<string>('');
  // const [getGroup, setGroup] = useState<string>('');
  // const [getAlley, setAlley] = useState<string>('');
  // const [getRoad, setRoad] = useState<string>('');
  // const [getSubDistrict, setSubDistrict] = useState<string>('');
  // const [getDistrict, setDistrict] = useState<string>('');
  // const [getProvince, setProvince] = useState<string>('');
  // const [getPostalCode, setPostalCode] = useState<string>('');
  // const [getPassNumber, setPassNumber] = useState<string>('');
  // const [getImpPassNumber, setImpPassNumber] = useState<string>('');
  // const [getWorkDocument, setWorkDocument] = useState<string>('');
  // const [getCareer, setCareer] = useState<string>('');
  // const [getPositionCareer, setPositionCareer] = useState<string>('');
  // const [getSalary, setSalary] = useState<string>('');
  // const [getOffice, setOffice] = useState<string>('');
  // const [getHouseNumberOffice, setHouseNumberOffice] = useState<string>('');
  // const [getGroupOffice, setGroupOffice] = useState<string>('');
  // const [getAlleyOffice, setAlleyOffice] = useState<string>('');
  // const [getRoadOffice, setRoadOffice] = useState<string>('');
  // const [getSubDistrictOffice, setSubDistrictOffice] = useState<string>('');
  // const [getDistrictOffice, setDistrictOffice] = useState<string>('');
  // const [getProvinceOffice, setProvinceOffice] = useState<string>('');
  // const [getPostalCodeOffice, setPostalCodeOffice] = useState<string>('');
  // const [getPhoneNumberOffice, setPhoneNumberOffice] = useState<string>('');
  // const [getDetail1, setDetail1] = useState<string>('');
  // const [getDetail2, setDetail2] = useState<string>('');
  // const [getDetail3, setDetail3] = useState<string>('');
  // const [getAssociaton, setAssociaton] = useState<string>('');
  // const [getApplyPosition, setApplyPosition] = useState<string>('');
  // const [getOther, setOther] = useState<string>('');

  const [getPositionAll, setPositionAll] = useState<any>([]);
  const [getCourseAll, setCourseAll] = useState<any>([]);

  useEffect(() => {
    dataPosition();
    getListCourse();
  }, []);

  const dataPosition = async () => {
    const resultDataPosiotion = await DatamanagementService().getPositionall();
    // console.log(resultDataPosiotion);
    const data = (await resultDataPosiotion.map((e: any, row: any) => {
      const mapData = {
        uuid: e.uuid,
        position: e.nameposition,
      };
      return mapData;
    })) as any;
    setPositionAll(data);
  };

  const getListCourse = async () => {
    const result = await DatamanagementService().getCourseall();

    const dataCourse = (await result.map((e: any, i: number) => {
      const mapData = {
        uuid: e.uuid,
        course: e.namecourse,
      };
      return mapData;
    })) as any;
    setCourseAll(dataCourse);
  };

  const onFinish = (e: any) => {
    if (e.status === undefined || e.status === '') {
      message.warning('กรุณาเลือก Status !!');
      refStatus.current.focus();
      return false;
    }
    if (e.title === undefined || e.title === '') {
      message.warning('กรุณาเลือก คำนำหน้า !!');
      refTitle.current.focus();
      return false;
    }
    if (e.username === undefined || e.username === '') {
      message.warning('กรุณากรอกชื่อ - สกุล !!');
      refUsername.current.focus();
      return false;
    }
    if (e.title_eng === undefined || e.title_eng === '') {
      message.warning('กรุณาเลือก คำนำหน้า !!');
      refTitle_eng.current.focus();
      return false;
    }
    if (e.username_eng === undefined || e.username_eng === '') {
      message.warning('กรุณากรอกชื่อ - สกุล !!');
      refUsername_eng.current.focus();
      return false;
    }
    // if (e.dob === undefined || e.dob === '') {
    //   message.warning('กรุณาเลือกอายุ !!');
    //   refDob.current.focus();
    //   return false;
    // }
    // if (e.age === undefined || e.age === '') {
    //   message.warning('กรุณากรอกอายุ !!');
    //   refAge.current.focus();
    //   return false;
    // }
    // if (e.idcard === undefined || e.idcard === '') {
    //   message.warning('กรุณากรอกเลขบัตรประชาชน !!');
    //   refIdcard.current.focus();
    //   return false;
    // }
    // if (e.phonenumber === undefined || e.phonenumber === '') {
    //   message.warning('กรุณากรอกเบอร์โทรศัพท์ !!');
    //   refPhonenumber.current.focus();
    //   return false;
    // }
    // if (e.email === undefined || e.email === '') {
    //   message.warning('กรุณากรอกอีเมลล์ !!');
    //   refEmail.current.focus();
    //   return false;
    // }
    if (e.course === undefined || e.course === '') {
      message.warning('กรุณาเลือก หลักสูตร !!');
      refCourse.current.focus();
      return false;
    }
    if (e.generation === undefined || e.generation === '') {
      message.warning('กรุณาเลือกรุ่น !!');
      refGeneration.current.focus();
      return false;
    }
    if (e.position === undefined || e.position === '') {
      message.warning('กรุณาเลือกตำแหน่ง !!');
      refPosition.current.focus();
      return false;
    }
    if (e.housenumber === undefined || e.housenumber === '') {
      message.warning('กรุณากรอกบ้านเลขที่ !!');
      refHousenumber.current.focus();
      return false;
    }
    if (e.villageno === undefined || e.villageno === '') {
      message.warning('กรุณากรอกหมู่ !!');
      refVillageNo.current.focus();
      return false;
    }
    if (e.subdistrict === undefined || e.subdistrict === '') {
      message.warning('กรุณาหรอกตำบล !!');
      refSubdistrict.current.focus();
      return false;
    }
    if (e.district === undefined || e.district === '') {
      message.warning('กรุณากรอกอำเภอ !!');
      refDistrict.current.focus();
      return false;
    }
    if (e.province === undefined || e.province === '') {
      message.warning('กรุณากรอกจังหวัด !!');
      refProvince.current.focus();
      return false;
    }
    if (e.postalcode === undefined || e.postalcode === '') {
      message.warning('กรุณากรอกรหัสไปรษณีย์ !!');
      refPostalcode.current.focus();
      return false;
    }
    Modal.confirm({
      title: 'ยืนยันการสมัครเป็นสมาชิก',
      icon: <ExclamationCircleOutlined />,
      content: 'โปรดตรวจสอบข้อมูลให้แน่ใจก่อนกดยืนยัน',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: async () => {
        const data: any = {
          type: 'member',
          uuid: uuidv4(),
          prefix: e.title !== undefined ? e.title : '',
          username: e.username !== undefined ? e.username : '',
          idcard: e.idcard !== undefined ? e.idcard : '',
          bridday: e.dob !== undefined ? e.dob : '',
          age: e.age !== undefined ? e.age : '',
          username_eng: e.username_eng !== undefined ? e.username_eng : '',
          prefixtitleeng: e.title_eng !== undefined ? e.title_eng : '',
          phonenumber: e.phonenumber !== undefined ? e.phonenumber : '',
          email: e.email !== undefined ? e.email : '',
          course: e.course !== undefined ? e.course : '',
          course1: e.course1 !== undefined ? e.course1 : '',
          model: e.generation !== undefined ? e.generation : '',
          position: e.position !== undefined ? e.position : '',
          number: e.housenumber !== undefined ? e.housenumber : '',
          roomnumber: e.roomnumber !== undefined ? e.roomnumber : '',
          villageno: e.villageno !== undefined ? e.villageno : '',
          bldg: e.village !== undefined ? e.village : '',
          alley: e.alley !== undefined ? e.alley : '',
          road: e.road !== undefined ? e.road : '',
          subdistrict: e.subdistrict !== undefined ? e.subdistrict : '',
          district: e.district !== undefined ? e.district : '',
          province: e.province !== undefined ? e.province : '',
          postalcode: e.postalcode !== undefined ? e.postalcode : '',
          active: e.status !== undefined ? e.status : '',
          passport: e.passport !== undefined ? e.passport : '',
          certificate: e.certificate !== undefined ? e.certificate : '',
          workpermit: e.workpermit !== undefined ? e.workpermit : '',
          work: e.work !== undefined ? e.work : '',
          job_position: e.job_position !== undefined ? e.job_position : '',
          salary: e.salary !== undefined ? e.salary : '',
          work_station: e.work_station !== undefined ? e.work_station : '',
          work_number: e.work_number !== undefined ? e.work_number : '',
          work_villageno:
            e.work_villageno !== undefined ? e.work_villageno : '',
          work_alley: e.work_alley !== undefined ? e.work_alley : '',
          work_road: e.work_road !== undefined ? e.work_road : '',
          work_sub_district:
            e.work_sub_district !== undefined ? e.work_sub_district : '',
          work_district: e.work_district !== undefined ? e.work_district : '',
          work_province: e.work_province !== undefined ? e.work_province : '',
          work_postal_code:
            e.work_postal_code !== undefined ? e.work_postal_code : '',
          phone_office: e.phone_office !== undefined ? e.phone_office : '',
          all_assets: e.all_assets !== undefined ? e.all_assets : '',
          previous_job: e.previous_job !== undefined ? e.previous_job : '',
          criminalcase: e.criminalcase !== undefined ? e.criminalcase : '',
          position_guild:
            e.position_guild !== undefined ? e.position_guild : '',
          guild: e.guild !== undefined ? e.guild : '',
          others: e.others !== undefined ? e.others : '',
        };
        await DatamanagementService()
          .importuser(data)
          .then(e => {
            message.success('Import User Success !!');
            form.resetFields();
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
      <ConfigProvider locale={configuredLocale}>
        <Form
          layout="vertical"
          form={form}
          autoComplete="off"
          onFinish={onFinish}
        >
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
                    <Form.Item name={'status'} required>
                      <Select
                        ref={refStatus}
                        id={'status'}
                        placeholder={'สถานะ'}
                        style={{ width: '20%', textAlign: 'left' }}
                        // onChange={(e: string) => {
                        //   setStatus(e);
                        // }}
                      >
                        <Option value="active">
                          <Badge color="green" text="Active" />
                        </Option>
                        <Option value="close">
                          <Badge color="red" text="Close" />
                        </Option>
                        {/* <Option value="died">
                          <Badge status="default" text="Died" />
                        </Option> */}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            }
          >
            <Row gutter={16}>
              <Col span={2}>
                <Form.Item label={'คำนำหน้า'} name={'title'} required>
                  <Select
                    id={'title'}
                    ref={refTitle}
                    placeholder={'เลือกคำนำหน้า'}
                  >
                    <Option value={'นาย'}>นาย</Option>
                    <Option value={'นาง'}>นาง</Option>
                    <Option value={'นางสาว'}>นางสาว</Option>
                    <Option value={'ดร.'}>ดร.</Option>
                    <Option value={'ผศ.ดร.'}>ผศ.ดร.</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={'ชื่อ-นามสกุล (ภาษาไทย)'}
                  name={'username'}
                  required
                >
                  <Input
                    ref={refUsername}
                    id={'username'}
                    name={'username'}
                    placeholder="ชื่อ สกุล"
                    // onChange={(e: any) => {
                    //   setNameLastName(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'คำนำหน้า'} name={'title_eng'} required>
                  <Select
                    id={'title_eng'}
                    ref={refTitle_eng}
                    // name={"title"}
                    placeholder={'เลือกคำนำหน้า'}
                    // onChange={(e: string) => {
                    //   setTitle(e);
                    // }}
                  >
                    <Option value={'Mr.'}>Mr.</Option>
                    <Option value={'Miss'}>Miss</Option>
                    <Option value={'Mrs.'}>Mrs.</Option>
                    <Option value={'Dr.'}>Dr.</Option>
                    <Option value={'Asst.Prof.Dr'}>Asst.Prof.Dr</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={'ชื่อ-นามสกุล (ภาษาอังกฤษ)'}
                  name={'username_eng'}
                  required
                >
                  <Input
                    ref={refUsername_eng}
                    id={'username_eng'}
                    name={'username_eng'}
                    placeholder="ชื่อ สกุล"
                    // onChange={(e: any) => {
                    //   setNameLastName(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'เลขบัตรประชาชน'} name={'idcard'}>
                  <Input
                    ref={refIdcard}
                    id={'idcard'}
                    name={'idcard'}
                    placeholder="เลขบัตรประชาชน"
                    // onChange={(e: any) => {
                    //   setIdCard(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'วัน-เดือน-ปี'} name={'dob'}>
                  <DatePicker
                    ref={refDob}
                    name={'dob'}
                    id={'dob'}
                    format={'DD-MM-BBBB'}
                    style={{ width: '100%' }}
                    onChange={(e: any) => {
                      let date: any = 0;
                      date = dayjs(e).format('YYYY-MM-DD');
                      // setDOB(date);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'อายุ'} name={'age'}>
                  <Input
                    ref={refAge}
                    name={'age'}
                    id={'age'}
                    placeholder="อายุ"
                    // onChange={(e: any) => {
                    //   setAge(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หมายเลขโทรศัพท์'} name={'phonenumber'}>
                  <Input
                    ref={refPhonenumber}
                    name={'phonenumber'}
                    id={'phonenumber'}
                    // onChange={(e: any) => {
                    //   setPhoneNumber(e.target.value);
                    // }}
                    type="phone"
                    // maxLength={10}
                    placeholder="หมายเลขโทรศัพท์"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อีเมลล์'} name={'email'}>
                  <Input
                    ref={refEmail}
                    name={'email'}
                    id={'email'}
                    placeholder="อีเมลล์"
                    // onChange={(e: any) => {
                    //   setEmail(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หลักสูตร'} name={'course'} required>
                  <Select
                    ref={refCourse}
                    id={'course'}
                    mode="multiple"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    placeholder={'กรุณาเลือก'}
                    // onChange={(e: string) => {
                    //   setCourse(e);
                    // }}
                  >
                    <Option key={''} value={''} disabled>
                      Select
                    </Option>
                    {getCourseAll.map((e: any, row: any) => {
                      // console.log(e.position);
                      return (
                        <Option key={e.uuid} value={e.uuid}>
                          {e.course}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หลักสูตร 1'} name={'course1'}>
                  <Select
                    id={'course1'}
                    mode="multiple"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    placeholder={'กรุณาเลือก'}
                    // onChange={(e: string) => {
                    //   setCourse1(e);
                    // }}
                  >
                    <Option key={''} value={''} disabled>
                      Select
                    </Option>
                    {getCourseAll.map((e: any, row: any) => {
                      return (
                        <Option key={e.uuid} value={e.uuid}>
                          {e.course}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'รุ่น'} name={'generation'} required>
                  <Input
                    ref={refGeneration}
                    name={'generation'}
                    id={'generation'}
                    type="number"
                    placeholder="#1"
                    // onChange={(e: any) => {
                    //   setGeneration(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'ตำแหน่งสมาคม'} name={'position'} required>
                  <Select
                    ref={refPosition}
                    id={'position'}
                    mode="multiple"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    placeholder={'กรุณาเลือก'}
                    // onChange={(e: string) => {
                    //   setPosition(e);
                    // }}
                  >
                    <Option key={''} value={''} disabled>
                      Select
                    </Option>
                    {getPositionAll.map((e: any, row: any) => {
                      // console.log(e.position);
                      return (
                        <Option key={e.uuid} value={e.uuid}>
                          {e.position}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={2}>
                <Form.Item label={'บ้านเลขที่'} name={'housenumber'} required>
                  <Input
                    ref={refHousenumber}
                    name={'housenumber'}
                    id={'housenumber'}
                    placeholder="บ้านเลขที่"
                    // onChange={(e: any) => {
                    //   setHouseNumber(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'เลขที่ห้อง'} name={'roomenumber'}>
                  <Input
                    name={'roomnumber'}
                    id={'housenumber'}
                    placeholder="เลขที่ห้อง"
                    // onChange={(e: any) => {
                    //   setRoomNumber(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อาคาร / หมู่บ้าน'} name={'village'}>
                  <Input
                    name={'village'}
                    id={'village'}
                    placeholder="อาคาร / หมู่บ้าน"
                    // onChange={(e: any) => {
                    //   setVillage(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'หมู่ที่'} name={'villageno'} required>
                  <Input
                    name={'villageno'}
                    id={'villageno'}
                    placeholder="#1"
                    // onChange={(e: any) => {
                    //   setGroup(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'ตรอก / ซอย'} name={'alley'}>
                  <Input
                    name={'alley'}
                    id={'alley'}
                    placeholder="ตรอก / ซอย"
                    // onChange={(e: any) => {
                    //   setAlley(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ถนน'} name={'road'}>
                  <Input
                    name={'road'}
                    id={'road'}
                    placeholder="ถนน"
                    // onChange={(e: any) => {
                    //   setRoad(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำบล / แขวง'} name={'subdistrict'} required>
                  <Input
                    ref={refSubdistrict}
                    name={'subdistrict'}
                    id={'subdistrict'}
                    placeholder="ตำบล / แขวง"
                    // onChange={(e: any) => {
                    //   setSubDistrict(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อำเภอ / เขต'} name={'district'} required>
                  <Input
                    ref={refDistrict}
                    name={'district'}
                    id={'district'}
                    placeholder="อำเภอ / เขต"
                    // onChange={(e: any) => {
                    //   setDistrict(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'จังหวัด'} name={'province'} required>
                  <Input
                    ref={refProvince}
                    name={'province'}
                    id={'province'}
                    placeholder="จังหวัด"
                    // onChange={(e: any) => {
                    //   setProvince(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'รหัสไปรษณีย์'} name={'postalcode'} required>
                  <Input
                    ref={refPostalcode}
                    name={'postalcode'}
                    id={'postalcode'}
                    type="number"
                    placeholder="รหัสไปรษณีย์"
                    // onChange={(e: any) => {
                    //   setPostalCode(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={'กรณีเป็นบุคคลต่างด้าว ถือหนังสือเดินทางเลขที่'}
                  name={'passport'}
                >
                  <Input
                    name={'passport'}
                    id={'passport'}
                    placeholder="กรอกข้อมูล"
                    // onChange={(e: any) => {
                    //   setPassNumber(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={
                    'ใบสำคัญถิ่นที่อยู่/ใบสาคัญประจาตัวคนต่างด้าวเลขที่ (ถ้ามี)'
                  }
                  name={'certificate'}
                >
                  <Input
                    name={'certificate'}
                    id={'certificate'}
                    placeholder="กรอกข้อมูล"
                    // onChange={(e: any) => {
                    //   setImpPassNumber(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={'ใบอนุญาตทำงานเลขที่ (ถ้ามี)'}
                  name={'workpermit'}
                >
                  <Input
                    name={'workpermit'}
                    id={'workpermit'}
                    placeholder="กรอกข้อมูล"
                    // onChange={(e: any) => {
                    //   setWorkDocument(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label={'ข้าพเจ้าประกอบอาชีพ'} name={'work'}>
                  <Input
                    name={'work'}
                    id={'work'}
                    placeholder="ข้าพเจ้าประกอบอาชีพ"
                    // onChange={(e: any) => {
                    //   setCareer(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำแหน่ง'} name={'job_position'}>
                  <Input
                    name={'job_position'}
                    id={'job_position'}
                    placeholder="ตำแหน่ง"
                    // onChange={(e: any) => {
                    //   setPositionCareer(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'รายได้เฉลี่ยเดือนละ'} name={'salary'}>
                  <InputNumber
                    name={'salary'}
                    id={'salary'}
                    style={{ width: '100%' }}
                    formatter={(value: any) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    stringMode
                    // step="0.01"
                    parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')}
                    placeholder="รายได้เฉลี่ยเดือนละ"
                    addonAfter="บาท"
                    // onChange={(e: any) => {
                    //   setSalary(e);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'สถานที่ประกอบอาชีพ'} name={'work_station'}>
                  <Input
                    name={'work_station'}
                    id={'work_station'}
                    placeholder="สถานที่ประกอบอาชีพ"
                    // onChange={(e: any) => {
                    //   setOffice(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label={'เลขที่'} name={'work_number'}>
                  <Input
                    name={'work_number'}
                    id={'work_number'}
                    placeholder="เลขที่"
                    // onChange={(e: any) => {
                    //   setHouseNumberOffice(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label={'หมู่ที่'} name={'work_villageno'}>
                  <Input
                    name={'work_villageno'}
                    id={'work_villageno'}
                    placeholder="#1"
                    // onChange={(e: any) => {
                    //   setGroupOffice(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตรอก / ซอย'} name={'work_alley'}>
                  <Input
                    name={'work_alley'}
                    id={'work_alley'}
                    placeholder="ตรอก / ซอย"
                    // onChange={(e: any) => {
                    //   setAlleyOffice(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ถนน'} name={'work_road'}>
                  <Input
                    name={'work_road'}
                    id={'work_road'}
                    placeholder="ถนน"
                    // onChange={(e: any) => {
                    //   setRoadOffice(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำบล / แขวง'} name={'work_sub_district'}>
                  <Input
                    name={'work_sub_district'}
                    id={'work_sub_district'}
                    placeholder="ตำบล / แขวง"
                    // onChange={(e: any) => {
                    //   setSubDistrictOffice(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อำเภอ / เขต'} name={'work_district'}>
                  <Input
                    name={'work_district'}
                    id={'work_district'}
                    placeholder="อำเภอ / เขต"
                    // onChange={(e: any) => {
                    //   setDistrictOffice(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'จังหวัด'} name={'work_province'}>
                  <Input
                    name={'work_province'}
                    id={'work_province'}
                    placeholder="จังหวัด"
                    // onChange={(e: any) => {
                    //   setProvinceOffice(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'รหัสไปรษณีย์'} name={'work_postal_code'}>
                  <Input
                    name={'work_postal_code'}
                    id={'work_postal_code'}
                    type="number"
                    placeholder="รหัสไปรษณีย์"
                    // onChange={(e: any) => {
                    //   setPostalCodeOffice(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={'โทรศัพท์สถานที่ประกอบอาชีพ'}
                  name={'phone_office'}
                >
                  <InputNumber
                    name={'phone_office'}
                    id={'phone_office'}
                    // onChange={(e: any) => {
                    //   setPhoneNumberOffice(e.target.value);
                    // }}
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
                <Form.Item
                  label={'ปัจจุบันข้าพเจ้ามีทรัพย์สิน ดังต่อไปนี้'}
                  name={'all_assets'}
                >
                  <TextArea
                    name={'all_assets'}
                    id={'all_assets'}
                    // showCount
                    // onChange={(e: any) => {
                    //   setDetail1(e.target.value);
                    // }}
                    maxLength={250}
                    placeholder="กรอกข้อมูล"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={'previous_job'}
                  label={
                    'ข้าพเจ้าเคยทำงานในสมาคมหรือองค์กรอื่นๆ มาก่อน ดังนี้ (ระบุชื่อองค์กรและตำแหน่ง)'
                  }
                >
                  <TextArea
                    name={'previous_job'}
                    id={'previous_job'}
                    // onChange={(e: any) => {
                    //   setDetail2(e.target.value);
                    // }}
                    showCount
                    maxLength={250}
                    placeholder="กรอกข้อมูล"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={'criminalcase'}
                  label={
                    'ข้าพเจ้าเคยต้องหาในคดีอาญาหรือคดีแพ่งโดยศาลมีคาพิพากษาถึงที่สุดแล้ว ดังต่อไปนี้'
                  }
                >
                  <TextArea
                    name={'criminalcase'}
                    id={'criminalcase'}
                    // onChange={(e: any) => {
                    //   setDetail3(e.target.value);
                    // }}
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
                  name={'position_guild'}
                  label={'ข้าพเจ้ามีความประสงค์จะเป็น (ตำแหน่งในสมาคม)'}
                >
                  <Select
                    id={'position_guild'}
                    placeholder={'ข้าพเจ้ามีความประสงค์จะเป็น (ตำแหน่งในสมาคม)'}
                    mode="multiple"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    // onChange={(e: any) => {
                    //   setApplyPosition(e);
                    // }}
                    style={{ width: '100%' }}
                  >
                    <Option key={''} value={''} disabled>
                      Select
                    </Option>
                    {getPositionAll.map((e: any, row: any) => {
                      // console.log(e.position);
                      return (
                        <Option key={e.uuid} value={e.position}>
                          {e.position}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={'ของสมาคม'} name={'guild'}>
                  <Input
                    name={'guild'}
                    id={'guild'}
                    placeholder="กรอกข้อมูล"
                    // onChange={(e: any) => {
                    //   setAssociaton(e.target.value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={'ข้อความเพิ่มเติม (ถ้ามี)'} name={'others'}>
                  <TextArea
                    name={'others'}
                    id={'others'}
                    // onChange={(e: any) => {
                    //   setOther(e.target.value);
                    // }}
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
                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{ backgroundColor: '#1E6541' }}
                    // onClick={(e: any) => {
                    //   onFinish(e);
                    // }}
                  >
                    ยืนยัน
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </ConfigProvider>
    </>
  );
};
