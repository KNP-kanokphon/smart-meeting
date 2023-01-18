import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Steps,
  Card,
  Select,
  Space,
  Typography,
  Checkbox,
  Switch,
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useWatch } from 'react-hook-form';
import { DatamanagementService } from '../../../stores/meeting-store';

type RequiredMark = boolean | 'optional';
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

type Props = {
  setDataField: (dataField: any) => void;
};

export const FoodPage: React.FC<Props> = ({ setDataField }) => {
  const { state } = useLocation();
  const [dataFrom, setDataFrom] = useState<any>();
  const [foodFrom, setFoodFrom] = useState([]);
  const [loadingpage, setLoadingpage] = useState<boolean>(true);

  const getFood = async () => {
    return new Promise(async (resolve, reject) => {
      const result = await DatamanagementService().getDetailfood(state);
      resolve(result);
    });
  };

  const getDatameeting = async () => {
    return new Promise(async (resolve, reject) => {
      const result = await DatamanagementService().getMeetingByid(state);
      resolve(result);
    });
  };

  useEffect(() => {
    getFood().then((data: any) => {
      setDataField({ fooddetail: data });
      setFoodFrom(data);
      setLoadingpage(false);
    });
    getDatameeting().then((data: any) => {
      setDataFrom(data);
      setDataField({ gift: data[0].gift });
      setLoadingpage(false);
    });

    // getListmeeting();
  }, []);
  // useEffect(() => {
  //   onFinish1();
  // }, [fooddetail]);

  // const onFinish1 = () => {
  //   form.validateFields().then(values => {
  //     setDataField(values);
  //     setDataField({ gift: datagift });
  //   });
  // };

  // const onFinish = (values: any) => {
  //   form.validateFields().then(values => {
  //     setDataField(values);
  //   });
  // };
  const onSelectChange = () => {
    // setDataField(form.getFieldsValue(true));
  };

  const reciveGift = (e: boolean) => {
    setDataField({ gift: e });
  };

  const onChangeForm = (values: any, changvalue: any) => {
    setDataField(changvalue);
  };
  if (loadingpage) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <br></br>
        <Form
          name="dynamic_form_nest_item"
          onValuesChange={onChangeForm}
          autoComplete="off"
          layout="vertical"
        >
          {foodFrom && dataFrom && (
            <Form.List name="fooddetail" initialValue={foodFrom}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    return (
                      <Row key={key} gutter={16}>
                        <Col span={4}>
                          <Form.Item
                            {...restField}
                            name={[name, 'typefood']}
                            label={'ประเภทอาหาร'}
                          >
                            <Select
                              placeholder={'Please Select'}
                              allowClear
                              onChange={onSelectChange}
                            >
                              <Option key={'1'} value={'food'}>
                                อาหาร
                              </Option>
                              <Option key={'2'} value={'snack'}>
                                ของว่าง
                              </Option>
                              <Option key={'3'} value={'drink'}>
                                เครื่องดื่ม
                              </Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={18}>
                          <Row>
                            <Col span={24}>
                              <Form.Item
                                {...restField}
                                name={[name, 'namefood']}
                                label={'ชื่อรายการอาหารและเครื่องดื่ม'}
                              >
                                <Input placeholder="ชื่อรายการอาหารและเครื่องดื่ม" />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>

                        <Col span={1}>
                          <DeleteOutlined onClick={() => remove(name)} />
                        </Col>
                      </Row>
                    );
                  })}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      เพิ่มเรื่อง
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    ของชำร่วย{'   '}
                    <Switch
                      onChange={reciveGift}
                      checkedChildren="มี"
                      unCheckedChildren="ไม่มี"
                      defaultChecked={dataFrom[0].gift}
                    />
                  </Form.Item>
                </>
              )}
            </Form.List>
          )}
        </Form>
      </>
    );
  }
};
