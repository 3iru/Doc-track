"use server";

import db from "@/server/db";
import { type Document } from "@/types/document";
import { compare, hash } from "bcrypt";
import { signIn } from "@/server/auth";

export interface dbResponse {
  status: "success" | "failed";
  data?: Document[] | null;
}

export async function createNewDocument(
  newDocument: Document[]
): Promise<dbResponse> {
  try {
    const data: Document[] = await db.document.createManyAndReturn({
      data: newDocument,
    });

    return { status: "success", data: data };
  } catch (error: unknown) {
    console.error("Error creating document:", error);
    return { status: "failed", data: null };
  }
}

export async function update(
  docId: string,
  userId: string
): Promise<{ status: string; data: Document | null }> {
  try {
    const data = await db.document.update({
      where: {
        docId,
        userId,
      },
      data: {
        status: "Returned",
        dateReturned: new Date().toISOString(),
      },
    });

    return { status: "success", data };
  } catch (error) {
    console.error("Error updating document:", error);
    return { status: "failed", data: null };
  }
}

export async function read(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { status: "failed", data: null, message: "User not found" };
    }

    const documents: Document[] = await db.document.findMany({
      where: { userId: user.id },
      orderBy: {
        dateIssued: "desc",
      },
    });

    return { status: "success", data: documents };
  } catch (error) {
    console.error("Error reading documents:", error);
    return {
      status: "failed",
      data: null,
      message: "Error fetching documents",
    };
  }
}

export async function getUserFromDb(email: string, password: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      omit: {
        password: false,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const hash = await compare(password, user.password);
    if (hash) return user;

    return user;
  } catch (error) {
    console.error(error);
  }
}

export const authenticate = async (formData: FormData) => {
  try {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      return {
        error: true,
        message: res.error,
      };
    }

    return { ok: true };
  } catch (err: unknown) {
    if (err instanceof Error && "type" in err && err.type === "AuthError") {
      return { error: true, message: err.message };
    }
    return {
      error: true,
      message: err instanceof Error ? err.message : String(err),
    };
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        error: true,
        message: "User with this email already exists",
      };
    }


    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    if (newUser) {

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        return {
          error: true,
          message: "Error signing in after registration",
        };
      }

      return { ok: true };
    }

    return {
      error: true,
      message: "Error creating user",
    };
  } catch (err: unknown) {
    return {
      error: true,
      message: err instanceof Error ? err.message : String(err),
    };
  }
};
