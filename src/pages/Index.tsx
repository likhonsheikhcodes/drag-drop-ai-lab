
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Zap, Code, Users, Target, Play, Sparkles, Brain, FileText, Layers, Paperclip, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { CodePlayground } from "@/components/CodePlayground";
import { AIControlPanel } from "@/components/AIControlPanel";
import { EnhancedGeminiService } from "@/services/enhanced-gemini";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState("");
  const [enhancedGeminiService, setEnhancedGeminiService] = useState<EnhancedGeminiService | null>(null);
  const [playgroundCode, setPlaygroundCode] = useState("// Welcome to no-code.wtf!\n// AI-powered code generation platform\n\nconsole.log('Hello, no-code world!');");

  const handleApiKeySubmit = (apiKey: string) => {
    try {
      const service = new EnhancedGeminiService(apiKey);
      setEnhancedGeminiService(service);
      toast.success("Connected to Enhanced Gemini AI successfully!");
    } catch (error) {
      toast.error("Failed to connect to Enhanced Gemini AI");
    }
  };

  const executePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to execute");
      return;
    }

    if (!enhancedGeminiService) {
      toast.error("Please connect your Gemini API key first");
      return;
    }
    
    setIsExecuting(true);
    try {
      const response = await enhancedGeminiService.executePromptWithFullControl(prompt);
      setResult(`Enhanced AI Response (${response.model}): ${response.text}`);
      toast.success("Prompt executed successfully!");
    } catch (error) {
      console.error("Error executing prompt:", error);
      setResult("Error: Failed to execute prompt. Please check your API key and try again.");
      toast.error("Failed to execute prompt");
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCodeGenerated = (code: string, language: string) => {
    setPlaygroundCode(code);
    toast.success(`${language} code loaded into playground!`);
  };

  const handlePlaygroundExecute = async (code: string, language: string) => {
    if (!enhancedGeminiService) {
      toast.error("Please connect Gemini AI first");
      return;
    }

    try {
      const analysis = await enhancedGeminiService.analyzeCode(code);
      setResult(`Code Analysis: ${analysis}`);
    } catch (error) {
      console.error("Code execution error:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section - Similar to Bolt's design */}
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-orange-900/20" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-8 bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600/30 transition-colors">
              <Sparkles className="w-3 h-3 mr-1" />
              Y Combinator Backed
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              What do you want to build?
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Create stunning apps & websites by chatting with AI.
            </p>
            
            {/* Main Input Area */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Textarea
                  placeholder="How can no-code.wtf help you today?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 resize-none text-lg p-6 rounded-xl backdrop-blur-sm"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    <Wand2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={executePrompt}
                disabled={isExecuting || !enhancedGeminiService}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {isExecuting ? (
                  <>
                    <Brain className="mr-2 w-5 h-5 animate-spin" />
                    Processing with AI...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 w-5 h-5" />
                    Build with AI
                  </>
                )}
              </Button>
            </div>

            {!enhancedGeminiService && (
              <div className="max-w-lg mx-auto">
                <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} isLoading={isExecuting} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced AI Control Panel */}
      {enhancedGeminiService && (
        <section className="py-20 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                AI-Powered Development Platform
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Experience the future of no-code development with enhanced Gemini AI control
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <AIControlPanel 
                geminiService={enhancedGeminiService}
                onCodeGenerated={handleCodeGenerated}
              />
            </div>
          </div>
        </section>
      )}

      {/* Code Playground Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Visual Code Playground
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Write, edit, and execute code with our integrated CodeMirror editor
            </p>
          </div>

          <CodePlayground 
            initialCode={playgroundCode}
            onExecute={handlePlaygroundExecute}
          />
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gray-800/50 border-gray-600 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">AI Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
                    <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{result}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-gray-800/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Everything you need for AI development without writing a single line of code
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 border-gray-600 hover:bg-gray-800/70 transition-all backdrop-blur-sm group">
              <CardHeader>
                <Zap className="w-8 h-8 mb-2 text-blue-400 group-hover:animate-pulse" />
                <CardTitle className="text-white">AI Prompt Execution</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Execute prompts with various AI models and get instant, real-time results with advanced processing capabilities.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-600 hover:bg-gray-800/70 transition-all backdrop-blur-sm group">
              <CardHeader>
                <FileText className="w-8 h-8 mb-2 text-purple-400 group-hover:animate-pulse" />
                <CardTitle className="text-white">File Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Intelligent highlighting of prompts in .txt and .md files with AI-powered analysis and optimization.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-600 hover:bg-gray-800/70 transition-all backdrop-blur-sm group">
              <CardHeader>
                <Layers className="w-8 h-8 mb-2 text-orange-400 group-hover:animate-pulse" />
                <CardTitle className="text-white">Visual Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 leading-relaxed">
                  No-code drag-and-drop prompt building with intuitive visual tools for rapid AI development.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-600 hover:bg-gray-800/70 transition-all backdrop-blur-sm group">
              <CardHeader>
                <Brain className="w-8 h-8 mb-2 text-green-400 group-hover:animate-pulse" />
                <CardTitle className="text-white">Smart Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 leading-relaxed">
                  AI-powered prompt identification and classification with intelligent suggestions and improvements.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-600 hover:bg-gray-800/70 transition-all backdrop-blur-sm group">
              <CardHeader>
                <Target className="w-8 h-8 mb-2 text-red-400 group-hover:animate-pulse" />
                <CardTitle className="text-white">Real-time Results</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Instant execution and feedback with live monitoring and performance analytics for optimal results.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-600 hover:bg-gray-800/70 transition-all backdrop-blur-sm group">
              <CardHeader>
                <Users className="w-8 h-8 mb-2 text-blue-400 group-hover:animate-pulse" />
                <CardTitle className="text-white">Y Combinator Backed</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Trusted by the world's top accelerator with enterprise-grade security and reliability.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Without Code?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already creating amazing AI applications with no-code.wtf
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all rounded-xl">
              Start Building Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-gray-400 text-gray-200 hover:bg-gray-700 hover:text-white px-8 py-6 text-lg font-semibold transition-all rounded-xl">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                no-code.wtf
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Y Combinator-backed AI prompt execution and analysis platform. Zero code required.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-300">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>hello@no-code.wtf</p>
                <p>security@no-code.wtf</p>
                <p>https://no-code.wtf</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-300">Features</h4>
              <div className="space-y-2 text-gray-400">
                <p>AI Prompt Execution</p>
                <p>Visual Interface</p>
                <p>File Analysis</p>
                <p>Smart Detection</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 no-code.wtf. All rights reserved. Backed by Y Combinator.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
