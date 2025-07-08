export const commentsData = [
  {
    commentId: 1,
    userId: 1,
    courseId: 1,
    problemId: null,
    commentText: "Great course! Really helped me understand JavaScript fundamentals.",
    parentCommentId: null,
    createdAt: new Date("2024-01-17T12:00:00"),
    updatedAt: new Date("2024-01-17T12:00:00")
  },
  {
    commentId: 2,
    userId: 2,
    courseId: 1,
    problemId: null,
    commentText: "I agree! The examples are very clear and easy to follow.",
    parentCommentId: 1,
    createdAt: new Date("2024-01-17T12:30:00"),
    updatedAt: new Date("2024-01-17T12:30:00")
  },
  {
    commentId: 3,
    userId: 3,
    courseId: null,
    problemId: 1,
    commentText: "This problem is a classic! Good for understanding hash maps.",
    parentCommentId: null,
    createdAt: new Date("2024-01-18T09:15:00"),
    updatedAt: new Date("2024-01-18T09:15:00")
  },
  {
    commentId: 4,
    userId: 1,
    courseId: null,
    problemId: 1,
    commentText: "Exactly! The hash map approach is much more efficient than nested loops.",
    parentCommentId: 3,
    createdAt: new Date("2024-01-18T09:45:00"),
    updatedAt: new Date("2024-01-18T09:45:00")
  },
  {
    commentId: 5,
    userId: 4,
    courseId: 2,
    problemId: null,
    commentText: "The data structures explanations are excellent. Looking forward to more levels!",
    parentCommentId: null,
    createdAt: new Date("2024-01-22T14:20:00"),
    updatedAt: new Date("2024-01-22T14:20:00")
  }
];
