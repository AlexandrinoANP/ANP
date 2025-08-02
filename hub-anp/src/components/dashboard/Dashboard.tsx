'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Brain, 
  Video, 
  BookOpen, 
  Award,
  Bell,
  Settings,
  User,
  LogOut
} from 'lucide-react';
import HubBlock from './HubBlock';
import { Card, Button } from '@/components/ui';

interface DashboardProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    reputation: number;
    level: string;
  };
  onBlockClick: (blockId: string) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onBlockClick, onLogout }) => {
  const [notifications] = useState({
    identity: 0,
    ai: 3,
    experiences: 1,
    curation: 5,
    reputation: 2
  });

  const hubBlocks = [
    {
      id: 'identity',
      title: 'Identidade Autenticada',
      description: 'Seu selo digital verificado e sistema de autenticação segura',
      icon: Shield,
      color: 'from-success-500 to-success-600',
      notifications: notifications.identity,
      isActive: true
    },
    {
      id: 'ai',
      title: 'Orquestrador de IA',
      description: 'Comandos inteligentes para automação de tarefas e gestão de conteúdo',
      icon: Brain,
      color: 'from-primary-500 to-primary-600',
      notifications: notifications.ai,
      isActive: true
    },
    {
      id: 'experiences',
      title: 'Experiências Híbridas',
      description: 'Eventos presenciais e virtuais com avatar digital personalizado',
      icon: Video,
      color: 'from-accent-500 to-accent-600',
      notifications: notifications.experiences,
      isActive: false
    },
    {
      id: 'curation',
      title: 'Curadoria Autêntica',
      description: 'Organização inteligente de conteúdos e recomendações personalizadas',
      icon: BookOpen,
      color: 'from-warning-500 to-warning-600',
      notifications: notifications.curation,
      isActive: true
    },
    {
      id: 'reputation',
      title: 'Microrreputação',
      description: 'Sistema de pontuação, selos de conquista e reconhecimento profissional',
      icon: Award,
      color: 'from-danger-500 to-danger-600',
      notifications: notifications.reputation,
      isActive: true
    }
  ];

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Card className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            
            {/* User Info */}
            <div>
              <h1 className="text-2xl font-bold text-white font-cyber neon-text">
                Bem-vindo, {user.name}
              </h1>
              <p className="text-accent-300">{user.email}</p>
              <div className="flex items-center mt-2">
                <Award className="w-4 h-4 text-warning-500 mr-2" />
                <span className="text-sm text-accent-300">
                  Nível {user.level} • {user.reputation} pontos
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-accent-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              {Object.values(notifications).reduce((a, b) => a + b, 0) > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {Object.values(notifications).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>

            {/* Settings */}
            <button className="p-2 text-accent-400 hover:text-white transition-colors">
              <Settings className="w-6 h-6" />
            </button>

            {/* Logout */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              icon={<LogOut className="w-4 h-4" />}
            >
              Sair
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Hub Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white font-cyber mb-4 neon-text">
            HUB ANP
          </h2>
          <p className="text-xl text-accent-300 max-w-2xl mx-auto">
            Sua plataforma digital integrada com inteligência artificial, 
            automação e identidade verificada
          </p>
        </motion.div>

        {/* Hub Blocks Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {hubBlocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <HubBlock
                title={block.title}
                description={block.description}
                icon={block.icon}
                color={block.color}
                notifications={block.notifications}
                isActive={block.isActive}
                onClick={() => onBlockClick(block.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Tarefas Automáticas</h3>
            <p className="text-3xl font-bold text-primary-500">24</p>
            <p className="text-accent-400 text-sm">Executadas hoje</p>
          </Card>

          <Card className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Engajamento</h3>
            <p className="text-3xl font-bold text-success-500">+47%</p>
            <p className="text-accent-400 text-sm">Esta semana</p>
          </Card>

          <Card className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Próximo Evento</h3>
            <p className="text-3xl font-bold text-warning-500">2d</p>
            <p className="text-accent-400 text-sm">Reunião de negócios</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;