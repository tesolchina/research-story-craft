import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { DISCIPLINE_CATEGORIES } from "./types";

interface DisciplineSelectorProps {
  onSelect: (discipline: string) => void;
}

export default function DisciplineSelector({ onSelect }: DisciplineSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customField, setCustomField] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCustomInput(false);
  };

  const handleFieldSelect = (field: string) => {
    // Send both category and specific field for better AI context
    const fullDiscipline = `${selectedCategory} - ${field}`;
    onSelect(fullDiscipline);
  };

  const handleCustomSubmit = () => {
    if (customField.trim()) {
      const fullDiscipline = selectedCategory 
        ? `${selectedCategory} - ${customField.trim()}`
        : customField.trim();
      onSelect(fullDiscipline);
    }
  };

  const handleBack = () => {
    if (showCustomInput) {
      setShowCustomInput(false);
    } else {
      setSelectedCategory(null);
    }
  };

  const currentCategoryData = DISCIPLINE_CATEGORIES.find(
    (c) => c.category === selectedCategory
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {(selectedCategory || showCustomInput) && (
            <Button variant="ghost" size="sm" onClick={handleBack} className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          Welcome to CARS Coach! 🎓
        </CardTitle>
        <CardDescription>
          {!selectedCategory && !showCustomInput && (
            "Let's start by selecting your academic area. This helps me provide discipline-specific examples and insights."
          )}
          {selectedCategory && !showCustomInput && (
            <>Now, tell me your specific field within <strong>{selectedCategory}</strong>.</>
          )}
          {showCustomInput && (
            "Tell me about your specific discipline or research area."
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Step 1: Category Selection */}
        {!selectedCategory && !showCustomInput && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCIPLINE_CATEGORIES.map((cat) => (
                <Button
                  key={cat.category}
                  variant="outline"
                  className="h-auto py-4 justify-between text-left"
                  onClick={() => handleCategorySelect(cat.category)}
                >
                  {cat.category}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              ))}
            </div>
            <div className="pt-2">
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => setShowCustomInput(true)}
              >
                My field isn't listed here...
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Specific Field Selection */}
        {selectedCategory && currentCategoryData && !showCustomInput && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentCategoryData.fields.map((field) => (
                <Button
                  key={field}
                  variant="outline"
                  className="h-auto py-3 justify-start text-left text-sm"
                  onClick={() => handleFieldSelect(field)}
                >
                  {field}
                </Button>
              ))}
            </div>
            <div className="pt-2">
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => setShowCustomInput(true)}
              >
                My specific field isn't listed...
              </Button>
            </div>
          </div>
        )}

        {/* Custom Field Input */}
        {showCustomInput && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-field">Your discipline or research area</Label>
              <Input
                id="custom-field"
                placeholder="e.g., Computational Linguistics, Sports Psychology, Urban Planning..."
                value={customField}
                onChange={(e) => setCustomField(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()}
              />
              <p className="text-xs text-muted-foreground">
                Be as specific as possible so I can tailor examples to your field.
              </p>
            </div>
            <Button 
              onClick={handleCustomSubmit} 
              disabled={!customField.trim()}
              className="w-full"
            >
              Continue with this discipline
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
