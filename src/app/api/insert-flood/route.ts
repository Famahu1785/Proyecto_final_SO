import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const amount =
      Number(searchParams.get("amount")) || 1000;

    for (let i = 0; i < amount; i++) {
      await pool.query(
        `
        INSERT INTO logs_carga(tipo, mensaje)
        VALUES($1,$2)
        `,
        [
          "INSERT_FLOOD",
          `Registro ${i}`,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      inserted: amount,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
