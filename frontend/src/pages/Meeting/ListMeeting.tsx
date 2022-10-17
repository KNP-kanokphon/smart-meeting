import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { reportStore } from '../../stores/report-store';
import { MenuItem, menuItems } from '../../configs/menus';
import Table, { ColumnsType } from 'antd/lib/table';
import { DatamanagementService } from '../../stores/meeting-store';

const { Panel } = Collapse;
const { Title } = Typography;

type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
};

interface DataType {
  id: number;
  title: string;
  room: string;
  floor: string;
  building: string;
  meetingplace: string;
  day: Date;
  starttime: string;
  endtime: string;
  uuid: string;
  detail: string;
}
export const ListLayout: React.FC<Props> = ({ children, extra }) => {
  useEffect(() => {
    getListmeeting();
  }, []);
  const [dataTable, setDatatable] = useState();

  const getListmeeting = async () => {
    const data = await DatamanagementService().getListmeeting();
    setDatatable(data);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
      ellipsis: true,
    },
    {
      title: 'Link',
      dataIndex: 'uuid',
      key: 'uuid',
      ellipsis: true,
      render: (text: any) => {
        return <Tag> {`${window.origin}/detail/${text}`}</Tag>;
      },
    },
  ];

  return (
    <>
      <Card title="Create Meeting" style={{ width: '100%' }}>
        <Table columns={columns} dataSource={dataTable} rowKey={'uuid'} />
      </Card>
    </>
  );
};
