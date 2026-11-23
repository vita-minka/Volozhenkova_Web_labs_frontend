import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Добавляем type для AppDispatch и RootState
import type { AppDispatch, RootState } from '../store';
import { checkAuth, logout } from '../store/slices/authSlice';
import './TabBar.css';

export const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="tabBar">
      <button className={`tabBarItem ${location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>
        <span className="icon">▶</span> Лента
      </button>
      
      <button className={`tabBarItem ${location.pathname === '/add' ? 'active' : ''}`} onClick={() => navigate('/add')}>
        <span className="icon">＋</span> Добавление
      </button>
      
      <button className={`tabBarItem ${location.pathname === '/tile' ? 'active' : ''}`} onClick={() => navigate('/tile')}>
        <span className="icon">▦</span> Плитка
      </button>
      
      {user ? (
        <button className="tabBarItem" onClick={handleLogout}>
          <span className="icon">🚪</span> Выход
        </button>
      ) : (
        <button className={`tabBarItem ${location.pathname === '/login' ? 'active' : ''}`} onClick={() => navigate('/login')}>
          <span className="icon">👤</span> Вход
        </button>
      )}
    </nav>
  );
};