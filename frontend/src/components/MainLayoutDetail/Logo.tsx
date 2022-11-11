import { Image } from 'antd';
import logo from '../../assets/images/KPIS Logo.png';

export const Logo: React.FC = () => (
  <Image
    src={logo}
    width={130}
    // style={{ paddingLeft: '1rem' }}
    preview={false}
  />
);
