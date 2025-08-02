'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Brain, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Sparkles,
  Instagram,
  Mail,
  Calendar,
  Database
} from 'lucide-react';
import { Card, Button } from '@/components/ui';

interface AITask {
  id: string;
  command: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  result?: string;
  timestamp: Date;
  type: 'content' | 'automation' | 'social' | 'crm' | 'calendar';
}

interface AIOrchestatorProps {
  onBack: () => void;
}

const AIOrchestrator: React.FC<AIOrchestatorProps> = ({ onBack }) => {
  const [command, setCommand] = useState('');
  const [tasks, setTasks] = useState<AITask[]>([
    {
      id: '1',
      command: 'Criar post sobre tendências de IA para LinkedIn',
      status: 'completed',
      result: 'Post criado e agendado para 14:00',
      timestamp: new Date(Date.now() - 3600000),
      type: 'social'
    },
    {
      id: '2', 
      command: 'Enviar relatório semanal por email',
      status: 'completed',
      result: 'Email enviado para 15 contatos',
      timestamp: new Date(Date.now() - 7200000),
      type: 'automation'
    },
    {
      id: '3',
      command: 'Agendar reunião com equipe para sexta-feira',
      status: 'processing',
      timestamp: new Date(Date.now() - 300000),
      type: 'calendar'
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const getTaskIcon = (type: AITask['type']) => {
    switch (type) {
      case 'social': return <Instagram className="w-4 h-4" />;
      case 'automation': return <Mail className="w-4 h-4" />;
      case 'calendar': return <Calendar className="w-4 h-4" />;
      case 'crm': return <Database className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: AITask['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-success-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-danger-500" />;
      case 'processing': return <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />;
      default: return <Clock className="w-4 h-4 text-accent-500" />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim() || isProcessing) return;

    const newTask: AITask = {
      id: Date.now().toString(),
      command: command.trim(),
      status: 'processing',
      timestamp: new Date(),
      type: detectTaskType(command)
    };

    setTasks(prev => [newTask, ...prev]);
    setCommand('');
    setIsProcessing(true);

    // Simular processamento da IA
    setTimeout(() => {
      setTasks(prev => prev.map(task => 
        task.id === newTask.id 
          ? { 
              ...task, 
              status: 'completed',
              result: generateMockResult(task.command)
            }
          : task
      ));
      setIsProcessing(false);
    }, 3000);
  };

  const detectTaskType = (command: string): AITask['type'] => {
    const lowerCommand = command.toLowerCase();
    if (lowerCommand.includes('post') || lowerCommand.includes('instagram') || lowerCommand.includes('social')) {
      return 'social';
    }
    if (lowerCommand.includes('email') || lowerCommand.includes('enviar')) {
      return 'automation';
    }
    if (lowerCommand.includes('agendar') || lowerCommand.includes('reunião') || lowerCommand.includes('meeting')) {
      return 'calendar';
    }
    if (lowerCommand.includes('lead') || lowerCommand.includes('crm') || lowerCommand.includes('contato')) {
      return 'crm';
    }
    return 'content';
  };

  const generateMockResult = (command: string): string => {
    const results = [
      'Tarefa executada com sucesso',
      'Automação configurada e ativa',
      'Conteúdo gerado e publicado',
      'Email enviado para lista de contatos',
      'Agendamento realizado',
      'Lead adicionado ao CRM',
      'Relatório gerado e enviado'
    ];
    return results[Math.floor(Math.random() * results.length)];
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            ← Voltar ao HUB
          </Button>
          
          <Card className="text-center">
            <motion.div
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white font-cyber neon-text mb-2">
              Orquestrador de IA
            </h1>
            <p className="text-accent-300">
              Digite comandos em linguagem natural para automatizar tarefas
            </p>
          </Card>
        </div>

        {/* Command Input */}
        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Ex: 'Criar um post sobre tendências de IA para o Instagram' ou 'Enviar relatório semanal por email'"
                className="w-full h-32 p-4 glass rounded-lg border border-white/20 bg-white/5 text-white placeholder-accent-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
                disabled={isProcessing}
              />
              <Sparkles className="absolute top-4 right-4 w-5 h-5 text-accent-400" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-accent-400">
                {command.length}/500 caracteres
              </div>
              <Button
                type="submit"
                variant="primary"
                disabled={!command.trim() || isProcessing}
                isLoading={isProcessing}
                icon={<Send className="w-4 h-4" />}
              >
                Executar Comando
              </Button>
            </div>
          </form>

          {/* Quick Commands */}
          <div className="mt-6 border-t border-white/10 pt-6">
            <h3 className="text-sm font-medium text-accent-200 mb-3">Comandos Rápidos:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'Criar post sobre [tema] para Instagram',
                'Agendar reunião para [data/hora]',
                'Enviar relatório mensal por email',
                'Adicionar lead [nome] no CRM',
                'Gerar conteúdo para blog sobre [tema]',
                'Publicar story no Instagram'
              ].map((quickCommand, index) => (
                <button
                  key={index}
                  onClick={() => setCommand(quickCommand)}
                  className="text-left p-2 text-sm text-accent-400 hover:text-white hover:bg-white/5 rounded transition-colors"
                  disabled={isProcessing}
                >
                  {quickCommand}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Tasks History */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Histórico de Tarefas</h2>
            <span className="text-sm text-accent-400">
              {tasks.length} tarefas executadas
            </span>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="p-2 rounded-full bg-white/10">
                        {getTaskIcon(task.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{task.command}</p>
                        {task.result && (
                          <p className="text-success-400 text-sm mt-1">{task.result}</p>
                        )}
                        <p className="text-accent-400 text-xs mt-2">
                          {task.timestamp.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {getStatusIcon(task.status)}
                      <span className="text-xs text-accent-400 capitalize">
                        {task.status === 'processing' ? 'Processando' : 
                         task.status === 'completed' ? 'Concluído' :
                         task.status === 'error' ? 'Erro' : 'Pendente'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {tasks.length === 0 && (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-accent-500 mx-auto mb-4" />
                <p className="text-accent-400">Nenhuma tarefa executada ainda</p>
                <p className="text-accent-500 text-sm">Digite seu primeiro comando acima</p>
              </div>
            )}
          </div>
        </Card>

        {/* Integration Status */}
        <Card className="mt-8">
          <h3 className="text-lg font-bold text-white mb-4">Integrações Ativas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'OpenAI GPT', status: 'connected', icon: Brain },
              { name: 'Instagram API', status: 'connected', icon: Instagram },
              { name: 'Gmail API', status: 'connected', icon: Mail },
              { name: 'Google Calendar', status: 'disconnected', icon: Calendar }
            ].map((integration, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 glass rounded-lg border border-white/10"
              >
                <integration.icon className="w-5 h-5 text-accent-400" />
                <div>
                  <p className="text-white text-sm font-medium">{integration.name}</p>
                  <p className={`text-xs ${
                    integration.status === 'connected' ? 'text-success-400' : 'text-danger-400'
                  }`}>
                    {integration.status === 'connected' ? 'Conectado' : 'Desconectado'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIOrchestrator;