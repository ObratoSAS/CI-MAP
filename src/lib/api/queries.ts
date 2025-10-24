export const queryKeys = {
  session: ['session'] as const,
  catalog: ['catalog'] as const,
  course: (courseId: string) => ['course', courseId] as const,
  gradebook: (courseId: string) => ['gradebook', courseId] as const,
  messages: ['messages'] as const,
  calendar: ['calendar'] as const
};
