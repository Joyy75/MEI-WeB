import {
  BookOpen,
  HandCoins,
  ChartNoAxesCombined,
} from "lucide-react";
import { visions } from "@data";

export const VisionBanner = () => {
  return (
    <div className="min-h-screen   py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Bg Shadow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64  rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Vision Section */}
        <div data-aos="fade-right">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            Our Vision
          </h2>

          <div className="mb-20">
            <div className="hidden lg:block relative">
              {/*  Path */}
              <div className="absolute top-1/2 left-0 right-0 h-1 transform ">
                <svg
                  className="w-full h-full card  drop-shadow-lg"
                  viewBox="0 0 7000 50"
                  preserveAspectRatio="none"
                >
                  <path stroke="" strokeWidth="3" fill="none" />
                </svg>
              </div>

              {/* Vision Steps */}
              <div className="relative grid grid-cols-4 gap-8 pt-8">
                {visions.map(({ Icon, title, description }) => (
                  <div key={title} className="relative">
                    <div className="absolute  top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-4 h-4 card  rounded-full shadow-lg"></div>

                    {/* Card */}
                    <div className="card shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 mt-8 rounded-xl overflow-hidden group">
                      <div className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 sub-card rounded-full  group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-8 h-8" />
                          </div>
                        </div>
                        <h3 className="text-lg font-bold mb-3 ">{title}</h3>
                        <p className="text-sm font-serif   opacity-70  leading-relaxed">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/*  layout */}
            <div className="lg:hidden">
              <div className="space-y-8">
                {visions.map(({ Icon, title, description }) => (
                  <div key={title} className="relative">
                    {/* Connecting Line */}
                    {title < visions.length - 1 && (
                      <div className="absolute left-1/2 top-full card transform -translate-x-1/2 w-1 h-8  z-10"></div>
                    )}

                    <div className="   card   shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="p-3 sub-card    rounded-full ">
                              <Icon className="w-8 h-8" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2 ">{title}</h3>
                            <p className="text-sm  opacity-70 leading-relaxed">
                              {description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center" data-aos="fade-left">
          <div className="max-w-4xl mx-auto ">
            <div className="flex items-center justify-center gap-4  mb-16 ">
              <h2 className="text-4xl lg:text-5xl font-bold text-center">
                Our Mission
              </h2>
            </div>

            <div className="card bg-gradient-to-r   shadow-2xl rounded-2xl overflow-hidden">
              <div className="p-8 md:p-12">
                <h3 className="text-xl md:text-2xl font-semibold mb-6 leading-relaxed">
                  To revolutionize education by creating inclusive, innovative,
                  and accessible learning environments that empower every
                  student to reach their full potential and become catalysts for
                  positive change in their communities and beyond.
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center group">
                    <div className="sub-card inline-flex items-center justify-center w-12 h-12   bg-opacity-20 rounded-full mb-3  transition-all duration-300">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <p className="font-medium">Quality Learning</p>
                  </div>
                  <div className="text-center group">
                    <div className="sub-card inline-flex items-center justify-center w-12 h-12   bg-opacity-20 rounded-full mb-3 transition-all duration-300">
                      <HandCoins className="w-6 h-6" />
                    </div>
                    <p className="font-medium">Inclusive Access</p>
                  </div>
                  <div className="text-center group">
                    <div className="sub-card inline-flex items-center justify-center w-12 h-12   bg-opacity-20 rounded-full mb-3  transition-all duration-300">
                      <ChartNoAxesCombined className="w-6 h-6" />
                    </div>
                    <p className="font-medium">Future Growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center opacity-60">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2  rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2  rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2  rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

