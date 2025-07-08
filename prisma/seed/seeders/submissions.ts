export const submissionsData = [
  {
    submissionId: 1,
    userId: 1,
    problemId: 1,
    language: "JavaScript",
    sourceCode: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
    status: "Accepted",
    testCasesPassed: 3,
    totalTestCases: 3,
    executionTime: 68,
    memoryUsed: 42000,
    pointsEarned: 50,
    submittedAt: new Date("2024-01-17T10:30:00")
  },
  {
    submissionId: 2,
    userId: 2,
    problemId: 2,
    language: "Python",
    sourceCode: `def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return not stack`,
    status: "Accepted",
    testCasesPassed: 3,
    totalTestCases: 3,
    executionTime: 32,
    memoryUsed: 14000,
    pointsEarned: 50,
    submittedAt: new Date("2024-01-18T14:15:00")
  },
  {
    submissionId: 3,
    userId: 3,
    problemId: 1,
    language: "Java",
    sourceCode: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] {map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}`,
    status: "Accepted",
    testCasesPassed: 3,
    totalTestCases: 3,
    executionTime: 85,
    memoryUsed: 45000,
    pointsEarned: 50,
    submittedAt: new Date("2024-01-19T09:45:00")
  },
  {
    submissionId: 4,
    userId: 1,
    problemId: 4,
    language: "JavaScript",
    sourceCode: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
    status: "Accepted",
    testCasesPassed: 2,
    totalTestCases: 2,
    executionTime: 94,
    memoryUsed: 38000,
    pointsEarned: 75,
    submittedAt: new Date("2024-01-20T16:20:00")
  },
  {
    submissionId: 5,
    userId: 4,
    problemId: 2,
    language: "C++",
    sourceCode: `bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> mapping = {
        {')', '('},
        {'}', '{'},
        {']', '['}
    };
    
    for (char c : s) {
        if (mapping.find(c) != mapping.end()) {
            if (st.empty() || st.top() != mapping[c]) {
                return false;
            }
            st.pop();
        } else {
            st.push(c);
        }
    }
    
    return st.empty();
}`,
    status: "Wrong Answer",
    testCasesPassed: 2,
    totalTestCases: 3,
    executionTime: 45,
    memoryUsed: 12000,
    pointsEarned: 0,
    submittedAt: new Date("2024-01-21T11:10:00")
  }
];