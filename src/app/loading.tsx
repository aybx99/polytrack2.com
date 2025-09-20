import LoadingSpinner from '@/components/LoadingSpinner';

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-body flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" message="Loading amazing games..." />
      </div>
    </div>
  );
}
