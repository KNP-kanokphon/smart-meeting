import { Button, Col, Input, Modal, Row, Select, Table } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DatamanagementService } from '../../../stores/meeting-store';
type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
  onChangeSetItemFiledAtt: (filedList: any) => void;
};
const { Option } = Select;

export const TableAttendee: React.FC<Props> = ({
  children,
  extra,
  onChangeSetItemFiledAtt,
}) => {
  const [dataSourceAttendee, setDataSourceAttendee] = useState<any>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>();
  const [username, setUsername] = useState<any>([]);

  useEffect(() => {
    onChangeSetItemFiledAtt(dataSourceAttendee);
  }, [dataSourceAttendee]);

  const handleAdd = () => {
    // const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      username: '',
      uuidprofile: '',
      type_user: 'previous',
      uuid: uuidv4(),
      position: '',
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
  const onEditStudent = async (record: any) => {
    const resual = await DatamanagementService().getUser();
    const newresult = resual.filter((e: any) => {
      if (e.type !== '1') {
        return e;
      }
    });
    setUsername(newresult);
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
      width: '80%',
    },
    {
      key: '7',
      title: 'Actions',
      width: '20%',

      render: (record: any) => {
        return (
          <>
            <Row gutter={16}>
              <Col span={12} style={{ textAlign: 'right' }}>
                <EditOutlined
                  onClick={() => {
                    onEditStudent(record);
                  }}
                />
              </Col>
              <Col span={12} style={{ textAlign: 'left' }}>
                <DeleteOutlined
                  onClick={() => {
                    onDeleteStudent(record);
                  }}
                  style={{ color: 'red' }}
                />
              </Col>
            </Row>
          </>
        );
      },
    },
  ];
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

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
                color: 'white',
                background: '#1E6541',
              }}
            >
              <PlusOutlined />
              เพิ่มผู้เข้าร่วม
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
          ชื่อ - นามสกุลผู้เข้าร่วมประชุม
          <Select
            showSearch
            value={editingStudent?.username}
            style={{ width: '100%' }}
            onSearch={onSearch}
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            onChange={(e: any, dataAll: any) => {
              const matchuser = username.find(
                (x: any) => x.username === dataAll.children,
              );
              setEditingStudent((pre: any) => {
                return { ...pre, uuidprofile: dataAll.value };
              });
              setEditingStudent((pre: any) => {
                return { ...pre, username: dataAll.children };
              });
              setEditingStudent((pre: any) => {
                return { ...pre, position: matchuser.position };
              });
            }}
          >
            {username.map((e: any, i: number) => {
              return (
                <Option key={i} value={e.uuid}>
                  {e.username}
                </Option>
              );
            })}
          </Select>
          {/* <Row>
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
          </Row> */}
        </Col>
      </Modal>
    </>
  );
};
