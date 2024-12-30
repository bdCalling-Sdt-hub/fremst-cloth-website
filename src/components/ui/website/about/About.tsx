import Image from "next/image";
import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Big_Shoulders_Display } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const About = () => {
  return (
    <div className=" ">
      <main className="px-4 py-12">
        {/* About Us Section */}
        <section className="grid md:grid-cols-2 gap-8 container mx-auto items-center mb-24">
          <div className="">
            <h2
              className={`text-[#1a237e] text-[40px] font-bold mb-6 ${bigShoulders.className}`}
            >
              ABOUT US
            </h2>
            <p
              className={`text-gray-600 leading-relaxed ${plusJakarta.className}`}
            >
              Welcome to Fremst, where fashion and comfort come together. Born
              out of a passion for timeless style and high-quality
              craftsmanship, Fremst is committed to bringing you stylish
              clothing that makes you feel as great as you look. From our
              carefully curated collections to our dedication to quality, we
              strive to provide our Fremst followers quality, comfort, and
              modern style.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/about.svg"
              alt="Yellow jacket with Fremst branding"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-[#f4f4f7] p-8">
          <div className="grid md:grid-cols-2 container mx-auto rounded-lg gap-8 items-center justify-center my-24">
            <div className="relative h-[300px]">
              <Image
                src="/mission.svg"
                alt="Safety gloves and high-visibility gear"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-[#1a237e] uppercase text-2xl font-bold mb-4">
                Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At Fremst, our mission is simple: to provide you with clothing
                that combines style with functionality. We believe fashion
                should be high-quality, sustainable, and accessible to everyone.
                That&apos;s why we work with ethical manufacturers and use
                eco-friendly materials, creating clothing that not only looks
                good but feels good too.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="grid md:grid-cols-2 gap-8 my-20 items-center container mx-auto">
          <div>
            <h2 className="text-[#1a237e] text-2xl font-bold mb-4">VISSION</h2>
            <p className="text-gray-600 leading-relaxed">
              At Fremst, our vision is to define the way fashion is experienced
              — making it more inclusive, sustainable, and timeless. We aim to
              lead innovation in the fashion industry by creating high-quality
              clothing that transcends trends, empowering individuals to express
              their true values with confidence.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              We aspire to build a brand that is synonymous with thoughtful
              fashion innovation, and inclusivity, providing everyone with the
              opportunity to wear clothing that helps them feel good about their
              look. Our vision is to inspire positive change in the fashion
              world, one thoughtful design at a time.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/vission.svg"
              alt="Brown leather accessories"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
