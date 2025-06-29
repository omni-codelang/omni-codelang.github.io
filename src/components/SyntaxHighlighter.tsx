import React from 'react';

interface SyntaxHighlighterProps {
  code: string;
  language: string;
  isDarkMode: boolean;
}

export default function SyntaxHighlighter({ code, language, isDarkMode }: SyntaxHighlighterProps) {
  const highlightCode = (code: string, language: string) => {
    const lines = code.split('\n');
    
    return lines.map((line, lineIndex) => {
      const tokens = tokenizeLine(line, language);
      
      return (
        <div key={lineIndex} className="flex">
          <span className={`
            w-16 text-right pr-4 select-none flex-shrink-0 text-xs leading-6
            ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}
          `}>
            {lineIndex + 1}
          </span>
          <span className="flex-1 text-sm leading-6 font-mono">
            {tokens.map((token, tokenIndex) => (
              <span
                key={tokenIndex}
                className={getTokenColor(token.type, isDarkMode)}
              >
                {token.value}
              </span>
            ))}
          </span>
        </div>
      );
    });
  };

  return (
    <div className={`
      w-full h-full overflow-auto p-4
      ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
    `}>
      <pre className="whitespace-pre-wrap">
        {highlightCode(code, language)}
      </pre>
    </div>
  );
}

interface Token {
  type: string;
  value: string;
}

function tokenizeLine(line: string, language: string): Token[] {
  const tokens: Token[] = [];
  
  switch (language) {
    case 'javascript':
    case 'typescript':
      return tokenizeJavaScript(line);
    case 'python':
      return tokenizePython(line);
    case 'html':
      return tokenizeHTML(line);
    case 'css':
    case 'scss':
      return tokenizeCSS(line);
    case 'json':
      return tokenizeJSON(line);
    case 'java':
      return tokenizeJava(line);
    case 'cpp':
    case 'c':
      return tokenizeCPP(line);
    case 'go':
      return tokenizeGo(line);
    case 'rust':
      return tokenizeRust(line);
    case 'php':
      return tokenizePHP(line);
    case 'ruby':
      return tokenizeRuby(line);
    case 'sql':
      return tokenizeSQL(line);
    default:
      return tokenizeGeneric(line);
  }
}

function tokenizeJavaScript(line: string): Token[] {
  const tokens: Token[] = [];
  const keywords = [
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
    'switch', 'case', 'default', 'break', 'continue', 'try', 'catch', 'finally',
    'throw', 'new', 'this', 'super', 'class', 'extends', 'import', 'export',
    'from', 'as', 'async', 'await', 'true', 'false', 'null', 'undefined',
    'typeof', 'instanceof', 'in', 'of', 'delete', 'void'
  ];
  
  const builtins = [
    'console', 'window', 'document', 'Array', 'Object', 'String', 'Number',
    'Boolean', 'Date', 'Math', 'JSON', 'Promise', 'Set', 'Map', 'WeakSet', 'WeakMap'
  ];

  let i = 0;
  while (i < line.length) {
    const char = line[i];
    
    // Skip whitespace
    if (/\s/.test(char)) {
      tokens.push({ type: 'whitespace', value: char });
      i++;
      continue;
    }
    
    // Comments
    if (char === '/' && line[i + 1] === '/') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }
    
    if (char === '/' && line[i + 1] === '*') {
      const end = line.indexOf('*/', i + 2);
      const commentEnd = end === -1 ? line.length : end + 2;
      tokens.push({ type: 'comment', value: line.slice(i, commentEnd) });
      i = commentEnd;
      continue;
    }
    
    // Strings
    if (char === '"' || char === "'" || char === '`') {
      const quote = char;
      let j = i + 1;
      let escaped = false;
      
      while (j < line.length && (line[j] !== quote || escaped)) {
        escaped = !escaped && line[j] === '\\';
        j++;
      }
      
      if (j < line.length) j++; // Include closing quote
      tokens.push({ type: 'string', value: line.slice(i, j) });
      i = j;
      continue;
    }
    
    // Numbers
    if (/\d/.test(char)) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) {
        j++;
      }
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      continue;
    }
    
    // Identifiers and keywords
    if (/[a-zA-Z_$]/.test(char)) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) {
        j++;
      }
      
      const word = line.slice(i, j);
      let type = 'identifier';
      
      if (keywords.includes(word)) {
        type = 'keyword';
      } else if (builtins.includes(word)) {
        type = 'builtin';
      } else if (/^[A-Z]/.test(word)) {
        type = 'class';
      }
      
      tokens.push({ type, value: word });
      i = j;
      continue;
    }
    
    // Operators and punctuation
    if (/[+\-*/%=<>!&|^~?:;,.()\[\]{}]/.test(char)) {
      let j = i;
      while (j < line.length && /[+\-*/%=<>!&|^~?:;,.()\[\]{}]/.test(line[j])) {
        j++;
        // Don't group certain operators
        if (line[j - 1] === '(' || line[j - 1] === ')' || 
            line[j - 1] === '[' || line[j - 1] === ']' ||
            line[j - 1] === '{' || line[j - 1] === '}' ||
            line[j - 1] === ';' || line[j - 1] === ',') {
          break;
        }
      }
      tokens.push({ type: 'operator', value: line.slice(i, j) });
      i = j;
      continue;
    }
    
    // Default
    tokens.push({ type: 'text', value: char });
    i++;
  }
  
  return tokens;
}

