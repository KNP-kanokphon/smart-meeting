import { Button, Table, Popover, Row, Col, Modal } from 'antd';
import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';

export const TableAddMember: React.FC = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const data = [{ no: 1 }];
  const columnsTable: any = [
    {
      title: 'ลำดับ',
      fixed: 'left',
      width: '3%',
      dataIndex: 'no',
    },
    {
      title: 'คำนำหน้า',
      width: '3%',
      dataIndex: 'no',
    },
    {
      title: 'ชื่อ-นามสกุล',
      width: '9%',
      dataIndex: 'no',
    },
    {
      title: 'หลักสูตร',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'หลักสูตร 1',
      width: '5%',
    },
    {
      title: 'ดำรงตำแหน่ง',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'รุ่น',
      width: '2%',
      dataIndex: 'no',
    },
    {
      title: 'เบอร์โทรศัพท์',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'E-mail',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'เลขที่ห้อง',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'บ้านเลขที่',
      width: '3%',
      dataIndex: 'no',
    },
    {
      title: 'อาคาร/หมู่บ้าน',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'ชั้น',
      width: '3%',
      dataIndex: 'no',
    },
    {
      title: 'ซอย',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'หมู่ที่',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'ถนน',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'ตำบล/แขวง',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'อำเภอ/เขต',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'จังหวัด',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'รหัสไปรษณีย์',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'สถานะ',
      width: '5%',
      dataIndex: 'no',
    },
    {
      title: 'Action',
      fixed: 'right',
      width: '3%',
      dataIndex: 'no',
      render: (e: any) => {
        return (
          <>
            <Popover
              content={
                <>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Button style={{ width: '100%', border: 'none' }}>
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
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        columns={columnsTable}
        dataSource={data}
        scroll={{ x: 'calc(2500px + 50%)' }}
      />
    </>
  );
};
