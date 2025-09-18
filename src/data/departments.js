import {
  UserCheck,
  ShieldCheck,
  BookOpen,
  Users,
  BarChart3,
  Globe,
  GraduationCap,
  Presentation,
  ClipboardList,
  UserPlus,
  Handshake,
  Megaphone,
  Newspaper,
  Lightbulb,
  Network,
  FileText,
  MessageSquareText,
  Monitor,
  Code2,
  Puzzle,
} from 'lucide-react';

export const departments = {
  partnership: {
    title: 'Public Relations & Partnerships',
    description:
      'The Public Relations & Partnerships Department at MEI serves as the organization’s voice and ambassador. We manage MEI’s public image, foster strategic collaborations, and ensure all external communications reflect MEI’s values and mission to empower communities across Myanmar and beyond.',
    detailedDescription:
      'This department leads MEI’s official communications, media relations, and stakeholder engagement. It builds and maintains meaningful partnerships, promotes transparent and consistent messaging, and safeguards the professional representation of MEI in all public spheres. In collaboration with other teams, we ensure a unified voice across platforms and uphold high standards of integrity and impact.',
    stats: [
      {
        label: 'Partnerships',
        value: '10+',
        Icon: Handshake,
      },
      {
        label: 'Campaigns Launched',
        value: '10+',
        Icon: Megaphone,
      },
      {
        label: 'Media Features',
        value: '5+',
        Icon: Newspaper,
      },
    ],
    features: [
      'Official communications & media outreach',
      'Strategic partnership development',
      'Crisis communication protocols',
      'consistency across platforms',
      'Collaborative campaigns and stakeholder engagement',
      'Event representation',
    ],
    image: '/departments/public_relation.png',
    values: [
      'Transparency: Open and honest communication',
      'Consistency: Aligned with MEI’s tone and mission',
      'Professionalism: Respectful, ethical representation',
      'Collaboration: Shared goals and strong alliances',
    ],
  },

  education: {
    title: 'Education Department',
    description:
      'The Education Department of (MEI) is the foundation of our mission to empower youth through transformative education. We are committed to designing and delivering engaging, accessible, and innovative learning experiences that respond to the needs of students across Myanmar and beyond. Our department oversees academic programming, teaching quality, curriculum development, and educator support—ensuring every learner receives the highest standard of educational opportunity. We support not only student growth but also educator development—fostering a collaborative and forward-thinking environment where teachers can thrive.',
    detailedDescription:
      "The Education Department is responsible for designing and delivering high-quality academic experiences across MEI programs. Our core duties include curriculum development, student-centered instruction, and ensuring consistent assessment practices. We support teacher growth through training sessions, digital resources, and regular academic guidance. Our team also leads program management for exams like IELTS and GED, and runs educational campaigns to support learners' goals. With strong academic oversight, we uphold standards in assignment evaluations, performance tracking, and content quality assurance.",
    stats: [
      {
        label: 'Academic Programs',
        value: '10+',
        Icon: BookOpen,
      },
      {
        label: 'Trained Educators',
        value: '20+',
        Icon: Presentation,
      },
      {
        label: 'Active Students',
        value: '50+',
        Icon: GraduationCap,
      },
    ],
    features: [
      'Curriculum design & delivery',
      'Digital teaching resources',
      'IELTS & GED exam preparation',
      'Educator workshops & training',
      'Student performance tracking',
      'Collaborative learning initiatives',
    ],
    image: '/departments/education.png',
    values: [
      'Equity: Quality education for all backgrounds',
      'Integrity: Academic honesty and fairness',
      'Innovation: Creative approaches to learning',
      'Empowerment: Confidence and independence for learners and teachers',
      'Collaboration: Cross-departmental knowledge sharing',
    ],
    others: [
      'Managed and improved Speaking Club sessions with PR & Projects',
      'Developed standardized academic templates and Zoom materials',
      'Created GED & IELTS vocabulary content with Social Media',
      'Hosted University Prep Webinar with PR and Project Departments',
    ],
  },

  hr: {
    title: 'Human Resources',
    description:
      '(HR) Department is responsible for managing the organization’s members through effective recruitment,onboarding, engagement, and support processes. The department plays a key rolein ensuring a positive and productive work environment across all teams.',
    detailedDescription:
      'The HR Department oversees structured recruitment processes, onboarding orientation, and internal communication systems. From announcing open calls and managing interviews to integrating new members through training and group chats, HR ensures smooth transitions into the MEI team. Through tools like Google Forms, Drive, and Sheets, we maintain organized digital records of attendance, member data, and performance reports. HR provides ongoing support for staff needs, facilitates conflict resolution, and collaborates with all departments to maintain clear workflows and a healthy working environment.',
    stats: [
      {
        label: 'Recruited Members',
        value: '30+',
        Icon: UserPlus,
      },
      {
        label: 'Digital Records Managed',
        value: '20+',
        Icon: ClipboardList,
      },
      {
        label: 'Departments Coordinated',
        value: '5+',
        Icon: Users,
      },
    ],
    features: [
      'Transparent recruitment & onboarding',
      'Structured orientation & training sessions',
      'Centralized digital record management',
      'Staff support & conflict resolution',
      'Cross-department collaboration',
      'Regular performance tracking & feedback',
    ],
    image: '/departments/hr-dept.png',
    values: [
      'Efficiency: Streamlined workflows and processes',
      'Support: Responsive guidance for all members',
      'Organization: Accurate record keeping and tracking',
      'Communication: Clear updates and internal coordination',
      'Accountability: Transparent and fair HR practices',
    ],
  },

  project: {
    title: 'Project Development Department',
    description:
      'The Project Development Department at Meridian Education Institute (MEI) leads the design, coordination, and execution of strategic projects that promote educational development and youth empowerment. With a focus on innovation and collaboration, we deliver initiatives that shape confident, capable, and compassionate leaders.',
    detailedDescription:
      'Our department is dedicated to launching impactful projects in education, leadership, and community development. From webinars and academic support programs to leadership training and international collaboration, we work to expand access and opportunity through strategic planning and creative execution. Using tools like Google Sheets, Zoom, Canva, and Microsoft Office, we manage projects with clarity, efficiency, and purpose. Continuous monitoring and evaluation guide our improvements, ensuring each initiative delivers lasting impact.',
    stats: [
      {
        label: 'Projects Launched',
        value: '10+',
        Icon: Lightbulb,
      },
      {
        label: 'International Collaborations',
        value: '10+',
        Icon: Globe,
      },
      {
        label: 'Impact Reports',
        value: '20+',
        Icon: BarChart3,
      },
    ],
    features: [
      'Educational enrichment webinars',
      'Leadership & development programs',
      'Strategic partnerships with global org',
      'Capacity-building',
      'Virtual platforms for inclusive program',
      'Data-driven monitoring',
    ],
    image: '/departments/project_dev.png',
    values: [
      'Innovation: Creative and forward-thinking projects',
      'Inclusion: Accessible opportunities for all',
      'Impact-Driven: Measurable, meaningful outcomes',
      'Empowerment: Strengthening youth and educators',
      'Strategic Collaboration: Working with aligned partners',
    ],
    others: {
      title: 'Our Achievements',
      subTitle: 'Celebrating milestones and excellence in our journey.',
      journeys: [
        {
          name: 'Caring for the Carers: Building Resilience in Volunteer Responders',
          image: '/departments/projects/project_one.png',
        },
        {
          name: 'English Conversation Club – IELTS Academic Approach',
          image: '/departments/projects/project_two.png',
        },
        {
          name: 'Study Abroad Webinar Series',
          image: '/departments/projects/project_three.png',
        },
      ],
    },
  },

  affairs: {
    title: 'Student Engagement & Development',
    description:
      'The Student Engagement & Development Department at MEI plays a key role in supporting student life, encouraging active participation, and helping students succeed both in and out of the classroom. Our Student Affairs Officers manage a variety of responsibilities — from providing essential academic documentation to creating engaging activities and events that foster student connection and growth.',
    detailedDescription:
      'Our department ensures the well-being and involvement of students through organized, student-centered services and programming. Each team member plays a clearly defined role in improving student experience — from managing attendance and communication to promoting events and engagement initiatives. This role-based structure empowers officers to lead specific areas effectively, contribute their strengths, and grow as leaders while maintaining efficient operations. We aim to cultivate a vibrant and inclusive environment that helps every student thrive.',
    stats: [
      {
        label: 'Students Supported',
        value: '50+',
        Icon: UserCheck,
      },
      {
        label: 'Events Organized',
        value: '20+',
        Icon: Megaphone,
      },
      {
        label: 'Documents Issued',
        value: '50+',
        Icon: ShieldCheck,
      },
    ],
    features: [
      'Student attendance tracking',
      'Event planning & engagement campaigns',
      'Official communication & documentation services',
      'Student feedback collection',
      'Cross-department collaboration',
      'Digital student recognition initiatives',
    ],
    image: '/departments/students-dept.png',
    values: [
      'Recognition: Celebrate participation with badges and certificates',
      'Collaboration: Host cross-department events and series',
      'Leadership: Train new officers for quality service',
      'Involvement: Create inclusive, student-centered programming',
      'Support: Address student concerns promptly and respectfully',
    ],
    achievements: [
      'Issued over 1,000 certificates and student documents',
      'Organized competitions, workshops, and engagement webinars',
      'Tracked and managed attendance to boost accountability',
      'Launched student recognition programs using shoutouts and badges',
      'Collaborated with Education and PR teams on community events',
    ],
  },

  admin: {
    title: 'General Administration Department',
    description:
      'At the heart of (MEI) lies the General Administration Department — a dynamic team dedicated to ensuring the seamless operation of the institution. As the backbone of MEI, this department facilitates internal communication, manages essential resources, and students in cultivating a well-organized and student-centered environment.',
    detailedDescription:
      'The General Administration Department supports MEI’s daily functions through effective coordination, communication, and oversight. From managing MEI’s online presence and handling documentation to organizing schedules and facilitating cross-department collaboration, this team ensures that every operational detail aligns with MEI’s mission. The department also plays a central role in community interaction and digital engagement, consistently refining its processes through data-driven decisions and thoughtful communication strategies.',
    stats: [
      {
        label: 'Internal Collaborations',
        value: '5+',
        Icon: Network,
      },
      {
        label: 'Documents Managed',
        value: '20+',
        Icon: FileText,
      },
      {
        label: 'Community Messages',
        value: '100+',
        Icon: MessageSquareText,
      },
    ],
    features: [
      'Administrative scheduling & meeting',
      'Document organization & data tracking',
      'Cross-department communication',
      'Social media and digital management',
      'Community interaction & feedback',
      'Operational monitoring & support systems',
    ],
    image: '/departments/admin.png',
    values: [
      'Efficiency: Structured systems for smooth daily operations',
      'Clarity: Clear and responsive communication across teams',
      'Engagement: Active digital presence and community interaction',
      'Support: Reliable assistance for both staff and students',
      'Synergy: Strengthened collaboration across all departments',
    ],

    others: {
      title: 'Our Achievements',
      subTitle: 'Celebrating milestones and excellence in our journey.',
      journeys: [
        {
          name: 'Launched MEI Online Community Group on Telegram (May 20, 2025)',
          image: '/departments/admins/project_one.png',
        },
        {
          name: 'Established centralized scheduling and record-keeping systems',
          image: '/departments/admins/project_two.jpg',
        },
        {
          name: 'Managed internal updates and public-facing communication',
          image: '/departments/admins/project_three.jpg',
        },
      ],
    },
  },

it: {
  title: "Information Technology",
  description:
    "The Information Technology Department at MEI creates tailored digital tools and systems that enhance how teams work, communicate, and deliver impact.",
  detailedDescription:
    "This department designs, builds, and maintains internal applications that streamline operations across MEI. It translates team workflows and user needs into efficient, intuitive software solutions. Working closely with other departments, the team focuses on rapid development, continuous improvement, and long-term usability of digital tools that support MEI’s mission.",
  stats: [
    {
      label: "Applications Developed",
      value: "1+",
      Icon: Code2,
    },
    {
      label: "Features Released",
      value: "1+",
      Icon: Puzzle,
    },
    {
      label: "Departments Served",
      value: "1+",
      Icon: Monitor,
    },
  ],
  features: [
    "Custom tool development",
    "User-centered feature design",
    "Workflow automation",
    "Cross-department collaboration",
    "Rapid prototyping and iteration",
    "Long-term maintenance and support",
  ],
  image: "/departments/tech-dept.png",
  values: [
    "Functionality: Tools that solve real problems",
    "Efficiency: Streamlining internal processes",
    "Adaptability: Responding to user feedback",
    "Collaboration: Built with users in mind",
  ],
},

};
