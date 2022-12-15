import { Button, Table, Popover, Row, Col, Modal, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { DatamanagementService } from '../../../stores/meeting-store';

export interface Props {
  baseURL: string;
}

export const TableAddMember: React.FC = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [getuserAll, setUserAll] = useState<any>([]);

  useEffect(() => {
    dataAll();
  }, []);

  const dataAll = async () => {
    const dataAll = await DatamanagementService().findAll();
    const dataSource: any = await dataAll.map((x: any, row: any) => {
      console.log(row);
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
      };
      // console.log(mapData);

      return mapData;
    });
    console.log(dataAll);
    setUserAll(dataSource);
  };

  const navigate = useNavigate();
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
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
    },
    {
      key: 'course1',
      title: 'หลักสูตร 1',
      width: '5%',
      dataIndex: 'course1',
    },
    {
      key: 'position',
      title: 'ดำรงตำแหน่ง',
      width: '5%',
      dataIndex: 'position',
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
      key: 'no',
      title: 'เลขที่ห้อง',
      width: '5%',
      dataIndex: 'no',
    },
    {
      key: 'no',
      title: 'บ้านเลขที่',
      width: '3%',
      dataIndex: 'no',
    },
    {
      key: 'no',
      title: 'อาคาร/หมู่บ้าน',
      width: '5%',
      dataIndex: 'no',
    },
    {
      key: 'no',
      title: 'ชั้น',
      width: '3%',
      dataIndex: 'no',
    },
    {
      key: 'no',
      title: 'ซอย',
      width: '5%',
      dataIndex: 'no',
    },
    {
      key: 'no',
      title: 'หมู่ที่',
      width: '5%',
      dataIndex: 'no',
    },
    {
      key: 'no',
      title: 'ถนน',
      width: '5%',
      dataIndex: 'no',
    },
    {
      key: 'no',
      title: 'ตำบล/แขวง',
      width: '5%',
      dataIndex: 'no',
    },
    {
      key: 'no',
      title: 'อำเภอ/เขต',
      width: '5%',
      dataIndex: 'no',
    },
    {
      key: 'no',
      title: 'จังหวัด',
      width: '5%',
      dataIndex: 'no',
    },
    {
      key: 'no',
      title: 'รหัสไปรษณีย์',
      width: '5%',
      dataIndex: 'no',
    },
    {
      key: 'active',
      title: 'สถานะ',
      width: '5%',
      dataIndex: 'active',
      render: (e: any, row: any, index: number) => {
        if (e === 'close') {
          return <Badge color="orange" text="Close" />;
        } else if (e === 'active') {
          return <Badge color="green" text="Active" />;
        } else if (e === 'died') {
          return <Badge color="grey" text="Died" />;
        }
      },
    },
    {
      key: 'uuid',
      title: 'Action',
      fixed: 'right',
      width: '3%',
      dataIndex: 'uuid',
      render: (e: any) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Popover
              content={
                <>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Button
                        style={{ width: '100%', border: 'none' }}
                        onClick={() => navigate(`table/edittable`, e)}
                      >
                        Edit
                      </Button>
                    </Col>
                    <Col span={24}>
                      <Button
                        type="primary"
                        style={{ width: '100%', border: 'none' }}
                        danger
                      >
                        Del
                      </Button>
                    </Col>
                  </Row>
                </>
              }
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <MenuOutlined />
            </Popover>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table
        rowKey={(record: any) => record.id}
        columns={columnsTable}
        dataSource={getuserAll}
        scroll={{ x: 'calc(2500px + 50%)' }}
      />
    </>
  );
};
