import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Brain, Code, FileText, Lightbulb, MessageSquare, Target, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Week1KeyPoints = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/mccp/week1">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Week 1
          </Button>
        </Link>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">Week 1 Key Points</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Summary of key concepts covered by Dr. Simon Wong in the Week 1 session
        </p>
      </div>

      {/* Opening Message */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Course Philosophy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Simon shared his background as the former coordinator of this course and his experience helping researchers publish papers at Huazhong University of Science and Technology for nearly 10 years.
          </p>
          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
            "With large language models, do we really need language teachers anymore? I think the answer is to build a partnership."
          </blockquote>
        </CardContent>
      </Card>

      {/* Key Themes Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Theme 1: Language Teachers vs AI */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-blue-600" />
              Language Teachers as "Small Language Models"
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Simon made an interesting comparison:
            </p>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Language teachers recognize patterns from years of training and exposure</li>
              <li>• AI does the same, but with enormously more data</li>
              <li>• Teachers' advantages: more efficient (consume less electricity), more contextual knowledge</li>
              <li>• The challenge: Can teachers still play a role alongside AI?</li>
            </ul>
          </CardContent>
        </Card>

        {/* Theme 2: Nature Career Column */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-green-600" />
              Nature Career Column (2019) Revisited
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Three key strategies from the 2019 article, now needing AI upgrades:
            </p>
            <ol className="text-sm space-y-2 text-muted-foreground list-decimal list-inside">
              <li><strong>Manage research literature</strong> - Tools like Zotero, Mendeley, EndNote</li>
              <li><strong>Analyze published articles</strong> - Learn from published authors, not just teachers</li>
              <li><strong>Find language teachers</strong> → Now "Find AI teachers" to improve manuscripts</li>
            </ol>
          </CardContent>
        </Card>

        {/* Theme 3: Learning from Published Authors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-purple-600" />
              Learning from Published Authors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <blockquote className="border-l-4 border-purple-300 pl-4 italic text-sm text-muted-foreground">
              "You don't really learn how to write from me. You learn how to write from published authors."
            </blockquote>
            <p className="text-sm text-muted-foreground">
              The key insight: Analyze published articles systematically to gain insights, then apply them to your own writing. AI can help analyze 1,000 papers instead of just one!
            </p>
          </CardContent>
        </Card>

        {/* Theme 4: Assessment Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-orange-600" />
              Course Assessment Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• <strong>60% Speaking</strong> - Reflects difficulty in teaching writing with AI available</li>
              <li>• <strong>40% Writing</strong> - Introduction & Literature Review</li>
              <li>• <strong>Pass/Fail</strong> - 65% to pass, "everybody will pass"</li>
              <li>• AI tools for speaking not as well-developed yet</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* AI Agent Approach */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-600" />
            The AI Agent Approach: Input → Process → Output
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Simon introduced a powerful approach for using AI, going beyond simple chatbot interactions:
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-blue-700 mb-2">📥 Input</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Course syllabus</li>
                <li>• Assignment brief</li>
                <li>• Student's goals & reflection</li>
                <li>• Tutor information</li>
                <li>• 20-30 research articles</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-green-700 mb-2">⚙️ Process</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Structured prompts in markdown</li>
                <li>• File paths to reference documents</li>
                <li>• Agent mode in Cursor/VS Code</li>
                <li>• AI reads all files and executes</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-purple-700 mb-2">📤 Output</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Detailed plans in Markdown</li>
                <li>• Macro-level analysis</li>
                <li>• HTML visualizations</li>
                <li>• Paper insights & annotations</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Key Insight:</strong> This approach is "much more powerful than just go to POE or a GUI to talk to a chatbot. That's an obsolete way of using AI."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Week 1 Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-600" />
            Week 1 Activities Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-start p-3 bg-muted/30 rounded-lg">
              <span className="font-bold text-primary min-w-[80px]">1.1</span>
              <div>
                <p className="font-medium">Mapping Instruction</p>
                <p className="text-sm text-muted-foreground">Write student reflection, send to AI agent to develop a plan for completing the assignment and working with tutor</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start p-3 bg-muted/30 rounded-lg">
              <span className="font-bold text-primary min-w-[80px]">1.2</span>
              <div>
                <p className="font-medium">Macro-Level Structure Analysis</p>
                <p className="text-sm text-muted-foreground">Analyze published articles for structure, generate notes and HTML visualizations</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start p-3 bg-muted/30 rounded-lg">
              <span className="font-bold text-primary min-w-[80px]">1.3</span>
              <div>
                <p className="font-medium">LLM API Integration</p>
                <p className="text-sm text-muted-foreground">Use HKBU API key to run external AI compute for assessment reports</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start p-3 bg-muted/30 rounded-lg">
              <span className="font-bold text-primary min-w-[80px]">1.4</span>
              <div>
                <p className="font-medium">Generate Additional Ideas</p>
                <p className="text-sm text-muted-foreground">Use AI to brainstorm 10 additional activity ideas with objectives, I/O, and learning outcomes</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start p-3 bg-muted/30 rounded-lg">
              <span className="font-bold text-primary min-w-[80px]">1.5</span>
              <div>
                <p className="font-medium">RAG Database (Advanced)</p>
                <p className="text-sm text-muted-foreground">Build retrieval-augmented generation system using HKBU API embeddings</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" />
            Course Meeting Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="font-medium">Weeks 2-4</p>
              <p className="text-sm text-muted-foreground">Small group meetings (3 students × 1 hour)</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="font-medium">Weeks 5-6</p>
              <p className="text-sm text-muted-foreground">Oral Presentations</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="font-medium">Weeks 7-9</p>
              <p className="text-sm text-muted-foreground">Small group meetings continue</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="font-medium">Week 10+</p>
              <p className="text-sm text-muted-foreground">More presentations, consultation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Takeaway */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-green-600" />
            The Bottom Line
          </CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="text-lg italic text-green-800">
            "If you understand this approach, you can go home and start using it to optimize your research. We can change the input to anything, change the process prompts, and get different outputs. This is a very powerful approach."
          </blockquote>
          <p className="text-sm text-muted-foreground mt-4">
            The course aims to explore how students and teachers can build a partnership with AI to enhance research writing skills, going beyond simple chatbot interactions to leverage AI's full potential through structured, programmatic approaches.
          </p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-center pt-4">
        <Link to="/mccp/week1">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Week 1 Overview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Week1KeyPoints;
