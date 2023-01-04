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
  const [dataSource, setDataSource] = useState<any>([]);
  const [namePosition, setDatanamePosition] = useState<string>('');
  const { Option } = Select;
  const [FormAdd] = Form.useForm();
  const inputRef = useRef<any>(null);

  useEffect(() => {
    getDataAll();
  }, []);

  const getDataAll = async () => {
    const result = (await DatamanagementService().getPositionall()) as any;
    setDataSource(result);
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

  const showModal = () => {
    setIsModalOpen(true);
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
              FormAdd.resetFields();
              setIsModalOpen(false);
            });
        },
        onCancel: () => {
          // FormAdd.resetFields();
        },
      });
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    FormAdd.resetFields();
  };
  const defaultColumns: any = [
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
        // console.log(row);

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
      <Card
        title={'ตำแหน่ง'}
        style={{ borderRadius: '10px', marginTop: '20px' }}
      >
        <div>
          <Button
            onClick={showModal}
            type="primary"
            style={{
              marginBottom: 16,
              backgroundColor: '#1E6541',
            }}
          >
            <Typography style={{ color: 'white' }}>{'เพิ่มตำแหน่ง'}</Typography>
          </Button>
          <Table bordered dataSource={dataSource} columns={defaultColumns} />
        </div>
      </Card>
    </>
  );
};
