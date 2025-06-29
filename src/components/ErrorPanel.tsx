import React from 'react';
import { AlertTriangle, X, CheckCircle, Info } from 'lucide-react';

interface ErrorInfo {
  line?: number;
  column?: number;
  message: string;
  type: 'error' | 'warning' | 'info';
  rule?: string;
}

interface ErrorPanelProps {
  isDarkMode: boolean;
  errors: ErrorInfo[];
  isVisible: boolean;
  onClose: () => void;
}

export default function ErrorPanel({ isDarkMode, errors, isVisible, onClose }: ErrorPanelProps) {
  if (!isVisible) return null;

  const errorCount = errors.filter(e => e.type === 'error').length;
  const warningCount = errors.filter(e => e.type === 'warning').length;
  const infoCount = errors.filter(e => e.type === 'info').length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className={`
      border-t transition-all duration-300 h-48 flex flex-col
      ${isDarkMode 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
      }
    `}>
      {/* Error Panel Header */}
      <div className={`
        flex items-center justify-between px-4 py-3 border-b transition-colors duration-300
        ${isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gray-50 border-gray-200'
        }
      `}>
        <div className="flex items-center space-x-4">
          <span className={`
            text-sm font-medium transition-colors duration-300
            ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
          `}>
            Problems
          </span>
          
          <div className="flex items-center space-x-4 text-xs">
            {errorCount > 0 && (
              <span className="flex items-center space-x-1">
                <AlertTriangle className="h-3 w-3 text-red-500" />
                <span className="text-red-500">{errorCount}</span>
              </span>
            )}
            {warningCount > 0 && (
              <span className="flex items-center space-x-1">
                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                <span className="text-yellow-500">{warningCount}</span>
              </span>
            )}
            {infoCount > 0 && (
              <span className="flex items-center space-x-1">
                <Info className="h-3 w-3 text-blue-500" />
                <span className="text-blue-500">{infoCount}</span>
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={onClose}
          className={`
            p-1.5 rounded transition-all duration-300 hover:scale-105
            ${isDarkMode 
              ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            }
          `}
          title="Close Problems Panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Error List */}
      <div className="flex-1 overflow-auto">
        {errors.length === 0 ? (
          <div className={`
            flex items-center justify-center h-full text-sm
            ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}
          `}>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No problems detected</span>
            </div>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {errors.map((error, index) => (
              <div
                key={index}
                className={`
                  flex items-start space-x-3 p-2 rounded transition-colors duration-300 hover:bg-opacity-50
                  ${error.type === 'error' 
                    ? isDarkMode ? 'hover:bg-red-900' : 'hover:bg-red-50'
                    : error.type === 'warning'
                    ? isDarkMode ? 'hover:bg-yellow-900' : 'hover:bg-yellow-50'
                    : isDarkMode ? 'hover:bg-blue-900' : 'hover:bg-blue-50'
                  }
                `}
              >
                {getIcon(error.type)}
                <div className="flex-1 min-w-0">
                  <div className={`
                    text-sm transition-colors duration-300
                    ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
                  `}>
                    {error.message}
                  </div>
                  {(error.line || error.rule) && (
                    <div className={`
                      text-xs mt-1 transition-colors duration-300
                      ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                      {error.line && `Line ${error.line}${error.column ? `:${error.column}` : ''}`}
                      {error.rule && ` • ${error.rule}`}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}