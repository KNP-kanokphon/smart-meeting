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
import { reportStore } from '../../stores/report-store';
import { MenuItem, menuItems } from '../../configs/menus';
import Table, { ColumnsType } from 'antd/lib/table';
import { DatamanagementService } from '../../stores/meeting-store';
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

export const ListLayout: React.FC<Props> = ({ children, extra }) => {
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
    {
      title: 'Action',
      dataIndex: 'uuid',
      key: 'uuid',
      ellipsis: true,
      width: 150,
      render: (text: any) => {
        return <Button onClick={() => onclickDetail(text)}>Detail</Button>;
      },
    },
  ];
  const downloadQRCode = (username: any) => {
    const canvas: any = document.getElementById('qr-gen');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${username}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const columnsInmodal = [
    {
      title: 'ชื่อ',
      dataIndex: 'username',
      key: 'username',
      ellipsis: true,
      width: 150,
    },
    {
      title: 'รุ่น',
      dataIndex: 'model',
      key: 'model',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'ตำแหน่งสมาคม',
      dataIndex: 'position',
      key: 'position',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'QR-CODE',
      dataIndex: 'uuid',
      key: 'uuid',
      width: 200,
      ellipsis: true,
      render: (text: any, data: any) => {
        return (
          <>
            <Row>
              <Col span={16}>
                <QRCode
                  id="qr-gen"
                  size={100}
                  value={`${window.location.host}/profileDetail/${data.idmeeting}/${text}`}
                />
              </Col>
              <Col>
                <Button onClick={() => downloadQRCode(data.username)}>
                  dowloads
                </Button>
              </Col>
            </Row>

            {/* <Row>
              <Col span={8}></Col>
              <Col span={8}>
                <Button onClick={downloadQRCode}>dowloads</Button>
              </Col>
              <Col span={8}></Col>
            </Row> */}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Card title="Create Meeting" style={{ width: '100%' }}>
        <Table columns={columns} dataSource={dataTable} rowKey={'uuid'} />
      </Card>
      <Modal
        title="รายชื่อผู้เข้าร่วม"
        centered
        visible={showDetail}
        onOk={() => setShowDetail(false)}
        onCancel={() => setShowDetail(false)}
        width={1000}
      >
        <Table
          columns={columnsInmodal}
          dataSource={dataDetailinmodel}
          rowKey={'uuid'}
        />
      </Modal>
    </>
  );
};
