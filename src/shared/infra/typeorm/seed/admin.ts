import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import createConnection from '../index';



async function create() {
    const connection = await createConnection();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'adin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXX')
        `
    );

    await connection.close();
}

create().then(() => console.log('User admin created!'));