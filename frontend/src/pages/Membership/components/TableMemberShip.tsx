import React, { useState, useEffect } from 'react';
import { Card, Row, Typography, Button, Col, Table, Select, Input } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { AlignRightOutlined, MoreOutlined } from '@ant-design/icons';

export const TableMemberShip: React.FC = (): React.ReactElement => {
  const { Option } = Select;
  const { Search } = Input;
  const navigate = useNavigate();
  const [dataResult, setDataResult] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  // interface DataType {
  //   key: React.Key;
  //   id: number;
  //   title: string;
  //   firstname: string;
  //   lastname: string;
  //   phone: string;
  // }
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSearch = (value: string) => console.log(value);

  useEffect(() => {
    async function dataTable() {
      let dataconvert: any = [];
      await dataSourceToday.map((e: any) => {
        dataconvert.push({
          key: e.key,
          id: e.id,
          name: e.title + ' ' + e.firstname + ' ' + e.lastname,
          phone: e.phone,
        });
      });
      await setDataResult(dataconvert);
    }
    dataTable();
  }, []);

  let dataSourceToday: any = [
    {
      key: 1,
      id: '12',
      title: 'นาย',
      firstname: 'กนกพล',
      lastname: 'นะค๊าาาาา',
      phone: '0901585061',
    },
    {
      key: 2,
      id: '13',
      title: 'นาย',
      firstname: 'กนกพล',
      lastname: 'เทส',
      phone: '0901585061',
    },
  ];

  const columnsToday: any = [
    {
      title: 'ลำดับที่',
      dataIndex: 'no',
      fixed: 'left',
    },
    {
      title: 'ชื่อ - นามสกุล',
      dataIndex: 'name',
    },
    {
      title: 'หลักสูตร  ',
      dataIndex: '',
    },
    {
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'phone',
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

  const hasSelected = selectedRowKeys.length > 0;
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
      {/* Test */}
      {/* <Button
        type="primary"
        onClick={start}
        disabled={!hasSelected}
        loading={loading}
      >
        Reload
      </Button>
      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
      </span> */}
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
