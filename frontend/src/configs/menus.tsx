import { LineChartOutlined, DiffOutlined } from '@ant-design/icons';
import { pipe, replace, toLower } from 'lodash/fp';
import { ReportLayout } from '../components/ReportLayout';

import { Role } from '../utils/auth';
import { Outlet } from 'react-router-dom';
import { ListLayout } from '../pages/Meeting/ListMeeting';
import { CreateMeeting } from '../pages/Meeting/CreateMeeting';
import { EventLayout } from '../pages/Meeting/EventDetail';
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
    label: 'Meeting',
    component: <ReportLayout />,
    children: [
      {
        label: 'Create Meeting',
        path: 'meeting-create',
        component: <CreateMeeting />,
      },
      {
        label: 'List Meeting',
        path: 'meeting-list',
        component: <ListLayout />,
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
