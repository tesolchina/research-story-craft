import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";

const Zhou = () => {
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://ERPP.hkbu.me/zhou";
  
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
        <div className="fixed bottom-4 right-4 z-10">
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
        </div>
      </main>
    </div>
  );
};

export default Zhou;
