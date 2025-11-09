import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const { Title } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await api.post('auth/register/', values);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      message.success('Регистрация успешна');
      navigate('/profile', { replace: true });
    } catch (e) {
      const detail = e?.response?.data?.detail || e?.response?.data?.email?.[0] || 'Ошибка регистрации';
      message.error(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title level={3}>Регистрация</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Почта" rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}>
          <Input prefix={<MailOutlined />} placeholder="you@example.com" />
        </Form.Item>
        <Form.Item name="first_name" label="Имя">
          <Input prefix={<UserOutlined />} placeholder="Иван" />
        </Form.Item>
        <Form.Item name="last_name" label="Фамилия">
          <Input placeholder="Иванов" />
        </Form.Item>
        <Form.Item name="password" label="Пароль" rules={[{ required: true, min: 8, message: 'Минимум 8 символов' }]}> 
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>Зарегистрироваться</Button>
      </Form>
    </Card>
  );
};

export default Register;
