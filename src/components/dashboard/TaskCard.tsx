import { format } from "date-fns";
import { Pencil, Trash2, Calendar, Flag } from "lucide-react";
import { Task } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  todo: { label: "To Do", className: "bg-muted text-muted-foreground" },
  in_progress: { label: "In Progress", className: "bg-warning/20 text-warning" },
  done: { label: "Done", className: "bg-success/20 text-success" },
};

const priorityConfig = {
  low: { label: "Low", className: "text-muted-foreground" },
  medium: { label: "Medium", className: "text-warning" },
  high: { label: "High", className: "text-destructive" },
};

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-primary/30 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn("font-semibold text-card-foreground line-clamp-2", task.status === "done" && "line-through opacity-60")}>
            {task.title}
          </h3>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onEdit(task)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(task.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        {task.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
        )}
        <div className="flex items-center flex-wrap gap-2">
          <Badge variant="secondary" className={status.className}>
            {status.label}
          </Badge>
          <div className={cn("flex items-center gap-1 text-xs", priority.className)}>
            <Flag className="h-3 w-3" />
            {priority.label}
          </div>
          {task.due_date && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {format(new Date(task.due_date), "MMM d, yyyy")}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
