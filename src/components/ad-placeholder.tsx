import { GoogleAd } from "./google-ad";

export function AdPlaceholder() {
  return (
    <div className="w-full max-w-md rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center shadow-inner flex items-center justify-center min-h-[120px]">
      <GoogleAd />
    </div>
  );
}
