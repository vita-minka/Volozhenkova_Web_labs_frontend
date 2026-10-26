import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TabBar.css';

const TABS = [
  { path: '/', label: 'Лента', icon: '▶', active: true },
  { path: '/add', label: 'Добавление', icon: '＋', active: false },
  { path: '/tile', label: 'Плитка', icon: '▦', active: true },
  { path: '/login', label: 'Вход', icon: '👤', active: false },
];

export const TabBar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="tabBar">
      {TABS.map((tab) => (
        <button
          key={tab.path}
          type="button"
          className={`tabBarItem ${location.pathname === tab.path ? 'tabBarItemActive' : ''} ${!tab.active ? 'tabBarItemDisabled' : ''}`}
          onClick={() => tab.active && navigate(tab.path)}
          disabled={!tab.active}
        >
          <span className="tabBarIcon">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};