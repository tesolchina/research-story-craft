import Navigation from "@/components/Navigation";

const Zhou = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 w-full">
        <iframe
          src="https://docs.google.com/presentation/d/1GzStRmUkK-gz9m5f5Xge3rr1K0PPWn4QaVJdyyJN_1k/embed?start=false&loop=false&delayms=3000"
          className="w-full h-[calc(100vh-80px)]"
          allowFullScreen
          title="Zhou Presentation"
        />
      </main>
    </div>
  );
};

export default Zhou;
