import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Menu,
  MenuProps,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Steps,
  Table,
  TimePicker,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import { useLocation } from 'react-router-dom';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DatamanagementService } from '../../../../stores/meeting-store';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CreateStepagendas } from './CreateStepagendas';

const { Step } = Steps;

type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
};

export const CreateStepagendasIndex: React.FC<Props> = ({
  children,
  extra,
}) => {
  return <>{<CreateStepagendas />}</>;
};
