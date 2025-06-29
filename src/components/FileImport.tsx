import React, { useRef } from 'react';
import { Upload, FileText } from 'lucide-react';

interface FileImportProps {
  isDarkMode: boolean;
  onFileImport: (content: string, filename: string) => void;
}

export default function FileImport({ isDarkMode, onFileImport }: FileImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileImport(content, file.name);
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".js,.ts,.py,.html,.css,.scss,.json,.xml,.md,.yml,.yaml,.sql,.java,.cpp,.c,.cs,.go,.rs,.php,.rb,.swift,.kt,.dart,.scala,.r,.m,.pl,.sh,.bat,.ps1,.lua,.nim,.zig,.v,.elm,.ex,.exs,.clj,.cljs,.hs,.ml,.fs,.pas,.d,.jl,.cr,.rkt,.scm,.lisp,.erl,.hrl,.pro,.asm,.s,.nasm,.yasm,.masm,.vb,.vbs,.ahk,.au3,.tcl,.groovy,.gradle,.sbt,.cmake,.make,.dockerfile,.toml,.ini,.cfg,.conf,.env,.gitignore,.editorconfig"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={handleImportClick}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 font-medium
          ${isDarkMode 
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
            : 'bg-indigo-500 hover:bg-indigo-600 text-white'
          }
        `}
        title="Import File from Desktop"
      >
        <Upload className="h-4 w-4" />
        <span className="hidden sm:inline">Import</span>
      </button>
    </>
  );
}