function tokenizePython(line: string): Token[] {
  const tokens: Token[] = [];
  const keywords = [
    'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'try', 'except',
    'finally', 'with', 'as', 'import', 'from', 'return', 'yield', 'break',
    'continue', 'pass', 'raise', 'assert', 'del', 'global', 'nonlocal',
    'lambda', 'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None'
  ];
  
  const builtins = [
    'print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'tuple',
    'set', 'bool', 'type', 'isinstance', 'hasattr', 'getattr', 'setattr'
  ];

  let i = 0;
  while (i < line.length) {
    const char = line[i];
    
    // Skip whitespace
    if (/\s/.test(char)) {
      tokens.push({ type: 'whitespace', value: char });
      i++;
      continue;
    }
    
    // Comments
    if (char === '#') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }
    
    // Strings
    if (char === '"' || char === "'") {
      const quote = char;
      let j = i + 1;
      let escaped = false;
      
      // Check for triple quotes
      if (line.slice(i, i + 3) === quote.repeat(3)) {
        tokens.push({ type: 'string', value: line.slice(i) });
        break;
      }
      
      while (j < line.length && (line[j] !== quote || escaped)) {
        escaped = !escaped && line[j] === '\\';
        j++;
      }
      
      if (j < line.length) j++; // Include closing quote
      tokens.push({ type: 'string', value: line.slice(i, j) });
      i = j;
      continue;
    }
    
    // Numbers
    if (/\d/.test(char)) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) {
        j++;
      }
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      continue;
    }
    
    // Identifiers and keywords
    if (/[a-zA-Z_]/.test(char)) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) {
        j++;
      }
      
      const word = line.slice(i, j);
      let type = 'identifier';
      
      if (keywords.includes(word)) {
        type = 'keyword';
      } else if (builtins.includes(word)) {
        type = 'builtin';
      } else if (/^[A-Z]/.test(word)) {
        type = 'class';
      }
      
      tokens.push({ type, value: word });
      i = j;
      continue;
    }
    
    // Operators and punctuation
    if (/[+\-*/%=<>!&|^~?:;,.()\[\]{}]/.test(char)) {
      tokens.push({ type: 'operator', value: char });
      i++;
      continue;
    }
    
    // Default
    tokens.push({ type: 'text', value: char });
    i++;
  }
  
  return tokens;
}

