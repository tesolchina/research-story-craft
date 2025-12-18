import { ArrowLeft, Bot, Key, ExternalLink, Mail } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const LearningApps = () => {
  const [searchParams] = useSearchParams();
  const showChatbot = searchParams.get('app') === 'revise';

  if (showChatbot) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <Link to="/learning-apps">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Learning Apps
              </Button>
            </Link>

            <h1 className="text-3xl font-bold text-primary mb-6">Revise Chatbot</h1>
            
            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border-2 border-primary/10">
              <iframe
                src="https://docs.google.com/document/d/13anviSYDGGBM8QKKuVh8_kHphy6v8vP7upT5kSY5JDY/edit?usp=sharing&embedded=true"
                className="w-full h-full"
                title="Revise Chatbot"
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Link to="/ai-workshops">
            <Button variant="ghost" className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AI Workshops
            </Button>
          </Link>

          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary">Learning Apps</h1>
            <p className="text-xl text-muted-foreground">
              AI-powered tools to support your research and learning
            </p>
          </div>

          {/* Chatbot Section */}
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary" />
                Revise Chatbot
              </CardTitle>
              <CardDescription>
                An AI-powered chatbot to help you revise and improve your writing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/learning-apps?app=revise">
                <Button className="w-full">
                  Enter Chatbot
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* API Key Instructions */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-6 h-6 text-primary" />
                Getting Your HKBU Gen AI API Key
              </CardTitle>
              <CardDescription>
                Access the HKBU Generative AI platform for your own projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>
                  Visit{" "}
                  <a 
                    href="https://genai.hkbu.edu.hk/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://genai.hkbu.edu.hk/
                  </a>{" "}
                  and log in with your HKBU credentials
                </li>
                <li>
                  Navigate to{" "}
                  <a 
                    href="https://genai.hkbu.edu.hk/settings/api-docs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://genai.hkbu.edu.hk/settings/api-docs
                  </a>{" "}
                  to access your API key
                </li>
                <li>Copy your API key from the settings page</li>
              </ol>

              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-2">
                  <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-200">Keep your API key safe!</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Email the key to yourself so you don't lose it. Never share your API key publicly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <a 
                  href="https://genai.hkbu.edu.hk/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Gen AI Portal
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default LearningApps;
