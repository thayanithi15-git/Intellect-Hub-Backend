export const testCasesData = [
  // Test cases for Two Sum problem
  {
    testCaseId: 1,
    problemId: 1,
    inputData: "[2,7,11,15]\n9",
    expectedOutput: "[0,1]",
    testCaseOrder: 1,
    isSample: true,
    createdAt: new Date("2024-01-17")
  },
  {
    testCaseId: 2,
    problemId: 1,
    inputData: "[3,2,4]\n6",
    expectedOutput: "[1,2]",
    testCaseOrder: 2,
    isSample: false,
    createdAt: new Date("2024-01-17")
  },
  {
    testCaseId: 3,
    problemId: 1,
    inputData: "[3,3]\n6",
    expectedOutput: "[0,1]",
    testCaseOrder: 3,
    isSample: false,
    createdAt: new Date("2024-01-17")
  },
  // Test cases for Valid Parentheses problem
  {
    testCaseId: 4,
    problemId: 2,
    inputData: "\"()\"",
    expectedOutput: "true",
    testCaseOrder: 1,
    isSample: true,
    createdAt: new Date("2024-01-18")
  },
  {
    testCaseId: 5,
    problemId: 2,
    inputData: "\"()[]{}\"",
    expectedOutput: "true",
    testCaseOrder: 2,
    isSample: true,
    createdAt: new Date("2024-01-18")
  },
  {
    testCaseId: 6,
    problemId: 2,
    inputData: "\"(]\"",
    expectedOutput: "false",
    testCaseOrder: 3,
    isSample: false,
    createdAt: new Date("2024-01-18")
  },
  // Test cases for Binary Tree Inorder Traversal
  {
    testCaseId: 7,
    problemId: 3,
    inputData: "[1,null,2,3]",
    expectedOutput: "[1,3,2]",
    testCaseOrder: 1,
    isSample: true,
    createdAt: new Date("2024-01-19")
  },
  {
    testCaseId: 8,
    problemId: 3,
    inputData: "[]",
    expectedOutput: "[]",
    testCaseOrder: 2,
    isSample: false,
    createdAt: new Date("2024-01-19")
  },
  // Test cases for Maximum Subarray
  {
    testCaseId: 9,
    problemId: 4,
    inputData: "[-2,1,-3,4,-1,2,1,-5,4]",
    expectedOutput: "6",
    testCaseOrder: 1,
    isSample: true,
    createdAt: new Date("2024-01-20")
  },
  {
    testCaseId: 10,
    problemId: 4,
    inputData: "[1]",
    expectedOutput: "1",
    testCaseOrder: 2,
    isSample: false,
    createdAt: new Date("2024-01-20")
  }
];
