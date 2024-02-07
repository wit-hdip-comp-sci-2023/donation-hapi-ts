import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { createToken } from "./jwt-utils.js";
export const userApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const users = await db.userStore.find();
                return h.response(users).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const user = (await db.userStore.findOne(request.params.id));
                if (user === null) {
                    return Boom.notFound("No User with this id");
                }
                return h.response(user).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database error");
            }
        },
    },
    create: {
        auth: false,
        handler: async function (request, h) {
            try {
                const userPayload = request.payload;
                const user = (await db.userStore.add(userPayload));
                return h.response(user).code(201);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                await db.userStore.delete();
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
    authenticate: {
        auth: false,
        handler: async function (request, h) {
            const payload = request.payload;
            try {
                const user = (await db.userStore.findBy(payload.email));
                if (user === null)
                    return Boom.unauthorized("User not found");
                const passwordsMatch = payload.password === user.password;
                if (!passwordsMatch)
                    return Boom.unauthorized("Invalid password");
                const token = createToken(user);
                return h.response({ success: true, token: token, _id: user._id }).code(201);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
};
