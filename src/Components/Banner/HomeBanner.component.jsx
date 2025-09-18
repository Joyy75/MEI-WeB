import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HomeBanner = () => {
  const nav = useNavigate();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-16">
        <div data-aos="fade-right" className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h2 className="text-4xl font-extrabold leading-tight ">Empowering Myanmar's Youth Through Education & Support</h2>
          <p className="text-lg lg:text-xl opacity-85 leading-relaxed font-serif">
            We are a non-profit organization dedicated to empowering youth in Myanmar through free educational programs and community-driven support. Together, we're building brighter futures.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
            <button onClick={() => nav('/programs')} className=" px-6 py-3 rounded-full card text-base font-semibold shadow  transition hover:scale-105 duration-500 cursor-pointer">
              <span className="flex items-center gap-2 justify-center">
                Join A Course <ChevronRight className="w-5 h-5" />
              </span>
            </button>
            <button className="border  px-6 py-3 rounded-full card text-base font-semibold  transition hover:scale-105 duration-500 cursor-pointer">
              <span className="flex items-center gap-2 justify-center">
                Become A Volunteer <ChevronRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>

        <div data-aos="fade-left" className="w-full lg:w-1/2 relative flex justify-center">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-0 w-72 h-72 bg-gradient-to-br  rounded-full blur-3xl -z-10"></div>
            <div className="rounded-2xl overflow-hidden shadow-2xl mb-4 transition-transform duration-300 hover:scale-105">
              <img src="group/group_one.jpg" alt="Education Program" className="w-full h-64 object-cover" />
            </div>

            <div className="flex justify-between gap-4 mt-2">
              <img src="group/group_two.jpg" alt="Community Support 1" className="w-1/2 h-36 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105" />
              <img src="group/group_three.jpg" alt="Community Support 2" className="w-1/2 h-36 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105" />
            </div>

            {/* Stats */}
            <div className="absolute -top-4 -left-4 card backdrop-blur-md rounded-lg p-3 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold ">50+</div>
                <div className="text-sm ">Students</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 card  backdrop-blur-md rounded-lg p-3 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold ">50+</div>
                <div className="text-sm ">Volunteers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
