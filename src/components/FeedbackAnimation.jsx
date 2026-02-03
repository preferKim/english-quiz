import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const FeedbackAnimation = ({ type, answer, correctAnswer }) => {
    const variants = {
        correct: {
            initial: { scale: 0, rotate: -180 },
            animate: {
                scale: 1,
                rotate: 0,
                transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                }
            },
        },
        wrong: {
            initial: { scale: 0, x: 0 },
            animate: {
                scale: 1,
                x: [0, -10, 10, -10, 10, 0],
                transition: {
                    scale: { duration: 0.3 },
                    x: { duration: 0.5, delay: 0.1 },
                }
            },
        },
        timeout: {
            initial: { scale: 0, opacity: 0 },
            animate: {
                scale: 1,
                opacity: 1,
                transition: { duration: 0.3 }
            },
        },
    };

    const config = {
        correct: {
            icon: CheckCircle,
            color: 'text-success-light',
            bgColor: 'bg-success-dark/20',
            title: '정답! 🎉',
            message: answer,
        },
        wrong: {
            icon: XCircle,
            color: 'text-danger-light',
            bgColor: 'bg-danger-dark/20',
            title: '아쉬워요! 😢',
            message: `정답: ${correctAnswer}`,
            userAnswer: `선택: ${answer}`,
        },
        timeout: {
            icon: Clock,
            color: 'text-speed-light',
            bgColor: 'bg-speed-dark/20',
            title: '시간 초과! ⏰',
            message: `정답: ${correctAnswer}`,
        },
    };

    const current = config[type];
    const Icon = current.icon;

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={variants[type]}
            className="flex flex-col items-center justify-center"
        >
            <motion.div
                className={`${current.bgColor} rounded-full p-6 mb-4`}
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 0.6,
                    repeat: type === 'correct' ? 2 : 0,
                }}
            >
                <Icon size={64} className={current.color} />
            </motion.div>
            <motion.h2
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {current.title}
            </motion.h2>
            <motion.p
                className="text-xl text-gray-200 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {current.message}
            </motion.p>
            {current.userAnswer && (
                <motion.p
                    className="text-sm text-gray-400 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {current.userAnswer}
                </motion.p>
            )}
        </motion.div>
    );
};

export default FeedbackAnimation;
