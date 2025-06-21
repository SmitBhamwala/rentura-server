import { Request, Response } from "express";

import { PrismaClient, Manager } from "@prisma/client";

const prisma = new PrismaClient();

export const getManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const manager = await prisma.manager.findUnique({
      where: { cognitoId },
    });

    if (!manager) {
      res.status(404).json({ message: "Manager not found" });
      return;
    }

    res.status(200).json(manager);
  } catch (error: any) {
    res.status(500).json({
      message: `Error retrieving manager: ${error.message}`,
    });
  }
};

export const createManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber }: Manager = req.body;

    const manager = await prisma.manager.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });

    res.status(201).json(manager);
  } catch (error: any) {
    res.status(500).json({
      message: `Error creating manager: ${error.message}`,
    });
  }
};

export const updateManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const { name, email, phoneNumber }: Manager = req.body;

    const updatedManager = await prisma.manager.update({
      where: { cognitoId },
      data: {
        name,
        email,
        phoneNumber
      }
    });

    res.json(updatedManager);
  } catch (error: any) {
    res.status(500).json({
      message: `Error updating manager: ${error.message}`
    });
  }
};