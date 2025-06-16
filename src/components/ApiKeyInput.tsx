
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Key } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
  isLoading?: boolean;
}

export const ApiKeyInput = ({ onApiKeySubmit, isLoading }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSubmit = () => {
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="space-y-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="flex items-center gap-2 text-yellow-800">
        <Key className="w-4 h-4" />
        <span className="text-sm font-medium">Gemini API Key Required</span>
      </div>
      <p className="text-sm text-yellow-700">
        Enter your Google Gemini API key to enable real AI prompt execution. 
        Get your free API key from{" "}
        <a 
          href="https://makersuite.google.com/app/apikey" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-yellow-900"
        >
          Google AI Studio
        </a>
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type={showApiKey ? "text" : "password"}
            placeholder="Enter your Gemini API key..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={!apiKey.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Connecting..." : "Connect"}
        </Button>
      </div>
      <p className="text-xs text-yellow-600">
        Your API key is stored locally and never sent to our servers.
      </p>
    </div>
  );
};
