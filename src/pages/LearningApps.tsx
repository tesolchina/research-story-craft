import { ArrowLeft, Bot, Key, ExternalLink, Mail, Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
            
            <div className="w-full max-w-[960px] mx-auto">
              <iframe
                src="https://revise-bot.replit.app"
                className="w-full border-none rounded-lg shadow-md"
                style={{ height: '900px' }}
                allow="clipboard-write"
                title="Essay Revision Assistant"
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

          {/* Apps Grid */}
          <div className="grid md:grid-cols-2 gap-6">
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

            {/* Search Section */}
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-6 h-6 text-primary" />
                  Search
                </CardTitle>
                <CardDescription>
                  Find resources and information across our materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/search">
                  <Button className="w-full">
                    Go to Search
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* API Key Instructions - Toggled */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="api-key" className="border-2 border-primary/20 rounded-lg">
              <AccordionTrigger className="px-6 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Getting Your HKBU Gen AI API Key</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6 space-y-4">
                  {/* What is an API key explanation */}
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2">What is an API key?</h4>
                    <p className="text-sm text-muted-foreground">
                      An API key is like a password that allows applications to access AI services on your behalf. 
                      When you build your own AI-powered tools or chatbots, you'll need this key to connect to 
                      HKBU's Generative AI platform. Think of it as your personal access pass to AI capabilities.
                    </p>
                  </div>

                  <h4 className="font-medium text-foreground">How to get your key:</h4>
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

                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
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
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </main>
    </div>
  );
};

export default LearningApps;
