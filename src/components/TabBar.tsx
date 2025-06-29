import React from 'react';
import { X, FileText, Circle } from 'lucide-react';

export interface Tab {
  id: string;
  filename: string;
  language: string;
  content: string;
  isDirty: boolean;
  isActive: boolean;
}

interface TabBarProps {
  isDarkMode: boolean;
  tabs: Tab[];
  activeTabId: string;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onNewTab: () => void;
}

export default function TabBar({ 
  isDarkMode, 
  tabs, 
  activeTabId, 
  onTabClick, 
  onTabClose,
  onNewTab 
}: TabBarProps) {
  const getFileIcon = (language: string) => {
    const iconMap: { [key: string]: string } = {
      javascript: '🟨',
      typescript: '🔷',
      python: '🐍',
      html: '🌐',
      css: '🎨',
      scss: '💅',
      json: '📋',
      xml: '📄',
      markdown: '📝',
      yaml: '⚙️',
      sql: '🗃️',
      java: '☕',
      cpp: '⚡',
      c: '🔵',
      csharp: '🔵',
      go: '🐹',
      rust: '🦀',
      php: '🐘',
      ruby: '💎',
      swift: '🍎',
      kotlin: '🎯',
    };
    return iconMap[language] || '📄';
  };

  return (
    <div className={`
      flex items-center border-b transition-all duration-300 min-h-[40px]
      ${isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-gray-100 border-gray-200'
      }
    `}>
      {/* Tabs */}
      <div className="flex-1 flex items-center overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`
              group flex items-center space-x-2 px-4 py-2 border-r cursor-pointer transition-all duration-200 min-w-0 max-w-xs
              ${tab.isActive
                ? isDarkMode 
                  ? 'bg-gray-900 text-white border-gray-600' 
                  : 'bg-white text-gray-900 border-gray-300'
                : isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200'
              }
            `}
            onClick={() => onTabClick(tab.id)}
          >
            <span className="text-sm">{getFileIcon(tab.language)}</span>
            <span className="text-sm font-medium truncate flex-1">
              {tab.filename}
            </span>
            {tab.isDirty && (
              <Circle className="h-2 w-2 fill-current text-blue-500" />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className={`
                opacity-0 group-hover:opacity-100 p-0.5 rounded transition-all duration-200 hover:scale-110
                ${isDarkMode 
                  ? 'hover:bg-gray-600 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-300 text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        
        {/* New Tab Button */}
        <button
          onClick={onNewTab}
          className={`
            flex items-center justify-center w-10 h-10 transition-all duration-200 hover:scale-105
            ${isDarkMode 
              ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            }
          `}
          title="New File"
        >
          <span className="text-lg">+</span>
        </button>
      </div>
    </div>
  );
}