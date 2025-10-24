import type {Course, CourseSection, Activity, CalendarEvent, Announcement, GradeItem, Enrollment} from '@/types';

const assignments = (
  courseId: string,
  sectionId: string
): Activity[] => [
  {
    id: `${courseId}-assignment-1`,
    courseId,
    sectionId,
    title: 'Research summary',
    description: 'Upload a two-page synthesis of your findings. Include references and a short reflection.',
    type: 'assignment',
    status: 'open',
    dueDate: new Date().toISOString()
  },
  {
    id: `${courseId}-quiz-1`,
    courseId,
    sectionId,
    title: 'Knowledge check',
    description: 'Complete the timed quiz to assess your understanding of the module.',
    type: 'quiz',
    status: 'open',
    metadata: {durationMinutes: 20}
  },
  {
    id: `${courseId}-forum-1`,
    courseId,
    sectionId,
    title: 'Community discussion',
    description: 'Share your perspective and respond to two classmates.',
    type: 'forum',
    status: 'open'
  }
];

const sections = (courseId: string): CourseSection[] => [
  {
    id: `${courseId}-section-1`,
    courseId,
    title: 'Week 1 · Foundations',
    summary: 'Introduction, expectations and collaborative warm-up activities.',
    activities: assignments(courseId, `${courseId}-section-1`)
  },
  {
    id: `${courseId}-section-2`,
    courseId,
    title: 'Week 2 · Practice',
    summary: 'Hands-on exercises and peer feedback sessions.',
    activities: assignments(courseId, `${courseId}-section-2`)
  }
];

export const courses: Course[] = [
  {
    id: 'course-1',
    title: 'Learning Experience Design',
    slug: 'learning-experience-design',
    summary: 'Design engaging hybrid learning journeys with collaborative activities and analytics.',
    categoryId: 'category-ux',
    modality: 'hybrid',
    price: 'paid',
    cover: '/images/course-1.jpg',
    instructors: ['teacher-1'],
    sections: sections('course-1'),
    tags: ['design', 'learning']
  },
  {
    id: 'course-2',
    title: 'Inclusive Assessment Strategies',
    slug: 'inclusive-assessment',
    summary: 'Apply equitable assessment practices with rubrics and actionable feedback.',
    categoryId: 'category-teaching',
    modality: 'online',
    price: 'free',
    cover: '/images/course-2.jpg',
    instructors: ['teacher-2'],
    sections: sections('course-2'),
    tags: ['assessment', 'equity']
  },
  {
    id: 'course-3',
    title: 'Collaborative Learning Labs',
    slug: 'collaborative-labs',
    summary: 'Prototype active learning sequences with communities of practice and social presence.',
    categoryId: 'category-collaboration',
    modality: 'onsite',
    price: 'paid',
    cover: '/images/course-3.jpg',
    instructors: ['teacher-1', 'teacher-2'],
    sections: sections('course-3'),
    tags: ['collaboration', 'leadership']
  }
];

export const enrollments: Enrollment[] = [
  {courseId: 'course-1', userId: 'student-1', progress: 0.45},
  {courseId: 'course-1', userId: 'student-2', progress: 0.67},
  {courseId: 'course-2', userId: 'student-1', progress: 0.12},
  {courseId: 'course-3', userId: 'student-3', progress: 0.83}
];

export const gradeItems: GradeItem[] = [
  {activityId: 'course-1-assignment-1', courseId: 'course-1', userId: 'student-1', score: 8.5, maxScore: 10},
  {activityId: 'course-1-assignment-1', courseId: 'course-1', userId: 'student-2', score: 9.0, maxScore: 10},
  {activityId: 'course-1-quiz-1', courseId: 'course-1', userId: 'student-1', score: 7.5, maxScore: 10}
];

export const announcements: Announcement[] = [
  {
    id: 'announcement-1',
    courseId: 'course-1',
    title: 'Welcome to the journey',
    message: 'Explore the overview and introduce yourself in the forum before Friday.',
    createdAt: new Date().toISOString()
  }
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    courseId: 'course-1',
    title: 'Live kickoff',
    description: 'Orientation session with group breakout rooms.',
    start: new Date().toISOString(),
    end: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    type: 'session'
  },
  {
    id: 'event-2',
    courseId: 'course-2',
    title: 'Assignment deadline',
    description: 'Submit your case study reflection.',
    start: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
    type: 'assignment'
  }
];
