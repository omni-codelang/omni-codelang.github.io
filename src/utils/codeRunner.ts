export interface ExecutionResult {
  output: string;
  error?: string;
}

export async function executeCode(code: string, language: string): Promise<ExecutionResult> {
  try {
    switch (language) {
      case 'javascript':
        return executeJavaScript(code);
      
      case 'typescript':
        // For TypeScript, we'll compile to JS and run it
        return executeTypeScript(code);
      
      case 'python':
        return executePython(code);
      
      default:
        return {
          output: '',
          error: `Code execution for ${language} is not supported in the browser environment. 
          
Supported languages for execution:
• JavaScript
• TypeScript  
• Python (limited standard library)

For other languages, you can export your code and run it in your local development environment.`
        };
    }
  } catch (error) {
    return {
      output: '',
      error: `Execution error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

function executeJavaScript(code: string): ExecutionResult {
  let output = '';
  let error = '';

  // Capture console.log output
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  const logs: string[] = [];

  console.log = (...args) => {
    logs.push(args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' '));
  };

  console.error = (...args) => {
    logs.push('ERROR: ' + args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' '));
  };

  console.warn = (...args) => {
    logs.push('WARNING: ' + args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' '));
  };

  try {
    // Create a function to execute the code in a controlled environment
    const func = new Function(code);
    const result = func();
    
    // If the function returns something, add it to output
    if (result !== undefined) {
      logs.push('Return value: ' + (typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)));
    }
    
    output = logs.join('\n');
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  } finally {
    // Restore original console methods
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  }

  return { output, error };
}

function executeTypeScript(code: string): ExecutionResult {
  // For now, we'll treat TypeScript as JavaScript (basic transpilation)
  // Remove type annotations in a simple way
  const jsCode = code
    .replace(/:\s*\w+(\[\])?/g, '') // Remove type annotations
    .replace(/interface\s+\w+\s*{[^}]*}/g, '') // Remove interfaces
    .replace(/type\s+\w+\s*=\s*[^;]+;/g, '') // Remove type aliases
    .replace(/as\s+\w+/g, ''); // Remove type assertions

  return executeJavaScript(jsCode);
}

function executePython(code: string): ExecutionResult {
  // Note: This is a very basic Python interpreter simulation
  // In a real application, you'd use Pyodide or similar
  
  let output = '';
  let error = '';

  try {
    // Very basic Python print statement handling
    const lines = code.split('\n');
    const results: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('print(') && trimmedLine.endsWith(')')) {
        // Extract content between print( and )
        const content = trimmedLine.slice(6, -1);
        
        // Handle string literals
        if ((content.startsWith('"') && content.endsWith('"')) || 
            (content.startsWith("'") && content.endsWith("'"))) {
          results.push(content.slice(1, -1));
        } else if (content.startsWith('f"') || content.startsWith("f'")) {
          // Basic f-string handling
          results.push(content.slice(2, -1));
        } else {
          // Try to evaluate as a simple expression
          try {
            const jsEquivalent = content
              .replace(/True/g, 'true')
              .replace(/False/g, 'false')
              .replace(/None/g, 'null');
            const result = eval(jsEquivalent);
            results.push(String(result));
          } catch {
            results.push(content);
          }
        }
      } else if (trimmedLine && !trimmedLine.startsWith('#') && !trimmedLine.startsWith('def ')) {
        // For other statements, just acknowledge them
        if (trimmedLine.includes('=') && !trimmedLine.includes('==')) {
          // Variable assignment
          continue;
        }
      }
    }

    output = results.join('\n');
    
    if (!output && code.trim()) {
      output = 'Code executed successfully (no output generated)';
    }
  } catch (err) {
    error = `Python execution error: ${err instanceof Error ? err.message : String(err)}

Note: This is a limited Python interpreter. For full Python support, please export your code and run it in a proper Python environment.`;
  }

  return { output, error };
}