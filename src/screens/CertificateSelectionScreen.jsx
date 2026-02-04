import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Database, Layout, Code2, Server, Layers } from 'lucide-react';
import HeaderSection from '../components/HeaderSection';
import PageTransition from '../components/PageTransition';

const subjects = [
    {
        id: 1,
        title: '1과목: 소프트웨어 설계',
        icon: <Layout size={24} />,
        description: '요구사항 확인, 화면 설계, 애플리케이션 설계',
        color: 'text-blue-400',
        borderColor: 'border-blue-500/50',
        bgColor: 'bg-blue-500/10'
    },
    {
        id: 2,
        title: '2과목: 소프트웨어 개발',
        icon: <Code2 size={24} />,
        description: '데이터 입출력, 인터페이스, 테스트 관리',
        color: 'text-green-400',
        borderColor: 'border-green-500/50',
        bgColor: 'bg-green-500/10'
    },
    {
        id: 3,
        title: '3과목: 데이터베이스 구축',
        icon: <Database size={24} />,
        description: 'SQL 응용, 설계, 데이터 전환',
        color: 'text-yellow-400',
        borderColor: 'border-yellow-500/50',
        bgColor: 'bg-yellow-500/10'
    },
    {
        id: 4,
        title: '4과목: 프로그래밍 언어 활용',
        icon: <Server size={24} />,
        description: '서버 프로그램, 언어 특성, 운영체제',
        color: 'text-red-400',
        borderColor: 'border-red-500/50',
        bgColor: 'bg-red-500/10'
    },
    {
        id: 5,
        title: '5과목: 정보시스템 구축 관리',
        icon: <Layers size={24} />,
        description: '프로젝트 관리, 보안, 시스템 인프라',
        color: 'text-purple-400',
        borderColor: 'border-purple-500/50',
        bgColor: 'bg-purple-500/10'
    }
];

const CertificateSelectionScreen = ({ user, onSignUp, onLogin, onLogout }) => {
    const navigate = useNavigate();

    const handleSubjectSelect = (subjectId) => {
        navigate('/certificate/quiz', { state: { subjectId } });
    };

    const handleFullExam = () => {
        navigate('/certificate/quiz', { state: { subjectId: 'all' } });
    };

    return (
        <PageTransition>
            <div className="glass-card p-6 sm:p-8 text-center relative max-w-4xl w-full mx-auto min-h-[80vh]">
                <div className="absolute top-4 left-4 z-10">
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm font-semibold text-gray-200 hover:text-white px-3 py-1.5 rounded-full border border-white/40 hover:border-white/80 bg-black/20 hover:bg-black/40 transition-all flex items-center"
                    >
                        <ArrowLeft size={16} className="mr-1" /> 홈으로
                    </button>
                </div>

                <HeaderSection
                    onSignUp={onSignUp}
                    onLogin={onLogin}
                    onLogout={onLogout}
                    user={user}
                />

                <div className="mt-12 mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">정보처리기사 필기</h1>
                    <p className="text-gray-300">과목별 학습 또는 모의고사를 선택하세요.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {subjects.map((subject) => (
                        <button
                            key={subject.id}
                            onClick={() => handleSubjectSelect(subject.id)}
                            className={`group relative overflow-hidden rounded-xl p-6 text-left transition-all hover:scale-[1.02] border border-white/10 hover:border-white/30 bg-black/20 hover:bg-white/5`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${subject.bgColor} ${subject.color}`}>
                                    {subject.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary-light transition-colors">
                                        {subject.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">{subject.description}</p>
                                    <div className="mt-3 flex items-center text-xs text-gray-500">
                                        <span>20문제</span>
                                        <span className="mx-2">•</span>
                                        <span>30분</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}

                    {/* 전체 모의고사 버튼 (마지막에 추가) */}
                    <button
                        onClick={handleFullExam}
                        className="md:col-span-1 group relative overflow-hidden rounded-xl p-6 text-left transition-all hover:scale-[1.02] border-2 border-primary/50 hover:border-primary bg-primary/10 hover:bg-primary/20"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-primary/20 text-primary-light">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">
                                    전체 모의고사
                                </h3>
                                <p className="text-sm text-gray-300">실전처럼 5과목 전체 응시</p>
                                <div className="mt-3 flex items-center text-xs text-gray-300">
                                    <span>100문제</span>
                                    <span className="mx-2">•</span>
                                    <span>2시간 30분</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </PageTransition>
    );
};

export default CertificateSelectionScreen;
