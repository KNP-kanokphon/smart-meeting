import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Steps,
  Tabs,
  Upload,
} from 'antd';
import { DeleteFilled, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import './styles.css';
import React, { useEffect, useImperativeHandle, useState } from 'react';
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

  // return form.validateFields().then(values => {
  //   // console.log(values);
  //   return values;
  //   // setDataField(values);
  // });

  // alert('getAlert from Child');
  // const onChangeSetItemFiled = async (filedList: any) => {
  //   setItemFiled([...itemFiled, filedList]);
  //   setDataField([...itemFiled, filedList]);
  // };

  // useEffect(() => {}, [itemFiled]);

  // const defaultPanes = new Array(initialIndexValue)
  //   .fill(null)
  //   .map((_, index) => {
  //     const id: any = String(index + 1);
  //     return {
  //       label: `ระเบียบวาระที่ ${id}`,
  //       children: (
  //         <DetailList
  //           Pagestep={id}
  //           onChangeSetItemFiled={onChangeSetItemFiled}
  //         />
  //       ),
  //       key: id,
  //       closable: false,
  //     };
  //   });

  // const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  // const [items, setItems] = useState(defaultPanes);

  // const onChange = (key: string) => {
  //   setActiveKey(key);
  // };
  // const add = () => {
  //   const newActiveKey = `ระเบียบวาระที่ ${newTabIndex}`;
  //   setItems((pre: any) => [
  //     ...pre,
  //     {
  //       label: `ระเบียบวาระที่ ${newTabIndex}`,
  //       children: (
  //         <DetailList
  //           Pagestep={String(newTabIndex)}
  //           onChangeSetItemFiled={onChangeSetItemFiled}
  //         />
  //       ),
  //       key: newActiveKey,
  //       closable: true,
  //     },
  //   ]);
  //   setNewTabIndex(newTabIndex + 1);
  //   setActiveKey(newActiveKey);
  // };

  // const remove = (targetKey: string) => {
  //   const targetIndex = items.findIndex(pane => pane.key === targetKey);
  //   const newPanes = items.filter(pane => pane.key !== targetKey);
  //   if (newPanes.length && targetKey === activeKey) {
  //     const { key } =
  //       newPanes[
  //         targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
  //       ];
  //     setActiveKey(key);
  //   }
  //   setNewTabIndex(newTabIndex - 1);
  //   setItems(newPanes);
  // };

  // const onEdit = (e: any, action: 'add' | 'remove') => {
  //   if (action === 'add') {
  //     add();
  //   } else {
  //     remove(e);
  //   }
  // };
  const onChangeForm = (values: any, changvalue: any) => {
    setDataField(changvalue);
  };
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  return (
    // <Card style={{ width: '100%' }}>
    //   <Row style={{ paddingBottom: 20 }}>
    //     <Button type="dashed" onClick={add}>
    //       เพิ่มระเบียบวาระ
    //     </Button>
    //   </Row>
    //   <Tabs
    //     hideAdd
    //     tabPosition="left"
    //     onChange={onChange}
    //     activeKey={activeKey}
    //     type="editable-card"
    //     onEdit={onEdit}
    //     items={items}
    //   />
    // </Card>
    <Form
      name="dynamic_form_nest_item"
      onValuesChange={onChangeForm}
      autoComplete="off"
    >
      <Form.List
        name="agenda"
        initialValue={[{ key: 0, name: 0, isListField: true, fieldKey: 0 }]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => {
              return (
                <Card style={{ width: '100%' }} key={key}>
                  <Row style={{ paddingBottom: 16, fontSize: 16 }}>
                    <Col span={6}>
                      <b>ระเบียบวาระที่ {name + 1} </b>
                    </Col>
                    <Col offset={16}>
                      <Button onClick={() => remove(name)} danger>
                        <DeleteFilled style={{ color: '#FF4D4F' }} />
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        {...restField}
                        name={[name, 'title']}
                        rules={[{ required: true, message: 'กรุณากรอกเรื่อง' }]}
                      >
                        <Input placeholder="เรื่อง" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item {...restField} name={[name, 'detail']}>
                        <TextArea rows={4} placeholder="รายละเอียด" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Item {...restField} name={[name, 'file']}>
                      <Upload customRequest={dummyRequest}>
                        <Button icon={<UploadOutlined />}>
                          Click To Upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Row>
                </Card>
              );
            })}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                เพิ่มระเบียบวาระ
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};
