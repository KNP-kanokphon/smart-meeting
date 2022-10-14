import { Image } from 'antd';
import logo from '../../assets/images/logo.png';

export const Logo: React.FC = () => (
  <Image
    src={logo}
    width={100}
    style={{ paddingLeft: '1rem' }}
    preview={false}
  />
);
