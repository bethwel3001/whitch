export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-24">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
    </div>
  );
}
