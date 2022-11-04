import React, { useState, useEffect } from 'react';
import { Card, Row, Typography, Button, Col, Table, Select, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AlignRightOutlined, MoreOutlined } from '@ant-design/icons';

export const TableMemberShip: React.FC = (): React.ReactElement => {
  const { Option } = Select;
  const { Search } = Input;
  const navigate = useNavigate();
  const [dataResult, setDataResult] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSearch = (value: string) => console.log(value);

  useEffect(() => {
    async function dataTable() {
      let dataconvert: any = [];
      await dataSourceToday.map((e: any) => {
        index:;
        dataconvert.push({
          no: e.key,
          id: e.id,
          name: e.title + ' ' + e.firstname + ' ' + e.lastname,
          phone: e.phone,
        });
      });
      console.log(dataconvert);

      await setDataResult(dataconvert);
    }
    dataTable();
  }, []);

  let dataSourceToday: any = [
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
    {
      title: 'ลำดับที่',
      dataIndex: 'no',
      // width: '2%',
      fixed: 'left',
    },
    {
      title: 'ชื่อ - นามสกุล',
      dataIndex: 'name',
      // width: '10%'
    },
    {
      title: 'หลักสูตร  ',
      dataIndex: '',
      // width: '5%'
    },
    {
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'phone',
      //  width: '5%'
    },
    {
      title: (
        <>
          <AlignRightOutlined rotate={180} />
        </>
      ),
      dataIndex: 'id',
      // width: '2%',
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
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
      <Table
        size="large"
        rowSelection={rowSelection}
        dataSource={dataResult}
        columns={columnsToday}
        // scroll={{ x: 'calc(600px + 50%)' }}
      />
    </Card>
  );
};
