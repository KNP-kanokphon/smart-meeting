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
} from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { AlignRightOutlined, MoreOutlined } from '@ant-design/icons';

export const TableMemberShip: React.FC = (): React.ReactElement => {
  const { Option } = Select;
  const { Search } = Input;
  const navigate = useNavigate();
  const [dataResult, setDataResult] = useState<any>([]);
  const [modalVisible, setmodalVisible] = useState<boolean>(false);

  const showModal = () => {
    setmodalVisible(true);
  };

  const handleOpen = () => {
    setmodalVisible(false);
  };

  const handleOK = () => {
    setmodalVisible(false);
  };

  const handleCancel = () => {
    setmodalVisible(false);
  };

  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const [loading, setLoading] = useState(false);

  // interface DataType {
  //   key: React.Key;
  //   id: number;
  //   title: string;
  //   firstname: string;
  //   lastname: string;
  //   phone: string;
  // }
  // const start = () => {
  //   setLoading(true);
  //   // ajax request after empty completing
  //   setTimeout(() => {
  //     setSelectedRowKeys([]);
  //     setLoading(false);
  //   }, 1000);
  // };

  const onSearch = (value: string) => console.log(value);

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

  const columnsToday: any = [
    {
      title: 'ลำดับที่',
      dataIndex: 'key',
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
            <Tooltip title={'Edit'}>
              <Button style={{ border: 'none' }} onClick={showModal}>
                <MoreOutlined />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  // const hasSelected = selectedRowKeys.length > 0;
  return (
    <>
      <Modal
        title="แก้ไขข้อมูล"
        open={modalVisible}
        footer={null}
        onOk={handleOpen}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label={'คำนำหน้า'}>
            <Select placeholder="Text">
              <Option key={0} value={'m'}>
                นาย
              </Option>
              <Option key={1} value={'f'}>
                นางสาว
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label={'ชื่อ'}>
            <Input placeholder={'Text'} />
          </Form.Item>
          <Form.Item label={'สกุล'}>
            <Input placeholder={'Text'} />
          </Form.Item>
          <Form.Item label={'เบอร์โทรศัพท์'}>
            <Input placeholder={'Text'} />
          </Form.Item>
          <Form.Item label={'หลักสูตร'}>
            <Select placeholder="Please Select" allowClear>
              <Option key={0} value={'manager'}>
                นายกสมาคม
              </Option>
              <Option key={1} value={'assistant_manager'}>
                นายกกิติมศักดิ์และประธานฝ่ายกิจกรรมสาธารณะประโยชน์
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label={'ตำแหน่ง'}>
            <Select placeholder="Please Select" allowClear>
              <Option key={0} value={'aec1'}>
                AEC.10
              </Option>
              <Option key={1} value={'tag10'}>
                ที.เอ.จี.10
              </Option>
              <Option key={2} value={'tag1'}>
                ที.เอ.จี.1
              </Option>
              <Option key={1} value={'tag2'}>
                ที.เอ.จี.2
              </Option>
              <Option key={1} value={'tag3'}>
                ที.เอ.จี.3
              </Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: 'right' }}>
              <Space>
                <Button onClick={handleCancel}>ยกเลิก</Button>
                <Button
                  onClick={handleOK}
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
          // rowSelection={rowSelection}
          dataSource={dataResult}
          columns={columnsToday}
          // scroll={{ x: 'calc(600px + 50%)' }}
        />
      </Card>
    </>
  );
};
