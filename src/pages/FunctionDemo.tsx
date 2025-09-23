import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const FunctionDemo = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateMessage = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-message", {
        body: { input: inputText },
      });

      if (error) {
        throw error;
      }

      setResult(data.message);
      toast({
        title: "Success",
        description: "Message generated successfully!",
      });
    } catch (error) {
      console.error("Error calling function:", error);
      toast({
        title: "Error",
        description: "Failed to generate message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Function Demo</h1>
          <p className="text-muted-foreground">Test the message generation function</p>
        </header>

        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Message Generator</CardTitle>
            <CardDescription>
              Enter some text and get an enhanced message back from our edge function
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="input-text" className="text-sm font-medium">
                Your Text
              </label>
              <Input
                id="input-text"
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleGenerateMessage} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Generating..." : "Generate Message"}
            </Button>

            {result && (
              <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                <h3 className="font-semibold mb-2">Generated Message:</h3>
                <p className="text-foreground">{result}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button variant="outline" onClick={() => window.history.back()}>
            ← Back to Tasks
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FunctionDemo;