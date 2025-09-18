import { Outlet } from 'react-router-dom';
import {Footer,Nav} from '@layout';

export const ClientLayout = () => {
  return (
    <div className="overflow-x-hidden pt-20">
      <Nav />
      <div className={`flex-1  }`}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

