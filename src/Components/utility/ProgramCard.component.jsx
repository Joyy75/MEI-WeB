const Badge = ({ text, color }) => <span className={` text-xs font-semibold px-3 py-1 rounded-full ${color}`}>{text}</span>;

export const ProgramCard = ({ program, onClick }) => (
  <div onClick={() => onClick(program.id)} className="card rounded-2xl shadow-lg shadow-[var(--card)]  overflow-hidden  hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="relative">
      <img src={program.image} alt={program.title} className={`  h-72 w-full object-cover bg-gradient-to-br   overflow-hidden`} />

      <div className="absolute  sub-card top-2 right-2  shadow-md px-2 py-1 rounded-full text-xs  ">Free</div>
    </div>

    <div className="px-2 py-1 flex items-center justify-between">
      <div className="flex items-center gap-3 mb-4">
        <img src={program?.volunteer?.image} alt={program.volunteer?.name} className={`h-14 w-14  rounded-full object-cover bg-gradient-to-br   overflow-hidden`} />

        <div>
          <h4 className="font-semibold ">{program.volunteer.name}</h4>
          <p className="text-sm font-serif ">{program.title}</p>
        </div>
      </div>

      <Badge text={`${program.duration || 'Duration N/A'}`} color="bg-yellow-100  text-yellow-800" />
    </div>
  </div>
);
