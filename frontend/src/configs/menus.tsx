import {
  LineChartOutlined,
  DiffOutlined,
  CalendarOutlined,
  TeamOutlined,
  SettingOutlined,
  CaretRightOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { pipe, replace, toLower } from 'lodash/fp';

import { Role } from '../utils/auth';
import { Outlet, Route, Routes } from 'react-router-dom';
import { CreateStepagendasIndex } from '../pages/Meeting/createmeeting/createstepagendes';
import { CreateStepFood } from '../pages/Meeting/createmeeting/createstepagendes/CreateStepFood';
import { MeetingScheduleRoute } from '../pages/MeetingSchedeule/MeetingScheduleRoute';
import { CheckList } from '../pages/MeetingSchedeule/CheckList';
import { EsignateLastmeeting } from '../pages/MeetingSchedeule/EsignateLastmeeting';
import { MeetingSumMinutes } from '../pages/MeetingSchedeule/MeetingSumMinutes';
import { MemberShipRoute } from '../pages/Membership/MemberShipRoute';
import { SettingPermission } from '../pages/settingpermission/SettingPermission';
import { CreateMeeting } from '../pages/Meeting/createmeeting/MeetingCreate';
import { ReserveMeet } from '../pages/ReserveMeet/RevserveMeet';
import { EditMeeting } from '../pages/MeetingSchedeule/MeetingEdit/MeetingEdit';
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
    label: 'สร้างวาระการประชุม',
    path: 'meeting',
    component: (
      <>
        <Route index element={<CreateMeeting />} />
        <Route path="agendas" element={<CreateStepagendasIndex />} />
        <Route path="agendas/agendasfood" element={<CreateStepFood />} />
      </>
    ),
  },
  {
    icon: <CalendarOutlined />,
    label: 'แผนการประชุม',
    path: 'meeting-schedule',
    component: (
      <>
        <Route index element={<MeetingScheduleRoute />} />
        <Route path="detail/view" element={<CheckList />} />
        <Route path="detail/signate" element={<EsignateLastmeeting />} />
        <Route path="detail/minutes" element={<MeetingSumMinutes />} />
        <Route path="detail/edit" element={<EditMeeting />} />
      </>
    ),
  },

  {
    icon: <TeamOutlined />,
    label: 'ระบบสมาชิก',
    path: 'membership',
    component: (
      <>
        <Route index element={<MemberShipRoute />} />,
        <Route path="membership" element={<MemberShipRoute />} />,
        <Route path="settingprofile" element={<SettingPermission />} />
      </>
    ),
    children: [
      {
        icon: <TeamOutlined />,
        label: 'แบบขึ้นทะเะบียนสมาชิก',
        path: 'membership',

        component: (
          <>
            <Route path="membership" element={<MemberShipRoute />} />
          </>
        ),
      },
      {
        icon: <SettingOutlined />,
        label: 'แบบระบุตำแหน่ง',
        path: 'settingprofile',
        component: (
          <>
            <Route path="settingprofile" element={<SettingPermission />} />
          </>
        ),
      },
    ],
  },
  // {
  //   icon: <TableOutlined />,
  //   label: 'Reserve Meet',
  //   path: 'Reserve-Meet',
  //   component: (
  //     <>
  //       <Route index element={<ReserveMeet />} />
  //     </>
  //   ),
  // },
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
