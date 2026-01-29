import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { ArrowLeft, BookOpen } from 'lucide-react';

const LiteraryTermsScreen = ({ onBackToSelection }) => {
    const [terms, setTerms] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState(null); // null means showing list, object means showing detail

    useEffect(() => {
        // Fetch literary terms from the JSON file
        fetch('/words/korean_literary_terms.json')
            .then(res => res.json())
            .then(data => setTerms(data))
            .catch(error => console.error("Failed to load literary terms:", error));
    }, []);

    if (terms.length === 0) {
        return (
            <div className="glass-card p-6 sm:p-12 text-center">
                <p className="text-white text-xl">문학 개념어를 불러오는 중입니다...</p>
            </div>
        );
    }

    // Detail View
    if (selectedTerm) {
        return (
            <div className="glass-card p-4 sm:p-8 text-center relative flex flex-col items-center max-w-2xl mx-auto">
                {/* Header for detail view */}
                <div className="w-full flex justify-between items-center mb-4">
                    <div className="w-1/4 text-left">
                        <button
                            onClick={() => setSelectedTerm(null)} // Back to list
                            className="text-gray-200 hover:text-white transition p-2"
                            title="목록으로"
                            aria-label="Back to literary terms list"
                        >
                            <ArrowLeft size={24} />
                        </button>
                    </div>
                    <div className="w-1/2 text-center">
                        <h2 className="text-2xl font-bold text-white">개념어 상세</h2>
                    </div>
                    <div className="w-1/4 text-right">
                        {/* Empty for now, could add search or other actions */}
                    </div>
                </div>

                {/* Term Card */}
                <div className="glass-card p-6 sm:p-8 rounded-lg mb-6 w-full text-left">
                    <h3 className="text-3xl font-bold text-primary-light mb-4">{selectedTerm.term}</h3>
                    <p className="text-lg text-gray-200 mb-6 leading-relaxed">{selectedTerm.description}</p>
                    
                    {selectedTerm.examples && selectedTerm.examples.length > 0 && (
                        <div className="border-t border-white/20 pt-4 mt-4">
                            <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <BookOpen size={20} className="mr-2 text-yellow-400" /> 예시
                            </h4>
                            {selectedTerm.examples.map((example, index) => (
                                <div key={index} className="mb-4 last:mb-0 p-3 bg-black/10 rounded-md">
                                    <p className="text-md text-gray-100 italic">"{example.quote}"</p>
                                    {example.source && <p className="text-sm text-gray-400">- {example.source}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // List View
    return (
        <div className="glass-card p-4 sm:p-8 text-center relative flex flex-col items-center max-w-2xl mx-auto">
            {/* Header for list view */}
            <div className="w-full flex justify-between items-center mb-4">
                <div className="w-1/4 text-left">
                    <button
                        onClick={onBackToSelection} // Go back to Korean selection screen
                        className="text-gray-200 hover:text-white transition p-2"
                        title="국어 선택으로"
                        aria-label="Back to Korean selection screen"
                    >
                        <ArrowLeft size={24} />
                    </button>
                </div>
                <div className="w-1/2 text-center">
                    <h2 className="text-2xl font-bold text-white">문학 개념어 사전</h2>
                </div>
                <div className="w-1/4 text-right">
                    {/* Empty for now */}
                </div>
            </div>

            {/* Terms List */}
            <div className="grid grid-cols-2 gap-4 w-full"> {/* Always 2 columns for terms */}
                {terms.map((term, index) => (
                    <Button 
                        key={index} 
                        onClick={() => setSelectedTerm(term)}
                        variant="threedee" 
                        color="normal" // Using 'normal' color for term buttons
                        className="w-full h-24 text-xl flex items-center justify-center"
                    >
                        {term.term.split(' ')[0]} {/* Display only the Korean term */}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default LiteraryTermsScreen;
