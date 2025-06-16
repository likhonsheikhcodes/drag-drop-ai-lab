
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface EnhancedGeminiResponse {
  text: string;
  model: string;
  actions?: CodeAction[];
  files?: FileOperation[];
}

export interface CodeAction {
  type: 'create' | 'update' | 'delete';
  path: string;
  content?: string;
}

export interface FileOperation {
  path: string;
  content: string;
  language: string;
}

export class EnhancedGeminiService {
  private genAI: GoogleGenerativeAI;
  
  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async executePromptWithFullControl(prompt: string, context?: string): Promise<EnhancedGeminiResponse> {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-2.5-pro-preview-06-05',
        generationConfig: {
          temperature: 0.1,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 8192,
        }
      });
      
      const enhancedPrompt = this.buildEnhancedPrompt(prompt, context);
      
      const result = await model.generateContent(enhancedPrompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse response for code actions and file operations
      const actions = this.parseCodeActions(text);
      const files = this.parseFileOperations(text);
      
      return {
        text,
        model: 'gemini-2.5-pro-preview-06-05',
        actions,
        files
      };
    } catch (error) {
      console.error('Enhanced Gemini API error:', error);
      throw new Error('Failed to execute prompt with Enhanced Gemini AI');
    }
  }

  private buildEnhancedPrompt(userPrompt: string, context?: string): string {
    return `
You are an expert AI assistant for no-code.wtf, a Y Combinator-backed platform for AI prompt execution and visual development.

SYSTEM CONSTRAINTS:
- You have full control over code generation and file operations
- You can create, update, and delete files
- You work with HTML, CSS, JavaScript, React, and other web technologies
- You provide structured responses with clear code actions

CURRENT CONTEXT:
${context || 'Building a no-code platform for AI development'}

USER REQUEST:
${userPrompt}

RESPONSE FORMAT:
Provide your response with clear explanations and any necessary code blocks.
If you need to create or modify files, use these markers:

[FILE_CREATE: path/to/file.ext]
// file content here
[/FILE_CREATE]

[FILE_UPDATE: path/to/file.ext]
// updated content here
[/FILE_UPDATE]

[FILE_DELETE: path/to/file.ext]

Please provide a comprehensive solution:
`;
  }

  private parseCodeActions(text: string): CodeAction[] {
    const actions: CodeAction[] = [];
    
    // Parse file creation markers
    const createMatches = text.matchAll(/\[FILE_CREATE:\s*([^\]]+)\]([\s\S]*?)\[\/FILE_CREATE\]/g);
    for (const match of createMatches) {
      actions.push({
        type: 'create',
        path: match[1].trim(),
        content: match[2].trim()
      });
    }
    
    // Parse file update markers
    const updateMatches = text.matchAll(/\[FILE_UPDATE:\s*([^\]]+)\]([\s\S]*?)\[\/FILE_UPDATE\]/g);
    for (const match of updateMatches) {
      actions.push({
        type: 'update',
        path: match[1].trim(),
        content: match[2].trim()
      });
    }
    
    // Parse file deletion markers
    const deleteMatches = text.matchAll(/\[FILE_DELETE:\s*([^\]]+)\]/g);
    for (const match of deleteMatches) {
      actions.push({
        type: 'delete',
        path: match[1].trim()
      });
    }
    
    return actions;
  }

  private parseFileOperations(text: string): FileOperation[] {
    const files: FileOperation[] = [];
    
    // Extract code blocks and identify their languages
    const codeBlockMatches = text.matchAll(/```(\w+)?\n([\s\S]*?)```/g);
    let fileIndex = 0;
    
    for (const match of codeBlockMatches) {
      const language = match[1] || 'javascript';
      const content = match[2].trim();
      
      if (content.length > 0) {
        files.push({
          path: `generated-file-${fileIndex}.${this.getFileExtension(language)}`,
          content,
          language
        });
        fileIndex++;
      }
    }
    
    return files;
  }

  private getFileExtension(language: string): string {
    const extensions: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      html: 'html',
      css: 'css',
      jsx: 'jsx',
      tsx: 'tsx',
      json: 'json',
      markdown: 'md'
    };
    return extensions[language] || 'txt';
  }

  async generateCode(description: string, language: string = 'javascript'): Promise<string> {
    const prompt = `Generate ${language} code for: ${description}. Provide only the code without explanations.`;
    
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().replace(/```[\w]*\n?|```/g, '').trim();
    } catch (error) {
      console.error('Code generation error:', error);
      throw new Error('Failed to generate code');
    }
  }

  async analyzeCode(code: string): Promise<string> {
    const prompt = `Analyze this code and provide insights, suggestions, and potential improvements:\n\n${code}`;
    
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Code analysis error:', error);
      throw new Error('Failed to analyze code');
    }
  }
}
