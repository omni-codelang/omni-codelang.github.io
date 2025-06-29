import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import ErrorPanel from './components/ErrorPanel';
import Sidebar from './components/Sidebar';
import TabBar from './components/TabBar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTabManager } from './hooks/useTabManager';
import { exportCode } from './utils/exportCode';
import { executeCode } from './utils/codeRunner';
import { validateCode, ValidationError } from './utils/codeValidator';

function App() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('omnicode-dark-mode', false);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  const {
    tabs,
    activeTabId,
    createNewTab,
    closeTab,
    switchTab,
    updateTabContent,
    updateTabLanguage,
    getActiveTab,
    importFileAsTab,
  } = useTabManager();

  const activeTab = getActiveTab();

  // Validate code whenever active tab changes
  useEffect(() => {
    if (activeTab) {
      const validationErrors = validateCode(activeTab.content, activeTab.language);
      setErrors(validationErrors);
      
      // Auto-show errors panel if there are errors
      if (validationErrors.length > 0 && validationErrors.some(e => e.type === 'error')) {
        setShowErrors(true);
      }
    }
  }, [activeTab?.content, activeTab?.language]);

  const handleLanguageChange = (language: string) => {
    if (activeTab) {
      updateTabLanguage(activeTab.id, language);
      // Clear output when switching languages
      setOutput('');
      setShowOutput(false);
    }
  };

  const handleFileImport = (content: string, filename: string) => {
    // Try to detect language from file extension
    const extension = filename.split('.').pop()?.toLowerCase();
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'ts': 'typescript',
      'py': 'python',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'json': 'json',
      'xml': 'xml',
      'md': 'markdown',
      'yml': 'yaml',
      'yaml': 'yaml',
      'sql': 'sql',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'cs': 'csharp',
      'go': 'go',
      'rs': 'rust',
      'php': 'php',
      'rb': 'ruby',
      'swift': 'swift',
      'kt': 'kotlin',
      'dart': 'dart',
      'scala': 'scala',
      'r': 'r',
      'm': 'matlab',
      'pl': 'perl',
      'sh': 'shell',
      'bat': 'batch',
      'ps1': 'powershell',
      'lua': 'lua',
      'nim': 'nim',
      'zig': 'zig',
      'v': 'v',
      'elm': 'elm',
      'ex': 'elixir',
      'erl': 'erlang',
      'clj': 'clojure',
      'hs': 'haskell',
      'ml': 'ocaml',
      'fs': 'fsharp',
      'pas': 'pascal',
      'd': 'd',
      'jl': 'julia',
      'cr': 'crystal',
      'rkt': 'racket',
      'scm': 'scheme',
      'lisp': 'lisp',
      'pro': 'prolog',
      'asm': 'assembly',
      'vhd': 'vhdl',
      'vb': 'vbnet',
      'vbs': 'visualbasic',
      'ahk': 'autohotkey',
      'au3': 'autoit',
      'tcl': 'tcl',
      'groovy': 'groovy',
      'gradle': 'gradle',
      'sbt': 'sbt',
      'cmake': 'cmake',
      'make': 'makefile',
      'dockerfile': 'dockerfile',
      'toml': 'toml',
      'ini': 'ini',
      'cfg': 'cfg',
      'conf': 'conf',
      'env': 'env',
      'gitignore': 'gitignore',
      'editorconfig': 'editorconfig'
    };
    
    const detectedLanguage = extension && languageMap[extension] ? languageMap[extension] : 'javascript';
    importFileAsTab(content, filename, detectedLanguage);
  };

  const handleExport = () => {
    if (activeTab) {
      exportCode(activeTab.content, activeTab.language, activeTab.filename);
    }
  };

  const handleRun = async () => {
    if (!activeTab) return;
    
    setIsRunning(true);
    setShowOutput(true);
    setOutput('Executing code...\n');

    try {
      const result = await executeCode(activeTab.content, activeTab.language);
      
      if (result.error) {
        setOutput(`❌ Error:\n${result.error}`);
      } else if (result.output) {
        setOutput(`✅ Output:\n${result.output}`);
      } else {
        setOutput('✅ Code executed successfully (no output generated)');
      }
    } catch (error) {
      setOutput(`❌ Execution failed:\n${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setOutput(prev => prev + '\n\n⏹️ Execution stopped by user');
  };

  const handleClearOutput = () => {
    setOutput('');
  };

  const handleCloseOutput = () => {
    setShowOutput(false);
    setOutput('');
  };

  const handleToggleErrors = () => {
    setShowErrors(!showErrors);
  };

  const handleCloseErrors = () => {
    setShowErrors(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const errorCount = errors.filter(e => e.type === 'error').length;

  return (
    <div className={`
      min-h-screen transition-all duration-300 flex flex-col
      ${isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
      }
    `}>
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        currentLanguage={activeTab?.language || 'javascript'}
        onLanguageChange={handleLanguageChange}
        onExport={handleExport}
        onRun={handleRun}
        onStop={handleStop}
        isRunning={isRunning}
        onFileImport={handleFileImport}
        errorCount={errorCount}
        onToggleErrors={handleToggleErrors}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isDarkMode={isDarkMode}
          currentLanguage={activeTab?.language || 'javascript'}
          onLanguageChange={handleLanguageChange}
        />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          <TabBar
            isDarkMode={isDarkMode}
            tabs={tabs}
            activeTabId={activeTabId}
            onTabClick={switchTab}
            onTabClose={closeTab}
            onNewTab={() => createNewTab()}
          />
          
          {/* Code Editor - Maximum space */}
          <div className="flex-1 overflow-hidden">
            {activeTab && (
              <CodeEditor
                code={activeTab.content}
                onChange={(content) => updateTabContent(activeTab.id, content)}
                language={activeTab.language}
                isDarkMode={isDarkMode}
                filename={activeTab.filename}
              />
            )}
          </div>
          
          <OutputPanel
            isDarkMode={isDarkMode}
            output={output}
            isVisible={showOutput}
            onClose={handleCloseOutput}
            onClear={handleClearOutput}
            isRunning={isRunning}
          />
          
          <ErrorPanel
            isDarkMode={isDarkMode}
            errors={errors}
            isVisible={showErrors}
            onClose={handleCloseErrors}
          />
        </main>
      </div>
      
      {/* Floating gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`
          absolute top-1/4 left-1/4 w-96 h-96 rounded-full transition-all duration-1000
          ${isDarkMode 
            ? 'bg-blue-900/10' 
            : 'bg-blue-100/20'
          }
          blur-3xl animate-pulse
        `} />
        <div className={`
          absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full transition-all duration-1000
          ${isDarkMode 
            ? 'bg-indigo-900/10' 
            : 'bg-indigo-100/20'
          }
          blur-3xl animate-pulse
        `} style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}

export default App;