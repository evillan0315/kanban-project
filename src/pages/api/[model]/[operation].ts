import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

type PrismaModelKeys = {
  [K in keyof PrismaClient]: PrismaClient[K] extends { findMany: Function }
    ? K
    : never;
}[keyof PrismaClient];

const validModels: PrismaModelKeys[] = [
  "image",
  "component",
  "page",
  "navigation",
  "section",
  "form",
  "field",
  "formSection",
  "address",
  "account",
  "session",
  "verificationToken",
  "layout",
  "type",
  "category",
  "user",
  "role",
  "page",
  "contact",
  "inquiry",
];

function isValidModel(model: string): model is PrismaModelKeys {
  return validModels.includes(model as PrismaModelKeys);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { model, operation } = req.query;

  if (typeof model !== "string" || typeof operation !== "string") {
    return res.status(400).json({ error: "Invalid model or operation" });
  }

  if (!isValidModel(model)) {
    return res.status(400).json({ error: "Invalid model name" });
  }

  try {
    const prismaModel = prisma[model] as any; // Use `any` to resolve method dynamically

    switch (operation) {
      case "findMany":
        return res.status(201).json(await prismaModel.findMany());
      case "findUnique": {
        console.log(req.query.id, "req");
        const d = await prismaModel.findUnique({
          where: { id: req.query.id },
        });
        return res.status(201).json(d);
      }
      case "create": {
        const data = req.body;

        return res.status(201).json(
          await prismaModel.create({
            data, // Provide `data` in the request body
          })
        );
      }
      case "update":
        return res.json(
          await prismaModel.update({
            where: req.body.where, // Provide `where` conditions in the request body
            data: req.body.data, // Provide updated `data` in the request body
          })
        );
      case "delete":
        return res.json(
          await prismaModel.delete({
            where: req.body.where, // Provide `where` conditions in the request body
          })
        );
      default:
        return res.status(400).json({ error: "Invalid operation" });
    }
  } catch (error) {
    console.error("Error in dynamic API handler:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error });
  }
}
