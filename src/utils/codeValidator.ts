export interface ValidationError {
  line?: number;
  column?: number;
  message: string;
  type: 'error' | 'warning' | 'info';
  rule?: string;
}

export function validateCode(code: string, language: string): ValidationError[] {
  const errors: ValidationError[] = [];
  
  switch (language) {
    case 'javascript':
    case 'typescript':
      return validateJavaScript(code, language === 'typescript');
    case 'python':
      return validatePython(code);
    case 'html':
      return validateHTML(code);
    case 'css':
    case 'scss':
      return validateCSS(code);
    case 'json':
      return validateJSON(code);
    case 'xml':
      return validateXML(code);
    case 'sql':
      return validateSQL(code);
    case 'java':
      return validateJava(code);
    case 'cpp':
    case 'c':
      return validateCPP(code);
    case 'csharp':
      return validateCSharp(code);
    case 'go':
      return validateGo(code);
    case 'rust':
      return validateRust(code);
    case 'php':
      return validatePHP(code);
    case 'ruby':
      return validateRuby(code);
    default:
      return validateGeneric(code);
  }
}

function validateJavaScript(code: string, isTypeScript: boolean = false): ValidationError[] {
  const errors: ValidationError[] = [];
  const lines = code.split('\n');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    
    // Check for common syntax errors
    if (trimmed.includes('console.log(') && !trimmed.includes(')')) {
      errors.push({
        line: lineNum,
        message: 'Missing closing parenthesis in console.log',
        type: 'error',
        rule: 'syntax-error'
      });
    }
    
    // Check for missing semicolons (warning)
    if (trimmed && !trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}') && 
        !trimmed.startsWith('//') && !trimmed.startsWith('/*') && !trimmed.includes('if ') && 
        !trimmed.includes('for ') && !trimmed.includes('while ') && !trimmed.includes('function ')) {
      errors.push({
        line: lineNum,
        message: 'Missing semicolon',
        type: 'warning',
        rule: 'missing-semicolon'
      });
    }
    
    // Check for undefined variables (basic check)
    const undefinedVarMatch = trimmed.match(/(\w+)\s*=\s*undefined/);
    if (undefinedVarMatch) {
      errors.push({
        line: lineNum,
        message: `Variable '${undefinedVarMatch[1]}' is explicitly set to undefined`,
        type: 'warning',
        rule: 'explicit-undefined'
      });
    }
    
    // TypeScript specific checks
    if (isTypeScript) {
      if (trimmed.includes(': any')) {
        errors.push({
          line: lineNum,
          message: 'Avoid using "any" type, use specific types instead',
          type: 'warning',
          rule: 'no-any'
        });
      }
    }
  });
  
  // Check for unmatched brackets
  const openBrackets = (code.match(/\{/g) || []).length;
  const closeBrackets = (code.match(/\}/g) || []).length;
  if (openBrackets !== closeBrackets) {
    errors.push({
      message: `Unmatched brackets: ${openBrackets} opening, ${closeBrackets} closing`,
      type: 'error',
      rule: 'unmatched-brackets'
    });
  }
  
  return errors;
}

function validatePython(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const lines = code.split('\n');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    
    // Check for indentation issues
    if (line.length > 0 && line[0] === ' ' && line.indexOf(line.trim()) % 4 !== 0) {
      errors.push({
        line: lineNum,
        message: 'Indentation should be 4 spaces',
        type: 'warning',
        rule: 'indentation'
      });
    }
    
    // Check for print statements without parentheses (Python 2 style)
    if (trimmed.startsWith('print ') && !trimmed.includes('print(')) {
      errors.push({
        line: lineNum,
        message: 'Use print() function instead of print statement',
        type: 'error',
        rule: 'print-function'
      });
    }
    
    // Check for missing colons
    if ((trimmed.startsWith('if ') || trimmed.startsWith('for ') || trimmed.startsWith('while ') || 
         trimmed.startsWith('def ') || trimmed.startsWith('class ')) && !trimmed.endsWith(':')) {
      errors.push({
        line: lineNum,
        message: 'Missing colon at end of statement',
        type: 'error',
        rule: 'missing-colon'
      });
    }
  });
  
  return errors;
}

function validateHTML(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const lines = code.split('\n');
  
  // Check for basic HTML structure
  if (!code.includes('<!DOCTYPE html>') && !code.includes('<!doctype html>')) {
    errors.push({
      line: 1,
      message: 'Missing DOCTYPE declaration',
      type: 'warning',
      rule: 'missing-doctype'
    });
  }
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    
    // Check for unclosed tags (basic check)
    const openTags = trimmed.match(/<(\w+)(?:\s[^>]*)?>(?![^<]*<\/\1>)/g);
    if (openTags) {
      openTags.forEach(tag => {
        const tagName = tag.match(/<(\w+)/)?.[1];
        if (tagName && !['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName.toLowerCase())) {
          errors.push({
            line: lineNum,
            message: `Potentially unclosed tag: ${tagName}`,
            type: 'warning',
            rule: 'unclosed-tag'
          });
        }
      });
    }
  });
  
  return errors;
}

