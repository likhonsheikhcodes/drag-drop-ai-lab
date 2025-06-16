
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Download, Share, Code, Eye, Sparkles } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { toast } from 'sonner';

interface CodePlaygroundProps {
  onExecute?: (code: string, language: string) => void;
  initialCode?: string;
  initialLanguage?: string;
}

export const CodePlayground = ({ 
  onExecute, 
  initialCode = '', 
  initialLanguage = 'javascript' 
}: CodePlaygroundProps) => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(initialLanguage);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      if (onExecute) {
        await onExecute(code, language);
      } else {
        // Default execution for demo
        setOutput(`Executed ${language} code:\n${code}`);
      }
      toast.success('Code executed successfully!');
    } catch (error) {
      console.error('Execution error:', error);
      toast.error('Failed to execute code');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDownload = () => {
    const fileExtension = language === 'javascript' ? 'js' : language;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded!');
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-gray-50 to-white">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="w-6 h-6" />
            Visual Code Playground
          </CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={handleExecute}
              disabled={isExecuting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isExecuting ? (
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isExecuting ? 'Executing...' : 'Run Code'}
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="bg-white text-blue-600 border-white hover:bg-blue-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="bg-white text-blue-600 border-white hover:bg-blue-50"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={language} onValueChange={setLanguage} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="jsx">React JSX</TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Code Editor
              </h3>
              <CodeEditor
                value={code}
                onChange={setCode}
                language={language as any}
                height="400px"
                placeholder={`Enter your ${language} code here...`}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Output Preview
              </h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-[400px] overflow-auto">
                {output || 'Output will appear here after execution...'}
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
