import Boom from "@hapi/boom";
import { db } from "../models/db.js";
export const candidatesApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const candidates = await db.candidateStore.find();
            return h.response(candidates).code(200);
        },
    },
    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const candidate = await db.candidateStore.findOne(request.params.id);
                if (candidate === null) {
                    return Boom.notFound("No Candidate with this id");
                }
                return h.response(candidate).code(200);
            }
            catch (err) {
                return Boom.notFound("No Candidate with this id");
            }
        },
    },
    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const candidate = await db.candidateStore.add(request.payload);
            if (candidate !== null) {
                return h.response(candidate).code(201);
            }
            return Boom.badImplementation("error creating candidate");
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            await db.candidateStore.delete();
            return h.response().code(204);
        },
    },
    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            await db.candidateStore.deleteOne(request.params.id);
            return h.response().code(204);
        },
    },
};
