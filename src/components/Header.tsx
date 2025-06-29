import React from 'react';
import { Code, Sun, Moon, Download, Play, Square, AlertTriangle } from 'lucide-react';
import FileImport from './FileImport';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onExport: () => void;
  onRun: () => void;
  onStop: () => void;
  isRunning: boolean;
  onFileImport: (content: string, filename: string) => void;
  errorCount: number;
  onToggleErrors: () => void;
}

const languages = [
  'javascript', 'typescript', 'python', 'html', 'css', 'scss', 'json', 'xml', 'markdown', 'yaml', 'sql',
  'java', 'cpp', 'c', 'csharp', 'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'dart', 'scala',
  'r', 'matlab', 'perl', 'shell', 'batch', 'powershell', 'lua', 'nim', 'zig', 'v', 'elm', 'elixir',
  'erlang', 'clojure', 'haskell', 'ocaml', 'fsharp', 'pascal', 'd', 'julia', 'crystal', 'racket',
  'scheme', 'lisp', 'prolog', 'assembly', 'verilog', 'vhdl', 'vbnet', 'visualbasic', 'autohotkey',
  'autoit', 'tcl', 'groovy', 'gradle', 'sbt', 'cmake', 'makefile', 'dockerfile', 'toml', 'ini',
  'cfg', 'conf', 'env', 'gitignore', 'editorconfig'
];

const executableLanguages = ['javascript', 'typescript', 'python'];

export default function Header({ 
  isDarkMode, 
  toggleTheme, 
  currentLanguage, 
  onLanguageChange, 
  onExport,
  onRun,
  onStop,
  isRunning,
  onFileImport,
  errorCount,
  onToggleErrors
}: HeaderProps) {
  const isExecutable = executableLanguages.includes(currentLanguage);

  return (
    <header className={`
      border-b backdrop-blur-md transition-all duration-300
      ${isDarkMode 
        ? 'bg-gray-900/80 border-gray-700 text-white' 
        : 'bg-white/80 border-gray-200 text-gray-900'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className={`
              p-2 rounded-lg transition-all duration-300
              ${isDarkMode 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-50 text-blue-600'
              }
            `}>
              <Code className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Omni Code</h1>
              <p className={`
                text-xs transition-colors duration-300
                ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
              `}>
                Professional IDE
              </p>
            </div>
          </div>

          {/* Center - Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className={`
                px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
              `}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Error Count Button */}
            <button
              onClick={onToggleErrors}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105
                ${errorCount > 0
                  ? isDarkMode 
                    ? 'bg-red-900/30 text-red-400 border border-red-800' 
                    : 'bg-red-50 text-red-600 border border-red-200'
                  : isDarkMode 
                    ? 'bg-green-900/30 text-green-400 border border-green-800' 
                    : 'bg-green-50 text-green-600 border border-green-200'
                }
              `}
              title={errorCount > 0 ? `${errorCount} problems found` : "No problems"}
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">{errorCount}</span>
            </button>

            {/* File Import */}
            <FileImport isDarkMode={isDarkMode} onFileImport={onFileImport} />

            {/* Run/Stop Button - Only show for executable languages */}
            {isExecutable && (
              <button
                onClick={isRunning ? onStop : onRun}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 font-medium
                  ${isRunning
                    ? isDarkMode 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                    : isDarkMode 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }
                `}
                title={isRunning ? "Stop Execution" : "Run Code"}
              >
                {isRunning ? (
                  <>
                    <Square className="h-4 w-4" />
                    <span className="hidden sm:inline">Stop</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span className="hidden sm:inline">Run</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onExport}
              className={`
                p-2 rounded-lg transition-all duration-300 hover:scale-105
                ${isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
              title="Export Code"
            >
              <Download className="h-5 w-5" />
            </button>
            
            <button
              onClick={toggleTheme}
              className={`
                p-2 rounded-lg transition-all duration-300 hover:scale-105
                ${isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}