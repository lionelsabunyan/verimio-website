export default function BlogLoading() {
  return (
    <div className="pt-20">
      {/* Hero skeleton */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="h-4 w-16 bg-foreground/8 rounded-full mb-6 animate-pulse" />
            <div className="h-12 w-3/4 bg-foreground/8 rounded-xl mb-4 animate-pulse" />
            <div className="h-6 w-1/2 bg-foreground/6 rounded-lg mb-2 animate-pulse" />
            <div className="h-6 w-2/3 bg-foreground/6 rounded-lg animate-pulse" />
          </div>
        </div>
      </section>

      {/* Blog grid skeleton */}
      <section className="section-padding bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl border border-border overflow-hidden"
              >
                {/* Image skeleton — matches BlogCardImage 16/10 aspect ratio */}
                <div className="p-4 pb-0">
                  <div
                    className="w-full rounded-xl bg-foreground/6 animate-pulse"
                    style={{ aspectRatio: '16/10' }}
                  />
                </div>

                <div className="p-6">
                  {/* Date */}
                  <div className="h-4 w-28 bg-foreground/6 rounded-md mb-3 animate-pulse" />
                  {/* Title */}
                  <div className="h-5 w-full bg-foreground/8 rounded-lg mb-2 animate-pulse" />
                  <div className="h-5 w-4/5 bg-foreground/8 rounded-lg mb-4 animate-pulse" />
                  {/* Excerpt */}
                  <div className="h-4 w-full bg-foreground/6 rounded-md mb-2 animate-pulse" />
                  <div className="h-4 w-3/4 bg-foreground/6 rounded-md mb-4 animate-pulse" />
                  {/* CTA */}
                  <div className="h-4 w-24 bg-foreground/6 rounded-md animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
