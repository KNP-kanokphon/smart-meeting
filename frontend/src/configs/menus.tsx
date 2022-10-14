import {
  LineChartOutlined,
  BarChartOutlined,
  FundOutlined,
} from '@ant-design/icons';
import { pipe, replace, toLower } from 'lodash/fp';
import { ReportLayout } from '../components/ReportLayout';
import { DebtCollectionSummaryByCreditCardOverdueLessThanNinetyDaysReport } from '../pages/reports/DebtCollectionSummaryByCreditCardOverdueLessThanNinetyDaysReport';
import { DashboardOverallOutstandingDebtCreditCardWriteOff } from '../pages/reports/DashboardOverallOutstandingDebtCreditCardWriteOff';
import { DashboardPaymentCreditCardDebtByCardType } from '../pages/reports/DashboardPaymentCreditCardDebtByCardType';
import { DashboardPaymentTrendByAcAndOc } from '../pages/reports/DashboardPaymentTrendByAcAndOc';
import { DashboardPaymentTrendInformation } from '../pages/reports/DashboardPaymentTrendInformation';
import { DashboardPerformanceOutstandingDebtManagement } from '../pages/reports/DashboardPerformanceOutstandingDebtManagement';
import { OaCompensationNplsCreditCardReport } from '../pages/reports/OaCompensationNplsCreditCardReport';
import { OaCreditNonNplsReport } from '../pages/reports/OaCreditNonNplsReport';
import { OaDebtTrackingResultsReport } from '../pages/reports/OaDebtTrackingResultsReport';
import { OaUnlistedOutstandingDebtAccountReport } from '../pages/reports/OaUnlistedOutstandingDebtAccountReport';
import { OaWorkSubmissionReport } from '../pages/reports/OaWorkSubmissionReport';
import { OaCompensationNonNplsLoanReport } from '../pages/reports/OaCompensationNonNplsLoanReport';
import { OaCompensationNplsLoanReport } from '../pages/reports/OaCompensationNplsLoanReport';
import { OaCompensationBadDebtReport } from '../pages/reports/OaCompensationBadDebtReport';
import { OaCompensationWithContractedDebtorReport } from '../pages/reports/OaCompensationWithContractedDebtorReport';
import { InspectionBeforeCalculatingCreditCommissionReport } from '../pages/reports/InspectionBeforeCalculatingCreditCommissionReport';
import { DebtCollectionResultByActionCodeCompareToBillingListReport } from '../pages/reports/DebtCollectionResultByActionCodeCompareToBillingListReport';
import { DebtCollectionSummaryByCreditCardOverdueMoreThanNinetyDaysReport } from '../pages/reports/DebtCollectionSummaryByCreditCardOverdueMoreThanNinetyDaysReport';
import { DebtCollectionInformationAssignedBReport } from '../pages/reports/DebtCollectionInformationAssignedBReport';
import { RankingDebtCollectionEmployeeReport } from '../pages/reports/RankingDebtCollectionEmployeeReport';
import { UntrackedDebtReport } from '../pages/reports/UntrackedDebtReport';
import { OaDebtTrackingSummaryReport } from '../pages/reports/OaDebtTrackingSummaryReport';
import { Role } from '../utils/auth';
import { Outlet } from 'react-router-dom';
import { InspectionBeforeCalculatingCreditCardCommissionReport } from '../pages/reports/InspectionBeforeCalculatingCreditCardCommissionReport';
import { TotalCompensationReport } from '../pages/reports/TotalCompensationReport';
import { OaCompensationReportOfEachDebtOfCollectionCompanyBadReport } from '../pages/reports/OaCompensationReportOfEachDebtOfCollectionCompanyBadReport';

type MenuConfig = {
  icon?: JSX.Element;
  label: string;
  component: JSX.Element;
  roles?: Role[];
  path?: string;
  children?: MenuConfig[];
};

