import React from 'react';
import { Code2, FileText, Play } from 'lucide-react';

interface SidebarProps {
  isDarkMode: boolean;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  // Executable Languages
  { id: 'javascript', name: 'JavaScript', icon: '🟨', executable: true, category: 'executable' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷', executable: true, category: 'executable' },
  { id: 'python', name: 'Python', icon: '🐍', executable: true, category: 'executable' },
  
  // Web Technologies
  { id: 'html', name: 'HTML', icon: '🌐', executable: false, category: 'web' },
  { id: 'css', name: 'CSS', icon: '🎨', executable: false, category: 'web' },
  { id: 'scss', name: 'SCSS', icon: '💅', executable: false, category: 'web' },
  
  // Data & Config
  { id: 'json', name: 'JSON', icon: '📋', executable: false, category: 'data' },
  { id: 'xml', name: 'XML', icon: '📄', executable: false, category: 'data' },
  { id: 'yaml', name: 'YAML', icon: '⚙️', executable: false, category: 'data' },
  { id: 'toml', name: 'TOML', icon: '🔧', executable: false, category: 'data' },
  { id: 'ini', name: 'INI', icon: '📝', executable: false, category: 'data' },
  { id: 'cfg', name: 'Config', icon: '⚙️', executable: false, category: 'data' },
  { id: 'conf', name: 'Conf', icon: '🔧', executable: false, category: 'data' },
  { id: 'env', name: 'Environment', icon: '🌍', executable: false, category: 'data' },
  
  // System Programming
  { id: 'c', name: 'C', icon: '🔵', executable: false, category: 'system' },
  { id: 'cpp', name: 'C++', icon: '⚡', executable: false, category: 'system' },
  { id: 'rust', name: 'Rust', icon: '🦀', executable: false, category: 'system' },
  { id: 'go', name: 'Go', icon: '🐹', executable: false, category: 'system' },
  { id: 'zig', name: 'Zig', icon: '⚡', executable: false, category: 'system' },
  { id: 'nim', name: 'Nim', icon: '👑', executable: false, category: 'system' },
  { id: 'v', name: 'V', icon: '🔷', executable: false, category: 'system' },
  { id: 'd', name: 'D', icon: '🔴', executable: false, category: 'system' },
  { id: 'crystal', name: 'Crystal', icon: '💎', executable: false, category: 'system' },
  
  // Enterprise & JVM
  { id: 'java', name: 'Java', icon: '☕', executable: false, category: 'enterprise' },
  { id: 'kotlin', name: 'Kotlin', icon: '🎯', executable: false, category: 'enterprise' },
  { id: 'scala', name: 'Scala', icon: '🔺', executable: false, category: 'enterprise' },
  { id: 'groovy', name: 'Groovy', icon: '🎵', executable: false, category: 'enterprise' },
  { id: 'csharp', name: 'C#', icon: '🔵', executable: false, category: 'enterprise' },
  
  // Mobile & Modern
  { id: 'swift', name: 'Swift', icon: '🍎', executable: false, category: 'mobile' },
  { id: 'dart', name: 'Dart', icon: '🎯', executable: false, category: 'mobile' },
  
  // Functional Programming
  { id: 'haskell', name: 'Haskell', icon: '🔮', executable: false, category: 'functional' },
  { id: 'elm', name: 'Elm', icon: '🌳', executable: false, category: 'functional' },
  { id: 'ocaml', name: 'OCaml', icon: '🐪', executable: false, category: 'functional' },
  { id: 'fsharp', name: 'F#', icon: '🔷', executable: false, category: 'functional' },
  { id: 'clojure', name: 'Clojure', icon: '🔄', executable: false, category: 'functional' },
  { id: 'racket', name: 'Racket', icon: '🎾', executable: false, category: 'functional' },
  { id: 'scheme', name: 'Scheme', icon: '🔄', executable: false, category: 'functional' },
  { id: 'lisp', name: 'Lisp', icon: '🔄', executable: false, category: 'functional' },
  
  // Dynamic & Scripting
  { id: 'ruby', name: 'Ruby', icon: '💎', executable: false, category: 'dynamic' },
  { id: 'php', name: 'PHP', icon: '🐘', executable: false, category: 'dynamic' },
  { id: 'perl', name: 'Perl', icon: '🐪', executable: false, category: 'dynamic' },
  { id: 'lua', name: 'Lua', icon: '🌙', executable: false, category: 'dynamic' },
  { id: 'tcl', name: 'Tcl', icon: '🔧', executable: false, category: 'dynamic' },
  
  // Scientific & Data
  { id: 'r', name: 'R', icon: '📊', executable: false, category: 'scientific' },
  { id: 'matlab', name: 'MATLAB', icon: '📈', executable: false, category: 'scientific' },
  { id: 'julia', name: 'Julia', icon: '🔬', executable: false, category: 'scientific' },
  
  // Concurrent & Distributed
  { id: 'elixir', name: 'Elixir', icon: '💧', executable: false, category: 'concurrent' },
  { id: 'erlang', name: 'Erlang', icon: '📞', executable: false, category: 'concurrent' },
  
  // Shell & System
  { id: 'shell', name: 'Shell', icon: '🐚', executable: false, category: 'shell' },
  { id: 'batch', name: 'Batch', icon: '🪟', executable: false, category: 'shell' },
  { id: 'powershell', name: 'PowerShell', icon: '💙', executable: false, category: 'shell' },
  
  // Legacy & Specialized
  { id: 'pascal', name: 'Pascal', icon: '🔺', executable: false, category: 'legacy' },
  { id: 'vbnet', name: 'VB.NET', icon: '🔷', executable: false, category: 'legacy' },
  { id: 'visualbasic', name: 'VB Script', icon: '📜', executable: false, category: 'legacy' },
  { id: 'autohotkey', name: 'AutoHotkey', icon: '⌨️', executable: false, category: 'legacy' },
  { id: 'autoit', name: 'AutoIt', icon: '🤖', executable: false, category: 'legacy' },
  
  // Hardware & Low-level
  { id: 'assembly', name: 'Assembly', icon: '⚙️', executable: false, category: 'hardware' },
  { id: 'verilog', name: 'Verilog', icon: '🔌', executable: false, category: 'hardware' },
  { id: 'vhdl', name: 'VHDL', icon: '🔌', executable: false, category: 'hardware' },
  
  // Logic & AI
  { id: 'prolog', name: 'Prolog', icon: '🧠', executable: false, category: 'logic' },
  
  // Build & DevOps
  { id: 'gradle', name: 'Gradle', icon: '🐘', executable: false, category: 'build' },
  { id: 'sbt', name: 'SBT', icon: '🔧', executable: false, category: 'build' },
  { id: 'cmake', name: 'CMake', icon: '🔨', executable: false, category: 'build' },
  { id: 'makefile', name: 'Makefile', icon: '🔨', executable: false, category: 'build' },
  { id: 'dockerfile', name: 'Dockerfile', icon: '🐳', executable: false, category: 'build' },
  
  // Documentation & Markup
  { id: 'markdown', name: 'Markdown', icon: '📝', executable: false, category: 'markup' },
  { id: 'sql', name: 'SQL', icon: '🗃️', executable: false, category: 'database' },
  
  // Version Control & Config
  { id: 'gitignore', name: 'Gitignore', icon: '🚫', executable: false, category: 'vcs' },
  { id: 'editorconfig', name: 'EditorConfig', icon: '✏️', executable: false, category: 'vcs' },
];

const categories = {
  executable: 'Executable',
  web: 'Web Technologies',
  data: 'Data & Configuration',
  system: 'Systems Programming',
  enterprise: 'Enterprise & JVM',
  mobile: 'Mobile Development',
  functional: 'Functional Programming',
  dynamic: 'Dynamic Languages',
  scientific: 'Scientific Computing',
  concurrent: 'Concurrent Programming',
  shell: 'Shell & Scripting',
  legacy: 'Legacy & Specialized',
  hardware: 'Hardware Description',
  logic: 'Logic Programming',
  build: 'Build & DevOps',
  markup: 'Markup & Documentation',
  database: 'Database',
  vcs: 'Version Control'
};

export default function Sidebar({ isDarkMode, currentLanguage, onLanguageChange }: SidebarProps) {
  const groupedLanguages = languages.reduce((acc, lang) => {
    if (!acc[lang.category]) {
      acc[lang.category] = [];
    }
    acc[lang.category].push(lang);
    return acc;
  }, {} as Record<string, typeof languages>);

  return (
    <div className={`
      w-72 border-r transition-all duration-300 hidden lg:flex flex-col
      ${isDarkMode 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-gray-50 border-gray-200'
      }
    `}>
      {/* Sidebar Header */}
      <div className={`
        p-4 border-b transition-colors duration-300
        ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
      `}>
        <h3 className={`
          font-semibold text-sm transition-colors duration-300
          ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
        `}>
          Programming Languages
        </h3>
        <p className={`
          text-xs mt-1 transition-colors duration-300
          ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
        `}>
          {languages.length} languages supported
        </p>
      </div>

      {/* Language List */}
      <div className="flex-1 p-2 overflow-y-auto">
        <div className="space-y-4">
          {Object.entries(groupedLanguages).map(([category, langs]) => (
            <div key={category}>
              <h4 className={`
                text-xs font-medium px-3 py-1 transition-colors duration-300 flex items-center space-x-2
                ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
              `}>
                <span>{categories[category as keyof typeof categories]?.toUpperCase()}</span>
                {category === 'executable' && <Play className="h-3 w-3" />}
              </h4>
              <div className="space-y-1 mt-2">
                {langs.map((language) => (
                  <button
                    key={language.id}
                    onClick={() => onLanguageChange(language.id)}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-left
                      ${currentLanguage === language.id
                        ? isDarkMode 
                          ? 'bg-blue-900/30 text-blue-300 border border-blue-800' 
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                        : isDarkMode 
                          ? 'hover:bg-gray-800 text-gray-300' 
                          : 'hover:bg-gray-200 text-gray-700'
                      }
                    `}
                  >
                    <span className="text-lg">{language.icon}</span>
                    <span className="text-sm font-medium flex-1">{language.name}</span>
                    {language.executable && <Play className="h-3 w-3 text-green-500" />}
                    {currentLanguage === language.id && (
                      <FileText className="h-4 w-4 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current File Display */}
      <div className={`
        p-4 border-t transition-colors duration-300
        ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
      `}>
        <div className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300
          ${isDarkMode 
            ? 'bg-gray-800 text-gray-300' 
            : 'bg-gray-100 text-gray-700'
          }
        `}>
          <Code2 className="h-4 w-4" />
          <span className="text-sm">
            main.{getFileExtension(currentLanguage)}
          </span>
        </div>
      </div>
    </div>
  );
}

function getFileExtension(language: string): string {
  const extensions: { [key: string]: string } = {
    javascript: 'js',
    typescript: 'ts',
    python: 'py',
    html: 'html',
    css: 'css',
    scss: 'scss',
    json: 'json',
    xml: 'xml',
    markdown: 'md',
    yaml: 'yml',
    sql: 'sql',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    csharp: 'cs',
    go: 'go',
    rust: 'rs',
    php: 'php',
    ruby: 'rb',
    swift: 'swift',
    kotlin: 'kt',
    dart: 'dart',
    scala: 'scala',
    r: 'r',
    matlab: 'm',
    perl: 'pl',
    shell: 'sh',
    batch: 'bat',
    powershell: 'ps1',
    lua: 'lua',
    nim: 'nim',
    zig: 'zig',
    v: 'v',
    elm: 'elm',
    elixir: 'ex',
    erlang: 'erl',
    clojure: 'clj',
    haskell: 'hs',
    ocaml: 'ml',
    fsharp: 'fs',
    pascal: 'pas',
    d: 'd',
    julia: 'jl',
    crystal: 'cr',
    racket: 'rkt',
    scheme: 'scm',
    lisp: 'lisp',
    prolog: 'pro',
    assembly: 'asm',
    verilog: 'v',
    vhdl: 'vhd',
    vbnet: 'vb',
    visualbasic: 'vbs',
    autohotkey: 'ahk',
    autoit: 'au3',
    tcl: 'tcl',
    groovy: 'groovy',
    gradle: 'gradle',
    sbt: 'sbt',
    cmake: 'cmake',
    makefile: 'make',
    dockerfile: 'dockerfile',
    toml: 'toml',
    ini: 'ini',
    cfg: 'cfg',
    conf: 'conf',
    env: 'env',
    gitignore: 'gitignore',
    editorconfig: 'editorconfig'
  };
  return extensions[language] || 'txt';
}