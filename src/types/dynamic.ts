import { PrismaClient } from "@prisma/client";

export type PrismaModelKeys = {
  [K in keyof PrismaClient]: PrismaClient[K] extends { findMany: Function }
    ? K
    : never;
}[keyof PrismaClient];

// Utility type to extract fields of a model
export type ModelFields<T extends PrismaModelKeys> = PrismaClient[T] extends {
  findFirst: () => infer R;
}
  ? R
  : never;

// Dynamic model interface
export interface DynamicModelInterface<T extends PrismaModelKeys> {
  modelName: T;
  fields: ModelFields<T>;
}
