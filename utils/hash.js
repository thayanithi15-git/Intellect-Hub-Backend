const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

if (require.main === module) {
    (async () => {
        const password = 'thaya123';
        const hashed = await hashPassword(password);
        console.log(`Original password: ${password}`);
        console.log(`Hashed password: ${hashed}`);
    })();
}

module.exports = {
    hashPassword,
    comparePassword
};
