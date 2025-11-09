import React, { useMemo, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, ConfigProvider, theme, Button, Space, Typography, message } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const AppShell = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  });

  useEffect(() => {
    const onStorage = () => {
      try { setUser(JSON.parse(localStorage.getItem('user') || 'null')); } catch { setUser(null); }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    message.success('Вы вышли из аккаунта');
    navigate('/', { replace: true });
  };

  const menuItems = useMemo(() => ([
    { key: 'home', label: <Link to="/">Главная</Link> },
    { key: 'register', label: <Link to="/register">Регистрация</Link> },
    { key: 'login', label: <Link to="/login">Авторизация</Link> },
    { key: 'profile', label: <Link to="/profile">Профиль</Link> },
  ]), []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Menu theme="dark" mode="horizontal" items={menuItems} style={{ flex: 1 }} />
        <Space>
          {user ? (
            <>
              <Text style={{ color: '#fff' }}>{user.first_name || user.email}</Text>
              <Button onClick={logout}>Выйти</Button>
            </>
          ) : (
            <>
              <Button type="text"><Link to="/login">Войти</Link></Button>
              <Button type="primary"><Link to="/register">Регистрация</Link></Button>
            </>
          )}
        </Space>
      </Header>
      <Content style={{ padding: 24, maxWidth: 920, margin: '0 auto', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Demo • Регистрация / Авторизация / Профиль</Footer>
    </Layout>
  );
};

const App = () => (
  <ConfigProvider locale={ruRU} theme={{ algorithm: theme.defaultAlgorithm }}>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </ConfigProvider>
);

export default App;
