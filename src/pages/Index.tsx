import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react";

interface Task {
  id: string;
  user_name: string;
  description: string;
  created_at: string;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('task')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tasks:', error);
      } else {
        setTasks(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold">Loading tasks...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Task Management</h1>
          <p className="text-muted-foreground">Track and manage your team's tasks</p>
        </header>

        <main>
          {tasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <h2 className="text-xl font-semibold mb-2">No tasks yet</h2>
                <p className="text-muted-foreground text-center">
                  Tasks will appear here once they are added to the database.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{task.description}</span>
                      <Badge variant="secondary" className="ml-2 flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {task.user_name}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      Created: {new Date(task.created_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
