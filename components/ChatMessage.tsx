import React from 'react';
import type { ChatMessage as ChatMessageType, Visual, VisualType } from '../types';
import { DashboardMockup } from './DashboardMockup';

interface ChatMessageProps {
  message: ChatMessageType;
}

const parseDashboardMockup = (content: string): { title: string; visuals: Visual[] } | null => {
    const dashboardRegex = /^\s*\+-{10,}\+\n/m;
    if (!dashboardRegex.test(content)) {
        return null;
    }
    
    const titleRegex = /\|\s*(.+?Dashboard.+?)\s*\|/
    const titleMatch = content.match(titleRegex);

    if (!titleMatch) {
        return null;
    }
    
    const title = titleMatch[1].trim();
    
    const visualRegex = /\[\s*(Card|Line Chart|Bar Chart|Area Chart|Map|Table\/Matrix):\s*([^\]]+)\s*\]/g;
    const visuals: Visual[] = [];
    let match;
    while ((match = visualRegex.exec(content)) !== null) {
        visuals.push({
            type: match[1] as VisualType,
            title: match[2].trim()
        });
    }

    if (visuals.length === 0) return null;

    return { title, visuals };
};


const renderContent = (content: string) => {
    const dashboardData = parseDashboardMockup(content);
    if (dashboardData) {
        return <DashboardMockup title={dashboardData.title} visuals={dashboardData.visuals} />;
    }

    const codeBlockRegex = /(```(\w+)?\n[\s\S]*?\n```)/g;
    const parts = content.split(codeBlockRegex);

    return parts.filter(part => part && part.trim() !== '').map((part, index) => {
        if (codeBlockRegex.test('```' + part.split('```')[1] + '```')) {
             const languageMatch = part.match(/```(\w+)?\n/);
             const language = languageMatch ? languageMatch[1] : '';
             const code = part.replace(/```(\w+)?\n/, '').replace(/```/, '');
            
            return (
                <div key={index} className="relative bg-slate-900/70 rounded-xl my-4 border border-slate-700">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 rounded-t-xl">
                        <span className="text-xs font-mono text-slate-400 uppercase">{language || 'Code'}</span>
                         <button 
                            onClick={() => navigator.clipboard.writeText(code)} 
                            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                         >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" /></svg>
                            Copy
                        </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm text-slate-200">
                        <code>{code.trim()}</code>
                    </pre>
                </div>
            );
        }

        return part.split('\n').map((line, lineIndex) => {
            if (line.trim() === '') return null;

            let styledLine = line
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-100">$1</strong>')
                .replace(/`(.*?)`/g, '<code class="bg-slate-700/50 text-cyan-300 rounded px-1.5 py-0.5 text-sm font-mono">$1</code>');
            
            const specialIcons = ['🧩', '⚙️', '📈', '🧠', '🎨', '🖼️', '💬'];
            const startingIcon = specialIcons.find(icon => line.trim().startsWith(icon));

            if (startingIcon) {
                const contentWithoutIcon = styledLine.trim().substring(startingIcon.length).trim();
                return <p key={`${index}-${lineIndex}`} className="flex items-start my-3" dangerouslySetInnerHTML={{ __html: `<span class="text-2xl mr-3">${startingIcon}</span><span class="pt-1">${contentWithoutIcon}</span>` }}></p>;
            }

            if (/^\s*[-*]\s/.test(line)) {
                return <li key={`${index}-${lineIndex}`} className="ml-6 my-1" dangerouslySetInnerHTML={{ __html: styledLine.replace(/^\s*[-*]\s/, '') }}></li>;
            }

            return <p key={`${index}-${lineIndex}`} className="my-1.5" dangerouslySetInnerHTML={{ __html: styledLine }}></p>;
        });
    });
};


export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';
  
  if (!message.content && isModel && !message.attachment) {
    return null;
  }

  const avatar = isModel ? (
    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    </div>
  ) : (
    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-600 text-slate-300 font-semibold text-sm">
      U
    </div>
  );

  const containerClass = isModel 
    ? (message.isError ? 'bg-red-900/30 border-red-700/50' : 'bg-slate-800/50')
    : 'bg-blue-900/30';
  
  const textColor = message.isError ? 'text-red-300' : 'text-slate-300';

  return (
    <div className="flex items-start gap-4 animate-fade-in">
       {avatar}
      <div className={`w-full p-5 rounded-xl border border-slate-800 ${containerClass}`}>
        <div className={`prose prose-invert prose-sm max-w-none leading-relaxed ${textColor}`}>
            {renderContent(message.content)}
        </div>
        {!isModel && message.attachment && (
            <div className="mt-4 p-2 bg-slate-700/50 border border-slate-700 rounded-lg flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-300 truncate" title={message.attachment.name}>{message.attachment.name}</span>
            </div>
        )}
      </div>
    </div>
  );
};