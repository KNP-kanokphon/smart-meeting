import { Button, Card, Col, Row, Steps } from 'antd';
import { useState } from 'react';
import { AgendaPage } from './agendaPage';
import { DetailPage } from './detailsPage';
import { FoodPage } from './foodPage';
import './styles.css';

const { Step } = Steps;

export const CreateMeeting: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dataAgenda, setDataAgenda] = useState<any>([]);
  const [dataDetail, setDataDetail] = useState<any>([]);
  const [dataFood, setDataFood] = useState<any>([]);

  const onChangeCurrentStep = (step: number) => {
    setCurrentStep(step);
  };

  const setDataAgendaField = (dataField: any) => {
    setDataAgenda((pre: any) => ({ ...pre, ...dataField }));
  };

  const setDataFoodField = (dataField: any) => {
    setDataDetail((pre: any) => ({ ...pre, ...dataField }));
  };

  const setDataAgendaield = (dataField: any) => {
    setDataFood((pre: any) => ({ ...pre, ...dataField }));
  };

  const submitForm = () => {
    console.log(dataAgenda);
    console.log(dataDetail);
    console.log(dataFood);
  };

  const steps = [
    {
      title: 'AgendaPage',
      content: <AgendaPage setDataField={setDataAgendaield} />,
    },
    {
      title: 'DetailPage',
      content: <DetailPage setDataField={setDataAgendaField} />,
    },
    {
      title: 'FoodPage',
      content: <FoodPage setDataField={setDataFoodField} />,
    },
  ];

  return (
    <>
      <>
        <Card title="Create Meeting" style={{ width: '100%' }}></Card>
      </>
      <Card>
        <Row>
          <Col md={24}>
            <Steps current={currentStep}>
              <Step
                title={
                  currentStep === 0
                    ? 'In Progress'
                    : currentStep < 0
                    ? 'Waiting'
                    : 'Finish'
                }
              />
              <Step
                title={
                  currentStep === 1
                    ? 'In Progress'
                    : currentStep < 1
                    ? 'Waiting'
                    : 'Finish'
                }
              />
              <Step
                title={
                  currentStep === 2
                    ? 'In Progress'
                    : currentStep < 2
                    ? 'Waiting'
                    : 'Finish'
                }
              />
            </Steps>
          </Col>
        </Row>
        <Row>
          {steps.map(({ title, content }, i) => (
            <Col
              md={24}
              key={title}
              className={i === currentStep ? 'block' : 'none'}
            >
              {content}
            </Col>
          ))}
        </Row>
        <Row justify="center">
          {currentStep > 0 && (
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => onChangeCurrentStep(currentStep - 1)}
            >
              Back
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button
              style={{ color: 'white', background: '#1E6541' }}
              onClick={() => onChangeCurrentStep(currentStep + 1)}
            >
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button
              style={{ color: 'white', background: '#1E6541' }}
              htmlType="submit"
            >
              Submit
            </Button>
          )}
        </Row>
      </Card>
    </>
  );
};
