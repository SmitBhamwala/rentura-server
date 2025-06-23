import { Request, Response } from "express";

import { PrismaClient, Tenant } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma = new PrismaClient();

export const getTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: {
        favorites: true,
      },
    });

    if (!tenant) {
      res.status(404).json({ message: "Tenant not found" });
      return;
    }

    res.status(200).json(tenant);
  } catch (error: any) {
    res.status(500).json({
      message: `Error retrieving tenant: ${error.message}`,
    });
  }
};

export const createTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber }: Tenant = req.body;

    const tenant = await prisma.tenant.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });

    res.status(201).json(tenant);
  } catch (error: any) {
    res.status(500).json({
      message: `Error creating tenant: ${error.message}`,
    });
  }
};

export const updateTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const { name, email, phoneNumber }: Tenant = req.body;

    const updatedTenant = await prisma.tenant.update({
      where: { cognitoId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.json(updatedTenant);
  } catch (error: any) {
    res.status(500).json({
      message: `Error updating tenant: ${error.message}`,
    });
  }
};
export const getCurrentResidences = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const properties = await prisma.property.findMany({
      where: { tenants: { some: { cognitoId } } },
      include: {
        location: true,
      },
    });

    const residencesWithFormattedLocation = await Promise.all(
      properties.map(async (property) => {
        const coordinates: { coordinates: string }[] = await prisma.$queryRaw`
          SELECT ST_AsText(coordinates) as coordinates
          FROM "Location"
          WHERE id = ${property.location.id}
        `;
        const geoJson: any = wktToGeoJSON(coordinates[0].coordinates || "");
        const longitude = geoJson.coordinates[0];
        const latitude = geoJson.coordinates[1];

        return {
          ...property,
          location: {
            ...property.location,
            coordinates: { longitude, latitude },
          },
        };
      })
    );

    res.status(200).json(residencesWithFormattedLocation);
  } catch (error: any) {
    res.status(500).json({
      message: `Error retrieving tenant residences: ${error.message}`,
    });
  }
};
