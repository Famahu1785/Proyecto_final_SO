import { NextResponse } from "next/server";
import si from "systeminformation";

export async function GET() {
  const cpu = await si.currentLoad();
  const mem = await si.mem();

  return NextResponse.json({
    cpu: Number(cpu.currentLoad.toFixed(1)),
    ram: Number(((mem.used / mem.total) * 100).toFixed(1)),
  });
}
