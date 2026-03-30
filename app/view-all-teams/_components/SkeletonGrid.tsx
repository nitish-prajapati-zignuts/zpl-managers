export function SkeletonGrid() {
    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
        </div>
    )
}