-- AlterTable
CREATE SEQUENCE comments_comment_id_seq;
ALTER TABLE "comments" ALTER COLUMN "comment_id" SET DEFAULT nextval('comments_comment_id_seq');
ALTER SEQUENCE comments_comment_id_seq OWNED BY "comments"."comment_id";

-- AlterTable
CREATE SEQUENCE course_levels_level_id_seq;
ALTER TABLE "course_levels" ALTER COLUMN "level_id" SET DEFAULT nextval('course_levels_level_id_seq');
ALTER SEQUENCE course_levels_level_id_seq OWNED BY "course_levels"."level_id";

-- AlterTable
CREATE SEQUENCE courses_course_id_seq;
ALTER TABLE "courses" ALTER COLUMN "course_id" SET DEFAULT nextval('courses_course_id_seq');
ALTER SEQUENCE courses_course_id_seq OWNED BY "courses"."course_id";

-- AlterTable
CREATE SEQUENCE likes_like_id_seq;
ALTER TABLE "likes" ALTER COLUMN "like_id" SET DEFAULT nextval('likes_like_id_seq');
ALTER SEQUENCE likes_like_id_seq OWNED BY "likes"."like_id";

-- AlterTable
CREATE SEQUENCE problems_problem_id_seq;
ALTER TABLE "problems" ALTER COLUMN "problem_id" SET DEFAULT nextval('problems_problem_id_seq');
ALTER SEQUENCE problems_problem_id_seq OWNED BY "problems"."problem_id";

-- AlterTable
CREATE SEQUENCE submissions_submission_id_seq;
ALTER TABLE "submissions" ALTER COLUMN "submission_id" SET DEFAULT nextval('submissions_submission_id_seq');
ALTER SEQUENCE submissions_submission_id_seq OWNED BY "submissions"."submission_id";

-- AlterTable
CREATE SEQUENCE test_cases_test_case_id_seq;
ALTER TABLE "test_cases" ALTER COLUMN "test_case_id" SET DEFAULT nextval('test_cases_test_case_id_seq');
ALTER SEQUENCE test_cases_test_case_id_seq OWNED BY "test_cases"."test_case_id";

-- AlterTable
CREATE SEQUENCE user_course_progress_progress_id_seq;
ALTER TABLE "user_course_progress" ALTER COLUMN "progress_id" SET DEFAULT nextval('user_course_progress_progress_id_seq');
ALTER SEQUENCE user_course_progress_progress_id_seq OWNED BY "user_course_progress"."progress_id";

-- AlterTable
CREATE SEQUENCE users_user_id_seq;
ALTER TABLE "users" ALTER COLUMN "user_id" SET DEFAULT nextval('users_user_id_seq');
ALTER SEQUENCE users_user_id_seq OWNED BY "users"."user_id";
