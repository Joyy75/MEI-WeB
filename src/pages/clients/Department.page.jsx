import { useNavigate, useParams } from "react-router-dom";
import { Star, Award } from "lucide-react";
import { departments } from "@data";

export const Department = () => {
  const { departmentName } = useParams();
  const nav = useNavigate();

  const data = departments[departmentName] || {
    title: "Department Not Found",
    description: "This department doesn't have any content yet.",
    detailedDescription:
      "Please check the URL or navigate back to explore our available departments.",
    stats: [],
    features: [],
    image: "/departments/not-found.png",
    achievements: [],
  };

  return (
    <section>
      <div className="min-h-screen pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div
            data-aos="fade-up"
            className="text-center mb-12 rounded-3xl p-12  relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20" />
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6  text-shadow-lg">
                {data.title}
              </h1>
              <p className="text-xl font-serif  font-light mb-8 max-w-4xl mx-auto opacity-95">
                {data.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                {data.stats?.map(({ Icon, value, label }) => (
                  <div
                    key={label}
                    className=" backdrop-blur-lg border-[var(--sub-card)] border  border-opacity-20 rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-2"
                  >
                    <div className=" mb-3 flex justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{value}</div>
                    <div className="text-sm opacity-90">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" className="order-2 lg:order-1">
              <div className="card border-[var(--sub-card)] rounded-3xl p-8 shadow-xl border-2 border-opacity-20">
                <h2 className="text-3xl font-bold mb-6">
                  About Our Department
                </h2>
                <p className="font-serif text-lg leading-relaxed mb-8">
                  {data.detailedDescription}
                </p>

                {data.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 border-[var(--sub-card)] sub-card rounded-full text-sm font-medium border transition-all duration-500 cursor-pointer hover:opacity-90 hover:scale-95 "
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {data.values.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5" /> values
                    </h3>
                    <div className="space-y-2">
                      {data.values.map((value, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 opacity-80  "
                        >
                          <Star className="w-4 h-4" />
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div data-aos="fade-left" className="order-1 lg:order-2">
              <div className="text-center">
                <div className="rounded-3xl p-5  border-[var(--sub-card)] border-2 border-opacity-20">
                  <img
                    src={data.image}
                    alt={`${data.title} illustration`}
                    className="w-full max-w-full rounded-xl mx-auto h-[500px] object-cover "
                    style={{
                      filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          {data.others?.journeys?.length > 0 && (
            <div
              data-aos="fade-up"
              className="mt-16 border-[var(--sub-card)] rounded-3xl p-8 border-2 border-opacity-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                {data.others.title}
              </h2>
              {data.others.subTitle && (
                <p className="text-center text-lg font-serif opacity-80 mb-10">
                  {data.others.subTitle}
                </p>
              )}

              <div
                className={`${
                  data.others.journeys.length === 1
                    ? "flex justify-center items-center min-h-[300px]"
                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center"
                }`}
              >
                {data.others.journeys.map((journey, index) => (
                  <div
                    key={index}
                    className="w-full max-w-xs rounded-xl overflow-hidden border border-[var(--sub-card)] border-opacity-20 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {journey.image ? (
                      <img
                        src={journey.image}
                        alt={journey.name}
                        className="w-full  h-60 object-cover"
                      />
                    ) : (
                      <div className="w-full h-60 flex items-center justify-center bg-gray-100 text-gray-500 italic">
                        No Image Available
                      </div>
                    )}
                    <div className="p-4 text-center">
                      <p className="text-md font-medium">{journey.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact */}
          {departmentName && departments[departmentName] && (
            <div
            onClick={() => nav('/contact')}
              data-aos="fade-right"
              className="mt-16 border-[var(--sub-card)] text-center rounded-3xl p-12 border-2 border-opacity-20"
            >
              <h2 className="text-4xl font-bold mb-4">Ready to Join Us?</h2>
              <p className="font-serif opacity-80 text-lg mb-8 max-w-3xl mx-auto">
                Discover opportunities, connect with faculty, and take the next
                step in your journey with our {data.title.toLowerCase()}.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button className="px-8 py-3 border-[var(--sub-card)] rounded-full font-semibold text-lg  border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  Apply Now
                </button>
                <button className="px-8 py-3 border-[var(--sub-card)] rounded-full font-semibold text-lg  border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  Contact Us
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </section>
  );
};

