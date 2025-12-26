import { CheckCircle2, Clock, ListTodo, TrendingUp } from "lucide-react";
import { Task } from "@/hooks/useTasks";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  tasks: Task[];
}

export function StatsCards({ tasks }: StatsCardsProps) {
  const totalTasks = tasks.length;
  const todoTasks = tasks.filter((t) => t.status === "todo").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress").length;
  const doneTasks = tasks.filter((t) => t.status === "done").length;
  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const stats = [
    { label: "Total Tasks", value: totalTasks, icon: ListTodo, color: "text-primary" },
    { label: "To Do", value: todoTasks, icon: Clock, color: "text-muted-foreground" },
    { label: "In Progress", value: inProgressTasks, icon: TrendingUp, color: "text-warning" },
    { label: "Completed", value: `${completionRate}%`, icon: CheckCircle2, color: "text-success" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color} opacity-80`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
