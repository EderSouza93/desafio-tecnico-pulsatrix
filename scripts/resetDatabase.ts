import { Client } from "pg";

const config = {
  user: "developer",
  host: "localhost",
  port: 5433,
  password: "admin",
  database: "postgres", 
};

const TARGET_DB = "medical_agenda";

async function resetDatabase() {
  const client = new Client(config);

  try {
    await client.connect();
    console.log(`🔁 Conectado ao banco "${config.database}"`);

    console.log(`🔪 Finalizando conexões com o banco "${TARGET_DB}"...`);
    await client.query(`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = '${TARGET_DB}' AND pid <> pg_backend_pid();
    `);

    console.log(`💣 Dropando banco "${TARGET_DB}"...`);
    await client.query(`DROP DATABASE IF EXISTS ${TARGET_DB};`);

    console.log(`🆕 Criando banco "${TARGET_DB}"...`);
    await client.query(`CREATE DATABASE ${TARGET_DB};`);

    console.log(`✅ Banco "${TARGET_DB}" resetado com sucesso!`);
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ Erro ao resetar banco:", err.message);
    } else {
      console.error("❌ Erro ao resetar banco:", err);
    }
  } finally {
    await client.end();
  }
}

resetDatabase();
