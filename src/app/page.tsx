"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Home() {
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);

  const [history, setHistory] = useState<
    { time: string; cpu: number; ram: number }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const [querySize, setQuerySize] = useState(5000);

  const [httpRequests, setHttpRequests] = useState(50);
  const [floodLoading, setFloodLoading] = useState(false);
  const [floodResult, setFloodResult] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/system-stats");
        const data = await res.json();

        setCpu(data.cpu);
        setRam(data.ram);

        setHistory((prev) => [
          ...prev.slice(-19),
          {
            time: new Date().toLocaleTimeString(),
            cpu: data.cpu,
            ram: data.ram,
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();

    const interval = setInterval(fetchStats, 2000);

    return () => clearInterval(interval);
  }, []);

  const runHeavyQuery = async () => {
    setLoading(true);

    const start = performance.now();

    try {
      const res = await fetch(
        `/api/heavy-query?limit=${querySize}`
      );

      const data = await res.json();

      const end = performance.now();

      setRows(data.rows);
      setResponseTime((end - start) / 1000);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const runHttpFlood = async () => {
    setFloodLoading(true);

    try {
      const promises = [];

      for (let i = 0; i < httpRequests; i++) {
        promises.push(
          fetch("/api/heavy-query?limit=1000")
        );
      }

      await Promise.all(promises);

      setFloodResult(
        `${httpRequests} peticiones ejecutadas correctamente`
      );
    } catch (error) {
      console.error(error);

      setFloodResult(
        "Error al ejecutar HTTP Flood"
      );
    }

    setFloodLoading(false);
  };

  const getStatus = () => {
    if (cpu >= 70) return "🔴 Alto";
    if (cpu >= 40) return "🟡 Medio";
    return "🟢 Normal";
  };

  const getStressLevel = () => {
    if (cpu < 20)
      return {
        text: "🟢 Estrés Bajo",
        desc: "El sistema trabaja normalmente.",
      };

    if (cpu < 50)
      return {
        text: "🟡 Estrés Medio",
        desc: "Existe carga moderada sobre los recursos.",
      };

    if (cpu < 80)
      return {
        text: "🟠 Estrés Alto",
        desc: "El procesador presenta alta utilización.",
      };

    return {
      text: "🔴 Estrés Crítico",
      desc: "Existe riesgo de saturación del sistema.",
    };
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(to right, #0f172a, #1e293b)",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "30px",
        }}
      >
        Dashboard de Estrés del Sistema
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            width: "220px",
          }}
        >
          <h2>CPU</h2>
          <h1>{cpu}%</h1>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            width: "220px",
          }}
        >
          <h2>RAM</h2>
          <h1>{ram}%</h1>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            width: "280px",
          }}
        >
          <h2>Nivel de Estrés</h2>

          <h3>{getStressLevel().text}</h3>

          <p>{getStressLevel().desc}</p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            width: "220px",
          }}
        >
          <h2>Estado</h2>
          <h1>{getStatus()}</h1>
        </div>
      </div>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "25px",
        }}
      >
        <h2>Prueba de Estrés</h2>

        <p>Cantidad de registros a consultar:</p>

        <input
          type="number"
          value={querySize}
          onChange={(e) =>
            setQuerySize(Number(e.target.value))
          }
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "200px",
            color: "black",
            borderRadius: "8px",
            marginRight: "10px",
          }}
        />

        <button
          onClick={runHeavyQuery}
          disabled={loading}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Ejecutando..."
            : "Ejecutar Consulta"}
        </button>
      </div>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "25px",
        }}
      >
        <h2>HTTP Flood</h2>

        <p>
          Cantidad de peticiones simultáneas:
        </p>

        <input
          type="number"
          value={httpRequests}
          onChange={(e) =>
            setHttpRequests(Number(e.target.value))
          }
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "200px",
            color: "black",
            borderRadius: "8px",
            marginRight: "10px",
          }}
        />

        <button
          onClick={runHttpFlood}
          disabled={floodLoading}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#dc2626",
            color: "white",
            cursor: "pointer",
          }}
        >
          {floodLoading
            ? "Ejecutando Flood..."
            : "Ejecutar HTTP Flood"}
        </button>

        {floodResult && (
          <p style={{ marginTop: "15px" }}>
            {floodResult}
          </p>
        )}
      </div>

      <div
        style={{
          marginTop: "20px",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h2>Historial CPU y RAM</h2>

        <div
          style={{
            width: "100%",
            height: 350,
          }}
        >
          <ResponsiveContainer>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis domain={[0, 100]} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="cpu"
                name="CPU %"
                stroke="#ff4d4f"
                strokeWidth={4}
              />

              <Line
                type="monotone"
                dataKey="ram"
                name="RAM %"
                stroke="#00e676"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {rows !== null && (
        <div
          style={{
            marginTop: "30px",
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h2>Resultado de la Prueba</h2>

          <p>
            Filas obtenidas: <b>{rows}</b>
          </p>

          <p>
            Tiempo de respuesta:
            <b>
              {" "}
              {responseTime?.toFixed(2)} segundos
            </b>
          </p>
        </div>
      )}
    </main>
  );
}
