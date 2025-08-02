'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Phone, Camera, Shield, Sparkles } from 'lucide-react';
import { Button, Card } from '@/components/ui';

interface LoginFormProps {
  onLogin: (data: LoginData) => void;
  onRegister: (data: RegisterData) => void;
  isLoading?: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  photo?: File;
  document?: File;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister, isLoading = false }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [files, setFiles] = useState({
    photo: null as File | null,
    document: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'document') => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [type]: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin({ email: formData.email, password: formData.password });
    } else {
      onRegister({
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        photo: files.photo || undefined,
        document: files.document || undefined
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md" neon gradient>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white font-cyber neon-text">
              HUB ANP
            </h1>
            <p className="text-accent-300 mt-2">
              {isLogin ? 'Acesse sua identidade digital' : 'Crie sua identidade autenticada'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-accent-200">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 glass rounded-lg border border-white/20 bg-white/5 text-white placeholder-accent-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Phone (only for register) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-accent-200">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 glass rounded-lg border border-white/20 bg-white/5 text-white placeholder-accent-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-accent-200">
                Senha
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 glass rounded-lg border border-white/20 bg-white/5 text-white placeholder-accent-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (only for register) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-accent-200">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 glass rounded-lg border border-white/20 bg-white/5 text-white placeholder-accent-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="Confirme sua senha"
                    required
                  />
                </div>
              </div>
            )}

            {/* File Uploads (only for register) */}
            {!isLogin && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-accent-200">
                      Foto/Selfie
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'photo')}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="w-full h-20 glass rounded-lg border border-white/20 bg-white/5 flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors"
                      >
                        <Camera className="w-6 h-6 text-accent-400" />
                      </label>
                      {files.photo && (
                        <p className="text-xs text-success-400 mt-1">
                          {files.photo.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-accent-200">
                      Documento
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'document')}
                        className="hidden"
                        id="document-upload"
                      />
                      <label
                        htmlFor="document-upload"
                        className="w-full h-20 glass rounded-lg border border-white/20 bg-white/5 flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors"
                      >
                        <Shield className="w-6 h-6 text-accent-400" />
                      </label>
                      {files.document && (
                        <p className="text-xs text-success-400 mt-1">
                          {files.document.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-accent-400 text-center">
                  Upload necessário para validação de identidade digital
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              {isLogin ? 'Não tem conta? Criar agora' : 'Já tem conta? Entrar'}
            </button>
          </div>

          {/* Forgot Password (only for login) */}
          {isLogin && (
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-sm text-accent-400 hover:text-accent-300 transition-colors"
              >
                Esqueceu a senha?
              </button>
            </div>
          )}
        </motion.div>
      </Card>
    </div>
  );
};

export default LoginForm;