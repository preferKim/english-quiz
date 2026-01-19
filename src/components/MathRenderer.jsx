import React from 'react';
import { InlineMath } from 'react-katex';

const MathRenderer = ({ text }) => {
    if (!text) return null;

    // This regex will not work for nested math expressions, but it is a good starting point.
    const parts = text.split('$');
    
    return (
        <>
            {parts.map((part, index) => {
                if (index % 2 === 1) {
                    // This is a math part
                    return <InlineMath key={index} math={part} />;
                } else {
                    // This is a text part
                    return <span key={index}>{part}</span>;
                }
            })}
        </>
    );
};

export default MathRenderer;
