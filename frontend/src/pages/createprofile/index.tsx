import React, { useState, useRef, useEffect } from 'react';
import {
  AntDesignOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Button,
  Result,
  Form,
  Input,
  Checkbox,
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Modal,
  Spin,
} from 'antd';
import { DatamanagementService } from '../../stores/meeting-store';
import { useId24 } from '../../drivers/id24/Id24Provider';
import { SettingProfile } from './settingprofile';

const { Title } = Typography;
const { confirm } = Modal;

export const MainSettingProfile: React.FC<{}> = (): React.ReactElement => {
  const [loading, setLoading] = useState(true);
  const [syncdata, setSyncdata] = useState('');
  const { authenticated, login, logout, id24Axios } = useId24();
  const apiBaseUrl = id24Axios(window.location.origin);

  useEffect(() => {
    checkprofile().then((data: any) => {
      setSyncdata(data?.data);
      setLoading(false);
    });
  }, []);
  const checkprofile = async () => {
    return new Promise(async (resolve, reject) => {
      resolve(await apiBaseUrl.post(`/user/shrinkdata`));
    });
  };
  return loading ? (
    <Spin spinning={true}></Spin>
  ) : (
    <>
      <Card style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}>
        <Title style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
          ตั่งค่าโปรไฟล์
        </Title>
      </Card>
      <SettingProfile dataprofile={syncdata} />
    </>
  );
};
