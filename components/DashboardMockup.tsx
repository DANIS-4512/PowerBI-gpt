import React from 'react';
import type { Visual, VisualType } from '../types';

interface DashboardMockupProps {
  title: string;
  visuals: Visual[];
}

// Icon components for different visual types
const CardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const LineChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const BarChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const TableIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;

const getIcon = (type: VisualType) => {
    switch(type) {
        case 'Card': return <CardIcon />;
        case 'Line Chart':
        case 'Area Chart':
            return <LineChartIcon />;
        case 'Bar Chart': return <BarChartIcon />;
        case 'Table/Matrix': return <TableIcon />;
        case 'Map': return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
        default: return <BarChartIcon />; // Default icon
    }
}

const VisualElement: React.FC<{ visual: Visual, className?: string }> = ({ visual, className }) => (
    <div className={`bg-slate-800/60 border border-slate-700/80 rounded-lg p-3 flex flex-col items-center justify-center text-center ${className}`}>
        <div className="mb-2">{getIcon(visual.type)}</div>
        <p className="text-xs text-slate-300 font-medium">{visual.type}</p>
        <p className="text-xs text-slate-400 mt-1">{visual.title}</p>
    </div>
);

export const DashboardMockup: React.FC<DashboardMockupProps> = ({ title, visuals }) => {
    const kpis = visuals.filter(v => v.type === 'Card');
    const charts = visuals.filter(v => v.type !== 'Card' && v.type !== 'Table/Matrix');
    const tables = visuals.filter(v => v.type === 'Table/Matrix');
    
    return (
        <div className="bg-slate-900/80 rounded-xl my-4 border border-slate-700 p-4 font-sans shadow-lg">
            <h3 className="text-center font-bold text-base text-slate-200 pb-3 mb-4 border-b border-slate-700">{title}</h3>
            
            {kpis.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {kpis.map((kpi, index) => <VisualElement key={`kpi-${index}`} visual={kpi} />)}
                </div>
            )}
            
            {charts.length > 0 && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {charts.map((chart, index) => <VisualElement key={`chart-${index}`} visual={chart} className="min-h-[120px]" />)}
                </div>
            )}
            
            {tables.length > 0 && (
                <div className="grid grid-cols-1 gap-3">
                    {tables.map((table, index) => <VisualElement key={`table-${index}`} visual={table} className="min-h-[100px]" />)}
                </div>
            )}
        </div>
    );
};