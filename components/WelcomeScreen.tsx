import React from 'react';

interface WelcomeScreenProps {
    onSendMessage: (message: string) => void;
}

const examplePrompts = [
    "Visualize sales trends over time from this Excel file.",
    "Create and render charts for profit vs. region and customer growth.",
    "Show me a Power BI dashboard layout for marketing performance.",
    "Explain DAX filter propagation visually.",
    "I uploaded a PBIX file — generate a visual summary of my top metrics.",
    "Make an infographic-style summary of the insights in my dataset."
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSendMessage }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full py-16 animate-fade-in">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-6 shadow-2xl shadow-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            </div>
            <h2 className="text-4xl font-bold text-slate-100 mb-2">PowerBI-VisualGPT</h2>
            <p className="text-slate-400 mb-12 max-w-lg">
                Your AI expert for rendering charts, dashboard layouts, and data storytelling visuals.
                Upload a file or try an example to get started.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                {examplePrompts.map((prompt, index) => (
                    <button
                        key={index}
                        onClick={() => onSendMessage(prompt)}
                        className="p-4 bg-slate-800/50 border border-slate-700/80 rounded-xl text-left hover:bg-slate-800 hover:border-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                    >
                        <p className="text-sm text-slate-300">{prompt}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};