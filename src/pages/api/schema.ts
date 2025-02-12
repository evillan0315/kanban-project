import { Prisma, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
import { PrismaModelKeys } from "@/lib/prisma"; // Ensure this path is correct
import { NextApiRequest, NextApiResponse } from "next";
//import { isValidModel } from "@/lib/prisma"; // Import the helper function
const validModels: PrismaModelKeys[] = Object.keys(prisma).filter((key) =>
  typeof (prisma as any)[key]?.findMany === "function"
) as PrismaModelKeys[];
function isValidModel(model: string): model is PrismaModelKeys {
  return validModels.includes(model as PrismaModelKeys);
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { model } = req.query;
    //console.log(isValidModel(String(model)));
    if (!model || typeof model !== "string") {
      return res.status(400).json({ message: "Model name is required" });
    }
    console.log(model, Object.keys(prisma).includes(model));
    if (!isValidModel(model)) {
        return res.status(404).json({ message: `Model '${model}' not found in Prisma schema` });
      }
  
      // Use Prisma's DMMF (Data Model Meta Format) to get schema details
      const modelSchema = Prisma.dmmf.datamodel.models.find((m) => m.name === model);
  
      if (!modelSchema) {
        return res.status(404).json({ message: `Schema details for '${model}' not found` });
      }

    if (!modelSchema) {
      return res.status(404).json({ message: `Schema details for '${model}' not found` });
    }

    // Extract field details
    const schemaFields = modelSchema.fields.map((field: any) => ({
      name: field.name,
      type: field.type,
      isRequired: field.isRequired,
      isList: field.isList,
      isUnique: field.isUnique,
      isId: field.isId,
      isRelation: !!field.relationName, // Checks if it's a relation field
    }));

    return res.status(200).json(schemaFields);
  } catch (error) {
    console.error("Error fetching schema fields:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
