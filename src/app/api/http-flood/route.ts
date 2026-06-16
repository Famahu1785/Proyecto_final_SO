import { NextResponse } from "next/server";

export async function GET() {
  try {
    const requests = [];

    for (let i = 0; i < 50; i++) {
      requests.push(
        fetch("http://localhost:3000/api/heavy-query?limit=1000")
      );
    }

    await Promise.all(requests);

    return NextResponse.json({
      success: true,
      requests: 50,
      message: "HTTP Flood ejecutado"
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    });
  }
}
