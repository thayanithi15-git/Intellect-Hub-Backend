const db = require('../config/db');

class UserModel {
    static async create(userData) {
        const { name, email, password, role = 'user' } = userData;
        const query = `
            INSERT INTO account (name, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, role, is_active, created_at
        `;
        const result = await db.query(query, [name, email, password, role]);
        return result.rows[0];
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM account WHERE email = $1';
        const result = await db.query(query, [email]);
        return result.rows[0];
    }

    static async findById(id) {
        const query = 'SELECT id, name, email, role, is_active, created_at FROM account WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    static async updateById(id, updateData) {
        const fields = Object.keys(updateData);
        const values = Object.values(updateData);
        const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
        
        const query = `
            UPDATE account 
            SET ${setClause}, updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING id, name, email, role, is_active, updated_at
        `;
        const result = await db.query(query, [id, ...values]);
        return result.rows[0];
    }

    static async deleteById(id) {
        const query = 'DELETE FROM account WHERE id = $1 RETURNING id';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    static async findAll(limit = 50, offset = 0) {
        const query = `
            SELECT id, name, email, role, is_active, created_at 
            FROM account 
            ORDER BY created_at DESC 
            LIMIT $1 OFFSET $2
        `;
        const result = await db.query(query, [limit, offset]);
        return result.rows;
    }
}

module.exports = UserModel;