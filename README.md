# 🏡 Alugalar

Alugalar é uma aplicação web para **cadastro e reserva de casas**, desenvolvida com foco em simplicidade, organização e aprendizado prático.  
O sistema permite cadastrar casas no sistema, visualizar informações e realizar reservas de forma intuitiva.

---

## 🚀 Funcionalidades

- 📌 Cadastro de casas
- 📌 Listagem de casas disponíveis
- 📌 Reserva de casas
- 📌 API REST simples
- 📌 Integração completa entre frontend e backend

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Icons

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Multer
- Cors
- Yup
- Nodemon

---

## ⚙️ Configuração do Backend

```bash
cd backend
npm install

````
### ⚙️ Conexão com o MongoDB
No arquivo src/app.js, configure a conexão com o banco de dados:

```bash
mongoose.connect("AQUI A CONEXÃO DO SEU BANCO DE DADOS MONGODB");
```
---
## 🌐 Configuração do Frontend
```bash
cd frontend
npm install

````
### 🌐 Configuração da baseURL
No arquivo src/services/api.js:
```bash
export const api = axios.create({
  baseURL: "http://localhost:3333"
});

````

👨‍💻
Desenvolvido por Kaio Vinicius Camargo
