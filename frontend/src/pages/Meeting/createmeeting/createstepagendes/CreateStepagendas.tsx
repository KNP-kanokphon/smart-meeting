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
  Tabs,
} from 'antd';
import { useLocation } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DatamanagementService } from '../../../../stores/meeting-store';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CreateStepOne } from './CreateStepOne';
const { TextArea } = Input;
const { Step } = Steps;

type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
};

export const CreateStepagendas: React.FC<Props> = ({ children, extra }) => {
  const defaultPanes = new Array(4).fill(null).map((_, index) => {
    const id = String(index + 1);
    return {
      label: `ระเบียบวาระที่ ${id}`,
      children: <CreateStepOne Pagestep={id} />,
      key: id,
      closable: false,
    };
  });

  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);
  const [newTabIndex, setNewTabIndex] = useState(5);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    const newActiveKey = `ระเบียบวาระที่ ${newTabIndex}`;
    setItems([
      ...items,
      {
        label: `ระเบียบวาระที่ ${newTabIndex}`,
        children: <CreateStepOne Pagestep={String(newTabIndex)} />,
        key: newActiveKey,
        closable: true,
      },
    ]);
    setNewTabIndex(newTabIndex + 1);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: string) => {
    const targetIndex = items.findIndex(pane => pane.key === targetKey);
    const newPanes = items.filter(pane => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setNewTabIndex(newTabIndex - 1);
    setItems(newPanes);
  };

  const onEdit = (e: any, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(e);
    }
  };

  return (
    <Card title="Create Meeting" style={{ width: '100%' }}>
      <Row>
        <Steps size="small" current={1}>
          <Step title="Finished" />
          <Step title="In Progress" />
          <Step title="Waiting" />
        </Steps>
      </Row>
      <br></br>
      <Row style={{ paddingBottom: 20 }}>
        <Button type="dashed" onClick={add}>
          เพิ่มระเบียบวาระ
        </Button>
      </Row>
      {/* <Row gutter={[2, 12]}> */}
      <Tabs
        hideAdd
        tabPosition="left"
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
      {/* </Row> */}
    </Card>
  );
};
