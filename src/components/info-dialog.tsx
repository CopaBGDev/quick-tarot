
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface InfoDialogProps {
  triggerText: string;
  title: string;
  content: string;
}

export function InfoDialog({ triggerText, title, content }: InfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="underline hover:text-primary transition-colors">
          {triggerText}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4 text-left text-sm text-muted-foreground">
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="whitespace-pre-wrap">{paragraph}</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

    