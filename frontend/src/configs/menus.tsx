import {
  LineChartOutlined,
  DiffOutlined,
  CalendarOutlined,
  TeamOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { pipe, replace, toLower } from 'lodash/fp';
import { ReportLayout } from '../components/ReportLayout';

import { Role } from '../utils/auth';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ListMeeting } from '../pages/Meeting/listmeeting/ListMeeting';
// import { CreateMeeting } from '../pages/Meeting/createmeeting/CreateMeeting';
import { DetailMeeting } from '../pages/Meeting/listmeeting/DetailMeeting';
// import { CreateStepagendas } from '../pages/Meeting/createmeeting/createstepagendes/CreateStepagendas';
import { CreateStepagendasIndex } from '../pages/Meeting/createmeeting/createstepagendes';
import { CreateStepFood } from '../pages/Meeting/createmeeting/createstepagendes/CreateStepFood';
import { MeetingScheduleRoute } from '../pages/MeetingSchedeule/MeetingScheduleRoute';
import { CheckList } from '../pages/MeetingSchedeule/CheckList';
import { EsignateLastmeeting } from '../pages/MeetingSchedeule/EsignateLastmeeting';
import { MeetingSumMinutes } from '../pages/MeetingSchedeule/MeetingSumMinutes';
import { MemberShipRoute } from '../pages/Membership/MemberShipRoute';
// import { SignConfirm } from '../pages/signconfirm/SignConfirm';
import { SettingPermission } from '../pages/settingpermission/SettingPermission';
import { CreateMeeting } from '../pages/MeetingCreate/MeetingCreate';
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
    icon: <DiffOutlined />,
    label: 'meeting',
    path: 'meeting',
    component: (
      <>
        <Route index element={<CreateMeeting />} />
        <Route path="agendas" element={<CreateStepagendasIndex />} />
        <Route path="agendas/agendasfood" element={<CreateStepFood />} />
      </>
    ),
  },
  // {
  //   icon: <DiffOutlined />,
  //   label: 'List Meeting',
  //   path: 'meeting-list',
  //   component: (
  //     <>
  //       <Route index element={<ListMeeting />} />
  //       <Route path="detail:id" element={<DetailMeeting />} />
  //     </>
  //   ),
  // },
  {
    icon: <CalendarOutlined />,
    label: 'Meeting Schedule',
    path: 'meeting-schedule',
    component: (
      <>
        <Route index element={<MeetingScheduleRoute />} />
        <Route path="detail/view" element={<CheckList />} />
        <Route path="detail/signate" element={<EsignateLastmeeting />} />
        <Route path="detail/minutes" element={<MeetingSumMinutes />} />
      </>
    ),
  },

  {
    icon: <TeamOutlined />,
    label: 'Membership',
    path: 'membership',
    component: (
      <>
        <Route index element={<MemberShipRoute />} />
      </>
    ),
  },
  {
    icon: <SettingOutlined />,
    label: 'Setting Profile',
    path: 'settingprofile',
    component: (
      <>
        <Route index element={<SettingPermission />} />{' '}
      </>
    ),
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
