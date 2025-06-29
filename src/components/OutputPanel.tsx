import React from 'react';
import { Terminal, X, Trash2 } from 'lucide-react';

interface OutputPanelProps {
  isDarkMode: boolean;
  output: string;
  isVisible: boolean;
  onClose: () => void;
  onClear: () => void;
  isRunning: boolean;
}

export default function OutputPanel({ 
  isDarkMode, 
  output, 
  isVisible, 
  onClose, 
  onClear,
  isRunning 
}: OutputPanelProps) {
  if (!isVisible) return null;

  return (
    <div className={`
      border-t transition-all duration-300 h-64 flex flex-col
      ${isDarkMode 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
      }
    `}>
      {/* Output Header */}
      <div className={`
        flex items-center justify-between px-4 py-3 border-b transition-colors duration-300
        ${isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gray-50 border-gray-200'
        }
      `}>
        <div className="flex items-center space-x-3">
          <Terminal className={`
            h-4 w-4 transition-colors duration-300
            ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          `} />
          <span className={`
            text-sm font-medium transition-colors duration-300
            ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
          `}>
            Output
          </span>
          {isRunning && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`
                text-xs transition-colors duration-300
                ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
              `}>
                Running...
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onClear}
            className={`
              p-1.5 rounded transition-all duration-300 hover:scale-105
              ${isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
              }
            `}
            title="Clear Output"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          
          <button
            onClick={onClose}
            className={`
              p-1.5 rounded transition-all duration-300 hover:scale-105
              ${isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
              }
            `}
            title="Close Output"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Output Content */}
      <div className="flex-1 overflow-auto">
        <pre className={`
          p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap transition-colors duration-300
          ${isDarkMode 
            ? 'text-gray-100 bg-gray-900' 
            : 'text-gray-900 bg-white'
          }
        `}>
          {output || (
            <span className={`
              transition-colors duration-300
              ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}
            `}>
              Click "Run" to execute your code...
            </span>
          )}
        </pre>
      </div>
    </div>
  );
}