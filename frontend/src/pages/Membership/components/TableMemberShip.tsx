import React, { useState, useEffect } from 'react';
import { Card, Row, Typography, Button, Col, Table, Select, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AlignRightOutlined, MoreOutlined } from '@ant-design/icons';

export const TableMemberShip: React.FC = (): React.ReactElement => {
  const { Option } = Select;
  const { Search } = Input;
  const navigate = useNavigate();

  const onSearch = (value: string) => console.log(value);

  const dataSourceToday = [
    {
      key: '1',
      id: '12',
      title: 'นาย',
      firstname: 'กนกพล',
      lastname: 'นะค๊าาาาา',
      phone: '0901585061',
    },
    {
      key: '2',
      id: '13',
      title: 'นาย',
      firstname: 'กนกพล',
      lastname: 'นะค๊าาาาา',
      phone: '0901585061',
    },
  ];

  const columnsToday: any = [
    { title: 'ลำดับที่', dataIndex: 'key', width: '5%', fixed: 'left' },
    // { title: 'คำนำหน้า', dataIndex: 'title', width: '7%' },
    { title: 'ชื่อ - นามสกุล', dataIndex: 'firstname', width: '10%' },
    { title: 'หลักสูตร  ', dataIndex: 'lastname', width: '10%' },
    { title: 'เบอร์โทรศัพท์', dataIndex: 'phone', width: '7%' },
    // { title: 'บ้านเลขที่', dataIndex: 'homenumber', width: '7%' },
    // { title: 'อาคาร / หมู่บ้าน', dataIndex: 'village', width: '15%' },
    // { title: 'ชั้น', dataIndex: 'floor', width: '6%' },
    // { title: 'ซอย', dataIndex: 'alley', width: '10%' },
    // { title: 'หมู่ที่', dataIndex: 'group', width: '5%' },
    // { title: 'ถนน', dataIndex: 'road', width: '10%' },
    // {
    //   title: 'ตำบล / แขวง',
    //   dataIndex: 'district',
    //   width: '10%',
    // },
    {
      title: (
        <>
          <AlignRightOutlined rotate={180} />
        </>
      ),
      dataIndex: 'id',
      width: '5%',
      fixed: 'right',
      align: 'center',
      render: (text: any, row: any) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Button style={{ border: 'none' }}>
              <MoreOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card
      style={{ width: '100%', textAlign: 'left', marginBottom: '30px' }}
      title={
        <Row gutter={16} style={{ textAlign: 'right' }}>
          <Col span={4}>
            <Typography
              style={{
                textAlign: 'left',
                // fontSize: '30px',
                fontWeight: 'bold',
                // color: 'grey',
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
      <Table
        size="large"
        dataSource={dataSourceToday}
        columns={columnsToday}
        scroll={{ x: 'calc(1000px + 50%)' }}
      />
    </Card>
  );
};
