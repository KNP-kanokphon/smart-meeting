import { Image } from 'antd';
import logo from '../../assets/images/KPIS-LOGO.png';

export const Logo: React.FC = () => (
  <Image
    src={logo}
    width={170}
    // style={{ paddingLeft: '1rem' }}
    preview={false}
  />
);
