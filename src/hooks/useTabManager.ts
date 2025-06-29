import { useState, useCallback } from 'react';
import { Tab } from '../components/TabBar';
import { getLanguageTemplate } from '../utils/exportCode';

export function useTabManager() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'default',
      filename: 'main.js',
      language: 'javascript',
      content: getLanguageTemplate('javascript'),
      isDirty: false,
      isActive: true,
    }
  ]);
  const [activeTabId, setActiveTabId] = useState('default');

  const createNewTab = useCallback((language: string = 'javascript', filename?: string, content?: string) => {
    const newId = `tab-${Date.now()}`;
    const extension = getFileExtension(language);
    const newFilename = filename || `untitled.${extension}`;
    const newContent = content || getLanguageTemplate(language);
    
    const newTab: Tab = {
      id: newId,
      filename: newFilename,
      language,
      content: newContent,
      isDirty: false,
      isActive: true,
    };

    setTabs(prevTabs => [
      ...prevTabs.map(tab => ({ ...tab, isActive: false })),
      newTab
    ]);
    setActiveTabId(newId);
    
    return newId;
  }, []);

  const closeTab = useCallback((tabId: string) => {
    setTabs(prevTabs => {
      const filteredTabs = prevTabs.filter(tab => tab.id !== tabId);
      
      // If we're closing the active tab, activate another one
      if (tabId === activeTabId && filteredTabs.length > 0) {
        const newActiveTab = filteredTabs[filteredTabs.length - 1];
        setActiveTabId(newActiveTab.id);
        return filteredTabs.map(tab => ({
          ...tab,
          isActive: tab.id === newActiveTab.id
        }));
      }
      
      // If no tabs left, create a new default tab
      if (filteredTabs.length === 0) {
        const defaultTab: Tab = {
          id: 'default-new',
          filename: 'main.js',
          language: 'javascript',
          content: getLanguageTemplate('javascript'),
          isDirty: false,
          isActive: true,
        };
        setActiveTabId(defaultTab.id);
        return [defaultTab];
      }
      
      return filteredTabs;
    });
  }, [activeTabId]);

  const switchTab = useCallback((tabId: string) => {
    setTabs(prevTabs => 
      prevTabs.map(tab => ({
        ...tab,
        isActive: tab.id === tabId
      }))
    );
    setActiveTabId(tabId);
  }, []);

  const updateTabContent = useCallback((tabId: string, content: string) => {
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.id === tabId 
          ? { ...tab, content, isDirty: content !== getLanguageTemplate(tab.language) }
          : tab
      )
    );
  }, []);

  const updateTabLanguage = useCallback((tabId: string, language: string) => {
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.id === tabId 
          ? { 
              ...tab, 
              language,
              filename: `${tab.filename.split('.')[0]}.${getFileExtension(language)}`,
              content: getLanguageTemplate(language),
              isDirty: false
            }
          : tab
      )
    );
  }, []);

  const getActiveTab = useCallback(() => {
    return tabs.find(tab => tab.id === activeTabId);
  }, [tabs, activeTabId]);

  const importFileAsTab = useCallback((content: string, filename: string, language: string) => {
    const newId = createNewTab(language, filename, content);
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.id === newId 
          ? { ...tab, isDirty: false }
          : tab
      )
    );
  }, [createNewTab]);

  return {
    tabs,
    activeTabId,
    createNewTab,
    closeTab,
    switchTab,
    updateTabContent,
    updateTabLanguage,
    getActiveTab,
    importFileAsTab,
  };
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