function tokenizeHTML(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  
  while (i < line.length) {
    const char = line[i];
    
    // Skip whitespace
    if (/\s/.test(char)) {
      tokens.push({ type: 'whitespace', value: char });
      i++;
      continue;
    }
    
    // HTML Comments
    if (line.slice(i, i + 4) === '<!--') {
      const end = line.indexOf('-->', i + 4);
      const commentEnd = end === -1 ? line.length : end + 3;
      tokens.push({ type: 'comment', value: line.slice(i, commentEnd) });
      i = commentEnd;
      continue;
    }
    
    // HTML Tags
    if (char === '<') {
      let j = i + 1;
      let inQuotes = false;
      let quoteChar = '';
      
      while (j < line.length && (line[j] !== '>' || inQuotes)) {
        if ((line[j] === '"' || line[j] === "'") && !inQuotes) {
          inQuotes = true;
          quoteChar = line[j];
        } else if (line[j] === quoteChar && inQuotes) {
          inQuotes = false;
          quoteChar = '';
        }
        j++;
      }
      
      if (j < line.length) j++; // Include closing >
      
      const tagContent = line.slice(i, j);
      tokens.push({ type: 'tag', value: tagContent });
      i = j;
      continue;
    }
    
    // Default text content
    let j = i;
    while (j < line.length && line[j] !== '<') {
      j++;
    }
    
    if (j > i) {
      tokens.push({ type: 'text', value: line.slice(i, j) });
      i = j;
      continue;
    }
    
    tokens.push({ type: 'text', value: char });
    i++;
  }
  
  return tokens;
}

function tokenizeCSS(line: string): Token[] {
  const tokens: Token[] = [];
  const properties = [
    'color', 'background', 'font-size', 'margin', 'padding', 'border',
    'width', 'height', 'display', 'position', 'top', 'left', 'right', 'bottom',
    'flex', 'grid', 'text-align', 'font-weight', 'font-family'
  ];
  
  let i = 0;
  while (i < line.length) {
    const char = line[i];
    
    // Skip whitespace
    if (/\s/.test(char)) {
      tokens.push({ type: 'whitespace', value: char });
      i++;
      continue;
    }
    
    // Comments
    if (char === '/' && line[i + 1] === '*') {
      const end = line.indexOf('*/', i + 2);
      const commentEnd = end === -1 ? line.length : end + 2;
      tokens.push({ type: 'comment', value: line.slice(i, commentEnd) });
      i = commentEnd;
      continue;
    }
    
    // Strings
    if (char === '"' || char === "'") {
      const quote = char;
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        j++;
      }
      if (j < line.length) j++;
      tokens.push({ type: 'string', value: line.slice(i, j) });
      i = j;
      continue;
    }
    
    // CSS Properties
    if (/[a-zA-Z-]/.test(char)) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9-]/.test(line[j])) {
        j++;
      }
      
      const word = line.slice(i, j);
      const type = properties.includes(word) ? 'property' : 'identifier';
      
      tokens.push({ type, value: word });
      i = j;
      continue;
    }
    
    // Numbers and units
    if (/\d/.test(char)) {
      let j = i;
      while (j < line.length && /[\d.%px]/.test(line[j])) {
        j++;
      }
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      continue;
    }
    
    // Selectors and operators
    if (/[.#:;,{}()]/.test(char)) {
      tokens.push({ type: 'operator', value: char });
      i++;
      continue;
    }
    
    tokens.push({ type: 'text', value: char });
    i++;
  }
  
  return tokens;
}

function tokenizeJSON(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  
  while (i < line.length) {
    const char = line[i];
    
    if (/\s/.test(char)) {
      tokens.push({ type: 'whitespace', value: char });
      i++;
      continue;
    }
    
    // Strings (keys and values)
    if (char === '"') {
      let j = i + 1;
      let escaped = false;
      
      while (j < line.length && (line[j] !== '"' || escaped)) {
        escaped = !escaped && line[j] === '\\';
        j++;
      }
      
      if (j < line.length) j++;
      
      // Check if this is a key (followed by :)
      let k = j;
      while (k < line.length && /\s/.test(line[k])) k++;
      const isKey = k < line.length && line[k] === ':';
      
      tokens.push({ 
        type: isKey ? 'property' : 'string', 
        value: line.slice(i, j) 
      });
      i = j;
      continue;
    }
    
    // Numbers
    if (/[\d-]/.test(char)) {
      let j = i;
      if (char === '-') j++;
      while (j < line.length && /[\d.]/.test(line[j])) {
        j++;
      }
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      continue;
    }
    
    // Booleans and null
    if (line.slice(i, i + 4) === 'true' || line.slice(i, i + 5) === 'false') {
      const len = line.slice(i, i + 4) === 'true' ? 4 : 5;
      tokens.push({ type: 'keyword', value: line.slice(i, i + len) });
      i += len;
      continue;
    }
    
    if (line.slice(i, i + 4) === 'null') {
      tokens.push({ type: 'keyword', value: 'null' });
      i += 4;
      continue;
    }
    
    // Punctuation
    if (/[{}[\]:,]/.test(char)) {
      tokens.push({ type: 'operator', value: char });
      i++;
      continue;
    }
    
    tokens.push({ type: 'text', value: char });
    i++;
  }
  
  return tokens;
}

