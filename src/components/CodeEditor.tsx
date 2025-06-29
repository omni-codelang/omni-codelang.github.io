import React, { useEffect, useRef } from 'react';
import { Copy, Trash2 } from 'lucide-react';
import SyntaxHighlighter from './SyntaxHighlighter';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  isDarkMode: boolean;
  filename: string;
}

export default function CodeEditor({ code, onChange, language, isDarkMode, filename }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlighterRef = useRef<HTMLDivElement>(null);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  // Sync scroll between textarea and highlighter
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlighterRef.current) {
      highlighterRef.current.scrollTop = e.currentTarget.scrollTop;
      highlighterRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  // Auto-resize textarea and focus
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const lineCount = code.split('\n').length;
  const charCount = code.length;

  return (
    <div className={`
      flex-1 flex flex-col transition-all duration-300 h-full
      ${isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-white'
      }
    `}>
      {/* Editor Header - Minimal for more space */}
      <div className={`
        flex items-center justify-between px-6 py-2 border-b transition-colors duration-300
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
            {filename}
          </span>
          
          <span className={`
            text-xs transition-colors duration-300
            ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}
          `}>
            {lineCount} lines • {charCount} chars
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className={`
              p-1.5 rounded transition-all duration-300 hover:scale-105
              ${isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
              }
            `}
            title="Copy Code"
          >
            <Copy className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleClear}
            className={`
              p-1.5 rounded transition-all duration-300 hover:scale-105
              ${isDarkMode 
                ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-red-600 hover:bg-gray-200'
              }
            `}
            title="Clear Code"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Code Editor with Syntax Highlighting */}
      <div className="flex-1 relative overflow-hidden">
        {/* Syntax Highlighter Background */}
        <div
          ref={highlighterRef}
          className="absolute inset-0 overflow-auto pointer-events-none z-10"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            padding: '24px 24px 24px 88px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          <SyntaxHighlighter 
            code={code} 
            language={language} 
            isDarkMode={isDarkMode} 
          />
        </div>

        {/* Line numbers */}
        <div className={`
          absolute left-0 top-0 bottom-0 w-16 flex flex-col text-right pr-4 pt-6 text-xs font-mono leading-6 select-none z-20
          ${isDarkMode 
            ? 'bg-gray-800 text-gray-500 border-r border-gray-700' 
            : 'bg-gray-50 text-gray-400 border-r border-gray-200'
          }
        `}>
          {Array.from({ length: Math.max(lineCount, 50) }, (_, i) => (
            <div key={i + 1} className="h-6 flex items-center justify-end">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Main textarea - Transparent to show highlighting */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          placeholder={`Start coding in ${language}...`}
          className={`
            w-full h-full resize-none outline-none transition-all duration-300 pl-20 pr-6 py-6
            font-mono text-sm leading-6 overflow-auto relative z-30
            bg-transparent text-transparent caret-white selection:bg-blue-500/30
            ${isDarkMode 
              ? 'placeholder-gray-500' 
              : 'placeholder-gray-400 caret-black'
            }
          `}
          spellCheck={false}
          style={{
            minHeight: '100%',
            tabSize: 2,
            caretColor: isDarkMode ? 'white' : 'black',
          }}
        />
      </div>
    </div>
  );
}