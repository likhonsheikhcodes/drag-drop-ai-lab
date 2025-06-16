
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Zap, Code, Users, Target, Play, Sparkles, Brain, FileText, Layers } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState("");

  const executePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to execute");
      return;
    }
    
    setIsExecuting(true);
    // Simulate AI execution
    setTimeout(() => {
      setResult(`AI Response: This is a demo response to your prompt: "${prompt}". In the full platform, this would be processed by advanced AI models with real-time analysis and optimization.`);
      setIsExecuting(false);
      toast.success("Prompt executed successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-600/10" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200 transition-colors">
              <Sparkles className="w-3 h-3 mr-1" />
              Y Combinator Backed
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-6 leading-tight">
              no-code.wtf
            </h1>
            
            <p className="text-2xl text-gray-600 mb-4 font-medium">
              Zero Code Required
            </p>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              AI prompt execution and analysis platform that enables users to work with AI prompts without coding. 
              Visual, drag-and-drop tools for AI development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-semibold border-2 hover:bg-gray-50 transition-all">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Try It Live
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the power of visual AI prompt execution
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-orange-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Prompt Execution Demo</CardTitle>
                <CardDescription className="text-gray-600">
                  Enter a prompt below and see real-time AI processing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your AI Prompt
                  </label>
                  <Textarea
                    placeholder="e.g., Generate a creative story about a robot learning to paint..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px] resize-none border-2 focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <Button 
                  onClick={executePrompt}
                  disabled={isExecuting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {isExecuting ? (
                    <>
                      <Brain className="mr-2 w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 w-5 h-5" />
                      Execute Prompt
                    </>
                  )}
                </Button>
                
                {result && (
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-600">
                    <h4 className="font-semibold text-gray-900 mb-2">AI Result:</h4>
                    <p className="text-gray-700 leading-relaxed">{result}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for AI development without writing a single line of code
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0 overflow-hidden group">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <Zap className="w-8 h-8 mb-2 group-hover:animate-pulse" />
                <CardTitle>AI Prompt Execution</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Execute prompts with various AI models and get instant, real-time results with advanced processing capabilities.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0 overflow-hidden group">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <FileText className="w-8 h-8 mb-2 group-hover:animate-pulse" />
                <CardTitle>File Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Intelligent highlighting of prompts in .txt and .md files with AI-powered analysis and optimization.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0 overflow-hidden group">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <Layers className="w-8 h-8 mb-2 group-hover:animate-pulse" />
                <CardTitle>Visual Interface</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-gray-600 leading-relaxed">
                  No-code drag-and-drop prompt building with intuitive visual tools for rapid AI development.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0 overflow-hidden group">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <Brain className="w-8 h-8 mb-2 group-hover:animate-pulse" />
                <CardTitle>Smart Detection</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-gray-600 leading-relaxed">
                  AI-powered prompt identification and classification with intelligent suggestions and improvements.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0 overflow-hidden group">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                <Target className="w-8 h-8 mb-2 group-hover:animate-pulse" />
                <CardTitle>Real-time Results</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Instant execution and feedback with live monitoring and performance analytics for optimal results.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0 overflow-hidden group">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Users className="w-8 h-8 mb-2 group-hover:animate-pulse" />
                <CardTitle>Y Combinator Backed</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Trusted by the world's top accelerator with enterprise-grade security and reliability.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Without Code?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who are already creating amazing AI applications with no-code.wtf
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              Start Building Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-semibold transition-all">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
