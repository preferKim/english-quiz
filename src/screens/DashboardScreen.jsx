import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Target, Award, Brain, Trash2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';

const DashboardScreen = () => {
    const navigate = useNavigate();
    const { level, xp, xpGainedInCurrentLevel, xpRequiredForCurrentLevel, getWeakWordsList, removeWeakWord, clearWeakWords } = usePlayer();

    const weakWordsList = getWeakWordsList();
    const accuracy = 100; // TODO: Calculate from actual game data

    const StatCard = ({ icon: Icon, title, value, color = 'primary' }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 text-center"
        >
            <div className={`flex justify-center mb-3`}>
                <Icon size={32} className={`text-${color}-light`} />
            </div>
            <div className={`text-4xl font-bold text-${color}-light mb-2`}>
                {value}
            </div>
            <div className="text-sm text-gray-300">{title}</div>
        </motion.div>
    );

    const handleWeakWordsQuiz = () => {
        if (weakWordsList.length === 0) {
            alert('약점 단어가 없습니다! 🎉');
            return;
        }
        // TODO: Navigate to weak words quiz with filtered words
        navigate('/game', {
            state: {
                name: 'Weak Words Practice',
                level: 'custom',
                mode: 'normal',
                customWords: weakWordsList
            }
        });
    };

    return (
        <PageTransition className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm font-semibold text-gray-200 hover:text-white px-3 py-1.5 rounded-full border border-white/40 hover:border-white/80 bg-black/20 hover:bg-black/40 transition-all flex items-center"
                    >
                        <ArrowLeft size={16} className="mr-1" /> 홈으로
                    </button>
                    <h1 className="text-3xl font-bold text-white">학습 대시보드</h1>
                    <div className="w-20"></div> {/* Spacer for centering */}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <StatCard
                        icon={Award}
                        title="현재 레벨"
                        value={level}
                        color="primary"
                    />
                    <StatCard
                        icon={TrendingUp}
                        title="총 경험치"
                        value={xp}
                        color="success"
                    />
                    <StatCard
                        icon={Target}
                        title="정답률"
                        value={`${accuracy}%`}
                        color="speed"
                    />
                    <StatCard
                        icon={Brain}
                        title="약점 단어"
                        value={weakWordsList.length}
                        color="danger"
                    />
                </div>

                {/* Progress Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 mb-6"
                >
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-bold text-white">레벨 진행도</h2>
                        <span className="text-gray-300">
                            {xpGainedInCurrentLevel} / {xpRequiredForCurrentLevel} XP
                        </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(xpGainedInCurrentLevel / xpRequiredForCurrentLevel) * 100}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-primary to-success rounded-full"
                        />
                    </div>
                </motion.div>

                {/* Weak Words Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Brain size={24} className="text-danger-light" />
                            약점 단어 Top 20
                        </h2>
                        {weakWordsList.length > 0 && (
                            <button
                                onClick={() => {
                                    if (confirm('모든 약점 단어를 삭제하시겠습니까?')) {
                                        clearWeakWords();
                                    }
                                }}
                                className="text-sm text-gray-400 hover:text-danger-light transition flex items-center gap-1"
                            >
                                <Trash2 size={16} />
                                전체 삭제
                            </button>
                        )}
                    </div>

                    {weakWordsList.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🎉</div>
                            <p className="text-xl text-gray-300 mb-2">약점 단어가 없습니다!</p>
                            <p className="text-sm text-gray-400">완벽해요! 계속 학습을 이어가세요.</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
                                {weakWordsList.map((word, index) => (
                                    <motion.div
                                        key={word.english}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-2xl font-bold text-white">
                                                    {word.english}
                                                </span>
                                                <span className="text-sm bg-danger/20 text-danger-light px-2 py-1 rounded-full">
                                                    {word.count}회 오답
                                                </span>
                                            </div>
                                            <div className="text-lg text-gray-300">{word.korean}</div>
                                            {word.pronunciation && (
                                                <div className="text-sm text-primary-light font-mono">
                                                    {word.pronunciation}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => removeWeakWord(word.english)}
                                            className="text-gray-400 hover:text-danger-light transition p-2"
                                            aria-label="삭제"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>

                            <Button
                                onClick={handleWeakWordsQuiz}
                                variant="threedee"
                                color="danger"
                                className="w-full flex items-center justify-center gap-2"
                            >
                                <Brain size={20} />
                                약점 단어 집중 학습 시작
                            </Button>
                        </>
                    )}
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default DashboardScreen;
