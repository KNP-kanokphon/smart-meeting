import { Button, Col, Form, Input, Row, Space, Upload } from 'antd';
import {
  InfoCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
  file?: string[];
  idmeeting?: string;
};

export const DetailListedit: React.FC<Props> = ({
  children,
  extra,
  Pagestep,
  field,
  item,
  resultDetailagenda,
  file,
  onChangeSetItemFiled,
  idmeeting,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const agendas = Form.useWatch('agendes', form);
  const detail = Form.useWatch('detail', form);
  const detailAgendes = Form.useWatch('detailagendes', form);
  const props = {
    onRemove: async (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: async (file: any) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  useEffect(() => {
    onFinish();
  }, [fileList, agendas, detail, detailAgendes]);

  const onFinish = async () => {
    // const formData = new FormData();
    // fileList.map((e: any) => {
    //   formData.append('file', e);
    // });
    await form.validateFields().then(async values => {
      onChangeSetItemFiled({
        values,
        // files: fileList,
        step: Pagestep,
      });
    });
    // console.log('Received values of form:', values);
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
          // onChange={onFinish}
          // layout="vertical"
          // initialValues={{ requiredMarkValue: requiredMark }}
          // onValuesChange={onRequiredTypeChange}
          // requiredMark={requiredMark}
        >
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
          <Form.List name="detailagendes" initialValue={[{}]}>
            {(fields, { add, remove }) => (
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
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    เพิ่มเรื่อง
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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
          {/* <Button
            onClick={onFinish}
            style={{ color: 'white', background: '#1E6541' }}
          >
            บันทึก ระเบียบวาระที่ {Pagestep}
          </Button> */}
        </Form>
      </Row>
    </>
  );
};
