# 🩺 Medical Agenda - Desafio Técnico

Sistema de agendamento médico com autenticação, cadastro de usuários (médico e paciente), horários disponíveis e controle de agendamentos, desenvolvido com foco em arquitetura limpa e boas práticas de DDD.

---

## 🚀 Tecnologias utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **TypeORM**
- **PostgreSQL (via Docker)**
- **Tsyringe** (Injeção de dependência)
- **Celebrate (Joi)** (Validação de schema)
- **Date-fns** (Manipulação de datas)
- **Docker & Docker Compose**

---

## 🧱 Estrutura da aplicação

O projeto segue o padrão **DDD (Domain-Driven Design)** com camadas organizadas por **módulos**:

```
src/
├── modules/
│   ├── usuarios/
│   ├── medico/
│   ├── paciente/
│   ├── horario/
│   └── agendamento/
├── shared/
|   ├── container/
│   ├── errors/
|   ├── http/
│   ├── middlewares/
│   ├── utils/
│   └── typeorm/
```

---

## 🐳 Banco de Dados via Docker

O PostgreSQL roda em container Docker.

### 📄 docker-compose.yml

```yaml
version: '3.8'
services:
  db:
    image: postgres:latest
    container_name: medical_agenda
    environment:
      POSTGRES_DB: medical_agenda
      POSTGRES_USER: developer
      POSTGRES_PASSWORD: admin
    ports:
      - '5433:5432'
```

### 🔧 Variáveis de conexão no backend
* Host: `localhost`
* Port: `5433`
* User: `developer`
* Password: `admin`
* Database: `medical_agenda`

---

## 🧪 Execução local (dev)

```bash
# 1. Suba o banco de dados
docker-compose up -d

# 2. Instale dependências
npm install

# 3. Rode as migrations
npm run migration:run

# 4. Inicie o servidor
npm run dev
```

---

## 📮 Collection do Postman

Incluímos a collection para facilitar os testes da API.

📁 Arquivo:
* `postman/Desafio Técnico.postman_collection.json`

✅ Inclui todas as rotas:
* Autenticação (Login)
* Cadastro de usuários (médico e paciente)
* Listagem e criação de horários disponíveis
* Criação, listagem e atualização de agendamentos

Para usar:
1. Abra o Postman
2. Vá em `Import > Arquivo`
3. Selecione a collection
4. Configure uma variável de ambiente `{{base_url}}` como `http://localhost:3333`

---

## 🎯 Funcionalidades implementadas

* Cadastro de usuários com tipo (`MEDICO` ou `PACIENTE`)
* Autenticação com JWT
* Cadastro e listagem de horários disponíveis (médico)
* Agendamento com validação de conflitos e slots de 30 minutos
* Cancelamento e conclusão de agendamento com regras por tipo
* Arquitetura limpa com injeção de dependência
* Validação de dados com Celebrate (Joi)

---

## 🖥️ Integração com o Frontend (ex: Bolt AI, React, etc)

Você pode usar uma IA como o **Bolt** ou frameworks React para gerar o frontend.

Endpoints relevantes para o frontend:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/login` | Autenticação de usuário |
| POST | `/usuarios` | Criação de usuário |
| GET | `/horarios` | Lista horários disponíveis |
| POST | `/horarios` | Médico cria horário |
| POST | `/agendamentos` | Paciente agenda horário |
| PATCH | `/agendamentos/:id/status` | Atualiza status do agendamento |
| GET | `/agendamentos` | Lista agendamentos do paciente |

⚠️ Todas as rotas (exceto login e cadastro) exigem token JWT.

---

## 📚 Possíveis melhorias futuras

* Dashboard para médicos com filtros por data
* Notificações por e-mail ou WhatsApp
* Histórico completo de atendimentos
* Tela de gestão para secretárias

---

## 👨‍💻 Autor

Desenvolvido por **Eder** — Engenheiro de Software & entusiasta de metal, código limpo e propósito eterno.

---

## 🛡️ Licença

Este projeto é parte de um desafio técnico e pode ser usado como base para aplicações reais com fins educacionais ou profissionais.