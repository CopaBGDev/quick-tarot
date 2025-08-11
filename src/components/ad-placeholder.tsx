import { ShoppingCart } from "lucide-react";

export function AdPlaceholder() {
  return (
    <div className="w-full max-w-md rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center shadow-inner">
      <ShoppingCart className="mx-auto mb-3 h-10 w-10 text-primary/80" />
      <h3 className="font-headline text-lg text-primary">Kupite Tarot Karte i Knjige</h3>
      <p className="text-sm text-muted-foreground">Oglasni prostor</p>
    </div>
  );
}
