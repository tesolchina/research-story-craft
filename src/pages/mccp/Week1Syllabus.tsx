import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, PieChart as PieChartIcon, Info, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const assessmentData = [
  { name: "Oral Presentation 1 (Research Article)", value: 20 },
  { name: "Oral Presentation 2 (Poster)", value: 20 },
  { name: "Writing Assignment (Intro & Lit Review)", value: 40 },
  { name: "Oral Presentation 3 (3MT)", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const cilos = [
  {
    id: "CILO 1",
    description: "Understand and apply the appropriate structure and format of academic presentations and critically evaluate their own and their peers’ presentations.",
  },
  {
    id: "CILO 2",
    description: "Recognize the generic features of PhD thesis and research journal articles and apply the acquired structures or move development in their own writing.",
  },
  {
    id: "CILO 3",
    description: "Identify and build a repertoire of linguistic features for both academic speech and writing, including signposts, cohesive devices, and grammatical patterns.",
  },
  {
    id: "CILO 4",
    description: "Acknowledge and document a wide range of sources strategically and systematically in the form of in-text citations, bibliographies, and references.",
  },
];

const Week1Syllabus = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp/week1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Week 1 / Introduction</p>
            <h1 className="text-2xl font-bold text-primary">Syllabus and Assessment</h1>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="h-5 w-5" />
                Course Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-muted-foreground">Code</p>
                <p className="text-base font-medium">MCCP 6020</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">Title</p>
                <p className="text-base font-medium">Advanced English for Academic Purposes</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">Units / Hours</p>
                <p className="text-base font-medium">2 Units / 42 Hours</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">Department</p>
                <p className="text-base font-medium">Language Centre</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChartIcon className="h-5 w-5" />
                Assessment Structure
              </CardTitle>
              <CardDescription>Weighting distribution of course assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assessmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {assessmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Intended Learning Outcomes (CILOs)</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {cilos.map((cilo) => (
              <Card key={cilo.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-primary text-base font-bold">{cilo.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{cilo.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Assessment Schedule Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <h4 className="font-bold">Oral Presentation 1</h4>
                  <p className="text-sm text-muted-foreground">8-minute presentation on a journal article</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary">20%</span>
                  <p className="text-xs text-muted-foreground">Non-specialist audience</p>
                </div>
              </div>
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <h4 className="font-bold">Oral Presentation 2</h4>
                  <p className="text-sm text-muted-foreground">Poster Presentation of research design</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary">20%</span>
                  <p className="text-xs text-muted-foreground">Poster + Discussion</p>
                </div>
              </div>
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <h4 className="font-bold">Writing Assignment</h4>
                  <p className="text-sm text-muted-foreground">Introduction and Literature Review</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary">40%</span>
                  <p className="text-xs text-muted-foreground">Take-home assignment</p>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">Oral Presentation 3</h4>
                  <p className="text-sm text-muted-foreground">3-minute presentation (3MT style)</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary">20%</span>
                  <p className="text-xs text-muted-foreground">Concise & powerful</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Week1Syllabus;


