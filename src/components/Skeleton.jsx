const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse bg-f1-card/30 rounded ${className}`}
      {...props}
    />
  )
}

export const ChromaGridSkeleton = ({ columns = 3, rows = 1 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: columns * rows }).map((_, index) => (
        <div key={index} className="chroma-card p-6">
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  )
}

export const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Header Skeleton */}
      <div className="px-6 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Quick Look Skeleton */}
      <div className="px-6 lg:px-16 mb-12">
        <Skeleton className="h-8 w-48 mb-8" />
        <ChromaGridSkeleton columns={3} rows={1} />
      </div>

      {/* Driver Standings Skeleton */}
      <div className="px-6 lg:px-16 mb-12">
        <Skeleton className="h-8 w-48 mb-8" />
        <ChromaGridSkeleton columns={3} rows={1} />
      </div>

      {/* Constructor Standings Skeleton */}
      <div className="px-6 lg:px-16 mb-12">
        <Skeleton className="h-8 w-48 mb-8" />
        <ChromaGridSkeleton columns={3} rows={1} />
      </div>

      {/* Upcoming Races Skeleton */}
      <div className="px-6 lg:px-16 mb-12">
        <Skeleton className="h-8 w-48 mb-8" />
        <ChromaGridSkeleton columns={3} rows={1} />
      </div>
    </div>
  )
}

export default Skeleton 