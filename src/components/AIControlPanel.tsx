
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Zap, FileText, Settings, Play, Code2 } from 'lucide-react';
import { EnhancedGeminiService, type EnhancedGeminiResponse } from '@/services/enhanced-gemini';
import { toast } from 'sonner';

interface AIControlPanelProps {
  geminiService: EnhancedGeminiService | null;
  onCodeGenerated?: (code: string, language: string) => void;
}

export const AIControlPanel = ({ geminiService, onCodeGenerated }: AIControlPanelProps) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<EnhancedGeminiResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('prompt');

  const handleExecutePrompt = async () => {
    if (!geminiService || !prompt.trim()) {
      toast.error('Please enter a prompt and ensure Gemini is connected');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await geminiService.executePromptWithFullControl(prompt);
      setResponse(result);
      
      // If code was generated, notify parent component
      if (result.files && result.files.length > 0 && onCodeGenerated) {
        const firstFile = result.files[0];
        onCodeGenerated(firstFile.content, firstFile.language);
      }
      
      toast.success('AI prompt executed successfully!');
      setActiveTab('response');
    } catch (error) {
      console.error('AI execution error:', error);
      toast.error('Failed to execute AI prompt');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateCode = async (description: string) => {
    if (!geminiService) return;

    try {
      const code = await geminiService.generateCode(description, 'javascript');
      if (onCodeGenerated) {
        onCodeGenerated(code, 'javascript');
      }
      toast.success('Code generated successfully!');
    } catch (error) {
      console.error('Code generation error:', error);
      toast.error('Failed to generate code');
    }
  };

  const quickPrompts = [
    'Create a responsive navbar component with React',
    'Build a todo list app with local storage',
    'Generate a contact form with validation',
    'Create a data visualization chart',
    'Build a simple calculator interface',
    'Design a landing page hero section'
  ];

  return (
    <Card className="w-full shadow-lg border-0 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6" />
          AI Control Panel
          <Badge variant="secondary" className="bg-white text-purple-600">
            Enhanced Gemini
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="prompt">
              <Zap className="w-4 h-4 mr-2" />
              Prompt
            </TabsTrigger>
            <TabsTrigger value="response">
              <FileText className="w-4 h-4 mr-2" />
              Response
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prompt" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Prompt
              </label>
              <Textarea
                placeholder="Describe what you want to build or ask for help with code..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={handleExecutePrompt}
                disabled={isProcessing || !geminiService}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isProcessing ? (
                  <Brain className="w-4 h-4 mr-2 animate-pulse" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isProcessing ? 'Processing...' : 'Execute Prompt'}
              </Button>
              
              <Button 
                onClick={() => handleGenerateCode(prompt)}
                disabled={isProcessing || !geminiService}
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <Code2 className="w-4 h-4 mr-2" />
                Generate Code
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Prompts
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickPrompts.map((quickPrompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(quickPrompt)}
                    className="text-left h-auto p-2 text-xs"
                  >
                    {quickPrompt}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="response" className="space-y-4">
            {response ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">AI Response:</h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {response.text}
                  </p>
                </div>

                {response.actions && response.actions.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Code Actions:</h4>
                    <div className="space-y-2">
                      {response.actions.map((action, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge variant={action.type === 'create' ? 'default' : 'secondary'}>
                            {action.type}
                          </Badge>
                          <span className="text-sm text-blue-700">{action.path}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {response.files && response.files.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Generated Files:</h4>
                    <div className="space-y-2">
                      {response.files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge variant="outline" className="border-green-600 text-green-600">
                            {file.language}
                          </Badge>
                          <span className="text-sm text-green-700">{file.path}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Execute a prompt to see the AI response here
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">AI Model Settings</h4>
              <div className="space-y-2 text-sm text-yellow-700">
                <p>• Model: gemini-2.5-pro-preview-06-05</p>
                <p>• Temperature: 0.1 (Low randomness, focused responses)</p>
                <p>• Max Output: 8192 tokens</p>
                <p>• Full Control: Enabled</p>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">Platform Features</h4>
              <div className="space-y-2 text-sm text-purple-700">
                <p>• Code generation and analysis</p>
                <p>• File operations (create, update, delete)</p>
                <p>• Visual code editing with CodeMirror</p>
                <p>• Real-time AI assistance</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
