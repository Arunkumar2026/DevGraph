import driver from '../config/database.js';

export async function createConstraints() {
    const session = driver.session();

    try {
        const constraints = [
            `
            CREATE CONSTRAINT developer_id_unique IF NOT EXISTS
            FOR (d:Developer)
            REQUIRE d.id IS UNIQUE
            `,

            `
            CREATE CONSTRAINT project_id_unique IF NOT EXISTS
            FOR (p:Project)
            REQUIRE p.id IS UNIQUE
            `,

            `
            CREATE CONSTRAINT technology_id_unique IF NOT EXISTS
            FOR (t:Technology)
            REQUIRE t.id IS UNIQUE
            `,

            `
            CREATE CONSTRAINT skill_id_unique IF NOT EXISTS
            FOR (s:Skill)
            REQUIRE s.id IS UNIQUE
            `,

            `
            CREATE CONSTRAINT company_id_unique IF NOT EXISTS
            FOR (c:Company)
            REQUIRE c.id IS UNIQUE
            `,
        ];

        for (const query of constraints){
            await session.run(query);
        }

        return true;
    } finally {
        await session.close();
    }
}