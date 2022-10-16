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
  const [dataTable, setDatatable] = useState<DataType[]>([
    {
      id: 0,
      title: '',
      room: '',
      floor: '',
      building: '',
      meetingplace: '',
      day: new Date(),
      starttime: '',
      endtime: '',
      uuid: '',
      detail: '',
    },
  ]);

  const getListmeeting = async () => {
    await DatamanagementService()
      .getListmeeting()
      .then(data => {
        setDatatable(data);
        console.log(data);
      });
  };
  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'room',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'floor',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'building',
      dataIndex: 'building',
      key: 'building',
    },
    {
      title: 'meetingplace',
      dataIndex: 'meetingplace',
      key: 'meetingplace',
    },
    {
      title: 'day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'starttime',
      dataIndex: 'starttime',
      key: 'starttime',
    },
    {
      title: 'endtime',
      dataIndex: 'endtime',
      key: 'endtime',
    },
    {
      title: 'link',
      dataIndex: 'uuid',
      key: 'uuid',
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