function validateCSS(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const lines = code.split('\n');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    
    // Check for missing semicolons in CSS properties
    if (trimmed.includes(':') && !trimmed.includes('{') && !trimmed.includes('}') && 
        !trimmed.endsWith(';') && !trimmed.startsWith('/*') && !trimmed.startsWith('//')) {
      errors.push({
        line: lineNum,
        message: 'Missing semicolon after CSS property',
        type: 'error',
        rule: 'missing-semicolon'
      });
    }
    
    // Check for unknown CSS properties (basic check)
    const propertyMatch = trimmed.match(/^\s*([a-zA-Z-]+)\s*:/);
    if (propertyMatch) {
      const property = propertyMatch[1];
      // This is a very basic check - in a real implementation, you'd have a comprehensive list
      if (property.includes('_') || property.includes(' ')) {
        errors.push({
          line: lineNum,
          message: `Invalid CSS property name: ${property}`,
          type: 'error',
          rule: 'invalid-property'
        });
      }
    }
  });
  
  return errors;
}

function validateJSON(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  
  try {
    JSON.parse(code);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Invalid JSON';
    const lineMatch = errorMessage.match(/line (\d+)/);
    const line = lineMatch ? parseInt(lineMatch[1]) : undefined;
    
    errors.push({
      line,
      message: errorMessage,
      type: 'error',
      rule: 'json-syntax'
    });
  }
  
  return errors;
}

function validateXML(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Basic XML validation
  if (!code.trim().startsWith('<?xml')) {
    errors.push({
      line: 1,
      message: 'Missing XML declaration',
      type: 'warning',
      rule: 'missing-xml-declaration'
    });
  }
  
  // Check for unmatched tags (basic)
  const openTags = code.match(/<(\w+)(?:\s[^>]*)?>/g) || [];
  const closeTags = code.match(/<\/(\w+)>/g) || [];
  
  if (openTags.length !== closeTags.length) {
    errors.push({
      message: 'Unmatched XML tags',
      type: 'error',
      rule: 'unmatched-tags'
    });
  }
  
  return errors;
}

function validateSQL(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const lines = code.split('\n');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim().toLowerCase();
    
    // Check for missing semicolons in SQL statements
    if ((trimmed.startsWith('select ') || trimmed.startsWith('insert ') || 
         trimmed.startsWith('update ') || trimmed.startsWith('delete ')) && 
        !trimmed.endsWith(';') && !trimmed.includes('--')) {
      errors.push({
        line: lineNum,
        message: 'SQL statement should end with semicolon',
        type: 'warning',
        rule: 'missing-semicolon'
      });
    }
  });
  
  return errors;
}

function validateJava(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const lines = code.split('\n');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    
    // Check for missing semicolons
    if (trimmed && !trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}') && 
        !trimmed.startsWith('//') && !trimmed.startsWith('/*') && !trimmed.includes('if ') && 
        !trimmed.includes('for ') && !trimmed.includes('while ') && !trimmed.includes('class ') &&
        !trimmed.includes('public ') && !trimmed.includes('private ') && !trimmed.includes('protected ')) {
      errors.push({
        line: lineNum,
        message: 'Missing semicolon',
        type: 'error',
        rule: 'missing-semicolon'
      });
    }
  });
  
  return errors;
}

function validateCPP(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Check for missing includes
  if (!code.includes('#include')) {
    errors.push({
      line: 1,
      message: 'Missing #include statements',
      type: 'warning',
      rule: 'missing-includes'
    });
  }
  
  return errors;
}

function validateCSharp(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Check for missing using statements
  if (!code.includes('using System')) {
    errors.push({
      line: 1,
      message: 'Consider adding "using System;" statement',
      type: 'info',
      rule: 'missing-using'
    });
  }
  
  return errors;
}

function validateGo(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Check for missing package declaration
  if (!code.includes('package ')) {
    errors.push({
      line: 1,
      message: 'Missing package declaration',
      type: 'error',
      rule: 'missing-package'
    });
  }
  
  return errors;
}

function validateRust(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const lines = code.split('\n');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    
    // Check for missing semicolons in Rust
    if (trimmed && !trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}') && 
        !trimmed.startsWith('//') && !trimmed.includes('fn ') && !trimmed.includes('if ') && 
        !trimmed.includes('for ') && !trimmed.includes('while ') && !trimmed.includes('match ')) {
      errors.push({
        line: lineNum,
        message: 'Missing semicolon',
        type: 'warning',
        rule: 'missing-semicolon'
      });
    }
  });
  
  return errors;
}

function validatePHP(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Check for missing PHP opening tag
  if (!code.includes('<?php')) {
    errors.push({
      line: 1,
      message: 'Missing PHP opening tag <?php',
      type: 'error',
      rule: 'missing-php-tag'
    });
  }
  
  return errors;
}

function validateRuby(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const lines = code.split('\n');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();
    
    // Check for missing 'end' keywords (basic check)
    if ((trimmed.startsWith('def ') || trimmed.startsWith('class ') || 
         trimmed.startsWith('if ') || trimmed.startsWith('unless ')) && 
        !code.includes('end')) {
      errors.push({
        line: lineNum,
        message: 'Missing corresponding "end" keyword',
        type: 'error',
        rule: 'missing-end'
      });
    }
  });
  
  return errors;
}

function validateGeneric(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Generic validation for any language
  if (code.trim().length === 0) {
    errors.push({
      message: 'File is empty',
      type: 'info',
      rule: 'empty-file'
    });
  }
  
  return errors;
}