import { app } from "@shared/infra/http/app";
import request from "supertest";

import { v4 as uuidV4 } from "uuid";

import createConnection from '@shared/infra/typeorm';
import { Connection } from "typeorm";
import { hash } from "bcryptjs";

let connection: Connection;

describe("Create category controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash('admin', 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'adin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXX')
            `
        );
    })

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "adin@rentx.com.br",
            password: 'admin'
        });

        const { refresh_token } = responseToken.body;


        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest"
        }).set({
            Authorization: `Bearer ${refresh_token}`,
        })

        expect(response.status).toBe(201);
    })

    it("Should not be able create a new category with name exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "adin@rentx.com.br",
            password: 'admin'
        });

        const { refresh_token } = responseToken.body;


        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest"
        }).set({
            Authorization: `Bearer ${refresh_token}`,
        })

        expect(response.status).toBe(400);
    })
})