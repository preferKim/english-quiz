import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ParticleButton = ({ children, onClick, className = '', ...props }) => {
    const [particles, setParticles] = useState([]);

    const createParticles = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newParticles = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            x,
            y,
            angle: (Math.PI * 2 * i) / 8,
        }));

        setParticles(prev => [...prev, ...newParticles]);

        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 1000);
    };

    const handleClick = (e) => {
        createParticles(e);
        if (onClick) onClick(e);
    };

    return (
        <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden ${className}`}
            {...props}
        >
            {children}

            <AnimatePresence>
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        className="absolute w-2 h-2 rounded-full pointer-events-none"
                        style={{
                            left: particle.x,
                            top: particle.y,
                            background: 'radial-gradient(circle, rgba(102, 126, 234, 1) 0%, rgba(102, 126, 234, 0) 70%)',
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                            scale: [0, 1.5, 0],
                            opacity: [1, 0.8, 0],
                            x: Math.cos(particle.angle) * 50,
                            y: Math.sin(particle.angle) * 50,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                ))}
            </AnimatePresence>
        </motion.button>
    );
};

export default ParticleButton;
