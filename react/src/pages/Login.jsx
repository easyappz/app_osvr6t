import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/profile';

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await api.post('auth/login/', values);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      message.success('Добро пожаловать!');
      navigate(from, { replace: true });
    } catch (e) {
      const detail = e?.response?.data?.detail || 'Ошибка авторизации';
      message.error(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title level={3}>Авторизация</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Почта" rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}> 
          <Input prefix={<MailOutlined />} placeholder="you@example.com" />
        </Form.Item>
        <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Введите пароль' }]}> 
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>Войти</Button>
      </Form>
    </Card>
  );
};

export default Login;
