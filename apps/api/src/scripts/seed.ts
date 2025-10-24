import { prisma } from '../prisma/client';
import argon2 from 'argon2';

async function main() {
  await prisma.session.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.role.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.section.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const [adminRole, teacherRole, studentRole] = await Promise.all([
    prisma.role.create({ data: { name: 'admin', description: 'Super administrador' } }),
    prisma.role.create({ data: { name: 'teacher', description: 'Profesor' } }),
    prisma.role.create({ data: { name: 'student', description: 'Estudiante' } }),
  ]);

  const password = await argon2.hash('NovaLMS123!');

  const admin = await prisma.user.create({
    data: {
      email: 'admin@novalms.dev',
      passwordHash: password,
      firstName: 'Admin',
      lastName: 'Nova',
      roles: {
        create: [{ roleId: adminRole.id }],
      },
    },
  });

  const course = await prisma.course.create({
    data: {
      title: 'Curso de ejemplo',
      description: 'Curso inicial para explorar la plataforma',
      ownerId: admin.id,
      sections: {
        create: [
          {
            title: 'Introducción',
            order: 1,
            activities: {
              create: [
                { title: 'Bienvenida', type: 'resource', order: 1 },
                { title: 'Foro de presentación', type: 'forum', order: 2 },
              ],
            },
          },
        ],
      },
    },
    include: { sections: { include: { activities: true } } },
  });

  console.log('Seed completed', { admin: admin.email, course: course.title });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