// Simplified tokenizers for other languages
function tokenizeJava(line: string): Token[] {
  return tokenizeJavaScript(line); // Similar syntax
}

function tokenizeCPP(line: string): Token[] {
  return tokenizeJavaScript(line); // Similar syntax
}

function tokenizeGo(line: string): Token[] {
  return tokenizeJavaScript(line); // Similar syntax
}

function tokenizeRust(line: string): Token[] {
  return tokenizeJavaScript(line); // Similar syntax
}

function tokenizePHP(line: string): Token[] {
  return tokenizeJavaScript(line); // Similar syntax
}

function tokenizeRuby(line: string): Token[] {
  return tokenizePython(line); // Similar syntax
}

function tokenizeSQL(line: string): Token[] {
  const tokens: Token[] = [];
  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP',
    'ALTER', 'TABLE', 'INDEX', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER',
    'ON', 'AS', 'AND', 'OR', 'NOT', 'NULL', 'TRUE', 'FALSE'
  ];
  
  let i = 0;
  while (i < line.length) {
    const char = line[i];
    
    if (/\s/.test(char)) {
      tokens.push({ type: 'whitespace', value: char });
      i++;
      continue;
    }
    
    // Comments
    if (char === '-' && line[i + 1] === '-') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }
    
    // Strings
    if (char === "'" || char === '"') {
      const quote = char;
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        j++;
      }
      if (j < line.length) j++;
      tokens.push({ type: 'string', value: line.slice(i, j) });
      i = j;
      continue;
    }
    
    // Keywords
    if (/[a-zA-Z]/.test(char)) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) {
        j++;
      }
      
      const word = line.slice(i, j).toUpperCase();
      const type = keywords.includes(word) ? 'keyword' : 'identifier';
      
      tokens.push({ type, value: line.slice(i, j) });
      i = j;
      continue;
    }
    
    tokens.push({ type: 'text', value: char });
    i++;
  }
  
  return tokens;
}

function tokenizeGeneric(line: string): Token[] {
  return [{ type: 'text', value: line }];
}

function getTokenColor(tokenType: string, isDarkMode: boolean): string {
  const darkColors = {
    keyword: 'text-purple-400',      // Purple for keywords
    string: 'text-green-400',        // Green for strings
    number: 'text-blue-400',         // Blue for numbers
    comment: 'text-gray-500',        // Gray for comments
    operator: 'text-yellow-400',     // Yellow for operators
    builtin: 'text-cyan-400',        // Cyan for built-ins
    class: 'text-yellow-300',        // Light yellow for classes
    property: 'text-blue-300',       // Light blue for properties
    tag: 'text-red-400',             // Red for HTML tags
    identifier: 'text-white',        // White for identifiers
    whitespace: 'text-transparent',  // Transparent for whitespace
    text: 'text-gray-300',           // Light gray for text
  };
  
  const lightColors = {
    keyword: 'text-purple-600',      // Purple for keywords
    string: 'text-green-600',        // Green for strings
    number: 'text-blue-600',         // Blue for numbers
    comment: 'text-gray-500',        // Gray for comments
    operator: 'text-orange-600',     // Orange for operators
    builtin: 'text-cyan-600',        // Cyan for built-ins
    class: 'text-yellow-600',        // Yellow for classes
    property: 'text-blue-500',       // Blue for properties
    tag: 'text-red-600',             // Red for HTML tags
    identifier: 'text-gray-900',     // Dark gray for identifiers
    whitespace: 'text-transparent',  // Transparent for whitespace
    text: 'text-gray-700',           // Gray for text
  };
  
  const colors = isDarkMode ? darkColors : lightColors;
  return colors[tokenType as keyof typeof colors] || colors.text;
}