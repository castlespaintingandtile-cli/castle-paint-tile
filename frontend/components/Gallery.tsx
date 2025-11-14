const photos = [
  {
    title: "Bathroom Remodel",
    description: "Complete bathroom renovation with custom tile work",
  },
  {
    title: "Kitchen Remodel",
    description: "Modern kitchen transformation with white cabinetry",
  },
  {
    title: "Tile Installation",
    description: "Beautiful backsplash and floor tile installation",
  },
  {
    title: "Exterior Pressure Washing",
    description: "Professional pressure washing services",
  },
  {
    title: "Interior Painting",
    description: "Flawless interior paint application",
  },
  {
    title: "Custom Tile Work",
    description: "Expert shower and floor tile installation",
  },
];

export default function Gallery() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-michroma text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              Our Work
            </h2>
            <p className="font-inter text-lg text-[#4A4A4A] max-w-2xl mx-auto">
              See the quality and craftsmanship that sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow bg-[#F2F2F2]"
              >
                <div className="aspect-square bg-gradient-to-br from-[#4A4A4A] to-[#0A0A0A] flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="font-michroma text-white text-sm mb-2">
                      {photo.title}
                    </p>
                    <p className="font-inter text-[#F2F2F2] text-xs">
                      {photo.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 font-inter text-sm text-[#4A4A4A] italic">
            Replace these placeholders with actual project photos
          </p>
        </div>
      </div>
    </section>
  );
}
