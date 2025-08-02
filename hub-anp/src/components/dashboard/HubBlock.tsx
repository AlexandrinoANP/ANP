import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui';

interface HubBlockProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  notifications?: number;
  isActive?: boolean;
  onClick: () => void;
}

const HubBlock: React.FC<HubBlockProps> = ({
  title,
  description,
  icon: Icon,
  color,
  notifications = 0,
  isActive = false,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Card
        onClick={onClick}
        hover
        gradient
        neon={isActive}
        className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
          isActive ? 'ring-2 ring-primary-500' : ''
        }`}
      >
        {/* Background Pattern */}
        <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${color}`} />
        
        {/* Notification Badge */}
        {notifications > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-danger-500 text-white text-xs font-bold rounded-full flex items-center justify-center z-10 animate-pulse"
          >
            {notifications > 99 ? '99+' : notifications}
          </motion.div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} flex items-center justify-center mb-4 mx-auto`}>
            <Icon className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 text-center font-cyber">
            {title}
          </h3>

          {/* Description */}
          <p className="text-accent-300 text-sm text-center leading-relaxed">
            {description}
          </p>

          {/* Status Indicator */}
          <div className="flex items-center justify-center mt-4">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-success-500 animate-pulse' : 'bg-accent-500'}`} />
            <span className="text-xs text-accent-400 ml-2">
              {isActive ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>

        {/* Hover Effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

export default HubBlock;