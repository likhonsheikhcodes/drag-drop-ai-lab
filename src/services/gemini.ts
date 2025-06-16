
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface GeminiResponse {
  text: string;
  model: string;
}

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  
  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async executePrompt(prompt: string): Promise<GeminiResponse> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return {
        text,
        model: 'gemini-1.5-flash'
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to execute prompt with Gemini AI');
    }
  }
}
