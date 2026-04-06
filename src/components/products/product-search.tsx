"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border bg-card p-3 shadow-sm">
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by product name or description..."
        className="border-0 bg-transparent shadow-none focus-visible:ring-0"
      />
      {value && (
        <Button variant="ghost" size="icon" onClick={() => onChange("")}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
