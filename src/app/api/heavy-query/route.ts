import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = Number(
      searchParams.get("limit") || 5000
    );

    const result = await pool.query(`
      SELECT
        u.nombre,
        p.nombre,
        t.cantidad,
        t.created_at
      FROM transacciones t
      JOIN usuarios u ON u.id = t.usuario_id
      JOIN productos p ON p.id = t.producto_id
      ORDER BY t.created_at DESC
      LIMIT ${limit}
    `);

    return NextResponse.json({
      success: true,
      rows: result.rowCount,
      limit,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
