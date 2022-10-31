import { Button, Col, Input, Modal, Row, Select, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
};
const { Option } = Select;

export const TableAttendee: React.FC<Props> = ({ children, extra }) => {
  const [dataSourceAttendee, setDataSourceAttendee] = useState<any>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>();

  const handleAdd = () => {
    // const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      username: '',
      position: '',
      course: '',
      phone: '',
      uuid: uuidv4(),
    };
    setDataSourceAttendee((pre: any) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record: any) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this student record?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        setDataSourceAttendee((pre: any) => {
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
  const columnsAttendee = [
    {
      key: '1',
      title: 'ชื่อ - นามสกุลผู้เข้าร่วมประชุม',
      dataIndex: 'username',
    },
    {
      key: '2',
      title: 'ตำแหน่งสมาคม',
      dataIndex: 'position',
    },
    {
      key: '3',
      title: 'หลักสูตร',
      dataIndex: 'course',
    },
    {
      key: '4',
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'phone',
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

  return (
    <>
      <Col span={24}>
        <Row>
          {/* <Col style={{ textAlign: 'left' }} offset={2} span={20}></Col> */}
          <Col span={2}>
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
        <Table
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSourceAttendee}
          columns={columnsAttendee}
          pagination={false}
          rowKey={'uuid'}
        />
        <Row>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 2 }}></Col>
        </Row>
      </Col>
      <Modal
        title="แก้ใขข้อมูล"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setDataSourceAttendee((pre: any) => {
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
            ตำแหน่งสมาคม
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
            หลักสูตร
            <Select
              value={editingStudent?.course}
              style={{ width: '100%' }}
              onChange={e => {
                setEditingStudent((pre: any) => {
                  return { ...pre, course: e };
                });
              }}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
            เบอร์โทรศัพท์
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
    </>
  );
};
