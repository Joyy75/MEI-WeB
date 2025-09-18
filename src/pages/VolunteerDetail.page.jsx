import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, Users, Building, GraduationCap } from 'lucide-react';
import { Loading } from '@components';
import { useVolunteerQuery } from '@hooks';
import { socialLinks, departmentList ,batchList } from '@data';

const BacktoRoute = () => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const isAdmin = location.includes('/admin');

  return (
    <div className={`flex items-center justify-between mb-5 ${!isAdmin && 'pt-4'}`}>
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(isAdmin ? '/admin/volunteers' : '/members')} className="flex items-center gap-2 transition-colors">
          <ArrowLeft size={20} />
          Back to {isAdmin ? 'Volunteers' : 'Members'}
        </button>
      </div>
    </div>
  );
};

const Profile = ({ volunteer }) => (
  <div className="flex items-center gap-6">
    <div className="relative">
      <img src={volunteer?.image || '/default-avatar.png'} alt={volunteer?.name} className="w-24 h-24 rounded-full object-cover border-2 " />
      <div className="absolute -bottom-0 -right-0 w-5 h-5 bg-green-500 rounded-full border-2 "></div>
    </div>
    <div>
      <h1 className="text-3xl font-bold mb-2">{volunteer?.name}</h1>
      <p className="text-xl   mb-1">{volunteer?.position}</p>
      <div className="flex items-center gap-4 ">
        <span className="flex items-center gap-1">
          <Building size={16} />
          {departmentList?.find((dept) => dept.id == volunteer?.department)?.name || 'Not specified'}
        </span>
        <span className="flex items-center gap-1">
          <Users size={16} />
          {volunteer?.team || 'Not specified'}
        </span>
      </div>
    </div>
  </div>
);

const Personal = ({ volunteer }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold  mb-4">Personal Information</h2>

    <div className="space-y-4 font-serif">
      <div className="flex items-center gap-3 p-3 sub-card rounded-lg">
        <Mail className="" size={20} />
        <div>
          <p className="text-sm ">Email</p>
          <p className="font-medium">{volunteer?.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 sub-card rounded-lg">
        <Phone className="" size={20} />
        <div>
          <p className="text-sm ">Phone</p>
          <p className="font-medium">{volunteer?.phone || 'Not provided'}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 sub-card rounded-lg">
        <Calendar className="" size={20} />
        <div>
          <p className="text-sm ">Date of Birth</p>
          <p className="font-medium">{volunteer?.dob}</p>
        </div>
      </div>
    </div>
  </div>
);

const Professsional = ({ volunteer }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold  mb-4">Professional Information</h2>

    <div className="space-y-4">
      <div className="flex items-center gap-3 p-3 sub-card rounded-lg">
        <GraduationCap className="" size={20} />
        <div>
          <p className="text-sm ">Batch</p>
          <p className="font-medium">{batchList?.find((dept) => dept.id == volunteer?.batch)?.name || 'Not specified'}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 sub-card rounded-lg">
        <Building className="" size={20} />
        <div>
          <p className="text-sm ">Department</p>
          <p className="font-medium"> {departmentList?.find((dept) => dept.id == volunteer?.department)?.name || 'Not specified'}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 sub-card rounded-lg">
        <Users className="" size={20} />
        <div>
          <p className="text-sm ">Team</p>
          <p className="font-medium">{volunteer?.team || 'Not specified'}</p>
        </div>
      </div>
    </div>
  </div>
);

const Additional = () => (
  <div className="mt-8 p-8  ">
    <h2 className="text-xl font-semibold mb-4">Additional Information</h2>

    <p className="mb-6 font-serif ">This volunteer is actively contributing to the organization. For any questions or concerns, please contact the administration team.</p>

    <div>
      <div className="flex flex-wrap gap-5 ">
        {socialLinks.map(({ Icon, href, name }, index) => (
          <a
            key={index}
            href={href.startsWith('http') ? href : `https://${href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center social-icon social-icon-style gap-2 text-sm  transition-all"
          >
            <Icon size={20} />
            {name}
          </a>
        ))}
      </div>
    </div>
  </div>
);

export const VolunteerDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useVolunteerQuery(id);
  const volunteer = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="p-6">
      <BacktoRoute />
      <div className=" grid md:grid-cols-2 gap-5 align-middle mx-auto ">
        <div className="card rounded-xl  overflow-hidden">
          <div className=" p-8 pb-0 ">
            <Profile volunteer={volunteer} />
          </div>

          <div className="p-8">
            <div className="border-t border-t-[var(--sub-card)] pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Personal volunteer={volunteer} />
              <Professsional volunteer={volunteer} />
            </div>
          </div>
        </div>

        <Additional />
      </div>
    </section>
  );
};