const menuConfigs: MenuConfig[] = [
  {
    icon: <LineChartOutlined />,
    label: 'Report',
    component: <ReportLayout />,
    children: [
      {
        label:
          '1. รายงานการส่งงานให้บริษัทติดตามหนี้ แยกตาม Supervisor แยกตาม User และแยกบริษัทติดตามหนี้',
        path: 'oa-work-submission',
        component: <OaWorkSubmissionReport />,
      },
      {
        label:
          '2. รายงาน Unlist หนี้คงค้างรายบัญชี ที่ไม่ถูกจัดกลุ่มส่งให้กับบริษัทติดตามหนี้',
        path: 'oa-unlisted-outstanding-debt-account',
        component: <OaUnlistedOutstandingDebtAccountReport />,
      },
      {
        label: '3. รายงานค่าตอบแทน',
        path: 'commission',
        component: <Outlet />,
        children: [
          {
            label: '3.1 รายงานตรวจสอบก่อนคำนวณค่าคอมมิชชั่น สินเชื่อ',
            path: 'inspection-before-calculating-commission-loan',
            component: <InspectionBeforeCalculatingCreditCommissionReport />,
          },
          {
            label: '3.2 รายงานตรวจสอบก่อนคำนวณค่าคอมมิชชั่น บัตรเครดิต',
            path: 'inspection-before-calculating-credit-card-commission',
            component: (
              <InspectionBeforeCalculatingCreditCardCommissionReport />
            ),
          },
          {
            label:
              '3.3 รายงานค่าตอบแทนของแต่ละบริษัทติดตามหนี้ สินเชื่อบัตร Credit Non-NPLs',
            path: 'oa-compensation-non-npls-credit-card',
            component: <OaCreditNonNplsReport />,
          },
          {
            label:
              '3.4 รายงานค่าตอบแทนของแต่ละบริษัทติดตามหนี้ สินเชื่อบัตร Credit NPLs',
            path: 'oa-compensation-npls-credit-card',
            component: <OaCompensationNplsCreditCardReport />,
          },
          {
            label:
              '3.5 รายงานค่าตอบแทนของแต่ละบริษัทติดตามหนี้ สินเชื่อ Non-NPLs',
            path: 'oa-compensation-non-npls-loan',
            component: <OaCompensationNonNplsLoanReport />,
          },
          {
            label: '3.6 รายงานค่าตอบแทนของแต่ละบริษัทติดตามหนี้ สินเชื่อ NPLs',
            path: 'oa-compensation-npls-loan',
            component: <OaCompensationNplsLoanReport />,
          },
          {
            label:
              '3.7 รายงานค่าตอบแทนของแต่ละบริษัทติดตามหนี้ หนี้ที่จำหน่ายหนี้สูญแล้ว',
            path: 'oa-compensation-bad-debt',
            component: <OaCompensationBadDebtReport />,
          },
          {
            label:
              '3.8 รายงานค่าตอบแทนของแต่ละบริษัทติดตามหนี้ กรณีลูกหนี้ เข้าร่วมมาตรการของธนาคารหรือ ทำสัญญาปรับปรุงโครงสร้างหนี้',
            path: 'oa-compensation-with-contracted-debtor',
            component: <OaCompensationWithContractedDebtorReport />,
          },
          {
            label:
              '3.13 รายงานค่าตอบแทนของแต่ละบริษัทติดตามหนี้ หนี้ที่จำหน่ายหนี้สูญแล้ว รายบัญชี ',
            path: 'oa-compensation-each-debt-collection-company',
            component: (
              <OaCompensationReportOfEachDebtOfCollectionCompanyBadReport />
            ),
          },
        ],
      },
      {
        label: '4. รายงานค่าตอบแทนรวม',
        path: 'total-compensation',
        component: <TotalCompensationReport />,
      },
      {
        label: '5. รายงานการรับชำระหนี้/ผลการติดตามหนี้',
        path: 'debt-settlement',
        component: <OaDebtTrackingResultsReport />,
      },
      {
        label: '6. สรุปผลการจัดเก็บหนี้ธุรกิจบัตรเครดิตค้างชำระไม่เกิน 90 วัน',
        path: 'debt-collection-summary',
        component: <Outlet />,
        children: [
          {
            label: '6.1 แบ่งตาม Billing Cycle / ชั้นหนี้ / บริษัทติดตามหนี้',
            path: 'debt-collection-summary-by-credit-card-overdue-less-than-ninety-days',
            component: (
              <DebtCollectionSummaryByCreditCardOverdueLessThanNinetyDaysReport />
            ),
          },
          {
            label:
              '6.2 แบ่งตาม วันค้างชำระ / แบ่งตามชั้นหนี้ (NPLs / WO) / บริษัทติดตามหนี้',
            path: 'debt-collection-summary-by-credit-card-overdue-more-than-ninety-days',
            component: (
              <DebtCollectionSummaryByCreditCardOverdueMoreThanNinetyDaysReport />
            ),
          },
        ],
      },
      {
        label: '7. สรุปผลการติดตามหนี้ของบริษัทติดตามหนี้ (Action Code)',
        path: 'oa-debt-tracking-summary',
        component: <OaDebtTrackingSummaryReport />,
      },
      // {
      //   label:
      //     '8. รายงานการจัดอันดับบริษัทติดตามหนี้ ตามผลการเก็บหนี้ ในช่วงเวลาถือครอง ธุรกิจบัตรเครดิตค้างชำระ 91 วันขึ้นไป',
      //   path: 'inspection-before-calculating-credit-commission',
      //   component: < />,
      // },
    ],
  },
  {
    icon: <BarChartOutlined />,
    label: 'Dashboard',
    component: <ReportLayout />,
    children: [
      {
        label: 'ภาพรวมหนี้ค้างชำระธุรกิจบัตรเครดิตรวม Write off',
        path: 'dashboard-overall-outstanding-debt-credit-card-write-off',
        component: <DashboardOverallOutstandingDebtCreditCardWriteOff />,
      },
      {
        label: 'ข้อมูลแนวโน้มการรับชำระ',
        path: 'dashboard-payment-trend-information',
        component: <DashboardPaymentTrendInformation />,
      },
      {
        label: 'ข้อมูลแนวโน้มการรับชำระ จำแนกตามวงเงินค้างชำระ กลุ่มอาชีพ',
        path: 'dashboard-payment-trend-by-accrued-amount-and-occupation',
        component: <DashboardPaymentTrendByAcAndOc />,
      },
      {
        label: 'ภาพรวมรับชำระหนี้ธุรกิจบัตรเครดิต จำแนกตามประเภทบัตร',
        path: 'dashboard-payment-credit-card-debt-by-card-type',
        component: <DashboardPaymentCreditCardDebtByCardType />,
      },
      {
        label: 'ผลการดำเนินงานการบริหารจัดการหนี้ค้างชำระธุรกิจบัตรเครดิต',
        path: 'dashboard-performance-outstanding-debt-management',
        component: <DashboardPerformanceOutstandingDebtManagement />,
      },
    ],
  },
  {
    icon: <FundOutlined />,
    label: 'Debt collection',
    component: <ReportLayout />,
    children: [
      {
        label:
          '1. รายงานข้อมูลการติดตามหนี้ที่ได้รับมอบหมายจากธนาคาร และ Assign ให้พนักงานติดตามหนี้',
        path: 'debt-collection-information-assigned-by-bank',
        component: <DebtCollectionInformationAssignedBReport />,
      },
      {
        label: '2. รายงานค่าตอบแทนของแต่ละบริษัทติดตามหนี้ รายบัญชี',
        path: 'debt-collection-result-by-action-code-compare-to-billing-list',
        component: (
          <DebtCollectionResultByActionCodeCompareToBillingListReport />
        ),
      },
      {
        label: '3. รายงานการจัดอันดับพนักงานติดตามหนี้',
        path: 'ranking-debt-collection-employee',
        component: <RankingDebtCollectionEmployeeReport />,
      },
      {
        label: '4. รายงานหนี้ที่ยังไม่ได้มีการติดตาม',
        path: 'untracked-debt',
        component: <UntrackedDebtReport />,
      },
    ],
  },
];

export type MenuItem = MenuConfig & {
  path: string;
  key: string;
  children?: MenuItem[];
};

const menuItemMapper = (x: any): MenuItem => {
  const path = pipe(toLower, replace(' ', '-'))(x.path || x.label);
  return {
    ...x,
    key: path,
    path,
    ...(x.children?.length && {
      children: x.children.map(menuItemMapper),
    }),
  };
};

export const menuItems = menuConfigs.map(menuItemMapper);

const [firstMenu] = menuItems;

export const defaultPath = `${firstMenu.path}${
  firstMenu.children ? `/${firstMenu.children[0].path}` : ''
}`;
