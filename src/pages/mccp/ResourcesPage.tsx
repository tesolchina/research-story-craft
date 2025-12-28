import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResourcesPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Course Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <a href="/learning-apps" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h3 className="font-medium mb-1">Learning Apps</h3>
              <p className="text-sm text-muted-foreground">AI-powered tools for essay revision</p>
            </a>
            <a href="/ai-workshops/resources" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h3 className="font-medium mb-1">AI Resources</h3>
              <p className="text-sm text-muted-foreground">Additional AI tools for academic writing</p>
            </a>
            <a href="/search" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h3 className="font-medium mb-1">AI Search</h3>
              <p className="text-sm text-muted-foreground">AI-powered academic search</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesPage;
