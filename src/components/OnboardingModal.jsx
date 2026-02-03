import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Gamepad2, Keyboard, Volume2 } from 'lucide-react';
import Button from './Button';

const OnboardingModal = ({ onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            icon: <Gamepad2 size={64} className="text-primary-light" />,
            title: 'Perfect Memory에 오신 것을 환영합니다! 🎉',
            description: '망각 곡선에 맞춘 게임 방식 암기법으로 효과적으로 학습하세요.',
            details: [
                '에빙하우스의 망각 곡선 이론 기반',
                '게임처럼 재미있게 학습',
                '다양한 과목과 난이도 선택',
            ],
        },
        {
            icon: <Keyboard size={64} className="text-success-light" />,
            title: '게임 조작법',
            description: '마우스 드래그 또는 키보드로 답변을 선택하세요.',
            details: [
                '🖱️ 마우스: 중앙 조이스틱을 드래그',
                '⌨️ 키보드: 화살표 키 (↑↓←→)',
                '🔊 Space 키: 발음 다시 듣기',
            ],
        },
        {
            icon: <Volume2 size={64} className="text-danger-light" />,
            title: '게임 모드',
            description: '3가지 모드로 다양하게 학습하세요.',
            details: [
                '🎓 일반 모드: 발음을 듣고 뜻 맞추기',
                '⚡ 경쟁 모드: 100초 안에 최대한 많이!',
                '🔗 연결 모드: 단어와 뜻 연결하기',
            ],
        },
        {
            icon: <span className="text-6xl">🚀</span>,
            title: '준비되셨나요?',
            description: '지금 바로 학습을 시작해보세요!',
            details: [
                '레벨업하며 성장하는 재미',
                '약점 단어 집중 학습',
                '친구들과 경쟁하는 랭킹',
            ],
        },
    ];

    const currentSlideData = slides[currentSlide];

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleComplete = () => {
        localStorage.setItem('hasSeenTutorial', 'true');
        onClose();
    };

    const handleSkip = () => {
        localStorage.setItem('hasSeenTutorial', 'true');
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={handleSkip}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="glass-card p-8 max-w-lg w-full relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={handleSkip}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        aria-label="닫기"
                    >
                        <X size={24} />
                    </button>

                    {/* Slide content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-center"
                        >
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                {currentSlideData.icon}
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl font-bold text-white mb-4">
                                {currentSlideData.title}
                            </h2>

                            {/* Description */}
                            <p className="text-lg text-gray-200 mb-6">
                                {currentSlideData.description}
                            </p>

                            {/* Details */}
                            <div className="bg-white/5 rounded-xl p-6 mb-6 text-left">
                                {currentSlideData.details.map((detail, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3 mb-3 last:mb-0"
                                    >
                                        <span className="text-primary-light text-xl">•</span>
                                        <span className="text-gray-200">{detail}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-2 mb-6">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                                        ? 'bg-primary-light w-8'
                                        : 'bg-white/30 hover:bg-white/50'
                                    }`}
                                aria-label={`슬라이드 ${index + 1}로 이동`}
                            />
                        ))}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex gap-3">
                        {currentSlide > 0 && (
                            <Button
                                onClick={handlePrev}
                                variant="threedee"
                                color="secondary"
                                className="flex-1 flex items-center justify-center gap-2"
                            >
                                <ChevronLeft size={20} />
                                이전
                            </Button>
                        )}
                        <Button
                            onClick={handleNext}
                            variant="threedee"
                            color="primary"
                            className="flex-1 flex items-center justify-center gap-2"
                        >
                            {currentSlide === slides.length - 1 ? '시작하기' : '다음'}
                            {currentSlide < slides.length - 1 && <ChevronRight size={20} />}
                        </Button>
                    </div>

                    {/* Skip button */}
                    {currentSlide < slides.length - 1 && (
                        <button
                            onClick={handleSkip}
                            className="mt-4 text-sm text-gray-400 hover:text-white transition-colors w-full"
                        >
                            건너뛰기
                        </button>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default OnboardingModal;
