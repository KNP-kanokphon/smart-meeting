import { Button, Card, Input, Row, Steps, Tabs } from 'antd';
import './styles.css';
import React, { useEffect, useState } from 'react';
import { DetailList } from './components/detailList';
import { DatamanagementService } from '../../../stores/meeting-store';
import { result } from 'lodash';
import { numberFormat } from '../../../utils';
const { TextArea } = Input;
const { Step } = Steps;

type Props = {
  setDataField: (dataField: any) => void;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  data?:any;
  agenda:any;
  nameFilesummary:any;
};

const initialIndexValue = 0;

export const DetailPage: React.FC<Props> = ({
  setDataField,
  children,
  extra,
  data,
  agenda,
  nameFilesummary
}) => {
  const [newTabIndex, setNewTabIndex] = useState(initialIndexValue + 1);
  const [itemFiled, setItemFiled] = useState<any>([]);
  // const [fileList, setFileList] = useState<any>([]);
  const onChangeSetItemFiled = (filedList: any) => {
    console.log(itemFiled,'itemFiled');
    
    console.log(...itemFiled,'dotdotitemFiled');
    
    setItemFiled([...itemFiled, filedList]);
    setDataField([...itemFiled, filedList]);
  };

  useEffect(() => {}, [itemFiled]);
  useEffect(()=>{
    const newfileAgenda:any = []
    nameFilesummary?.map((x:any,y:any)=>{
      if(x.type === "fileAgenda"){
        newfileAgenda.push({...x,name:x.namefile,uid:y})
        // return {...x,name:x.namefile,uid:y}
      }
    })

    
    // console.log(agenda,'agendaagenda');
    if(agenda){
    Promise.all(agenda?.map(async (item:any,key:any)=>{
      // console.log(item,'item');
      const resultDetailagenda =  await DatamanagementService().getDetailagenda(
        item.uuid,
        item.step,
      );
      console.log(resultDetailagenda,'resultDetailagenda');
      const file = newfileAgenda.filter((file:any) => Number(file.step) === key)

      return {
        label: `ระเบียบวาระที่ ${key+1}`,
        children: (
          <DetailList
            Pagestep={key+1}
            onChangeSetItemFiled={onChangeSetItemFiled}
            item={item}
            resultDetailagenda={resultDetailagenda}
            file={file}
          />
        ),
        key: key+1,
        closable: true,
      };

    })).then((result)=>{
      setItems(result)
    setNewTabIndex((result?.length)+1)
    })
  }
    // Promise.all(itemfortabs).then((result)=>{
    //   setItems(result)
    // setNewTabIndex((result?.length)+1)
    // })
    // setItems(itemfortabs)
    // setNewTabIndex((itemfortabs?.length)+1)
    
  },[nameFilesummary,agenda])
  const defaultPanes = new Array(initialIndexValue)
    // .fill(null)
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

  const [activeKey, setActiveKey] = useState<any>();
  const [items, setItems] = useState<typeof defaultPanes>([]);

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
