import { useParams, useNavigate } from 'react-router-dom';
import { useCourseQuery } from '@hooks';
import { ArrowLeft } from 'lucide-react';
import { Button, Loading } from '@components';

const BackToRoute = () => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const isAdmin = location.includes('/admin');

  return (
    <div className="flex justify-between items-center">
      <button onClick={() => navigate(isAdmin ? '/admin/courses' : '/programs')} className="text-sm flex items-center gap-1 ">
        <ArrowLeft className="w-4 h-4" />
        Back To Courses
      </button>
    </div>
  );
};

const CourseHeader = ({ course }) => (
  <div>
    <h1 className="text-center text-3xl pb-1 font-bold">{course.title}</h1>

    {course.image && (
      <div className="flex justify-center border-t border-b py-3 border-[var(--sub-card)]">
        <img src={course.image} alt={course.title} className=" rounded-xl mt-2 w-full max-w-md shadow-md" />
      </div>
    )}
  </div>
);

const Badge = ({ text, color }) => <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${color}`}>{text}</span>;

const Instructor = ({ course }) => (
  <div className="flex items-center justify-between ">
    <div className="flex items-center gap-4">
      <img src={course?.volunteer?.image} alt={course?.volunteer?.name} className="w-16 h-16 rounded-full object-cover" />
      <div>
        <p className="text-lg font-semibold">{course?.volunteer?.name}</p>
        <p className="text-sm text-muted opacity-80">{course?.volunteer?.position}</p>
      </div>
    </div>

    <div className="flex flex-col  gap-2 mt-4">
      <Badge text={`Level: ${course.level || 'N/A'}`} color="bg-blue-100 text-sm text-blue-800" />
      <Badge text={`Duration - ${course.duration || 'Duration N/A'}`} color="bg-yellow-100  text-yellow-800" />
    </div>
  </div>
);

export const CourseDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useCourseQuery(id);
  const course = data?.data;

  if (isLoading) return <Loading />;


  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <BackToRoute />
      <CourseHeader course={course} />
      <Instructor course={course} />
      <div className="prose max-w-none mt-6">
        <h2 className="text-xl">About the Course</h2>
        <div dangerouslySetInnerHTML={{ __html: course.description }} />
      </div>
    </div>
  );
};
