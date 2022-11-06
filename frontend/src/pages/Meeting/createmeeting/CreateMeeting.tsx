import {
  Button,
  Card,
  Checkbox,
  Col,
  // Collapse,
  DatePicker,
  Divider,
  // Form,
  Input,
  message,
  Modal,
  // Popconfirm,
  Row,
  Select,
  // Space,
  Steps,
  TimePicker,
  Upload,
} from 'antd';
import './css/style.css';
import {
  //   EditOutlined,
  ExclamationCircleOutlined,
  //   DeleteOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  // MinusSquareOutlined,
  // PlusSquareOutlined,
  UploadOutlined,
} from '@ant-design/icons';
// import { reportStore } from '../../../stores/report-store';
// import { MenuItem, menuItems } from '../../../configs/menus';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DatamanagementService } from '../../../stores/meeting-store';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { TableBoard } from './TableBoard';
import { TableAttendee } from './TableAttendee';
const { TextArea } = Input;

type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
};

const { Step } = Steps;

// const { Option } = Select;
export const CreateMeeting: React.FC<Props> = ({ children, extra }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [floor, setFloor] = useState<string>('');
  const [building, setBuilding] = useState<string>('');
  const [meetingplace, setMeetingplace] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [starttime, setStarttime] = useState<string>('');
  const [endtime, setEndtime] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [snack, setSnack] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any>([]);

  useEffect(() => {
    getListmeeting();
  }, []);

  const getListmeeting = async () => {
    await DatamanagementService()
      .getListmeeting()
      .then(data => {});
  };
  const nextPage = () => {
    navigate(`agendas`);
  };

  // const approveCreate = () => {
  //   if (!title) {
  //     message.error('โปรดกรอก ขื่อ- เรื่อง');
  //     return;
  //   } else if (!room) {
  //     message.error('โปรดกรอก ห้องประชุม');
  //     return;
  //   } else if (!floor) {
  //     message.error('โปรดกรอก ชั้น');
  //     return;
  //   } else if (!building) {
  //     message.error('โปรดเลือก อาคาร');
  //     return;
  //   } else if (!meetingplace) {
  //     message.error('โปรดกรอก สถานที่ประชุม');
  //     return;
  //   } else if (!day) {
  //     message.error('โปรดกรอก วันที่');
  //     return;
  //   } else if (!starttime) {
  //     message.error('โปรดกรอก เวลาเริ่ม');
  //     return;
  //   } else if (!endtime) {
  //     message.error('โปรดกรอก เวลาสิ้นสุด');
  //     return;
  //   } else if (!detail) {
  //     message.error('โปรดกรอก รายละเอียดการประชุม');
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('file', fileList[0]);
  //   const id = uuidv4();
  //   Modal.confirm({
  //     title: 'Confirm Create this meeting',
  //     icon: <ExclamationCircleOutlined />,
  //     // content: `Link... ${window.origin}/${id}`,
  //     okText: 'ยืนยัน',
  //     cancelText: 'ยกเลิก',
  //     onOk: async () => {
  //       // await DatamanagementService().import(formData, id);
  //       // await DatamanagementService()
  //       //   .createmeeting(
  //       //     detail,
  //       //     title,
  //       //     room,
  //       //     floor,
  //       //     building,
  //       //     meetingplace,
  //       //     day,
  //       //     starttime,
  //       //     endtime,
  //       //     id,
  //       //     snack,
  //       //   )
  //       //   .then(data => {});
  //       // await DatamanagementService()
  //       //   .saveuserattendees(dataSourceBoard, id)
  //       //   .then(data => {});
  //     },
  //     onCancel: () => {},
  //   });
  // };

  const onChangeDate = (e: any) => {
    const date = e._d;
    var year = date.toLocaleString('default', { year: 'numeric' });
    var month = date.toLocaleString('default', { month: '2-digit' });
    var day = date.toLocaleString('default', { day: '2-digit' });

    // Generate yyyy-mm-dd date string
    var formattedDate = day + '-' + month + '-' + year;
    setDay(formattedDate);
    // setDay(e._d);
  };
  const onChangeStartTime = (e: any) => {
    const time = e._d;
    const newTime = time.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    setStarttime(newTime);
  };
  const onChangeEndTime = (e: any) => {
    const time = e._d;
    const newTime = time.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    setEndtime(newTime);
  };
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
  const onChangeDring = (e: CheckboxChangeEvent) => {
    setSnack(e.target.checked);
  };
  return (
    <Card title="Create Meeting" style={{ width: '100%' }}>
      <Row>
        <div className="custom-steps" style={{ width: '100%' }}>
          <Steps size="small" current={0}>
            <Step title="In Progress" />
            <Step title="Waiting" />
            <Step title="Waiting" />
          </Steps>
        </div>
      </Row>
      <Row gutter={16}>
        <Col span={24} style={{ marginTop: '20px', marginBottom: '10px' }}>
          <Row gutter={16}>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              เรื่อง
              <Input onChange={(e: any) => setTitle(e.target.value)} />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <Row gutter={16}>
            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              ห้องประชุม
              <Input onChange={(e: any) => setRoom(e.target.value)} />
            </Col>
            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              ชั้น
              <Input onChange={(e: any) => setFloor(e.target.value)} />
            </Col>
            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              อาคาร
              <Input onChange={(e: any) => setBuilding(e.target.value)} />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <Row gutter={16}>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              สถานที่ประชุม
              <Input onChange={(e: any) => setMeetingplace(e.target.value)} />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <Row gutter={16}>
            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              วันที่
              <DatePicker onChange={onChangeDate} style={{ width: '100%' }} />
              {/* <Input onChange={(e: any) => setDay(e.target.value)} /> */}
            </Col>
            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              เวลาเริ่ม
              <TimePicker
                onChange={onChangeStartTime}
                style={{ width: '100%' }}
              />
              {/* <Input onChange={(e: any) => setStarttime(e.target.value)} /> */}
            </Col>
            <Col xs={{ span: 8 }} lg={{ span: 8 }}>
              เวลาสิ้นสุด
              <TimePicker
                onChange={onChangeEndTime}
                style={{ width: '100%' }}
              />
              {/* <Input onChange={(e: any) => setEndtime(e.target.value)} /> */}
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              รายละเอียดการประชุม
              <TextArea
                rows={4}
                onChange={(e: any) => setDetail(e.target.value)}
                showCount
                maxLength={1000}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              เอกสารภาพประกอบการประชุม
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Upload {...props}>
                <Button
                  // disabled={fileList.length === 1}
                  icon={<UploadOutlined />}
                >
                  Click To Upload
                </Button>
              </Upload>
            </Col>
          </Row>
        </Col>
        <Divider />
        {/* <TableBoard /> */}
        <Divider />
        {/* <TableAttendee /> */}
        <Col span={24}>
          <Row>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 24 }}
              style={{ textAlign: 'center' }}
            >
              <br></br>
              <Button
                style={{ color: 'white', background: '#1E6541' }}
                onClick={() => nextPage()}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
