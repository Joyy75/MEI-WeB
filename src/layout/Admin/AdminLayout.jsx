import { Outlet } from 'react-router-dom';
import { AdminNav } from '@layout';

export const AdminLayout = () => (
  <div className="overflow-hidden">
    <AdminNav />
    <div className={`flex-1 ml-16 px-3 mt-10`}>
      <Outlet />
    </div>
  </div>
);

