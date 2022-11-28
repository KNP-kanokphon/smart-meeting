import { Image } from 'antd';
import logo from '../../assets/images/KPIS Logo.png';
import logogold from '../../assets/images/KPIS Logo Gold.png';

export const Logo: React.FC = () => (
  <Image
    src={logo}
    width={130}
    // style={{ paddingLeft: '1rem' }}
    preview={false}
  />
);

export const Logogold: React.FC = () => (
  <Image
    src={logogold}
    width={130}
    // style={{ paddingLeft: '1rem' }}
    preview={false}
  />
);
