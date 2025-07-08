import { PrismaClient, Prisma } from '@prisma/client';
import { usersData } from './seeders/users';
import { loginData } from './seeders/login';
import { coursesData } from './seeders/courses';
import { courseLevelsData } from './seeders/courseLevels';
import { problemsData } from './seeders/problems';
import { testCasesData } from './seeders/testCases';
import { submissionsData } from './seeders/submissions';
import { commentsData } from './seeders/comments';
import { likesData } from './seeders/likes';
import { userCourseProgressData } from './seeders/userCourseProgress';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data in correct order (respecting foreign key constraints)
    console.log('🧹 Clearing existing data...');
    await prisma.like.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.submission.deleteMany();
    await prisma.testCase.deleteMany();
    await prisma.userCourseProgress.deleteMany();
    await prisma.problem.deleteMany();
    await prisma.courseLevel.deleteMany();
    await prisma.course.deleteMany();
    await prisma.login.deleteMany();
    await prisma.user.deleteMany();

    // Reset sequences - using correct sequence names
    console.log('🔄 Resetting sequences...');
    const sequences = [
      'users_user_id_seq',           // User table auto-increment
      'courses_course_id_seq',       // Course table auto-increment
      'course_levels_level_id_seq',  // CourseLevel table auto-increment
      'problems_problem_id_seq',     // Problem table auto-increment
      'test_cases_test_case_id_seq', // TestCase table auto-increment
      'user_course_progress_progress_id_seq', // UserCourseProgress table auto-increment
      'submissions_submission_id_seq', // Submission table auto-increment
      'comments_comment_id_seq',     // Comment table auto-increment
      'likes_like_id_seq'            // Like table auto-increment
    ];

    for (const sequence of sequences) {
      try {
        await prisma.$executeRaw`ALTER SEQUENCE ${Prisma.raw(`"${sequence}"`)} RESTART WITH 1`;
        console.log(`✅ Reset sequence: ${sequence}`);
      } catch (error) {
        console.log(`⚠️  Could not reset sequence ${sequence}, it may not exist:`);
      }
    }

    // Seed users first
    console.log('👤 Seeding users...');
    await prisma.user.createMany({
      data: usersData
    });

    // Seed login data
    console.log('🔐 Seeding login data...');
    await prisma.login.createMany({
      data: loginData,
    });

    // Seed courses
    console.log('📚 Seeding courses...');
    await prisma.course.createMany({
      data: coursesData,
    });

    // Seed course levels
    console.log('📖 Seeding course levels...');
    await prisma.courseLevel.createMany({
      data: courseLevelsData,
    });

    // Seed problems
    console.log('🧩 Seeding problems...');
    await prisma.problem.createMany({
      data: problemsData,
    });

    // Seed test cases
    console.log('🧪 Seeding test cases...');
    await prisma.testCase.createMany({
      data: testCasesData,
    });

    // Seed user course progress
    console.log('📊 Seeding user course progress...');
    await prisma.userCourseProgress.createMany({
      data: userCourseProgressData,
    });

    // Seed submissions
    console.log('💻 Seeding submissions...');
    await prisma.submission.createMany({
      data: submissionsData,
    });

    // Seed comments
    console.log('💬 Seeding comments...');
    await prisma.comment.createMany({
      data: commentsData,
    });

    // Seed likes
    console.log('👍 Seeding likes...');
    await prisma.like.createMany({
      data: likesData,
    });

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });