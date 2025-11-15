import { Phone } from "lucide-react";

import castleEmblem from "@/assets/castle-emblem.svg";

export default function Hero() {
  const phoneNumber = "941-447-9191";

  return (
    <section className="relative bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={castleEmblem}
                alt="Castle's Custom Painting & Tile crest"
                className="w-[clamp(80rem,20vw,24rem)] h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                loading="lazy"
              />
            </div>
            <p className="font-inter text-xl md:text-2xl text-[#F2F2F2] font-light">
              Interior & Exterior Remodeling, Painting, Tile & Pressure Washing
            </p>
            <p className="text-lg text-[#F94144] font-semibold">Insured & Bonded</p>
          </div>

          <div className="space-y-6">
            <a
              href={`tel:${phoneNumber}`}
              className="inline-block font-michroma text-4xl md:text-5xl font-bold text-[#D62828] hover:text-[#F94144] transition-colors"
            >
              {phoneNumber}
            </a>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:${phoneNumber}`}
                className="bg-[#D62828] hover:bg-[#F94144] text-white font-inter text-lg px-8 py-6 rounded-lg transition-all inline-flex items-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now for Free Estimate
              </a>

              <a
                href="#contact"
                className="border-2 border-white text-white hover:bg-white hover:text-[#0A0A0A] font-inter text-lg px-8 py-6 rounded-lg transition-all inline-block"
              >
                Request Quote
              </a>
            </div>
          </div>

          <div className="pt-8">
            <p className="text-[#F2F2F2] text-sm">Serving Sarasota & Manatee County</p>
          </div>
        </div>
      </div>
    </section>
  );
}
