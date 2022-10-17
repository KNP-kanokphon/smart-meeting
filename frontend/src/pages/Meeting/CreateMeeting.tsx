import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Space,
  Table,
  TimePicker,
  Typography,
} from 'antd';
import {
  EditOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { reportStore } from '../../stores/report-store';
import { MenuItem, menuItems } from '../../configs/menus';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DatamanagementService } from '../../stores/meeting-store';
const { TextArea } = Input;

type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
};

export const CreateMeeting: React.FC<Props> = ({ children, extra }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>();
  const [dataSource, setDataSource] = useState<any>([]);
  const [title, setTitle] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [floor, setFloor] = useState<string>('');
  const [building, setBuilding] = useState<string>('');
  const [meetingplace, setMeetingplace] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [starttime, setStarttime] = useState<string>('');
  const [endtime, setEndtime] = useState<string>('');
  const [detail, setDetail] = useState<string>('');

  useEffect(() => {
    getListmeeting();
  }, []);

  const getListmeeting = async () => {
    await DatamanagementService()
      .getListmeeting()
      .then(data => {
        // console.log(data);
      });
  };

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'uuid',

      render: (row: any) => {
        return <>{row}</>;
      },
    },
    {
      key: '2',
      title: 'ชื่อ - นามสกุลผู้เข้าร่วมประชุม',
      dataIndex: 'username',
    },
    {
      key: '3',
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'phone',
    },
    {
      key: '4',
      title: 'อีเมล',
      dataIndex: 'email',
    },
    {
      key: '5',
      title: 'Actions',
      render: (record: any) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const handleAdd = () => {
    // const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      username: '',
      email: '',
      phone: '',
      uuid: uuidv4(),
    };
    setDataSource((pre: any) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record: any) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this student record?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        setDataSource((pre: any) => {
          return pre.filter((student: any) => student.uuid !== record.uuid);
        });
      },
    });
  };
  const onEditStudent = (record: any) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  const approveCreate = () => {
    const id = uuidv4();
    Modal.confirm({
      title: 'Confirm Create this meeting',
      icon: <ExclamationCircleOutlined />,
      content: `Link... ${window.origin}/${id}`,
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: async () => {
        await DatamanagementService()
          .createmeeting(
            detail,
            title,
            room,
            floor,
            building,
            meetingplace,
            day,
            starttime,
            endtime,
            id,
          )
          .then(data => {});
        await DatamanagementService()
          .saveuserattendees(dataSource, id)
          .then(data => {});
      },
      onCancel: () => {},
    });
  };

  const onChangeDate = (e: any) => {
    console.log(e);
    const date = e._d;
    var year = date.toLocaleString('default', { year: 'numeric' });
    var month = date.toLocaleString('default', { month: '2-digit' });
    var day = date.toLocaleString('default', { day: '2-digit' });

    // Generate yyyy-mm-dd date string
    var formattedDate = day + '-' + month + '-' + year;
    console.log(formattedDate);
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
  return (
    <Card title="Create Meeting" style={{ width: '100%' }}>
      <Row gutter={[2, 12]}>
        <Col span={24}>
          <Row>
            <Col xs={{ span: 20, offset: 2 }} lg={{ span: 22, offset: 2 }}>
              เรื่อง
              <Input onChange={(e: any) => setTitle(e.target.value)} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              ห้องประชุม
              <Input onChange={(e: any) => setRoom(e.target.value)} />
            </Col>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              ชั้น
              <Input onChange={(e: any) => setFloor(e.target.value)} />
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              อาคาร
              <Input onChange={(e: any) => setBuilding(e.target.value)} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col xs={{ span: 20, offset: 2 }} lg={{ span: 22, offset: 2 }}>
              สถานที่ประชุม
              <Input onChange={(e: any) => setMeetingplace(e.target.value)} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              วันที่
              <DatePicker onChange={onChangeDate} style={{ width: '100%' }} />
              {/* <Input onChange={(e: any) => setDay(e.target.value)} /> */}
            </Col>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              เวลาเริ่ม
              <TimePicker
                onChange={onChangeStartTime}
                style={{ width: '100%' }}
              />
              {/* <Input onChange={(e: any) => setStarttime(e.target.value)} /> */}
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              เวลาสิ้นสุด
              <TimePicker
                onChange={onChangeEndTime}
                style={{ width: '100%' }}
              />
              {/* <Input onChange={(e: any) => setEndtime(e.target.value)} /> */}
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row>
            <Col offset={22} span={2}>
              <Button
                onClick={handleAdd}
                type="primary"
                style={{
                  marginBottom: 16,
                }}
              >
                Add a row
              </Button>
            </Col>
          </Row>

          <Row>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 2 }}>
              <Table
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                rowKey={'uuid'}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col xs={{ span: 20, offset: 2 }} lg={{ span: 22, offset: 2 }}>
              รายละเอียดการประชุม
              <TextArea
                rows={4}
                onChange={(e: any) => setDetail(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              <Button type="primary" onClick={() => approveCreate()}>
                Create Meeting
              </Button>
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title="แก้ใขข้อมูล"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setDataSource((pre: any) => {
            return pre.map((student: any) => {
              if (student.uuid === editingStudent.uuid) {
                return editingStudent;
              } else {
                return student;
              }
            });
          });
          resetEditing();
        }}
      >
        <Col span={24}>
          <Row>
            ชื่อ - นามสกุลผู้เข้าร่วมประชุม
            <Input
              value={editingStudent?.username}
              onChange={e => {
                setEditingStudent((pre: any) => {
                  return { ...pre, username: e.target.value };
                });
              }}
            />
            เบอร์โทรศัพท์
            <Input
              value={editingStudent?.email}
              onChange={e => {
                setEditingStudent((pre: any) => {
                  return { ...pre, email: e.target.value };
                });
              }}
            />
            อีเมล
            <Input
              value={editingStudent?.phone}
              onChange={e => {
                setEditingStudent((pre: any) => {
                  return { ...pre, phone: e.target.value };
                });
              }}
            />
          </Row>
        </Col>
      </Modal>
    </Card>
  );
};
