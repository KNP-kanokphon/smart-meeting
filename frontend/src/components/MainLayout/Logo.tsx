import { Image } from 'antd';
import logo from '../../assets/images/KPIS Logo.png';

export const Logo: React.FC = () => (
  <div style={{ textAlign: 'center' }}>
    <Image
      src={logo}
      width={100}
      // style={{ paddingLeft: '1rem', textAlign:"center" }}
      preview={false}
    />
  </div>
);
