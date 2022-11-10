import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Typography,
  Button,
  Col,
  Table,
  Select,
  Input,
  Modal,
  Form,
  Space,
  Tooltip,
  message,
} from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import {
  AlignRightOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { DatamanagementService } from '../../../stores/meeting-store';

export const TableMemberShip: React.FC = (): React.ReactElement => {
  const [formEdit] = Form.useForm();
  const { Option } = Select;
  const { Search } = Input;
  const navigate = useNavigate();
  const [dataResult, setDataResult] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>([]);
  const [modalVisible, setmodalVisible] = useState<boolean>(false);

  const [dataUuid, setDataUuid] = useState<any>([]);
  const [dataUsername, setDataUsername] = useState<any>('');
  const [dataPhone, setDataPhone] = useState<string>('');
  const [dataCourse, setDataCourse] = useState<any>([]);
  const [dataPosition, setDataPosition] = useState<any>([]);

  useEffect(() => {
    getListmeeting();
    getListPosition();
    getListCourse();
  }, []);
  async function getListmeeting() {
    await DatamanagementService()
      .getUser()
      .then(async data => {
        // console.log(`data`, data);
        const newData = await data.map((e: any, i: number) => {
          return {
            key: i + 1,
            uuid: e.uuid,
            username: e.username,
            phone: e.phone,
            course: e.course,
            position: e.position,
            positionkpi: e.positionkpi,
          };
        });
        // await setDataUser([]);
        setDataUser(newData);
      });
  }
  const getListPosition = async () => {
    const result = await DatamanagementService()
      .getPositionall()
      .then(async data => {
        const newData = await data.map((e: any, i: number) => {
          return {
            key: i + 1,
            uuid: e.uuid,
            nameposition: e.nameposition,
          };
        });
        setDataPosition(newData);
      });
  };
  const getListCourse = async () => {
    const result = await DatamanagementService()
      .getCourseall()
      .then(async data => {
        console.log(data);

        const newData = await data.map((e: any, i: number) => {
          return {
            key: i + 1,
            uuid: e.uuid,
            namecourse: e.namecourse,
          };
        });
        setDataCourse(newData);
      });
  };
  const handleOpen = () => {
    setmodalVisible(false);
    formEdit.resetFields();
  };

  const handleCancel = () => {
    setmodalVisible(false);
    formEdit.resetFields();
  };

  const handleOK = (e: any) => {
    if (e) {
      Modal.confirm({
        title: 'ยืนยันการเปลี่ยนแปลง',
        icon: <ExclamationCircleOutlined />,
        content: 'คุณต้องการเปลี่ยนแปลงข้อมูล ใช่ หรือ ไม่ ?',
        okText: 'ยืนยัน',
        cancelText: 'ยกเลิก',
        onOk: async () => {
          const data = {
            data: {
              uuid: dataUuid,
              username:
                e.username != undefined || e.username != ''
                  ? e.username
                  : dataUsername,
              phone:
                e.phone != undefined || e.phone != '' ? e.phone : dataPhone,
            },
          };
          await DatamanagementService()
            .updateByid(dataUuid, data)
            .then(() => {
              message.success('บันทึกสำเร็จ');
              setmodalVisible(false);
              formEdit.resetFields();
            });
        },
        onCancel: () => {
          setmodalVisible(false);
          formEdit.resetFields();
        },
      });
    }
  };

  const showModal = async (event: any) => {
    getListPosition();
    getListCourse();
    setmodalVisible(true);
    setDataUuid(event.uuid);
    setDataUsername(event.username);
    setDataPhone(event.phone);
    setDataCourse(event.course);
    setDataPosition(event.position);
  };
  const onSearch = (value: string) => console.log(value);

  const columnsToday: any = [
    {
      title: 'ลำดับที่',
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
    },
    {
      title: 'ชื่อ - นามสกุล',
      key: 'username',
      dataIndex: 'username',
    },

    {
      title: 'เบอร์โทรศัพท์',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'ตำแหน่ง',
      key: 'course',
      dataIndex: 'course',
    },
    {
      title: (
        <>
          <AlignRightOutlined rotate={180} />
        </>
      ),
      dataIndex: 'uuid',
      key: 'uuid',
      fixed: 'right',
      align: 'center',
      render: (text: any, row: any) => {
        if (text) {
          return (
            <div style={{ textAlign: 'center' }}>
              <Tooltip title={'Edit'}>
                <Button
                  style={{ border: 'none' }}
                  onClick={() => {
                    showModal(row);
                  }}
                >
                  <MoreOutlined />
                </Button>
              </Tooltip>
            </div>
          );
        }
      },
    },
  ];
  return (
    <>
      <Modal
        title="แก้ไขข้อมูล"
        open={modalVisible}
        footer={null}
        onOk={handleOpen}
        onCancel={handleCancel}
      >
        <Form
          name="formEdit"
          form={formEdit}
          layout="vertical"
          onFinish={handleOK}
          fields={[
            {
              name: ['username'],
              value: dataUsername,
            },
            {
              name: ['phone'],
              value: dataPhone,
            },
          ]}
        >
          <Form.Item name="username" label={'ชื่อ - นามสกุล'}>
            <Input id="username" name="username" value={dataUsername} />
          </Form.Item>
          <Form.Item name="phone" label={'เบอร์โทรศัพท์'}>
            <Input
              id="phone"
              name="phone"
              placeholder={'Text'}
              value={dataPhone}
              defaultValue={dataPhone}
            />
          </Form.Item>
          <Form.Item label={'ตำแหน่ง'}>
            <Select placeholder="Please Select" mode="multiple" allowClear>
              {dataPosition?.map((x: any, i: number) => {
                return (
                  <Option key={i} value={x.uuid}>
                    {x.nameposition}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {/* <Form.Item label={'ตำแหน่ง'}>
            <Select placeholder="Please Select" mode="multiple" allowClear>
              {dataCourse?.map((x: any, i: number) => {
                return (
                  <Option key={i} value={x.uuid}>
                    {x.namecourse}
                  </Option>
                );
              })}
            </Select>
          </Form.Item> */}
          <Form.Item>
            <div style={{ textAlign: 'right' }}>
              <Space>
                <Button onClick={handleCancel}>ยกเลิก</Button>
                <Button
                  htmlType="submit"
                  style={{ background: '#1E6541', color: 'white' }}
                >
                  ยืนยัน
                </Button>
              </Space>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Card
        style={{ width: '100%', textAlign: 'left', marginBottom: '30px' }}
        title={
          <Row gutter={16} style={{ textAlign: 'right' }}>
            <Col span={4}>
              <Typography
                style={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                รายชื่อคณะกรรมการกลางสมาคมแห่งสถาบันพระปกเกล้า
              </Typography>
            </Col>
            <Col span={20}>
              <Select placeholder={'Filter'} bordered={false}>
                <Option>Filter</Option>
              </Select>
              <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{ width: 'auto' }}
              />
            </Col>
          </Row>
        }
      >
        <Table size="large" dataSource={dataUser} columns={columnsToday} />
      </Card>
    </>
  );
};
