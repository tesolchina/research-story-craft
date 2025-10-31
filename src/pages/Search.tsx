import Navigation from "@/components/Navigation";

const Search = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Research Publication Search</h1>
            <p className="text-lg text-muted-foreground">
              Search and explore academic resources using our ERPP tool
            </p>
          </div>
          
          <div className="w-full bg-card rounded-lg shadow-lg overflow-hidden border">
            <iframe 
              src="https://ff87c1f4-86b2-45e3-be52-0b0fe5610edf.lovableproject.com" 
              className="w-full h-[800px]"
              title="ERPP Search Tool"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
