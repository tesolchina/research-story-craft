import { useState, useEffect } from "react";
import { Key, Eye, EyeOff, Loader2, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const API_KEY_STORAGE_KEY = "hkbu-genai-api-key";

const ApiKeyPage = () => {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState<boolean | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
      setIsKeyValid(true);
    }
  }, []);

  const validateApiKey = async (key: string) => {
    if (!key.trim()) {
      toast.error("Please enter an API key");
      return;
    }

    setIsValidating(true);

    try {
      const response = await fetch(
        "https://genai.hkbu.edu.hk/general/rest/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-15-preview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": key,
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: "Hi" }],
            max_tokens: 5,
          }),
        }
      );

      if (response.ok) {
        localStorage.setItem(API_KEY_STORAGE_KEY, key);
        setIsKeyValid(true);
        toast.success("API key validated and saved!");
      } else {
        setIsKeyValid(false);
        toast.error("Invalid API key. Please check and try again.");
      }
    } catch (error) {
      setIsKeyValid(false);
      toast.error("Failed to validate API key. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setApiKey("");
    setIsKeyValid(null);
    toast.success("API key cleared");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            HKBU Gen AI API Key
          </CardTitle>
          <CardDescription>
            Enter your API key to enable AI-powered learning features. Your key is stored locally in your browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={showApiKey ? "text" : "password"}
                placeholder="Enter your HKBU Gen AI API key"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsKeyValid(null);
                }}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Button onClick={() => validateApiKey(apiKey)} disabled={isValidating || !apiKey.trim()}>
              {isValidating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isKeyValid ? (
                <Check className="h-4 w-4" />
              ) : (
                "Validate"
              )}
            </Button>
          </div>

          {isKeyValid && (
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">API key validated and saved</span>
              </div>
              <Button variant="ghost" size="sm" onClick={clearApiKey}>
                Clear
              </Button>
            </div>
          )}

          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>How to get your API key:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Visit the HKBU Gen AI Portal</li>
              <li>Log in with your HKBU credentials</li>
              <li>Navigate to API Keys section</li>
              <li>Generate or copy your existing API key</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyPage;
