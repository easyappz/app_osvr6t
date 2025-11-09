import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Skeleton } from 'antd';
import api from '../api/axios';

const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('profile/me/');
        form.setFieldsValue(data);
        localStorage.setItem('user', JSON.stringify(data));
      } catch (e) {
        message.error('Не удалось загрузить профиль');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      const { data } = await api.patch('profile/me/', values);
      localStorage.setItem('user', JSON.stringify(data));
      message.success('Профиль обновлен');
    } catch (e) {
      message.error('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Skeleton active />;

  return (
    <Card>
      <Title level={3}>Профиль</Title>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="email" label="Почта">
          <Input disabled />
        </Form.Item>
        <Form.Item name="first_name" label="Имя">
          <Input placeholder="Имя" />
        </Form.Item>
        <Form.Item name="last_name" label="Фамилия">
          <Input placeholder="Фамилия" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={saving}>Сохранить</Button>
      </Form>
    </Card>
  );
};

export default Profile;
