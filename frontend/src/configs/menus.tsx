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

import { Role, Roules } from '../utils/auth';
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
import { MainSettingProfile } from '../pages/createprofile';
import { Activitylog } from '../pages/createactivity/activitylog';
import { Createactivity } from '../pages/createactivity/createactivity';
import { Registeractivity } from '../pages/createactivity/registeractivity';
type MenuConfig = {
  icon?: JSX.Element;
  label: string;
  component: JSX.Element;
  roles?: Roules[];
  path?: string;
  children?: MenuConfig[];
};

const menuConfigs: MenuConfig[] = [
  {
    icon: <DiffOutlined />,
    label: 'สร้างวาระการประชุม',
    path: 'meeting',
    roles: ['Meeting-create'],
    component: (
      <>
        <Route index element={<CreateMeeting />} />
        <Route path="agendas" element={<CreateStepagendasIndex />} />
        <Route path="agendas/agendasfood" element={<CreateStepFood />} />
      </>
    ),
  },

  {
    icon: <DiffOutlined />,
    label: 'กิจกรรม',
    path: 'activity',
    // roles: ['Activity-create'],
    component: (
      <>
        <Route path="activitylog" element={<Activitylog />} />,
        <Route path="activitycreate" element={<Createactivity />} />,
        <Route path="registeractivity" element={<Registeractivity />} />
      </>
    ),
    children: [
      {
        icon: <SettingOutlined />,
        label: 'บันทึกกิจกรรม',
        path: 'activitylog',
        component: (
          <>
            <Route index element={<Activitylog />} />
            <Route path="registeractivity" element={<Registeractivity />} />
          </>
        ),
      },
      {
        icon: <TeamOutlined />,
        label: 'สร้างกิจกรรม',
        path: 'activitycreate',
        component: (
          <>
            <Route index element={<Createactivity />} />
          </>
        ),
      },
    ],
  },
  {
    icon: <CalendarOutlined />,
    label: 'แผนการประชุม',
    path: 'meeting-schedule',
    roles: ['Meeting-plan'],
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
    roles: ['Membership-system'],
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
  {
    icon: <DiffOutlined />,
    label: 'ตั่งค่าโปรไฟล์',
    path: 'settingprofilekpi',
    // roles: ['Meeting-create'],
    component: (
      <>
        <Route index element={<MainSettingProfile />} />
        {/* <Route path="agendas" element={<CreateStepagendasIndex />} />
        <Route path="agendas/agendasfood" element={<CreateStepFood />} /> */}
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
