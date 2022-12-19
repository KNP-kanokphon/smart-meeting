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
  lastDataAgenda: (dataField: any) => void;
  setDataFieldNew: (dataField: any) => void;
  updateFile: (dataField: any) => void;
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
  lastDataAgenda,
  setDataFieldNew,
  updateFile,
}) => {
  const [newTabIndex, setNewTabIndex] = useState(initialIndexValue + 1);
  const [itemFiled, setItemFiled] = useState<any>([]);
  const [agendaDetail, setAgendaDetail] = useState<any>([]);
  const [newfileAgenda, setNewfileAgenda] = useState<any>([]);

  useEffect(() => {}, [itemFiled]);
  useEffect(() => {
    getData();
    nameFilesummary?.map((x: any, y: any) => {
      if (x.type === 'fileAgenda') {
        setNewfileAgenda([{ ...x, name: x.namefile, uid: y }]);
      }
    });
    if (agenda) {
      setNewTabIndex(agenda.length);
      createItems(agenda).then((xs: any) => {
        // console.log(
        //   `🚀 ~ file: detailsPage.tsx:101 ~ createItems ~ agenda`,
        //   agenda,
        // );
        // console.log(`🚀 ~ file: detailsPage.tsx:96 ~ createItems ~ xs`, xs);
        lastDataAgenda(xs);
        setItems(xs);
      });
    }
  }, [nameFilesummary, agenda]);

  const createItems = (agenda: any) => {
    return new Promise(async (resolve, reject) => {
      Promise.all(
        agenda
          .sort((a: any, b: any) => {
            return parseInt(a.step) - parseInt(b.step);
          })
          .map(async (item: any, key: any) => {
            const resultDetailagenda =
              await DatamanagementService().getDetailagenda(
                item.uuid,
                item.step,
              );
            const file: any = [];
            nameFilesummary.filter((c: any, index: number) => {
              if (
                c.type === 'fileAgenda' &&
                String(c.step) === String(item.step)
              ) {
                file.push({
                  id: 30,
                  idmeeting: c.idmeeting,
                  namefile: c.namefile,
                  pathfile: c.pathfile,
                  type: 'fileAgenda',
                  step: c.step,
                  name: c.namefile,
                  uid: index,
                });
              }
            });

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
                  step={item.step}
                  idmeeting={id}
                  updateFile={updateFile}
                />
              ),
              key: `ระเบียบวาระที่ ${key + 1}`,
              closable: false,
            };
          }),
      ).then(xxx => resolve(xxx));
    });
  };

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
          <DetailList
            Pagestep={id + 1}
            onChangeSetItemFiled={setDataField}
            updateFile={updateFile}
            idmeeting={id}
          />
        ),
        key: `ระเบียบวาระที่ ${id}`,
        closable: true,
      };
    });

  const [activeKey, setActiveKey] = useState<any>();
  const [items, setItems] = useState<typeof defaultPanes>([]);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    // updateFile(`update`);
    const newActiveKey = `ระเบียบวาระที่ ${newTabIndex + 1}`;
    setItems((pre: any) => [
      ...pre,
      {
        label: `ระเบียบวาระที่ ${newTabIndex + 1}`,
        children: (
          <DetailListedit
            Pagestep={String(newTabIndex)}
            onChangeSetItemFiled={setDataFieldNew}
            idmeeting={agenda[0].uuid}
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
      {items && (
        <Tabs
          hideAdd
          tabPosition="left"
          onChange={onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={onEdit}
          items={items}
        />
      )}
    </Card>
  );
};
