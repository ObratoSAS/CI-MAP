import {useTranslations} from 'next-intl';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import type {Course, Enrollment, GradeItem, Role, User} from '@/types';

interface DashboardViewProps {
  role: Role;
  user: User | null;
  courses: Course[];
  enrollments: Enrollment[];
  grades: GradeItem[];
}

export const DashboardView = ({role, user, courses, enrollments, grades}: DashboardViewProps) => {
  const dashboard = useTranslations('dashboard');
  const courseMap = new Map(courses.map((course) => [course.id, course] as const));

  const studentEnrollments = enrollments.filter((enrollment) => enrollment.userId === user?.id);
  const teacherCourses = courses.filter((course) => course.instructors.includes(user?.id ?? ''));

  const cards = {
    student: [
      {
        title: dashboard('student.courses'),
        description: dashboard('student.headline'),
        items: studentEnrollments.map((enrollment) => {
          const course = courseMap.get(enrollment.courseId);
          return {
            title: course?.title ?? enrollment.courseId,
            meta: `${Math.round(enrollment.progress * 100)}%`,
            tag: dashboard('student.progress')
          };
        })
      },
      {
        title: dashboard('student.upcoming'),
        description: dashboard('student.notifications'),
        items: courses.slice(0, 3).map((course) => ({
          title: course.title,
          meta: dashboard('student.upcoming'),
          tag: dashboard('title')
        }))
      }
    ],
    teacher: [
      {
        title: dashboard('teacher.courses'),
        description: dashboard('teacher.headline'),
        items: teacherCourses.map((course) => ({
          title: course.title,
          meta: `${course.sections.length} sections`,
          tag: dashboard('teacher.shortcuts')
        }))
      },
      {
        title: dashboard('teacher.submissions'),
        description: dashboard('teacher.shortcuts'),
        items: grades
          .filter((grade) => teacherCourses.some((course) => course.id === grade.courseId))
          .map((grade) => ({
            title: grade.activityId,
            meta: `${grade.score}/${grade.maxScore}`,
            tag: dashboard('teacher.submissions')
          }))
      }
    ],
    admin: [
      {
        title: dashboard('admin.headline'),
        description: dashboard('admin.manage'),
        items: [
          {title: dashboard('admin.users'), meta: String(courses.length * 10), tag: dashboard('admin.users')},
          {title: dashboard('admin.courses'), meta: String(courses.length), tag: dashboard('admin.courses')},
          {title: dashboard('admin.activities'), meta: String(courses.reduce((sum, course) => sum + course.sections.length, 0)), tag: dashboard('admin.activities')}
        ]
      }
    ]
  } as const;

  const selected = cards[role] ?? cards.student;

  return (
    <div className="space-y-6">
      {selected.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li key={item.title} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-300">{item.meta}</p>
                  </div>
                  <Badge variant="outline">{item.tag}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
