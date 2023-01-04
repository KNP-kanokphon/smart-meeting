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
  Divider,
  Form,
  Input,
  Select,
  ConfigProvider,
  InputNumber,
} from 'antd';
// import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
// import { MenuOutlined } from '@ant-design/icons';
import { DatamanagementService } from '../../../stores/meeting-store';
// import {
//   EditOutlined,
//   UploadOutlined,
//   ExclamationCircleOutlined,
// } from '@ant-design/icons';
// import type { UploadProps } from 'antd';
// import SignatureCanvas from 'react-signature-canvas';
// import { v4 as uuidv4 } from 'uuid';

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
  const [getuserAll, setUserAll] = useState<any>([]);
  const [getPositionAll, setPositionAll] = useState<any>([]);
  const [getCourseAll, setCourseAll] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [getdataModal, setdatainModal] = useState<any>('');
  const [getdataPosition, setdataPosition] = useState<any>([]);
  const [getnameeng, setnameeng] = useState<any>('');
  // console.log(isModalOpen);

  const { Option } = Select;

  useEffect(() => {
    const dataPosition = async () => {
      const resultDataPosiotion =
        await DatamanagementService().getPositionall();
      const dataPosition = (await resultDataPosiotion.map(
        (e: any, row: any) => {
          const mapData = {
            uuid: e.uuid,
            position: e.nameposition,
          };
          return mapData;
        },
      )) as any;
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
    dataAll();
    dataPosition();
    getListCourse();
  }, []);

  // useEffect(() => {}, [getdataModal]);

  const handleDel = (e: any) => {
    if (e) {
      Modal.confirm({
        title: 'ยืนยันการเปลี่ยนแปลง',
        content: 'คุณต้องการลบข้อมูล ใช่ หรือ ไม่ ?',
        okText: 'ใช่',
        okType: 'danger',
        onOk: async () => {
          const res: any = await DatamanagementService().deleteUser(e);
          if (res) {
            message.success('ลบข้อมูลสำเร็จ');
            dataAll();
            FormAdd.resetFields();
          }
        },
        onCancel: () => {
          FormAdd.resetFields();
        },
      });
    }
  };

  // const checkSplittchar = (e: any) => {
  //   let dataN: any = 0;
  //   dataN += ' ' + e;
  //   return (
  //     <>
  //       <div style={{ whiteSpace: 'pre-line' }}>{dataN}</div>
  //     </>
  //   );
  // };

  const showModal = (e: any) => {
    let datanamePosition: any = '';
    console.log(e);
    if (e) {
      // if (typeof e.position === 'string') {
      //   setdataPosition(e.position);
      // } else if (typeof e.position === 'object') {
      //   e.position.map((x: any) => {
      //     const dataresult = getPositionAll.filter(
      //       (event: any) => event?.uuid === x,
      //     );
      //     dataresult?.map((result: any) => {
      //       // console.log(result);

      //       datanamePosition += ',' + result?.position;
      //     });
      //     // console.log(checkSplittchar(datanamePosition));
      //     // let split = checkSplittchar(datanamePosition);

      //     setdataPosition(datanamePosition);
      //   });
      // }
      setdatainModal(e);
      setIsModalOpen(true);
      FormAdd.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormAdd.resetFields();
  };

  const handleUpdate = (e: any) => {
    // console.log(e);

    const uuid = getdataModal.uuid;
    const data = {
      data: {
        alley:
          e.getAlley === null || e.getAlley === undefined || e.getAlley === ''
            ? ''
            : e.getAlley,
        work_alley:
          e.getAlleyOffice === null ||
          e.getAlleyOffice === undefined ||
          e.getAlleyOffice === ''
            ? ''
            : e.getAlleyOffice,
        position_guild:
          e.getApplyPosition === null ||
          e.getApplyPosition === undefined ||
          e.getApplyPosition === ''
            ? ''
            : e.getApplyPosition,
        guild:
          e.getAssociaton === null ||
          e.getAssociaton === undefined ||
          e.getAssociaton === ''
            ? ''
            : e.getAssociaton,
        work:
          e.getCareer === null ||
          e.getCareer === undefined ||
          e.getCareer === ''
            ? ''
            : e.getCareer,
        course:
          e.getCourse === null ||
          e.getCourse === undefined ||
          e.getCourse === ''
            ? ''
            : e.getCourse,
        course1:
          e.getCourse1 === null ||
          e.getCourse1 === undefined ||
          e.getCourse1 === ''
            ? ''
            : e.getCourse1,
        bridday:
          e.getDOB === null || e.getDOB === undefined || e.getDOB === ''
            ? ''
            : e.getDOB,
        all_assets:
          e.getDetail1 === null ||
          e.getDetail1 === undefined ||
          e.getDetail1 === ''
            ? ''
            : e.getDetail1,
        previous_job:
          e.getDetail2 === null ||
          e.getDetail2 === undefined ||
          e.getDetail2 === ''
            ? ''
            : e.getDetail2,
        criminalcase:
          e.getDetail3 === null ||
          e.getDetail3 === undefined ||
          e.getDetail3 === ''
            ? ''
            : e.getDetail3,
        district:
          e.getDistrict === null ||
          e.getDistrict === undefined ||
          e.getDistrict === ''
            ? ''
            : e.getDistrict,
        work_district:
          e.getDistrictOffice === null ||
          e.getDistrictOffice === undefined ||
          e.getDistrictOffice === ''
            ? ''
            : e.getDistrictOffice,
        email:
          e.getEmail === null || e.getEmail === undefined || e.getEmail === ''
            ? ''
            : e.getEmail,
        model:
          e.getGeneration === null ||
          e.getGeneration === undefined ||
          e.getGeneration === ''
            ? ''
            : e.getGeneration,
        villageno:
          e.getGroup === null || e.getGroup === undefined || e.getGroup === ''
            ? ''
            : e.getGroup,
        work_villageno:
          e.getGroupOffice === null ||
          e.getGroupOffice === undefined ||
          e.getGroupOffice === ''
            ? ''
            : e.getGroupOffice,
        number:
          e.getHouseNumber === null ||
          e.getHouseNumber === undefined ||
          e.getHouseNumber === ''
            ? ''
            : e.getHouseNumber,
        work_number:
          e.getHouseNumberOffice === null ||
          e.getHouseNumberOffice === undefined ||
          e.getHouseNumberOffice === ''
            ? ''
            : e.getHouseNumberOffice,
        idcard:
          e.getIdCard === null ||
          e.getIdCard === undefined ||
          e.getIdCard === ''
            ? ''
            : e.getIdCard,
        certificate:
          e.getImpPassNumber === null ||
          e.getImpPassNumber === undefined ||
          e.getImpPassNumber === ''
            ? ''
            : e.getImpPassNumber,
        username:
          e.getNameLastName === null ||
          e.getNameLastName === undefined ||
          e.getNameLastName === ''
            ? ''
            : e.getNameLastName,
        work_station:
          e.getOffice === null ||
          e.getOffice === undefined ||
          e.getOffice === ''
            ? ''
            : e.getOffice,
        others:
          e.getOther === null || e.getOther === undefined || e.getOther === ''
            ? ''
            : e.getOther,
        passport:
          e.getPassNumber === null ||
          e.getPassNumber === undefined ||
          e.getPassNumber === ''
            ? ''
            : e.getPassNumber,
        phonenumber:
          e.getPhoneNumber === null ||
          e.getPhoneNumber === undefined ||
          e.getPhoneNumber === ''
            ? ''
            : e.getPhoneNumber,
        phone_office:
          e.getPhoneNumberOffice === null ||
          e.getPhoneNumberOffice === undefined ||
          e.getPhoneNumberOffice === ''
            ? ''
            : e.getPhoneNumberOffice,
        position:
          e.getPosition === null ||
          e.getPosition === undefined ||
          e.getPosition === ''
            ? ''
            : e.getPosition,
        job_position:
          e.getPositionCareer === null ||
          e.getPositionCareer === undefined ||
          e.getPositionCareer === ''
            ? ''
            : e.getPositionCareer,
        postalcode:
          e.getPostalCode === null ||
          e.getPostalCode === undefined ||
          e.getPostalCode === ''
            ? ''
            : e.getPostalCode,
        work_postal_code:
          e.getPostalCodeOffice === null ||
          e.getPostalCodeOffice === undefined ||
          e.getPostalCodeOffice === ''
            ? ''
            : e.getPostalCodeOffice,
        province:
          e.getProvince === null ||
          e.getProvince === undefined ||
          e.getProvince === ''
            ? ''
            : e.getProvince,
        work_province:
          e.getProvinceOffice === null ||
          e.getProvinceOffice === undefined ||
          e.getProvinceOffice === ''
            ? ''
            : e.getProvinceOffice,
        road:
          e.getRoad === null || e.getRoad === undefined || e.getRoad === ''
            ? ''
            : e.getRoad,
        work_road:
          e.getRoadOffice === null ||
          e.getRoadOffice === undefined ||
          e.getRoadOffice === ''
            ? ''
            : e.getRoadOffice,
        roomnumber:
          e.getRoomNumber === null ||
          e.getRoomNumber === undefined ||
          e.getRoomNumber === ''
            ? ''
            : e.getRoomNumber,
        salary:
          e.getSalary === null ||
          e.getSalary === undefined ||
          e.getSalary === ''
            ? ''
            : e.getSalary,
        active:
          e.getStatus === null ||
          e.getStatus === undefined ||
          e.getStatus === ''
            ? ''
            : e.getStatus,
        subdistrict:
          e.getSubDistrict === null ||
          e.getSubDistrict === undefined ||
          e.getSubDistrict === ''
            ? ''
            : e.getSubDistrict,
        work_sub_district:
          e.getSubDistrictOffice === null ||
          e.getSubDistrictOffice === undefined ||
          e.getSubDistrictOffice === ''
            ? ''
            : e.getSubDistrictOffice,
        prefix:
          e.getTitle === null || e.getTitle === undefined || e.getTitle === ''
            ? ''
            : e.getTitle,
        bldg:
          e.getVillage === null ||
          e.getVillage === undefined ||
          e.getVillage === ''
            ? ''
            : e.getVillage,
        workpermit:
          e.getWorkDocument === null ||
          e.getWorkDocument === undefined ||
          e.getWorkDocument === ''
            ? ''
            : e.getWorkDocument,
        prefixtitleeng:
          e.title_eng === null ||
          e.title_eng === undefined ||
          e.title_eng === ''
            ? ''
            : e.title_eng,
        remark:
          e.remark === null || e.remark === undefined || e.remark === ''
            ? ''
            : e.remark,
      },
    } as any;
    // if (e) {
    Modal.confirm({
      title: 'ยืนยันการเปลี่ยนแปลง',
      content: 'คุณต้องการ ใช่ หรือ ไม่ ?',
      okText: 'ใช่',
      okType: 'danger',
      onOk: async () => {
        // console.log(uuid);
        // console.log(data);

        const res: any = await DatamanagementService().updateUser(uuid, data);
        if (res) {
          message.success('อัพเดต');
          dataAll();
          setIsModalOpen(false);
          setdatainModal([]);
          FormAdd.resetFields();
        }
      },
      onCancel: () => {
        setdatainModal([]);
        FormAdd.resetFields();
      },
    });
    // }
  };

  const dataAll = async () => {
    const dataAll = await DatamanagementService().findAll();
    const dataSource = await dataAll.map((x: any, row: any) => {
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
        prefixtitleeng: x.prefixtitleeng,
        passport: x.passport,
        certificate: x.certificate,
        workpermit: x.workpermit,
        work: x.work,
        job_position: x.job_position,
        salary: x.salary,
        work_station: x.work_station,
        work_number: x.work_number,
        work_villageno: x.work_villageno,
        work_alley: x.work_alley,
        work_road: x.work_road,
        work_sub_district: x.work_sub_district,
        work_district: x.work_district,
        work_province: x.work_province,
        work_postal_code: x.work_postal_code,
        phone_office: x.phone_office,
        all_assets: x.all_assets,
        previous_job: x.previous_job,
        criminalcase: x.criminalcase,
        position_guild: x.position_guild,
        guild: x.guild,
        others: x.others,
        remark: x.remark,
      } as any;
      return mapData;
    });
    setUserAll([]);
    setUserAll(dataSource);
  };

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
          }
          //  else if (e === 'died') {
          //   return <Badge color="grey" text="Died" />;
          // }
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
      render: (e: any, row: any, index: number) => {
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
                    Delete
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
        onCancel={handleCancel}
        footer={false}
        // closable={false}
      >
        <ConfigProvider locale={configuredLocale}>
          <Form
            autoComplete="off"
            //  layout="vertical"
            name="FormAdd"
            form={FormAdd}
            layout="vertical"
            onFinish={handleUpdate}
            fields={[
              { name: ['getTitle'], value: getdataModal?.prefix },
              { name: ['getStatus'], value: getdataModal?.active },
              { name: ['getNameLastName'], value: getdataModal?.username },
              { name: ['title_eng'], value: getdataModal?.prefixtitleeng },
              { name: ['username_eng'], value: getdataModal?.username_eng },
              { name: ['getIdCard'], value: getdataModal?.idcard },
              { name: ['getDOB'], value: dayjs(getdataModal?.bridday) },
              { name: ['getage'], value: getdataModal?.age },
              { name: ['getPhoneNumber'], value: getdataModal?.phonenumber },
              { name: ['getEmail'], value: getdataModal?.email },
              { name: ['getCourse'], value: getdataModal?.course },
              { name: ['getCourse1'], value: getdataModal?.course1 },
              { name: ['getGeneration'], value: getdataModal?.model },
              { name: ['getPosition'], value: getdataModal?.position },
              { name: ['getHouseNumber'], value: getdataModal?.number },
              { name: ['getRoomNumber'], value: getdataModal?.roomnumber },
              { name: ['getVillage'], value: getdataModal?.bldg },
              { name: ['getGroup'], value: getdataModal?.villageno },
              { name: ['getAlley'], value: getdataModal?.alley },
              { name: ['getRoad'], value: getdataModal?.road },
              { name: ['getSubDistrict'], value: getdataModal?.subdistrict },
              { name: ['getDistrict'], value: getdataModal?.district },
              { name: ['getProvince'], value: getdataModal?.province },
              { name: ['getPostalCode'], value: getdataModal?.postalcode },
              { name: ['getPassNumber'], value: getdataModal?.passport },
              { name: ['getImpPassNumber'], value: getdataModal?.certificate },
              { name: ['getWorkDocument'], value: getdataModal?.workpermit },
              { name: ['getCareer'], value: getdataModal?.work },
              {
                name: ['getPositionCareer'],
                value: getdataModal?.job_position,
              },
              { name: ['getSalary'], value: getdataModal?.salary },
              { name: ['getOffice'], value: getdataModal?.work_station },
              {
                name: ['getHouseNumberOffice'],
                value: getdataModal?.work_number,
              },
              { name: ['getGroupOffice'], value: getdataModal?.work_villageno },
              { name: ['getAlleyOffice'], value: getdataModal?.work_alley },
              { name: ['getRoadOffice'], value: getdataModal?.work_road },
              {
                name: ['getSubDistrictOffice'],
                value: getdataModal?.work_sub_district,
              },
              {
                name: ['getDistrictOffice'],
                value: getdataModal?.work_district,
              },
              {
                name: ['getProvinceOffice'],
                value: getdataModal?.work_province,
              },
              {
                name: ['getPostalCodeOffice'],
                value: getdataModal?.work_postal_code,
              },
              {
                name: ['getPhoneNumberOffice'],
                value: getdataModal?.phone_office,
              },
              { name: ['getDetail1'], value: getdataModal?.all_assets },
              { name: ['getDetail2'], value: getdataModal?.previous_job },
              { name: ['getDetail3'], value: getdataModal?.criminalcase },
              {
                name: ['getApplyPosition'],
                value: getdataModal?.position_guild,
              },
              { name: ['getAssociaton'], value: getdataModal?.guild },
              { name: ['getOther'], value: getdataModal?.others },
              { name: ['remark'], value: getdataModal?.remark },
            ]}
          >
            <Row gutter={16}>
              <Col span={24} style={{ textAlign: 'left' }}>
                <Form.Item label={'Active'} name={'getStatus'}>
                  <Select
                    defaultValue={getdataModal?.active}
                    value={getdataModal?.active}
                    id={'getStatus'}
                    placeholder={'สถานะ'}
                    style={{ width: '20%', textAlign: 'left' }}
                    // onChange={(e: string) => {}}
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
              <Col span={2}>
                <Form.Item label={'คำนำหน้า'} name={'getTitle'}>
                  <Select
                    defaultValue={getdataModal?.prefix}
                    value={getdataModal?.prefix}
                    id={'getTitle'}
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
                <Form.Item label={'ชื่อ-นามสกุล'} name={'getNameLastName'}>
                  <Input
                    defaultValue={getdataModal?.username}
                    // value={getdataModal?.username}
                    // id={'getNameLastName'}
                    name={'getNameLastName'}
                    placeholder="ชื่อ สกุล"
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'คำนำหน้า'} name={'title_eng'} required>
                  <Select
                    defaultValue={getdataModal?.prefixtitleeng}
                    // value={getdataModal?.prefixtitleeng}
                    // id={'title_eng'}
                    placeholder={'เลือกคำนำหน้า'}
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
                    defaultValue={getdataModal?.username_eng}
                    value={getdataModal?.username_eng}
                    name={'username_eng'}
                    placeholder="ชื่อ สกุล"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'เลขบัตรประชาชน'} name={'getIdCard'}>
                  <Input
                    defaultValue={getdataModal?.idcard}
                    value={getdataModal?.idcard}
                    id={'getIdCard'}
                    name={'getIdCard'}
                    placeholder="เลขบัตรประชาชน"
                  />
                </Form.Item>
              </Col>
              {getdataModal?.type === 'member' ? (
                <Col span={6}>
                  <Form.Item label={'วัน-เดือน-ปี'} name={'getDOB'}>
                    <DatePicker
                      defaultValue={dayjs(getdataModal?.bridday)}
                      value={dayjs(getdataModal?.bridday)}
                      name={'getDOB'}
                      id={'getDOB'}
                      format={'DD-MM-BBBB'}
                      style={{ width: '100%' }}
                      // onChange={(e: any) => {
                      //   let date: any = 0;
                      //   date = dayjs(e).format('YYYY-MM-DD');
                      //   // setDOB(date);
                      // }}
                    />
                  </Form.Item>
                </Col>
              ) : (
                <></>
              )}
              {getdataModal?.type === 'member' ? (
                <Col span={2}>
                  <Form.Item label={'อายุ'} name={'getage'}>
                    <Input
                      defaultValue={getdataModal?.age}
                      value={getdataModal?.age}
                      name={'getage'}
                      id={'getage'}
                      placeholder="อายุ"
                    />
                  </Form.Item>
                </Col>
              ) : (
                <></>
              )}
              <Col span={8}>
                <Form.Item label={'หมายเลขโทรศัพท์'} name={'getPhoneNumber'}>
                  <Input
                    defaultValue={getdataModal?.phonenumber}
                    // value={getdataModal?.phonenumber}
                    name={'getPhoneNumber'}
                    id={'getPhoneNumber'}
                    type="phone"
                    placeholder="หมายเลขโทรศัพท์"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อีเมลล์'} name={'getEmail'}>
                  <Input
                    defaultValue={getdataModal?.email}
                    // value={getdataModal?.email}
                    name={'getEmail'}
                    id={'getEmail'}
                    placeholder="อีเมลล์"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'หลักสูตร'} name={'getCourse'}>
                  <Select
                    defaultValue={getdataModal?.course}
                    value={getdataModal?.course}
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
              <Col span={8}>
                <Form.Item label={'หลักสูตร 1'} name={'getCourse1'}>
                  <Select
                    defaultValue={getdataModal?.course1}
                    value={getdataModal?.course1}
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
                <Form.Item label={'รุ่น'} name={'getGeneration'}>
                  <Input
                    defaultValue={getdataModal?.model}
                    value={getdataModal?.model}
                    name={'getGeneration'}
                    id={'getGeneration'}
                    type="number"
                    placeholder="#1"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'ตำแหน่งสมาคม'} name={'getPosition'}>
                  <Select
                    // defaultValue={getdataPosition}
                    // value={getdataPosition}
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
                  >
                    <Option key={''} value={''} disabled>
                      Select
                    </Option>
                    {getPositionAll.map((e: any, row: any) => {
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
                    defaultValue={getdataModal?.number}
                    value={getdataModal?.number}
                    name={'getHouseNumber'}
                    id={'getHouseNumber'}
                    placeholder="บ้านเลขที่"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'เลขที่ห้อง'} name={'getRoomNumber'}>
                  <Input
                    defaultValue={getdataModal?.roomnumber}
                    value={getdataModal?.roomnumber}
                    name={'getRoomNumber'}
                    id={'getRoomNumber'}
                    placeholder="เลขที่ห้อง"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อาคาร / หมู่บ้าน'} name={'getVillage'}>
                  <Input
                    defaultValue={getdataModal?.bldg}
                    value={getdataModal?.bldg}
                    name={'getVillage'}
                    id={'getVillage'}
                    placeholder="อาคาร / หมู่บ้าน"
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item label={'หมู่ที่'} name={'getGroup'}>
                  <Input
                    defaultValue={getdataModal?.villageno}
                    value={getdataModal?.villageno}
                    name={'getGroup'}
                    id={'getGroup'}
                    placeholder="#1"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={'ตรอก / ซอย'} name={'getAlley'}>
                  <Input
                    defaultValue={getdataModal?.alley}
                    value={getdataModal?.alley}
                    name={'getAlley'}
                    id={'getAlley'}
                    placeholder="ตรอก / ซอย"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ถนน'} name={'getRoad'}>
                  <Input
                    defaultValue={getdataModal?.road}
                    value={getdataModal?.road}
                    name={'getRoad'}
                    id={'getRoad'}
                    placeholder="ถนน"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'ตำบล / แขวง'} name={'getSubDistrict'}>
                  <Input
                    defaultValue={getdataModal?.subdistrict}
                    value={getdataModal?.subdistrict}
                    name={'getSubDistrict'}
                    id={'getSubDistrict'}
                    placeholder="ตำบล / แขวง"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'อำเภอ / เขต'} name={'getDistrict'}>
                  <Input
                    defaultValue={getdataModal?.district}
                    value={getdataModal?.district}
                    name={'getDistrict'}
                    id={'getDistrict'}
                    placeholder="อำเภอ / เขต"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'จังหวัด'} name={'getProvince'}>
                  <Input
                    defaultValue={getdataModal?.province}
                    value={getdataModal?.province}
                    name={'getProvince'}
                    id={'getProvince'}
                    placeholder="จังหวัด"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'รหัสไปรษณีย์'} name={'getPostalCode'}>
                  <Input
                    defaultValue={getdataModal?.postalcode}
                    value={getdataModal?.postalcode}
                    name={'getPostalCode'}
                    id={'getPostalCode'}
                    type="number"
                    placeholder="รหัสไปรษณีย์"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label={'Remark'} name={'remark'}>
                  <TextArea
                    defaultValue={getdataModal?.remark}
                    value={getdataModal?.remark}
                    name={'remark'}
                    id={'remark'}
                    placeholder="Remark"
                  />
                </Form.Item>
              </Col>
            </Row>
            {getdataModal?.type === 'member' ? (
              <>
                <Divider />
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label={'กรณีเป็นบุคคลต่างด้าว ถือหนังสือเดินทางเลขที่'}
                      name={'getPassNumber'}
                    >
                      <Input
                        defaultValue={getdataModal?.passport}
                        value={getdataModal?.passport}
                        name={'getPassNumber'}
                        id={'getPassNumber'}
                        placeholder="กรอกข้อมูล"
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
                        defaultValue={getdataModal?.certificate}
                        value={getdataModal?.certificate}
                        name={'getImpPassNumber'}
                        id={'getImpPassNumber'}
                        placeholder="กรอกข้อมูล"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label={'ใบอนุญาตทำงานเลขที่ (ถ้ามี)'}
                      name={'getWorkDocument'}
                    >
                      <Input
                        defaultValue={getdataModal?.workpermit}
                        value={getdataModal?.workpermit}
                        name={'getWorkDocument'}
                        id={'getWorkDocument'}
                        placeholder="กรอกข้อมูล"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label={'ข้าพเจ้าประกอบอาชีพ'} name={'getCareer'}>
                      <Input
                        defaultValue={getdataModal?.work}
                        value={getdataModal?.work}
                        name={'getCareer'}
                        id={'getCareer'}
                        placeholder="ข้าพเจ้าประกอบอาชีพ"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={'ตำแหน่ง'} name={'getPositionCareer'}>
                      <Input
                        defaultValue={getdataModal?.job_position}
                        value={getdataModal?.job_position}
                        name={'getPositionCareer'}
                        id={'getPositionCareer'}
                        placeholder="ตำแหน่ง"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={'รายได้เฉลี่ยเดือนละ'} name={'getSalary'}>
                      <InputNumber
                        defaultValue={Number(getdataModal?.salary)}
                        value={Number(getdataModal?.salary)}
                        name={'getSalary'}
                        id={'getSalary'}
                        style={{ width: '100%' }}
                        formatter={(value: any) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        stringMode
                        parser={(value: any) =>
                          value!.replace(/\$\s?|(,*)/g, '')
                        }
                        placeholder="รายได้เฉลี่ยเดือนละ"
                        addonAfter="บาท"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={'สถานที่ประกอบอาชีพ'} name={'getOffice'}>
                      <Input
                        defaultValue={getdataModal?.work_station}
                        value={getdataModal?.work_station}
                        name={'getOffice'}
                        id={'getOffice'}
                        placeholder="สถานที่ประกอบอาชีพ"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item label={'เลขที่'} name={'getHouseNumberOffice'}>
                      <Input
                        defaultValue={getdataModal?.work_number}
                        value={getdataModal?.work_number}
                        name={'getHouseNumberOffice'}
                        id={'getHouseNumberOffice'}
                        placeholder="เลขที่"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item label={'หมู่ที่'} name={'getGroupOffice'}>
                      <Input
                        defaultValue={getdataModal?.work_villageno}
                        value={getdataModal?.work_villageno}
                        name={'getGroupOffice'}
                        id={'getGroupOffice'}
                        placeholder="#1"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={'ตรอก / ซอย'} name={'getAlleyOffice'}>
                      <Input
                        defaultValue={getdataModal?.work_alley}
                        value={getdataModal?.work_alley}
                        name={'getAlleyOffice'}
                        id={'getAlleyOffice'}
                        placeholder="ตรอก / ซอย"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={'ถนน'} name={'getRoadOffice'}>
                      <Input
                        defaultValue={getdataModal?.work_road}
                        value={getdataModal?.work_road}
                        name={'getRoadOffice'}
                        id={'getRoadOffice'}
                        placeholder="ถนน"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label={'ตำบล / แขวง'}
                      name={'getSubDistrictOffice'}
                    >
                      <Input
                        defaultValue={getdataModal?.work_sub_district}
                        value={getdataModal?.work_sub_district}
                        name={'getSubDistrictOffice'}
                        id={'getSubDistrictOffice'}
                        placeholder="ตำบล / แขวง"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={'อำเภอ / เขต'} name={'getDistrictOffice'}>
                      <Input
                        defaultValue={getdataModal?.work_district}
                        value={getdataModal?.work_district}
                        name={'getDistrictOffice'}
                        id={'getDistrictOffice'}
                        placeholder="อำเภอ / เขต"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={'จังหวัด'} name={'getProvinceOffice'}>
                      <Input
                        defaultValue={getdataModal?.work_province}
                        value={getdataModal?.work_province}
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
                    <Form.Item
                      label={'รหัสไปรษณีย์'}
                      name={'getPostalCodeOffice'}
                    >
                      <Input
                        defaultValue={getdataModal?.work_postal_code}
                        value={getdataModal?.work_postal_code}
                        name={'getPostalCodeOffice'}
                        id={'getPostalCodeOffice'}
                        type="number"
                        placeholder="รหัสไปรษณีย์"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label={'โทรศัพท์สถานที่ประกอบอาชีพ'}
                      name={'getPhoneNumberOffice'}
                    >
                      <InputNumber
                        defaultValue={getdataModal?.phone_office}
                        value={getdataModal?.phone_office}
                        name={'getPhoneNumberOffice'}
                        id={'getPhoneNumberOffice'}
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
                        defaultValue={getdataModal?.all_assets}
                        value={getdataModal?.all_assets}
                        name={'getDetail1'}
                        id={'getDetail1'}
                        showCount
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
                        defaultValue={getdataModal?.previous_job}
                        value={getdataModal?.previous_job}
                        name={'getDetail2'}
                        id={'getDetail2'}
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
                        defaultValue={getdataModal?.criminalcase}
                        value={getdataModal?.criminalcase}
                        name={'getDetail3'}
                        id={'getDetail3'}
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
                        defaultValue={getdataModal?.position_guild}
                        value={getdataModal?.position_guild}
                        // name={'username'}
                        id={'getApplyPosition'}
                        placeholder={
                          'ข้าพเจ้ามีความประสงค์จะเป็น (ตำแหน่งในสมาคม)'
                        }
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
                        defaultValue={getdataModal?.guild}
                        value={getdataModal?.guild}
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
                    <Form.Item
                      label={'ข้อความเพิ่มเติม (ถ้ามี)'}
                      name={'getOther'}
                    >
                      <TextArea
                        defaultValue={getdataModal?.others}
                        value={getdataModal?.others}
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
              </>
            ) : (
              <></>
            )}
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
