import { Button, Card, Input, Row, Steps, Tabs } from 'antd';
import './styles.css';
import React, { useEffect, useState } from 'react';
import { DetailList } from './components/detailList';
const { TextArea } = Input;
const { Step } = Steps;

type Props = {
  setDataField: (dataField: any) => void;
  children?: React.ReactNode;
  extra?: React.ReactNode;
};

const initialIndexValue = 1;

export const DetailPage: React.FC<Props> = ({
  setDataField,
  children,
  extra,
}) => {
  const [newTabIndex, setNewTabIndex] = useState(initialIndexValue + 1);
  const [itemFiled, setItemFiled] = useState<any>([]);

  const onChangeSetItemFiled = async (filedList: any) => {
    setItemFiled([...itemFiled, filedList]);
    setDataField([...itemFiled, filedList]);
  };

  useEffect(() => {}, [itemFiled]);

  const defaultPanes = new Array(initialIndexValue)
    .fill(null)
    .map((_, index) => {
      const id: any = String(index + 1);
      return {
        label: `ระเบียบวาระที่ ${id}`,
        children: (
          <DetailList
            Pagestep={id}
            onChangeSetItemFiled={onChangeSetItemFiled}
          />
        ),
        key: id,
        closable: false,
      };
    });

  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    const newActiveKey = `ระเบียบวาระที่ ${newTabIndex}`;
    setItems((pre: any) => [
      ...pre,
      {
        label: `ระเบียบวาระที่ ${newTabIndex}`,
        children: (
          <DetailList
            Pagestep={String(newTabIndex)}
            onChangeSetItemFiled={onChangeSetItemFiled}
          />
        ),
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
    <Card style={{ width: '100%' }}>
      <Row style={{ paddingBottom: 20 }}>
        <Button type="dashed" onClick={add}>
          เพิ่มระเบียบวาระ
        </Button>
      </Row>
      <Tabs
        hideAdd
        tabPosition="left"
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
    </Card>
  );
};
