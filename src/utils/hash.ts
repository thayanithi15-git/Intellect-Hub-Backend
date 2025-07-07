import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hash a password (for signup)
 */
export const hashPassword = async (password: string): Promise<string> => {
  const testPass = 'thaya2006s';
  const testHashed = await bcrypt.hash(testPass, SALT_ROUNDS);
  console.log('Hashed test password (thaya2006s):', testHashed);

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  return hashed;
};

/**
 * Compare plain and hashed password (for login)
 */
export const comparePassword = async (
  input: string,
  hashed: string
): Promise<boolean> => {
  return await bcrypt.compare(input, hashed);
};

// ✅ Optional test: only runs if you run this file directly with ts-node
if (require.main === module) {
  (async () => {
    const plain = 'abcdefg';
    const hashed = await hashPassword(plain);
    console.log('User input hashed:', hashed);

    const match = await comparePassword(plain, hashed);
    console.log(match ? '✅ Match' : '❌ Not matched');
  })();
}
