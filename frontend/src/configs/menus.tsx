import { LineChartOutlined, DiffOutlined } from '@ant-design/icons';
import { pipe, replace, toLower } from 'lodash/fp';
import { ReportLayout } from '../components/ReportLayout';

import { Role } from '../utils/auth';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ListMeeting } from '../pages/Meeting/listmeeting/ListMeeting';
import { CreateMeeting } from '../pages/Meeting/createmeeting/CreateMeeting';
import { DetailMeeting } from '../pages/Meeting/listmeeting/DetailMeeting';
import { CreateStepagendas } from '../pages/Meeting/createmeeting/createstepagendes/CreateStepagendas';
import { CreateStepagendasIndex } from '../pages/Meeting/createmeeting/createstepagendes';
import { CreateStepFood } from '../pages/Meeting/createmeeting/createstepagendes/CreateStepFood';
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
  {
    icon: <DiffOutlined />,
    label: 'List Meeting',
    path: 'meeting-list',
    component: (
      <>
        <Route index element={<ListMeeting />} />
        <Route path="detail:id" element={<DetailMeeting />} />
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
