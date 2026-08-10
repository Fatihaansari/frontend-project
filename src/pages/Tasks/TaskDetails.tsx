import {
  CalendarDays,
  CheckCircle2,
  FileText,
  Flag,
  FolderKanban,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Task } from "./taskData";
import CommentSection from "@/components/comments/CommentSection";

interface TaskDetailsProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
}

const PRIORITY_STYLES: Record<Task["priority"], string> = {
  Low: "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400",
  Medium:
    "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/50 dark:bg-yellow-950/30 dark:text-yellow-400",
  High: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400",
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function TaskDetails({ task, open, onClose }: TaskDetailsProps) {
  if (!task) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="pr-8 text-xl">{task.task_name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">
              Description
            </p>

            <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm leading-6 text-muted-foreground">
              {task.description || "No description provided."}
            </div>
          </div>

          {/* Task Information */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-border p-3">
              <FolderKanban className="h-5 w-5 text-orange-500" />

              <div>
                <p className="text-xs text-muted-foreground">Project</p>
                <p className="text-sm font-medium text-foreground">
                  {task.project || "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border p-3">
              <User className="h-5 w-5 text-orange-500" />

              <div>
                <p className="text-xs text-muted-foreground">Assignee</p>
                <p className="text-sm font-medium text-foreground">
                  {task.assignee || "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border p-3">
              <Flag className="h-5 w-5 text-orange-500" />

              <div>
                <p className="text-xs text-muted-foreground">Priority</p>

                <Badge
                  variant="outline"
                  className={`mt-1 rounded-full ${PRIORITY_STYLES[task.priority]}`}
                >
                  {task.priority}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border p-3">
              <CheckCircle2 className="h-5 w-5 text-orange-500" />

              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-medium text-foreground">
                  {task.status}
                </p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-border p-3">
              <CalendarDays className="h-5 w-5 text-orange-500" />

              <div>
                <p className="text-xs text-muted-foreground">Start Date</p>
                <p className="text-sm font-medium text-foreground">
                  {task.start_date || "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border p-3">
              <CalendarDays className="h-5 w-5 text-orange-500" />

              <div>
                <p className="text-xs text-muted-foreground">Due Date</p>
                <p className="text-sm font-medium text-foreground">
                  {task.due_date || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Attachments</p>

              <span className="text-xs text-muted-foreground">
                {task.attachments?.length ?? 0} file
                {(task.attachments?.length ?? 0) !== 1 ? "s" : ""}
              </span>
            </div>

            {task.attachments && task.attachments.length > 0 ? (
              <div className="space-y-2">
                {task.attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400">
                      <FileText className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-sm font-medium text-foreground"
                        title={file.name}
                      >
                        {file.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(file.url, "_blank")}
                    >
                      Open
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
                No attachments.
              </div>
            )}
          </div>
          {/* Comments */}
          <div className="border-t border-border pt-6">
            <CommentSection targetId={task.id} targetType="task" />
          </div>
          {/* Footer */}
          <div className="flex justify-end border-t border-border pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
