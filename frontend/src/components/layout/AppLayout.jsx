import  Sidebar  from './SideBar';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto p-8">
        <Outlet /> 
      </main>

    </div>
  );
};