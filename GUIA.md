# Guía de Ejecución

## PostgreSQL

Documentación oficial:

https://www.postgresql.org/docs/

## Docker

https://docs.docker.com/

## Next.js

https://nextjs.org/docs

## React

https://react.dev/

## PyTorch

https://pytorch.org/docs/stable/index.html

## Jupyter

https://jupyter.org/documentation

## Comandos útiles

Ver contenedores:

```bash
docker ps
```

Ver uso de recursos:

```bash
docker stats
```

Ver procesos:

```bash
htop
```

Ver actividad PostgreSQL:

```sql
SELECT * FROM pg_stat_activity;
```

Entrar a PostgreSQL:

```bash
docker exec -it postgres-db psql -U admin -d appdb
```

Ejecutar Notebook:

```bash
jupyter notebook
```
