import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { TabBar } from './TabBar';
import './AppLayout.css';

export const AppLayout: FC = () => {
  return (
    <div className="appShell">
      <main className="appContent">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
};