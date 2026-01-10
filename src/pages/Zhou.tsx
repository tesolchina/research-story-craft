import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, ExternalLink, Video, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Zhou = () => {
  const [showQR, setShowQR] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [password, setPassword] = useState("");
  const [isVideoUnlocked, setIsVideoUnlocked] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://ERPP.hkbu.me/zhou";
  const slideUrl = "https://docs.google.com/presentation/d/1GzStRmUkK-gz9m5f5Xge3rr1K0PPWn4QaVJdyyJN_1k/edit";
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      toast.error("Please enter a password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('verify-zhou-access', {
        body: { password }
      });
      
      if (error) {
        console.error('Error verifying password:', error);
        toast.error("Incorrect password");
        return;
      }
      
      if (data?.success && data?.videoUrl) {
        setVideoUrl(data.videoUrl);
        setIsVideoUnlocked(true);
        toast.success("Access granted!");
      } else {
        toast.error("Incorrect password");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to verify password");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 w-full relative">
        <iframe
          src="https://docs.google.com/presentation/d/1GzStRmUkK-gz9m5f5Xge3rr1K0PPWn4QaVJdyyJN_1k/embed?start=false&loop=false&delayms=3000"
          className="w-full h-[calc(100vh-80px)]"
          allowFullScreen
          title="Zhou Presentation"
        />
        <div className="fixed bottom-4 right-4 z-10 flex flex-col gap-2">
          <Button
            onClick={() => window.open(slideUrl, '_blank')}
            size="icon"
            variant="secondary"
            className="shadow-lg"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setShowVideo(!showVideo)}
            size="icon"
            variant="secondary"
            className="shadow-lg"
          >
            <Video className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setShowQR(!showQR)}
            size="icon"
            variant="secondary"
            className="shadow-lg"
          >
            <QrCode className="h-4 w-4" />
          </Button>
          {showQR && (
            <Card className="p-4 shadow-lg">
              <a 
                href="https://ERPP.hkbu.me/zhou" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code to ERPP.hkbu.me/zhou" 
                  className="w-32 h-32"
                />
                <p className="text-xs text-center mt-2 text-muted-foreground">
                  ERPP.hkbu.me/zhou
                </p>
              </a>
            </Card>
          )}
          {showVideo && (
            <Card className="p-6 shadow-lg w-80">
              {!isVideoUnlocked ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Enter Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Unlock Video"
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Zoom Recording</p>
                  {videoUrl && (
                    <>
                      <iframe
                        src={videoUrl}
                        className="w-full h-48"
                        allowFullScreen
                        title="Zoom Recording"
                      />
                      <Button
                        onClick={() => window.open(videoUrl, '_blank')}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        Open in New Window
                      </Button>
                    </>
                  )}
                </div>
              )}
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Zhou;
