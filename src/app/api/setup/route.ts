import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {

    for (let i = 1; i <= 1000; i++) {
      await pool.query(
        `INSERT INTO usuarios(nombre,email)
         VALUES($1,$2)`,
        [`Usuario ${i}`, `usuario${i}@correo.com`]
      );
    }

    for (let i = 1; i <= 5000; i++) {
      await pool.query(
        `INSERT INTO productos(nombre,precio)
         VALUES($1,$2)`,
        [`Producto ${i}`, Math.random() * 1000]
      );
    }

    for (let i = 1; i <= 10000; i++) {
      await pool.query(
        `INSERT INTO transacciones(usuario_id,producto_id,cantidad)
         VALUES($1,$2,$3)`,
        [
          Math.floor(Math.random() * 1000) + 1,
          Math.floor(Math.random() * 5000) + 1,
          Math.floor(Math.random() * 10) + 1
        ]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Datos generados correctamente"
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    });
  }
}
