import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  gradient?: boolean;
  neon?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
  gradient = false,
  neon = false
}) => {
  const baseClasses = 'glass rounded-xl p-6 shadow-2xl transition-all duration-300';
  const hoverClasses = hover ? 'hover:transform hover:scale-105 hover:bg-white/10 cursor-pointer' : '';
  const gradientClasses = gradient ? 'bg-gradient-to-br from-primary-500/10 to-accent-500/10' : '';
  const neonClasses = neon ? 'neon-border' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { scale: 1.05, y: -5 } : {}}
      className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${neonClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;