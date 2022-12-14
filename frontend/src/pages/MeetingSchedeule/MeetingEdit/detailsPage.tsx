import { Button, Card, Input, Row, Steps, Tabs } from 'antd';
import './styles.css';
import React, { useEffect, useState } from 'react';
import { DetailListedit } from './components/detailListedit';
import { DatamanagementService } from '../../../stores/meeting-store';
import { find, result } from 'lodash';
import { numberFormat } from '../../../utils';
import { DetailList } from './components/detailList';
const { TextArea } = Input;
const { Step } = Steps;

type Props = {
  setDataField: (dataField: any) => void;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  data?: any;
  agenda: any;
  nameFilesummary: any;
  id: any;
};

const initialIndexValue = 0;

export const DetailPage: React.FC<Props> = ({
  setDataField,
  children,
  extra,
  data,
  agenda,
  nameFilesummary,
  id,
}) => {
  const [newTabIndex, setNewTabIndex] = useState(initialIndexValue + 1);
  const [itemFiled, setItemFiled] = useState<any>([]);
  const [agendaDetail, setAgendaDetail] = useState<any>([]);
  const onChangeSetItemFiled = (filedList: any) => {
    // const dataOld = agendaDetail?.filter((pane: any) => {
    //   return (
    //     pane.uuid === filedList.id &&
    //     String(pane.step) !== String(filedList.step)
    //   );
    // });
    // const newDataagenda = {
    //   ...filedList.values,
    //   uuid: filedList.id,
    //   step: filedList.step,
    // };
    // console.log(agendaDetail);
    // dataOld.push(newDataagenda);
    // console.log(dataOld);
    // setDataField
    // setAgendaDetail(dataOld);
  };

  useEffect(() => {}, [itemFiled]);
  useEffect(() => {
    getData();
    const newfileAgenda: any = [];
    nameFilesummary?.map((x: any, y: any) => {
      if (x.type === 'fileAgenda') {
        newfileAgenda.push({ ...x, name: x.namefile, uid: y });
      }
    });
    if (agenda) {
      Promise.all(
        agenda?.map(async (item: any, key: any) => {
          const resultDetailagenda =
            await DatamanagementService().getDetailagenda(item.uuid, item.step);
          const file = newfileAgenda.filter(
            (file: any) => Number(file.step) === key,
          );
          return {
            label: `ระเบียบวาระที่ ${key + 1}`,
            children: (
              <DetailList
                key={item?.uuid}
                Pagestep={key + 1}
                onChangeSetItemFiled={setDataField}
                item={item}
                resultDetailagenda={resultDetailagenda}
                file={file}
              />
            ),
            key: `ระเบียบวาระที่ ${key + 1}`,
            closable: false,
          };
        }),
      ).then(result => {
        // const data = result?.map((data: any) => {
        //   return {
        //     values: {
        //       agendas: data?.children?.props?.item?.agendes,
        //       detail: data?.children?.props?.item?.detailagendes,
        //       detailAgendes: data?.children?.props?.resultDetailagenda,
        //     },
        //     files: data?.children?.props.file,
        //   };
        // });
        setItems(result);
        setNewTabIndex(result?.length + 1);
      });
    }
  }, [nameFilesummary, agenda]);
  const getData = async () => {
    const resultAgenda = await DatamanagementService().getagendaByid(id);
    setAgendaDetail(resultAgenda);
  };
  const defaultPanes = new Array(initialIndexValue)
    // .fill(null)
    .map((_, index) => {
      const id: any = String(index + 1);
      return {
        label: `ระเบียบวาระที่ ${id}`,
        children: (
          <DetailList Pagestep={id} onChangeSetItemFiled={setDataField} />
        ),
        key: `ระเบียบวาระที่ ${id}`,
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
          <DetailListedit
            Pagestep={newTabIndex}
            onChangeSetItemFiled={setDataField}
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
