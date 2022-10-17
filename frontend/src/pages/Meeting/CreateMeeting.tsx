import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  TimePicker,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import {
  EditOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import {
  MinusSquareOutlined,
  PlusSquareOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { reportStore } from '../../stores/report-store';
import { MenuItem, menuItems } from '../../configs/menus';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DatamanagementService } from '../../stores/meeting-store';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
const { TextArea } = Input;

type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
};

const { Option } = Select;
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
      title: 'รุ่น',
      dataIndex: 'model',
    },
    {
      key: '6',
      title: 'ตำแหน่งสมาคม',
      dataIndex: 'position',
    },
    {
      key: '7',
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
      phone: '',
      email: '',
      model: '',
      position: '',
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
    if (!title) {
      message.error('โปรดกรอก ขื่อ- เรื่อง');
      return;
    } else if (!room) {
      message.error('โปรดกรอก ห้องประชุม');
      return;
    } else if (!floor) {
      message.error('โปรดกรอก ชั้น');
      return;
    } else if (!building) {
      message.error('โปรดเลือก อาคาร');
      return;
    } else if (!meetingplace) {
      message.error('โปรดกรอก สถานที่ประชุม');
      return;
    } else if (!day) {
      message.error('โปรดกรอก วันที่');
      return;
    } else if (!starttime) {
      message.error('โปรดกรอก เวลาเริ่ม');
      return;
    } else if (!endtime) {
      message.error('โปรดกรอก เวลาสิ้นสุด');
      return;
    } else if (!detail) {
      message.error('โปรดกรอก รายละเอียดการประชุม');
      return;
    }
    const formData = new FormData();
    formData.append('file', fileList[0]);
    const id = uuidv4();
    Modal.confirm({
      title: 'Confirm Create this meeting',
      icon: <ExclamationCircleOutlined />,
      // content: `Link... ${window.origin}/${id}`,
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: async () => {
        await DatamanagementService().import(formData, id);
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
            snack,
          )
          .then(data => {});
        await DatamanagementService()
          .saveuserattendees(dataSource, id)
          .then(data => {});
        window.location.href = 'meeting-list';
      },
      onCancel: () => {},
    });
  };

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
                เพิ่มผู้เข้ารวม
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
            <Col xs={{ span: 20, offset: 2 }} lg={{ span: 22, offset: 2 }}>
              เอกสารภาพประกอบการประชุม
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 20, offset: 2 }} lg={{ span: 22, offset: 2 }}>
              <Upload {...props}>
                <Button
                  disabled={fileList.length === 1}
                  icon={<UploadOutlined />}
                >
                  Select File
                </Button>
              </Upload>
            </Col>
          </Row>
        </Col>
        <br></br>

        <Col span={24}>
          <Row>
            <Col xs={{ span: 20, offset: 2 }} lg={{ span: 22, offset: 2 }}>
              <Checkbox onChange={onChangeDring}>
                จัดเตรียมอาหารว่าง และเครื่องดื่ม
              </Checkbox>
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
              value={editingStudent?.phone}
              onChange={e => {
                setEditingStudent((pre: any) => {
                  return { ...pre, phone: e.target.value };
                });
              }}
            />
            อีเมล
            <Input
              value={editingStudent?.email}
              onChange={e => {
                setEditingStudent((pre: any) => {
                  return { ...pre, email: e.target.value };
                });
              }}
            />
            รุ่น
            <Select
              value={editingStudent?.model}
              style={{ width: '100%' }}
              onChange={e => {
                setEditingStudent((pre: any) => {
                  return { ...pre, model: e };
                });
              }}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
            {/* <Input
              value={editingStudent?.model}
              onChange={e => {
                setEditingStudent((pre: any) => {
                  return { ...pre, model: e.target.value };
                });
              }}
            /> */}
            ตำแหน่งสมาคม ตำแหน่งสมาคม*
            <Select
              value={editingStudent?.position}
              style={{ width: '100%' }}
              onChange={e => {
                setEditingStudent((pre: any) => {
                  return { ...pre, position: e };
                });
              }}
            >
              <Option value="กรรมการบริหาร">กรรมการบริหาร</Option>
              <Option value="เลขาธิการสมาคม">เลขาธิการสมาคม</Option>
              <Option value="รองสมาคม">รองสมาคม</Option>
              <Option value="กรรมการสมาคม">กรรมการสมาคม</Option>
              <Option value="สมาชิกสมาคม">สมาชิกสมาคม</Option>
            </Select>
            {/* <Input
              value={editingStudent?.position}
              onChange={e => {
                setEditingStudent((pre: any) => {
                  return { ...pre, position: e.target.value };
                });
              }}
            /> */}
          </Row>
        </Col>
      </Modal>
    </Card>
  );
};
