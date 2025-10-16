// Fix: Removed the import of `Visual` from './components/DashboardMockup' to resolve a circular dependency.
// The `Visual` interface is defined and exported within this file, making the original import incorrect.

export type Role = 'user' | 'model';

export type VisualType = 'Card' | 'Line Chart' | 'Bar Chart' | 'Area Chart' | 'Map' | 'Table/Matrix' | 'Unknown';

export interface Visual {
  type: VisualType;
  title: string;
}

export interface ChatMessage {
  role: Role;
  content: string;
  attachment?: {
    name: string;
    type: string;
  };
  isError?: boolean;
}