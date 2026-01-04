import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, BookOpen, Target, Calendar, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollapsibleModuleProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleModule = ({ title, icon, children, defaultOpen = true }: CollapsibleModuleProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {icon}
                {title}
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

const WritingComponent = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/mccp/weeks2-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">Weeks 2-4</p>
          <h1 className="text-2xl font-bold">Writing Component (Take-home)</h1>
        </div>
      </div>

      <CollapsibleModule
        title="Assignment Overview"
        icon={<FileText className="h-5 w-5 text-primary" />}
      >
        <p className="text-muted-foreground">
          Students will complete a take-home assignment that includes sufficient background information to provide context and significance for the research, a review of recent and relevant literature, proper acknowledgment of previous work on the topic, and an analysis or reference to the research gap that needs to be filled. Additionally, the assignment should feature a purpose statement highlighting the novelty and contributions of the research.
        </p>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="p-4 border rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-2">Weighting</h3>
            <p className="text-2xl font-bold text-primary">40%</p>
          </div>
          <div className="p-4 border rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-2">Deadline</h3>
            <p className="text-lg">TBA</p>
          </div>
        </div>
      </CollapsibleModule>

      <CollapsibleModule
        title="Key Requirements"
        icon={<BookOpen className="h-5 w-5 text-primary" />}
      >
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
            <span><strong>Introduction Section:</strong> Provide research context and significance</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
            <span><strong>Literature Review:</strong> Review of recent and relevant sources</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
            <span><strong>Research Gap:</strong> Identify and analyze the gap to be addressed</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
            <span><strong>Purpose Statement:</strong> Highlight novelty and contributions</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
            <span><strong>Citations:</strong> Proper citation and referencing throughout</span>
          </li>
        </ul>
      </CollapsibleModule>

      <CollapsibleModule
        title="Learning Objectives"
        icon={<Target className="h-5 w-5 text-primary" />}
      >
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">1</span>
            <span>Develop skills in academic writing and scholarly communication</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">2</span>
            <span>Learn to critically analyze and synthesize existing literature</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">3</span>
            <span>Practice identifying research gaps and formulating purpose statements</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">4</span>
            <span>Apply proper academic citation and referencing conventions</span>
          </li>
        </ul>
      </CollapsibleModule>

      <CollapsibleModule
        title="Submission Guidelines"
        icon={<Calendar className="h-5 w-5 text-primary" />}
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Detailed submission guidelines will be provided during the course. Please check Moodle regularly for updates.
          </p>
          <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> All submissions must be made through Moodle before the deadline. Late submissions may incur penalties as per the course policy.
            </p>
          </div>
        </div>
      </CollapsibleModule>
    </div>
  );
};

export default WritingComponent;
