export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
        <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-accent" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
      </div>
    </div>
  );
}
