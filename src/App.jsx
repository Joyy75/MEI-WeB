import { Routes, Route } from 'react-router-dom';
import AuthGuard from './guard/AuthGuard';
import { EventDetail,Events, EventList,ContactList, Contact, Dashboard, Department, Home, Login, Register, Program, VolunteerList, VolunteerDetail, CourseList, CourseDetail, MemberList, NotFound } from '@pages';
import { AdminLayout, ClientLayout } from '@layout';

const App = () => {
  return (
    <>
      <Routes>
        {/* Client */}
        <Route>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="departments/:departmentName" element={<Department />} />
            <Route path="members" element={<MemberList />} />
            <Route path="members/:id" element={<VolunteerDetail />} />
            <Route path="programs" element={<Program />} />
            <Route path="programs/:id" element={<CourseDetail />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetail />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<AuthGuard />}>
          <Route path="/admin">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="courses" element={<CourseList />} />
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="volunteers" element={<VolunteerList />} />
              <Route path="volunteers/:id" element={<VolunteerDetail />} />
              <Route path="events" element={<EventList />} />
              <Route path="events/:id" element={<VolunteerDetail />} />
              <Route path="contacts" element={<ContactList />} />
            </Route>
          </Route>
        </Route>

        {/* NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
