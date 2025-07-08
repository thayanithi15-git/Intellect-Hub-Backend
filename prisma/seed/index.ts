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
    
    // Use the correct model names (camelCase from your schema)
    await prisma.like.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.submission.deleteMany({});
    await prisma.testCase.deleteMany({});
    await prisma.userCourseProgress.deleteMany({});
    await prisma.problem.deleteMany({});
    await prisma.courseLevel.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.login.deleteMany({});
    await prisma.user.deleteMany({});

    // Reset sequences - using correct sequence names from your schema
    console.log('🔄 Resetting sequences...');
    const sequences = [
      'users_user_id_seq',
      'login_user_id_seq',
      'courses_course_id_seq',
      'course_levels_level_id_seq',
      'problems_problem_id_seq',
      'test_cases_test_case_id_seq',
      'user_course_progress_progress_id_seq',
      'submissions_submission_id_seq',
      'comments_comment_id_seq',
      'likes_like_id_seq'
    ];

    for (const sequence of sequences) {
      try {
        await prisma.$executeRaw`ALTER SEQUENCE ${Prisma.raw(`"${sequence}"`)} RESTART WITH 1`;
        console.log(`✅ Reset sequence: ${sequence}`);
      } catch (error) {
        console.log(`⚠️  Could not reset sequence ${sequence}, it may not exist`);
      }
    }

    // Seed users first
    console.log('👤 Seeding users...');
    for (const userData of usersData) {
      await prisma.user.create({
        data: userData
      });
    }

    // Seed login data
    console.log('🔐 Seeding login data...');
    for (const loginEntry of loginData) {
      await prisma.login.create({
        data: loginEntry
      });
    }

    // Seed courses
    console.log('📚 Seeding courses...');
    for (const courseData of coursesData) {
      await prisma.course.create({
        data: courseData
      });
    }

    // Seed course levels
    console.log('📖 Seeding course levels...');
    for (const levelData of courseLevelsData) {
      await prisma.courseLevel.create({
        data: levelData
      });
    }

    // Seed problems
    console.log('🧩 Seeding problems...');
    for (const problemData of problemsData) {
      await prisma.problem.create({
        data: problemData
      });
    }

    // Seed test cases
    console.log('🧪 Seeding test cases...');
    for (const testCaseData of testCasesData) {
      await prisma.testCase.create({
        data: testCaseData
      });
    }

    // Seed user course progress
    console.log('📊 Seeding user course progress...');
    for (const progressData of userCourseProgressData) {
      await prisma.userCourseProgress.create({
        data: progressData
      });
    }

    // Seed submissions
    console.log('💻 Seeding submissions...');
    for (const submissionData of submissionsData) {
      await prisma.submission.create({
        data: submissionData
      });
    }

    // Seed comments
    console.log('💬 Seeding comments...');
    for (const commentData of commentsData) {
      await prisma.comment.create({
        data: commentData
      });
    }

    // Seed likes
    console.log('👍 Seeding likes...');
    for (const likeData of likesData) {
      await prisma.like.create({
        data: likeData
      });
    }

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