'use client';

import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Dashboard from '@/components/dashboard/Dashboard';
import AIOrchestrator from '@/components/ai/AIOrchestrator';

type ViewType = 'login' | 'dashboard' | 'ai' | 'social' | 'experiences' | 'curation' | 'reputation';

interface User {
  name: string;
  email: string;
  avatar?: string;
  reputation: number;
  level: string;
}

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    
    // Simular autenticação
    setTimeout(() => {
      const userData: User = {
        name: 'João Silva',
        email: data.email,
        reputation: 1850,
        level: 'Ouro'
      };
      
      setUser(userData);
      setCurrentView('dashboard');
      setIsLoading(false);
    }, 2000);
  };

  const handleRegister = async (data: {
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    photo?: File;
    document?: File;
  }) => {
    setIsLoading(true);
    
    // Simular cadastro e validação de identidade
    setTimeout(() => {
      const userData: User = {
        name: 'Novo Usuário',
        email: data.email,
        reputation: 0,
        level: 'Bronze'
      };
      
      setUser(userData);
      setCurrentView('dashboard');
      setIsLoading(false);
    }, 3000);
  };

  const handleBlockClick = (blockId: string) => {
    const viewMap: Record<string, ViewType> = {
      'identity': 'dashboard', // Fica no dashboard
      'ai': 'ai',
      'experiences': 'experiences',
      'curation': 'curation',
      'reputation': 'reputation'
    };
    
    setCurrentView(viewMap[blockId] || 'dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  const handleBack = () => {
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginForm
            onLogin={handleLogin}
            onRegister={handleRegister}
            isLoading={isLoading}
          />
        );
      
      case 'dashboard':
        if (!user) return null;
        return (
          <Dashboard
            user={user}
            onBlockClick={handleBlockClick}
            onLogout={handleLogout}
          />
        );
      
      case 'ai':
        return <AIOrchestrator onBack={handleBack} />;
      
      case 'social':
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Social Media Manager</h1>
              <p className="text-accent-300">Em desenvolvimento...</p>
              <button
                onClick={handleBack}
                className="mt-4 text-primary-400 hover:text-primary-300"
              >
                ← Voltar ao HUB
              </button>
            </div>
          </div>
        );
      
      case 'experiences':
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Experiências Híbridas</h1>
              <p className="text-accent-300">Em desenvolvimento...</p>
              <button
                onClick={handleBack}
                className="mt-4 text-primary-400 hover:text-primary-300"
              >
                ← Voltar ao HUB
              </button>
            </div>
          </div>
        );
      
      case 'curation':
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Curadoria Autêntica</h1>
              <p className="text-accent-300">Em desenvolvimento...</p>
              <button
                onClick={handleBack}
                className="mt-4 text-primary-400 hover:text-primary-300"
              >
                ← Voltar ao HUB
              </button>
            </div>
          </div>
        );
      
      case 'reputation':
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Sistema de Microrreputação</h1>
              <p className="text-accent-300">Em desenvolvimento...</p>
              <button
                onClick={handleBack}
                className="mt-4 text-primary-400 hover:text-primary-300"
              >
                ← Voltar ao HUB
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen">
      {renderCurrentView()}
    </main>
  );
}
