import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Modal,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { reportStore } from '../../../stores/report-store';
import { MenuItem, menuItems } from '../../../configs/menus';
import Table, { ColumnsType } from 'antd/lib/table';
import { DatamanagementService } from '../../../stores/meeting-store';
import QRCode from 'qrcode.react';

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
interface DetailinmodelType {
  id: number;
  username: string;
  phone: string;
  email: string;
  model: string;
  position: string;
  uuid: string;
  idmeeting: string;
  checkin: boolean;
}

export const DetailMeeting: React.FC<Props> = ({ children, extra }) => {
  useEffect(() => {
    getListmeeting();
  }, []);

  const navigate = useNavigate();
  const [dataTable, setDatatable] = useState();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [dataDetailinmodel, setDataDetailinmodel] = useState<
    DetailinmodelType[]
  >([]);
  const getListmeeting = async () => {
    const data = await DatamanagementService().getListmeeting();
    setDatatable(data);
  };
  const onclickDetail = async (text: any) => {
    const data = await DatamanagementService().getuserInroom(text);
    setDataDetailinmodel(data);
    setShowDetail(true);
  };

  return (
    <>
      <Card title="Create Meeting" style={{ width: '100%' }}>
        AAA
      </Card>
    </>
  );
};
