import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

const CollapsibleSection = ({ id, title, description, children }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.detail.id === id && e.detail.action === "expand") {
        setOpen(true);
      }
    };

    window.addEventListener("collapsible-section", handler as EventListener);
    return () => {
      window.removeEventListener("collapsible-section", handler as EventListener);
    };
  }, [id]);

  return (
    <Card
      id={id}
      className="mb-6 rounded-2xl border border-border bg-card/70 backdrop-blur-sm shadow-sm"
    >
      <CardHeader
        className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-5 cursor-pointer hover:bg-muted/30 rounded-t-2xl"
        onClick={() => setOpen(!open)}
      >
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold text-foreground">
            {title}
          </CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="mt-3 md:mt-0 text-portfolio-accent flex items-center">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          <span className="ml-1 text-sm">{open ? "Hide" : "Show"}</span>
        </div>
      </CardHeader>

      {open && (
        <CardContent className="px-6 py-5 border-t border-border text-muted-foreground leading-relaxed">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default CollapsibleSection;
