// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Obtenemos la sesion del usuario
  const session = await getServerSession(req, res, authOptions);

  console.log(session);

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  // Creamos el auth de google
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID || "",
    process.env.GOOGLE_CLIENT_SECRET || "",
    "http://localhost:3000/api/auth/callback/google"
  );

  //   // Creamos un documento de sheets
  //   const sheets = google.sheets({ version: "v4", auth });

  //   // Creamos un documento de drive
  //   const sheet = await sheets.spreadsheets.create({
  //     requestBody: {
  //       properties: {
  //         title: "My Spreadsheet fast",
  //       },
  //     },
  //   });

  res.status(200).json({ name: "John Doe" });
}
