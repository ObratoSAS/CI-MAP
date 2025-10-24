import {http, HttpResponse, delay} from 'msw';
import {courses, enrollments, gradeItems, announcements, calendarEvents} from '../fixtures/courses';
import {users} from '../fixtures/users';
import {defaultSession} from '../fixtures/auth';
import {messages, threads} from '../fixtures/messages';

const randomDelay = () => delay(Math.random() * 400 + 150);

function withLatency<T>(data: T, status = 200) {
  return async () => {
    await randomDelay();
    if (Math.random() < 0.1) {
      return HttpResponse.json({message: 'mock-error'}, {status: 500});
    }
    return HttpResponse.json(data, {status});
  };
}

export const handlers = [
  http.get('/api/auth/session', async () => {
    await randomDelay();
    return HttpResponse.json(defaultSession);
  }),
  http.post('/api/auth/login', withLatency({success: true, session: defaultSession})),
  http.post('/api/auth/logout', withLatency({success: true})),
  http.get('/api/users', withLatency(users)),
  http.get('/api/courses', withLatency(courses)),
  http.get('/api/courses/:id', ({params}) => {
    const course = courses.find((item) => item.id === params.id);
    if (!course) {
      return HttpResponse.json({message: 'not-found'}, {status: 404});
    }
    return HttpResponse.json(course);
  }),
  http.get('/api/enrollments', withLatency(enrollments)),
  http.get('/api/grades/:courseId', ({params}) => {
    const courseGrades = gradeItems.filter((item) => item.courseId === params.courseId);
    return HttpResponse.json(courseGrades);
  }),
  http.get('/api/announcements/:courseId', ({params}) => {
    const courseAnnouncements = announcements.filter((item) => item.courseId === params.courseId);
    return HttpResponse.json(courseAnnouncements);
  }),
  http.get('/api/calendar', withLatency(calendarEvents)),
  http.get('/api/messages/threads', withLatency(threads)),
  http.get('/api/messages/:threadId', ({params}) => {
    const threadMessages = messages.filter((message) => message.threadId === params.threadId);
    return HttpResponse.json(threadMessages);
  })
];
