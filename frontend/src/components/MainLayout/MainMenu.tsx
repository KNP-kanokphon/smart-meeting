import { Col, Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { intersection } from 'lodash';
import { menuItems, MenuItem } from '../../configs/menus';
import { useAuth } from '../../utils/auth';
import { Logo } from './Logo';
import styles from './MainLayout.module.scss';

export const MainMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = useAuth();

  const items = useMemo(() => {
    const rolePredicate = (x: MenuItem) =>
      x.roles ? intersection(auth.user?.roles, x.roles).length : true;

    const itemMapper = (x: MenuItem): MenuItem & { onClick: () => void } => {
      return {
        ...x,
        onClick: () => {
          if (x.children) {
            return;
          }
          navigate(x.path);
        },
        ...(x.children?.length && {
          children: x.children.filter(rolePredicate).map((c: any) =>
            itemMapper({
              ...c,
              path: `${x.path}/${c.path}`,
            }),
          ),
        }),
      };
    };
    return menuItems.filter(rolePredicate).map(itemMapper);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user?.roles]);

  const ks = pathname.slice(1).split('/');

  return (
    <>
      {/* <Layout.Header
        className={styles.siteLayoutBackground}
        style={{
          padding: 0,
          borderBottom: '1px solid #F0F0F0',
        }}
      > */}
        <div style={{backgroundColor:"white" ,paddingTop:"10px" ,paddingBottom:"10px"}}>
        <Logo />
        </div>
      {/* </Layout.Header> */}
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={ks.slice(-1)}
        defaultOpenKeys={ks.length > 1 ? ks.slice(0, 1) : []}
        items={items}
        inlineIndent={6}
        style={{
          height: '100%',
          borderRight: 0,
        }}
      />
    </>
  );
};
