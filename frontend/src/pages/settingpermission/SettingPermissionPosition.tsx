import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Typography,
  Select,
  Row,
  Col,
  Modal,
  message,
  Tabs,
} from 'antd';
import { DatamanagementService } from '../../stores/meeting-store';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

// import type { InputRef } from 'antd';
// import type { FormInstance } from 'antd/es/form';

interface props {
  Props: any;
}

export const SettingPermissionPosition: React.FC<props> = ({
  Props,
}): React.ReactElement => {
  // console.log(Props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelStatus, setModelStatus] = useState(false);
  const [modelCourse, setModelCourse] = useState(false);
  const [modelEdit, setModelEdit] = useState(false);
  const [modelEditcourse, setModelEditcourse] = useState(false);

  const [dataSourcePosition, setDataSourcePosition] = useState<any>([]);
  const [dataSourceGroup, setDataSourceGroup] = useState<any>([]);
  const [dataSourcecourse, setDataSourcecourse] = useState<any>([]);
  const [dataSourceGroupValue, setDataSourceGroupValue] = useState<any>([]);
  const [newcoursename, setNewcoursename] = useState<any>([]);

  const [namePosition, setDatanamePosition] = useState<string>('');
  const { Option } = Select;
  const [FormAdd] = Form.useForm();
  const [FormEdit] = Form.useForm();
  const [FormCours] = Form.useForm();

  const inputRef = useRef<any>(null);

  useEffect(() => {
    getDataAll();
  }, []);

  const getDataAll = async () => {
    const resultPosition = await DatamanagementService().getPositionall();
    const resultGroup = await DatamanagementService().GroupAlls();
    const resultCourse = await DatamanagementService().CourseAlls();
    setDataSourcePosition(resultPosition);
    setDataSourceGroup(resultGroup);
    setDataSourcecourse(resultCourse);
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
          const res: any = await DatamanagementService().deletePosition(e);
          if (res) {
            message.success('ลบข้อมูลสำเร็จ');
            getDataAll();
            FormAdd.resetFields();
          }
        },
        onCancel: () => {
          FormAdd.resetFields();
        },
      });
    }
  };

  const deletecourse = async (e: any) => {
    Modal.confirm({
      title: 'ยืนยันการเปลี่ยนแปลง',
      content: 'คุณต้องการลบข้อมูล ใช่ หรือ ไม่ ?',
      okText: 'ใช่',
      okType: 'danger',
      onOk: async () => {
        const result = await DatamanagementService().deletecourse(e.uuid);
        if (result) {
          message.success('ลบข้อมูลสำเร็จ');
          window.location.href = `${window.location.origin}/admin/membership/settingprofile`;
        }
      },
      onCancel: () => {},
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalGroup = () => {
    setModelStatus(true);
  };
  const showModalGroupEdit = (e: any) => {
    setDataSourceGroupValue(e);
    setModelEdit(true);
  };

  const handleOk = async (e: any) => {
    if (e.position === undefined || e.position === '') {
      inputRef.current.focus();
      message.warning('กรุณากรอก ตำแหน่ง');
      return true;
    }
    setDatanamePosition(e.position);
    if (e) {
      Modal.confirm({
        title: 'ยืนยันการเปลี่ยนแปลง',
        content: 'คุณต้องการเปลี่ยนแปลงข้อมูล ใช่ หรือ ไม่ ?',
        okText: 'ใช่',
        onOk: async () => {
          const newData: any = [];
          newData.push({
            uuid: uuidv4(),
            nameposition: String(e.position),
            createdate: new Date(),
          });
          await DatamanagementService()
            .importPosition(newData, 1)
            .then((response: any) => {
              // console.log(response);
              message.success('ทำการเพิ่มข้อมูลตำแหน่งสำเร็จ');
              getDataAll();
              FormEdit.resetFields();
              setIsModalOpen(false);
            });
        },
        onCancel: () => {
          FormEdit.resetFields();
        },
      });
    }
  };

  const handleupdate = (e: any) => {
    const data: any = {
      namegroup: e.groupedit,
    };
    Modal.confirm({
      title: 'ยืนยันการเปลี่ยนแปลง',
      content: 'คุณต้องการเปลี่ยนแปลงข้อมูล ใช่ หรือ ไม่ ?',
      okText: 'ใช่',
      onOk: async () => {
        const res: any = await DatamanagementService().updateGroup(
          dataSourceGroupValue.uuidgroup,
          data,
        );
        if (res) {
          message.success('แก้ไขข้อมูลสำเร็จ');
          getDataAll();
          setModelEdit(false);
          FormEdit.resetFields();
        }
      },
      onCancel: () => {
        FormEdit.resetFields();
      },
    });
  };
  const handleDelgroup = (e: any) => {
    if (e) {
      Modal.confirm({
        title: 'ยืนยันการเปลี่ยนแปลง',
        content: 'คุณต้องการลบข้อมูล ใช่ หรือ ไม่ ?',
        okText: 'ใช่',
        okType: 'danger',
        onOk: async () => {
          const res: any = await DatamanagementService().DeleteGroup(e);
          if (res) {
            message.success('ลบข้อมูลสำเร็จ');
            getDataAll();
            setIsModalOpen(false);
            FormEdit.resetFields();
          }
        },
        onCancel: () => {
          FormEdit.resetFields();
        },
      });
    }
  };

  const submitGroup = async (e: any) => {
    let data: any = {
      uuidgroup: uuidv4(),
      namegroup: e.group,
    };
    const result = await DatamanagementService().CreateGroup(data);
    if (result) {
      message.success('ลบข้อมูลสำเร็จ');
      getDataAll();
      setModelStatus(false);
      FormEdit.resetFields();
    }
    setModelStatus(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormAdd.resetFields();
  };

  const cancleModalGroup = () => {
    setModelStatus(false);
  };
  const cancleModalGroupEdit = () => {
    setModelEdit(false);
  };
  const submitCourse = async (e: any) => {
    const data = {
      uuid: uuidv4(),
      namecourse: e.coursename,
    };
    const result = await DatamanagementService().createcourse(data);
    if (result) {
      setModelCourse(false);
      window.location.href = `${window.location.origin}/admin/membership/settingprofile`;
    }
  };
  const showmodeleditcourse = (e: any) => {
    setModelEditcourse(true);
    setNewcoursename((pre: any) => ({
      ...pre,
      ...{ uuid: e.uuid, namecourse: e.namecourse },
    }));
  };
  const submitupdatecourse = async (e: any) => {
    const result = await DatamanagementService().updatecourse(newcoursename);
    if (result) {
      setModelEditcourse(false);
      window.location.href = `${window.location.origin}/admin/membership/settingprofile`;
    }
  };

  const ColumnsPosition: any = [
    {
      title: 'ตำแหน่ง',
      dataIndex: 'uuid',
      width: '75%',
      render: (e: string, row: any, index: number) => {
        return <>{row?.nameposition}</>;
      },
    },
    {
      title: 'วันที่เพิ่ม',
      dataIndex: 'createdate',
      width: '15%',
      render: (e: string, row: any, index: number) => {
        return <>{dayjs(e).add(543, 'year').format('DD-MM-YYYY HH:MM น.')}</>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'uuid',
      width: '10%',
      align: 'center',
      render: (event: number, row: any, index: number) => {
        return (
          <>
            <Row gutter={16}>
              <Col span={24}>
                <Button
                  type="default"
                  style={{
                    border: 'none',
                    color: 'red',
                  }}
                  onClick={() => handleDel(row)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </>
        );
      },
    },
  ];

  const ColumnsGroup: any = [
    {
      title: 'ชื่อกลุ่ม',
      dataIndex: 'namegroup',
      width: '60%',
    },

    {
      title: 'Action',
      dataIndex: 'uuidgroup',
      width: '40%',
      align: 'center',
      render: (event: number, row: any, index: number) => {
        // console.log(row);
        return (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Button
                  type="default"
                  style={{
                    border: 'none',
                    // color: 'red',
                  }}
                  onClick={() => showModalGroupEdit(row)}
                >
                  Edit
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="default"
                  style={{
                    border: 'none',
                    color: 'red',
                  }}
                  onClick={() => handleDelgroup(row)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </>
        );
      },
    },
  ];

  const ColumnsCourse: any = [
    {
      title: 'หลักสูตร',
      dataIndex: 'namecourse',
      width: '60%',
    },
    {
      title: 'แก้ใข',
      dataIndex: 'uuid',
      width: '40%',
      align: 'center',
      render: (event: number, row: any, index: number) => {
        return (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Button
                  type="default"
                  style={{
                    border: 'none',
                    // color: 'red',
                  }}
                  onClick={() => showmodeleditcourse(row)}
                >
                  Edit
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="default"
                  style={{
                    border: 'none',
                    color: 'red',
                  }}
                  onClick={() => deletecourse(row)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Modal
        title="เพิ่มตำแหน่ง"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <>
          <Form
            form={FormAdd}
            layout={'vertical'}
            onFinish={handleOk}
            onChange={showModal}
          >
            <Form.Item label={'ตำแหน่ง'} name="position">
              <Input
                ref={inputRef}
                name="position"
                id="position"
                placeholder="Text"
              />
            </Form.Item>
            <Form.Item>
              <div style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#1E6541',
                    color: 'white',
                  }}
                >
                  ยืนยัน
                </Button>
              </div>
            </Form.Item>
          </Form>
        </>
      </Modal>

      <Modal
        title="เพิ่มกลุ่ม"
        open={modelStatus}
        onCancel={cancleModalGroup}
        footer={false}
      >
        <>
          <Form form={FormEdit} layout={'vertical'} onFinish={submitGroup}>
            <Form.Item label={'กลุ่ม'} name="group">
              <Input name="group" id="group" placeholder="Text" />
            </Form.Item>
            <Form.Item>
              <div style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#1E6541',
                    color: 'white',
                  }}
                >
                  ยืนยัน
                </Button>
              </div>
            </Form.Item>
          </Form>
        </>
      </Modal>

      <Modal
        title="เพิ่มหลักสูตร"
        open={modelCourse}
        onCancel={() => setModelCourse(false)}
        footer={false}
      >
        <>
          <Form
            form={FormCours}
            layout={'vertical'}
            onFinish={submitCourse}
            // initialValues={{ groupedit: dataSourceGroupValue.namegroup }}
          >
            <Form.Item label={'หลักสูตร'} name="coursename">
              <Input placeholder="Text" />
            </Form.Item>
            <Form.Item>
              <div style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#1E6541',
                    color: 'white',
                  }}
                >
                  ยืนยัน
                </Button>
              </div>
            </Form.Item>
          </Form>
        </>
      </Modal>

      <Modal
        title="แก้ไขกลุ่ม"
        open={modelEdit}
        onCancel={cancleModalGroupEdit}
        footer={false}
      >
        <>
          <Form
            form={FormEdit}
            layout={'vertical'}
            onFinish={handleupdate}
            initialValues={{ groupedit: dataSourceGroupValue.namegroup }}
          >
            <Form.Item label={'กลุ่ม'} name="groupedit">
              <Input name="groupedit" id="groupedit" placeholder="Text" />
            </Form.Item>
            <Form.Item>
              <div style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#1E6541',
                    color: 'white',
                  }}
                >
                  ยืนยัน
                </Button>
              </div>
            </Form.Item>
          </Form>
        </>
      </Modal>

      <Modal
        title="แก้ไขหลักสูตร"
        open={modelEditcourse}
        onCancel={() => setModelEditcourse(false)}
        // footer={false}
        onOk={submitupdatecourse}
      >
        <Input
          value={newcoursename?.namecourse}
          placeholder="Text"
          onChange={e =>
            setNewcoursename((pre: any) => ({
              ...pre,
              ...{ namecourse: e.target.value },
            }))
          }
        />
      </Modal>

      <Card style={{ borderRadius: '10px', marginTop: '20px' }}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="ตำแหน่ง" key="1">
            <div>
              <Button
                onClick={showModal}
                // type="primary"
                style={{
                  marginBottom: 16,
                  backgroundColor: '#1E6541',
                }}
              >
                <Typography style={{ color: 'white' }}>
                  {'เพิ่มตำแหน่ง'}
                </Typography>
              </Button>
              <Table
                bordered
                dataSource={dataSourcePosition}
                columns={ColumnsPosition}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="กลุ่ม" key="2">
            <div>
              <Button
                onClick={showModalGroup}
                style={{
                  marginBottom: 16,
                  backgroundColor: '#1E6541',
                }}
              >
                <Typography style={{ color: 'white' }}>
                  {'เพิ่มกลุ่ม'}
                </Typography>
              </Button>
              <Table
                bordered
                dataSource={dataSourceGroup}
                columns={ColumnsGroup}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="หลักสูตร" key="3">
            <div>
              <Button
                onClick={() => setModelCourse(true)}
                style={{
                  marginBottom: 16,
                  backgroundColor: '#1E6541',
                }}
              >
                <Typography style={{ color: 'white' }}>
                  {'เพิ่มหลักสูตร'}
                </Typography>
              </Button>
              <Table
                bordered
                dataSource={dataSourcecourse}
                columns={ColumnsCourse}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
};
