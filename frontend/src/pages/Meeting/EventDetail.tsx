import { Button, Col, Collapse, Form, Row, Space, Typography } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { reportStore } from '../../stores/report-store';
import { MenuItem, menuItems } from '../../configs/menus';

const { Panel } = Collapse;
const { Title } = Typography;

type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
};

export const EventLayout: React.FC<Props> = ({ children, extra }) => {
  return <>aaaa</>;
};
