import type {MessageThread, Message} from '@/types';

export const threads: MessageThread[] = [
  {
    id: 'thread-1',
    participants: ['teacher-1', 'student-1'],
    subject: 'Feedback for assignment',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'thread-2',
    participants: ['student-2', 'student-3'],
    subject: 'Study group planning',
    updatedAt: new Date().toISOString()
  }
];

export const messages: Message[] = [
  {
    id: 'message-1',
    threadId: 'thread-1',
    authorId: 'teacher-1',
    body: 'Great start! Consider adding more references to strengthen your argument.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'message-2',
    threadId: 'thread-1',
    authorId: 'student-1',
    body: 'Thank you! I will add two more sources before submitting.',
    createdAt: new Date().toISOString()
  }
];
