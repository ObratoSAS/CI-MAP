export type Role = 'admin' | 'teacher' | 'student' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface CourseCategory {
  id: string;
  name: string;
  description?: string;
}

export type ActivityType = 'assignment' | 'quiz' | 'forum' | 'resource';

export interface Activity {
  id: string;
  courseId: string;
  sectionId: string;
  title: string;
  description: string;
  type: ActivityType;
  status: 'open' | 'closed' | 'submitted';
  dueDate?: string;
  metadata?: Record<string, unknown>;
}

export interface CourseSection {
  id: string;
  courseId: string;
  title: string;
  summary: string;
  activities: Activity[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  summary: string;
  categoryId: string;
  modality: 'online' | 'hybrid' | 'onsite';
  price: 'free' | 'paid';
  cover?: string;
  instructors: string[];
  sections: CourseSection[];
  tags?: string[];
}

export interface Enrollment {
  courseId: string;
  userId: string;
  progress: number;
}

export interface GradeItem {
  activityId: string;
  courseId: string;
  userId: string;
  score: number;
  maxScore: number;
}

export interface MessageThread {
  id: string;
  participants: string[];
  subject: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  threadId: string;
  authorId: string;
  body: string;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  courseId?: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  type: 'assignment' | 'session' | 'meeting' | 'reminder';
}

export interface Announcement {
  id: string;
  courseId: string;
  title: string;
  message: string;
  createdAt: string;
}

export interface Session {
  user: User | null;
  token: string | null;
}
