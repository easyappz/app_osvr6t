import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const Home = () => (
  <Card>
    <Title level={2}>Главная</Title>
    <Paragraph>Добро пожаловать! Используйте меню для регистрации, входа и просмотра профиля.</Paragraph>
  </Card>
);

export default Home;
