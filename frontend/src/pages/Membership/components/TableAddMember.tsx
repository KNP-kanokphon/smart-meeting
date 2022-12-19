import {
  Button,
  Table,
  Popover,
  Row,
  Col,
  Modal,
  Badge,
  Typography,
  message,
  Card,
  // Col,
  Divider,
  Form,
  Input,
  // Row,
  Select,
  // Typography,
  ConfigProvider,
  InputNumber,
  // Button,
  Space,
  Upload,
  // message,
  // Modal,
  // Badge,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { DatamanagementService } from '../../../stores/meeting-store';
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
// import { DatamanagementService } from '../../../stores/meeting-store';
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

export interface Props {
  baseURL: string;
}

export const TableAddMember: React.FC = (): React.ReactElement => {
  const [FormAdd] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [getuserAll, setUserAll] = useState<any>([]);
  const [getPositionAll, setPositionAll] = useState<any>([]);
  const [getCourseAll, setCourseAll] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [getdataModal, setdatainModal] = useState<any>([]);

  const { Option } = Select;

  useEffect(() => {
    dataAll();
    dataPosition();
    getListCourse();
  }, []);

  const dataPosition = async () => {
    const resultDataPosiotion = await DatamanagementService().getPositionall();
    // console.log(resultDataPosiotion);
    const dataPosition = (await resultDataPosiotion.map((e: any, row: any) => {
      const mapData = {
        uuid: e.uuid,
        position: e.nameposition,
      };
      return mapData;
    })) as any;
    setPositionAll(dataPosition);
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

  const handleDel = (e: any) => {
    if (e) {
      Modal.confirm({
        // title: 'ต้องการลบข้อมูลนี้ ใช่ หรือ ไม่ ?',
        title: 'ยืนยันการเปลี่ยนแปลง',
        content: 'คุณต้องการลบข้อมูล ใช่ หรือ ไม่ ?',
        okText: 'ใช่',
        okType: 'danger',
        onOk: async () => {
          const res: any = await DatamanagementService().deleteUser(e);
          if (res) {
            message.success('ลบข้อมูลสำเร็จ');
            dataAll();
            // FormAdd.resetFields();
          }
        },
        onCancel: () => {
          // FormAdd.resetFields();
        },
      });
    }
  };

  const showModal = (e: any) => {
    console.log(e);

    setdatainModal(e);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = (e: any) => {
    const data = {
      alley: e.getAlley,
      work_alley: e.getAlleyOffice,
      position_guild: e.getApplyPosition,
      guild: e.getAssociaton,
      work: e.getCareer,
      course: e.getCourse,
      course1: e.getCourse1,
      bridday: e.getDOB,
      all_assets: e.getDetail1,
      previous_job: e.getDetail2,
      criminalcase: e.getDetail3,
      district: e.getDistrict,
      work_district: e.getDistrictOffice,
      email: e.getEmail,
      model: e.getGeneration,
      villageno: e.getGroup,
      work_villageno: e.getGroupOffice,
      number: e.getHouseNumber,
      work_number: e.getHouseNumberOffice,
      idcard: e.getIdCard,
      certificate: e.getImpPassNumber,
      username: e.getNameLastName,
      work_station: e.getOffice,
      others: e.getOther,
      passport: e.getPassNumber,
      phonenumber: e.getPhoneNumber,
      phone_office: e.getPhoneNumberOffice,
      position: e.getPosition,
      job_position: e.getPositionCareer,
      postalcode: e.getPostalCode,
      work_postal_code: e.getPostalCodeOffice,
      province: e.getProvince,
      work_province: e.getProvinceOffice,
      road: e.getRoad,
      work_road: e.getRoadOffice,
      roomnumber: e.getRoomNumber,
      salary: e.getSalary,
      active: e.getStatus,
      subdistrict: e.getSubDistrict,
      work_sub_district: e.getSubDistrictOffice,
      prefix: e.getTitle,
      bldg: e.getVillage,
      workpermit: e.getWorkDocument,
    } as any;
    if (e) {
      Modal.confirm({
        title: 'ยืนยันการเปลี่ยนแปลง',
        content: 'คุณต้องการ ใช่ หรือ ไม่ ?',
        okText: 'ใช่',
        okType: 'danger',
        onOk: async () => {
          let uuid = getdataModal.uuid;
          const res: any = await DatamanagementService().updateUser(uuid, data);
          if (res) {
            message.success('อัพเดต');
            dataAll();
            setIsModalOpen(false);
            FormAdd.resetFields();
          }
        },
        onCancel: () => {
          // FormAdd.resetFields();
        },
      });
    }
  };

  const dataAll = async () => {
    const dataAll = await DatamanagementService().findAll();
    const dataSource: any = await dataAll.map((x: any, row: any) => {
      // console.log(row);
      const mapData = {
        no: row + 1,
        active: x.active,
        bridday: x.bridday,
        course: x.course,
        course1: x.course1,
        email: x.email,
        id: x.id,
        idcard: x.idcard,
        line: x.line,
        model: x.model,
        phonenumber: x.phonenumber,
        position: x.position,
        prefix: x.prefix,
        studentid: x.studentid,
        type: x.type,
        username: x.username,
        username_eng: x.username_eng,
        uuid: x.uuid,
        number: x.number,
        roomnumber: x.roomnumber,
        bldg: x.bldg,
        villageno: x.villageno,
        alley: x.alley,
        road: x.road,
        subdistrict: x.subdistrict,
        district: x.district,
        province: x.province,
        postalcode: x.postalcode,
      };
      return mapData;
    });
    // console.log(dataAll);
    setUserAll(dataSource);
  };

  // const navigate = useNavigate();
  // const hide = () => {
  //   setOpen(false);
  // };

  // const handleOpenChange = (newOpen: boolean) => {
  //   setOpen(newOpen);
  // };
  const columnsTable: any = [
    {
      key: 'no',
      title: 'ลำดับ',
      fixed: 'left',
      width: '3%',
      dataIndex: 'no',
    },
    {
      key: 'prefix',
      title: 'คำนำหน้า',
      width: '3%',
      dataIndex: 'prefix',
    },
    {
      key: 'username',
      title: 'ชื่อ-นามสกุล',
      width: '9%',
      dataIndex: 'username',
    },
    {
      key: 'course',
      title: 'หลักสูตร',
      width: '5%',
      dataIndex: 'course',
      render: (e: any, row: any, index: any) => {
        if (e) {
          if (typeof e !== 'string') {
            return (
              <>
                {row?.course.map((data: any, row: any, index: number) => {
                  const countTypes = getCourseAll.find(
                    (event: any) => event?.uuid === data,
                  ) as any;
                  if (data?.length < 2) {
                    return countTypes?.course;
                  } else {
                    let nameposition: string = '';
                    nameposition += ' ' + countTypes?.course;
                    let splittt = nameposition;
                    return (
                      <>
                        <div style={{ whiteSpace: 'pre-line' }}>{splittt}</div>
                      </>
                    );
                  }
                })}
              </>
            );
          } else {
            if (e?.length < 2) {
              return e;
            } else {
              let nameposition: string = '';
              nameposition += ' ' + e;

              let splittt = nameposition;
              return (
                <>
                  <div style={{ whiteSpace: 'pre-line' }}>{splittt}</div>
                </>
              );
            }
          }
        }
      },
    },
    {
      key: 'course1',
      title: 'หลักสูตร 1',
      width: '5%',
      dataIndex: 'course1',
      render: (e: any, row: any, index: number) => {
        if (e) {
          if (typeof e !== 'string') {
            return (
              <>
                {row?.course1.map((data: any, row: any, index: number) => {
                  const countTypes = getCourseAll.find(
                    (event: any) => event?.uuid === data,
                  ) as any;
                  if (data?.length < 2) {
                    return countTypes?.course1;
                  } else {
                    let nameposition: string = '';
                    nameposition += ' ' + countTypes?.course1;
                    let splittt = nameposition;
                    return (
                      <>
                        <div style={{ whiteSpace: 'pre-line' }}>{splittt}</div>
                      </>
                    );
                  }
                })}
              </>
            );
          } else {
            if (e?.length < 2) {
              return e;
            } else {
              let nameposition: string = '';
              nameposition += ' ' + e;

              let splittt = nameposition;
              return (
                <>
                  <div style={{ whiteSpace: 'pre-line' }}>{splittt}</div>
                </>
              );
            }
          }
        }
      },
    },
    {
      key: 'position',
      title: 'ดำรงตำแหน่ง',
      width: '5%',
      dataIndex: 'position',
      render: (e: any, row: any, index: any) => {
        if (e) {
          if (typeof e !== 'string') {
            return (
              <>
                {row?.position.map((data: any, row: any, index: number) => {
                  const countTypes = getPositionAll.find(
                    (event: any) => event?.uuid === data,
                  ) as any;
                  if (data?.length < 2) {
                    return countTypes?.position;
                  } else {
                    let nameposition: string = '';
                    nameposition += ' ' + countTypes?.position;
                    let splittt = nameposition;
                    return (
                      <>
                        <div style={{ whiteSpace: 'pre-line' }}>{splittt}</div>
                      </>
                    );
                  }
                })}
              </>
            );
          } else {
            if (e?.length < 2) {
              return e;
            } else {
              let nameposition: string = '';
              nameposition += ',' + e;

              let splittt = nameposition.split(',');
              return (
                <>
                  <div style={{ whiteSpace: 'pre-line' }}>{splittt}</div>
                </>
              );
            }
          }
        }
      },
    },
    {
      key: 'model',
      title: 'รุ่น',
      width: '2%',
      dataIndex: 'model',
    },
    {
      key: 'phonenumber',
      title: 'เบอร์โทรศัพท์',
      width: '5%',
      dataIndex: 'phonenumber',
    },
    {
      key: 'email',
      title: 'E-mail',
      width: '5%',
      dataIndex: 'email',
    },
    {
      key: 'roomnumber',
      title: 'เลขที่ห้อง',
      width: '5%',
      dataIndex: 'roomnumber',
    },
    {
      key: 'number',
      title: 'บ้านเลขที่',
      width: '3%',
      dataIndex: 'number',
    },
    {
      key: 'bldg',
      title: 'อาคาร/หมู่บ้าน',
      width: '5%',
      dataIndex: 'bldg',
    },
    {
      key: '',
      title: 'ชั้น',
      width: '3%',
      dataIndex: '',
    },
    {
      key: 'alley',
      title: 'ซอย',
      width: '5%',
      dataIndex: 'alley',
    },
    {
      key: 'villageno',
      title: 'หมู่ที่',
      width: '5%',
      dataIndex: 'villageno',
    },
    {
      key: 'road',
      title: 'ถนน',
      width: '5%',
      dataIndex: 'road',
    },
    {
      key: 'subdistrict',
      title: 'ตำบล/แขวง',
      width: '5%',
      dataIndex: 'subdistrict',
    },
    {
      key: 'district',
      title: 'อำเภอ/เขต',
      width: '5%',
      dataIndex: 'district',
    },
    {
      key: 'province',
      title: 'จังหวัด',
      width: '5%',
      dataIndex: 'province',
    },
    {
      key: 'postalcode',
      title: 'รหัสไปรษณีย์',
      width: '5%',
      dataIndex: 'postalcode',
    },
    {
      key: 'active',
      title: 'สถานะ',
      width: '5%',
      dataIndex: 'active',
      render: (e: any, row: any, index: number) => {
        if (e) {
          if (e === 'close') {
            return <Badge color="orange" text="Close" />;
          } else if (e === 'active') {
            return <Badge color="green" text="Active" />;
          } else if (e === 'died') {
            return <Badge color="grey" text="Died" />;
          }
        }
      },
    },
    {
      key: 'type',
      title: 'Type',
      width: '5%',
      dataIndex: 'type',
    },
    {
      key: 'uuid',
      title: 'Action',
      fixed: 'right',
      width: '6%',
      dataIndex: 'uuid',
      render: (e: any, row: any) => {
        // console.log(row);

        if (e) {
          return (
            <div style={{ textAlign: 'center' }}>
              <Row gutter={16}>
                <Col>
                  <Button
                    style={{ width: '100%', border: 'none' }}
                    onClick={() => showModal(row)}
                  >
                    Edit
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    style={{ width: '100%', border: 'none' }}
                    danger
                    onClick={() => handleDel(row)}
                  >
                    Del
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }
      },
    },
  ];

  return (
    <>
      <Modal
        width={1500}
        title="Edit User"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={handleCancel}
        footer={false}
      >
        <ConfigProvider locale={configuredLocale}>
          <Form layout="vertical" onFinish={handleUpdate}>
            <Row gutter={16}>
              <Col span={24} style={{ textAlign: 'left' }}>
                <Form.Item label={'Active'} name={'getStatus'}>
                  <Select
                    id={'getStatus'}
                    placeholder={'สถานะ'}
                    style={{ width: '20%', textAlign: 'left' }}
                    onChange={(e: string) => {}}
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
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'คำนำหน้า'} name={'getTitle'}>
                  <Select
                    id={'getTitle'}
                    //  name={'username'}
                    placeholder={'เลือกคำนำหน้า'}
                    onChange={(e: string) => {
                      // setTitle(e);
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
                <Form.Item label={'ชื่อ-นามสกุล'} name={'getNameLastName'}>
                  <Input
                    id={'getNameLastName'}
                    name={'getNameLastName'}
                    placeholder="ชื่อ สกุล"
                    onChange={(e: any) => {
                      // setNameLastName(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'เลขบัตรประชาชน'} name={'getIdCard'}>
                  <Input
                    id={'getIdCard'}
                    name={'getIdCard'}
                    placeholder="เลขบัตรประชาชน"
                    onChange={(e: any) => {
                      // setIdCard(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'วัน-เดือน-ปี'} name={'getDOB'}>
                  <DatePicker
                    name={'getDOB'}
                    id={'getDOB'}
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
                <Form.Item label={'อายุ'} name={'getDOB'}>
                  <Input
                    name={'username'}
                    id={'username'}
                    placeholder="อายุ"
                    onChange={(e: any) => {
                      // setAge(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หมายเลขโทรศัพท์'} name={'getPhoneNumber'}>
                  <Input
                    name={'getPhoneNumber'}
                    id={'getPhoneNumber'}
                    onChange={(e: any) => {
                      // setPhoneNumber(e.target.value);
                    }}
                    type="phone"
                    // maxLength={10}
                    placeholder="หมายเลขโทรศัพท์"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อีเมลล์'} name={'getEmail'}>
                  <Input
                    name={'getEmail'}
                    id={'getEmail'}
                    placeholder="อีเมลล์"
                    onChange={(e: any) => {
                      // setEmail(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หลักสูตร'} name={'getCourse'}>
                  <Select
                    // name={'username'}
                    id={'getCourse'}
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
                    onChange={(e: string) => {
                      // setCourse(e);
                    }}
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
                <Form.Item label={'หลักสูตร 1'} name={'getCourse1'}>
                  <Select
                    // name={'username'}
                    id={'getCourse1'}
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
                    onChange={(e: string) => {
                      // setCourse1(e);
                    }}
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
              <Col span={2}>
                <Form.Item label={'รุ่น'} name={'getGeneration'}>
                  <Input
                    name={'getGeneration'}
                    id={'getGeneration'}
                    type="number"
                    placeholder="#1"
                    onChange={(e: any) => {
                      // setGeneration(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'ตำแหน่งสมาคม'} name={'getPosition'}>
                  <Select
                    // name={'username'}
                    id={'getPosition'}
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
                    onChange={(e: string) => {
                      // setPosition(e);
                    }}
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
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={2}>
                <Form.Item label={'บ้านเลขที่'} name={'getHouseNumber'}>
                  <Input
                    name={'getHouseNumber'}
                    id={'getHouseNumber'}
                    placeholder="บ้านเลขที่"
                    onChange={(e: any) => {
                      // setHouseNumber(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'เลขที่ห้อง'} name={'getRoomNumber'}>
                  <Input
                    name={'getRoomNumber'}
                    id={'getRoomNumber'}
                    placeholder="เลขที่ห้อง"
                    onChange={(e: any) => {
                      // setRoomNumber(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อาคาร / หมู่บ้าน'} name={'getVillage'}>
                  <Input
                    name={'getVillage'}
                    id={'getVillage'}
                    placeholder="อาคาร / หมู่บ้าน"
                    onChange={(e: any) => {
                      // setVillage(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'หมู่ที่'} name={'getGroup'}>
                  <Input
                    name={'getGroup'}
                    id={'getGroup'}
                    placeholder="#1"
                    onChange={(e: any) => {
                      // setGroup(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'ตรอก / ซอย'} name={'getAlley'}>
                  <Input
                    name={'getAlley'}
                    id={'getAlley'}
                    placeholder="ตรอก / ซอย"
                    onChange={(e: any) => {
                      // setAlley(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ถนน'} name={'getRoad'}>
                  <Input
                    name={'getRoad'}
                    id={'getRoad'}
                    placeholder="ถนน"
                    onChange={(e: any) => {
                      // setRoad(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำบล / แขวง'} name={'getSubDistrict'}>
                  <Input
                    name={'getSubDistrict'}
                    id={'getSubDistrict'}
                    placeholder="ตำบล / แขวง"
                    onChange={(e: any) => {
                      // setSubDistrict(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อำเภอ / เขต'} name={'getDistrict'}>
                  <Input
                    name={'getDistrict'}
                    id={'getDistrict'}
                    placeholder="อำเภอ / เขต"
                    onChange={(e: any) => {
                      // setDistrict(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'จังหวัด'} name={'getProvince'}>
                  <Input
                    name={'getProvince'}
                    id={'getProvince'}
                    placeholder="จังหวัด"
                    onChange={(e: any) => {
                      // setProvince(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'รหัสไปรษณีย์'} name={'getPostalCode'}>
                  <Input
                    name={'getPostalCode'}
                    id={'getPostalCode'}
                    type="number"
                    placeholder="รหัสไปรษณีย์"
                    onChange={(e: any) => {
                      // setPostalCode(e.target.value);
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
                  name={'getPassNumber'}
                >
                  <Input
                    name={'getPassNumber'}
                    id={'getPassNumber'}
                    placeholder="กรอกข้อมูล"
                    onChange={(e: any) => {
                      // setPassNumber(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={
                    'ใบสำคัญถิ่นที่อยู่/ใบสาคัญประจาตัวคนต่างด้าวเลขที่ (ถ้ามี)'
                  }
                  name={'getImpPassNumber'}
                >
                  <Input
                    name={'getImpPassNumber'}
                    id={'getImpPassNumber'}
                    placeholder="กรอกข้อมูล"
                    onChange={(e: any) => {
                      // setImpPassNumber(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={'ใบอนุญาตทำงานเลขที่ (ถ้ามี)'}
                  name={'getWorkDocument'}
                >
                  <Input
                    name={'getWorkDocument'}
                    id={'getWorkDocument'}
                    placeholder="กรอกข้อมูล"
                    onChange={(e: any) => {
                      // setWorkDocument(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label={'ข้าพเจ้าประกอบอาชีพ'} name={'getCareer'}>
                  <Input
                    name={'getCareer'}
                    id={'getCareer'}
                    placeholder="ข้าพเจ้าประกอบอาชีพ"
                    onChange={(e: any) => {
                      // setCareer(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำแหน่ง'} name={'getPositionCareer'}>
                  <Input
                    name={'getPositionCareer'}
                    id={'getPositionCareer'}
                    placeholder="ตำแหน่ง"
                    onChange={(e: any) => {
                      // setPositionCareer(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'รายได้เฉลี่ยเดือนละ'} name={'getSalary'}>
                  <InputNumber
                    name={'getSalary'}
                    id={'getSalary'}
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
                      // setSalary(e);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'สถานที่ประกอบอาชีพ'} name={'getOffice'}>
                  <Input
                    name={'getOffice'}
                    id={'getOffice'}
                    placeholder="สถานที่ประกอบอาชีพ"
                    onChange={(e: any) => {
                      // setOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label={'เลขที่'} name={'getHouseNumberOffice'}>
                  <Input
                    name={'getHouseNumberOffice'}
                    id={'getHouseNumberOffice'}
                    placeholder="เลขที่"
                    onChange={(e: any) => {
                      // setHouseNumberOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label={'หมู่ที่'} name={'getGroupOffice'}>
                  <Input
                    name={'getGroupOffice'}
                    id={'getGroupOffice'}
                    placeholder="#1"
                    onChange={(e: any) => {
                      // setGroupOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตรอก / ซอย'} name={'getAlleyOffice'}>
                  <Input
                    name={'getAlleyOffice'}
                    id={'getAlleyOffice'}
                    placeholder="ตรอก / ซอย"
                    onChange={(e: any) => {
                      // setAlleyOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ถนน'} name={'getRoadOffice'}>
                  <Input
                    name={'getRoadOffice'}
                    id={'getRoadOffice'}
                    placeholder="ถนน"
                    onChange={(e: any) => {
                      // setRoadOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำบล / แขวง'} name={'getSubDistrictOffice'}>
                  <Input
                    name={'getSubDistrictOffice'}
                    id={'getSubDistrictOffice'}
                    placeholder="ตำบล / แขวง"
                    onChange={(e: any) => {
                      // setSubDistrictOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อำเภอ / เขต'} name={'getDistrictOffice'}>
                  <Input
                    name={'getDistrictOffice'}
                    id={'getDistrictOffice'}
                    placeholder="อำเภอ / เขต"
                    onChange={(e: any) => {
                      // setDistrictOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'จังหวัด'} name={'getProvinceOffice'}>
                  <Input
                    name={'getProvinceOffice'}
                    id={'getProvinceOffice'}
                    placeholder="จังหวัด"
                    onChange={(e: any) => {
                      // setProvinceOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'รหัสไปรษณีย์'} name={'getPostalCodeOffice'}>
                  <Input
                    name={'getPostalCodeOffice'}
                    id={'getPostalCodeOffice'}
                    type="number"
                    placeholder="รหัสไปรษณีย์"
                    onChange={(e: any) => {
                      // setPostalCodeOffice(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={'โทรศัพท์สถานที่ประกอบอาชีพ'}
                  name={'getPhoneNumberOffice'}
                >
                  <InputNumber
                    name={'getPhoneNumberOffice'}
                    id={'getPhoneNumberOffice'}
                    onChange={(e: any) => {
                      // setPhoneNumberOffice(e.target.value);
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
                <Form.Item
                  label={'ปัจจุบันข้าพเจ้ามีทรัพย์สิน ดังต่อไปนี้'}
                  name={'getDetail1'}
                >
                  <TextArea
                    name={'getDetail1'}
                    id={'getDetail1'}
                    showCount
                    onChange={(e: any) => {
                      // setDetail1(e.target.value);
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
                  name={'getDetail2'}
                >
                  <TextArea
                    name={'getDetail2'}
                    id={'getDetail2'}
                    onChange={(e: any) => {
                      // setDetail2(e.target.value);
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
                  name={'getDetail3'}
                >
                  <TextArea
                    name={'getDetail3'}
                    id={'getDetail3'}
                    onChange={(e: any) => {
                      // setDetail3(e.target.value);
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
                  name={'getApplyPosition'}
                >
                  <Select
                    // name={'username'}
                    id={'getApplyPosition'}
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
                    onChange={(e: any) => {
                      // setApplyPosition(e);
                    }}
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
                <Form.Item label={'ของสมาคม'} name={'getAssociaton'}>
                  <Input
                    name={'getAssociaton'}
                    id={'getAssociaton'}
                    placeholder="กรอกข้อมูล"
                    onChange={(e: any) => {
                      // setAssociaton(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={'ข้อความเพิ่มเติม (ถ้ามี)'} name={'getOther'}>
                  <TextArea
                    name={'getOther'}
                    id={'getOther'}
                    onChange={(e: any) => {
                      // setOther(e.target.value);
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
            {/* <Row gutter={16} style={{ marginBottom: '20px' }}>
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
            </Row> */}
            <Row
              gutter={16}
              style={{ justifyContent: 'center', display: 'flex' }}
            >
              <Col>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ backgroundColor: '#1E6541' }}
                  // onClick={(e: any) => {
                  //   handleUpdate(e);
                  // }}
                >
                  ยืนยัน
                </Button>
              </Col>
            </Row>
          </Form>
        </ConfigProvider>
      </Modal>
      <Table
        rowKey={(record: any) => record.id}
        columns={columnsTable}
        dataSource={getuserAll}
        scroll={{ x: 'calc(2500px + 50%)' }}
      />
    </>
  );
};
