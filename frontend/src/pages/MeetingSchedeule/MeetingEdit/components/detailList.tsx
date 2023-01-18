import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Switch,
  Upload,
} from 'antd';
import {
  InfoCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DatamanagementService } from '../../../../stores/meeting-store';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
type RequiredMark = boolean | 'optional';
const { TextArea } = Input;

type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
  Pagestep: string;
  field?: any[];
  onChangeSetItemFiled: (filedList: any) => void;
  item?: any;
  resultDetailagenda?: any;
  file?: any;
  step?: string;
  idmeeting: string;
  updateFile: (filedList: any) => void;
};

export const DetailList: React.FC<Props> = ({
  children,
  extra,
  Pagestep,
  field,
  onChangeSetItemFiled,
  item,
  resultDetailagenda,
  file,
  step,
  idmeeting,
  updateFile,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const agendas = Form.useWatch('agendes', form);
  const detail = Form.useWatch('detail', form);
  const detailAgendes = Form.useWatch('detailagendes', form);
  const [checkFormChange, setCheckFormChange] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const onChangeFormTrue = () => {
    setCheckFormChange(true);
  };
  const onChangeFormFalse = () => {
    setCheckFormChange(false);
  };
  const props = {
    onRemove: async (file: any) => {
      // console.log(file);
      const resultFile = await DatamanagementService().deletefileagendas(
        idmeeting,
        String(step),
        file.namefile,
      );
      if (resultFile) {
        updateFile(`updatefile`);
      }
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: async (file: any) => {
      // const resultFile = await DatamanagementService().savefileagendas(
      //   file,
      //   idmeeting,
      //   String(step),
      //   true,
      // );
      setLoading(true);
      setTimeout(() => {
        // if (resultFile) {
        //   updateFile(`updatefile`);
        //   setLoading(false);
        // }
      }, 3000);

      return false;
    },
    fileList,
  };

  useEffect(() => {
    onFinish();
  }, [fileList, agendas, detail, detailAgendes]);

  useEffect(() => {
    setFileList(file);
  }, [file]);

  const onFinish = () => {
    if (checkFormChange) {
      form.validateFields().then(values => {
        onChangeSetItemFiled({
          values,
          id: idmeeting,
          step: step,
        });
      });
      onChangeFormFalse();
    }
  };

  return (
    <>
      <Row>
        <Form
          name="dynamic_form_nest_item"
          // onFinish={onFinish}
          autoComplete="off"
          style={{ width: '100%' }}
          form={form}
          //  onValuesChange={onFinish}
          // layout="vertical"
          initialValues={{
            agendes: item.agendes,
            detail: item.detail,
            detailagendes: resultDetailagenda.map((x: any) => {
              return { detail: x.detail };
            }),
          }}
          onValuesChange={onChangeFormTrue}
        >
          <Spin tip="Loading..." spinning={loading}>
            <Form.Item
              label={`ระเบียบวาระที่ ${Pagestep}`}
              required
              tooltip="This is a required field"
              name="agendes"
            >
              <Input placeholder="เรื่องประธานแจ้งที่ประชุมทราบ" />
            </Form.Item>
            <Form.Item
              label="รายละเอียดการประชุม"
              tooltip={{
                title: 'Tooltip with customize icon',
                icon: <InfoCircleOutlined />,
              }}
              name="detail"
            >
              <TextArea />
            </Form.Item>
            <Row>
              <Col span={2}>เรื่องที่</Col>
              <Col span={18}>รายละเอียด</Col>
              <Col offset={1} span={3}></Col>
            </Row>
            <Form.List
              name="detailagendes"

              // initialValue={Detailagenda}
            >
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      return (
                        <Row key={key}>
                          <Col span={2}>
                            <Form.Item>{`${Pagestep}.${name + 1}`}</Form.Item>
                          </Col>
                          <Col span={18}>
                            <Form.Item
                              {...restField}
                              name={[name, 'detailagendes']}
                            >
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col offset={1} span={3}>
                            <DeleteOutlined onClick={() => remove(name)} />
                          </Col>
                        </Row>
                      );
                    })}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => [add()]}
                        block
                        icon={<PlusOutlined />}
                      >
                        เพิ่มเรื่อง
                      </Button>
                    </Form.Item>
                  </>
                );
              }}
            </Form.List>
            {/* <Row>
              <Switch
                checkedChildren="เปิด"
                unCheckedChildren="ปิด"
                defaultChecked
              />
            </Row> */}
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Upload {...props}>
                  <Button
                    // disabled={fileList.length === 1}
                    icon={<UploadOutlined />}
                  >
                    Select File
                  </Button>
                </Upload>
              </Col>
            </Row>
            <br></br>
          </Spin>
        </Form>
      </Row>
    </>
  );
};
