# 🚀 Dynamic Prisma Schema Manager

<img src="./dynamic-prisma-schema-manager.png">

An intuitive **Next.js, TypeScript, and MUI**-powered tool for dynamically managing **Prisma schemas** via a **GUI and interactive terminal**. Effortlessly create, modify, and manage database models—all from a user-friendly interface.

## ⚡ Features

✅ **Dynamic Schema Editor** – Add, update, and remove Prisma models & fields via a sleek UI  
✅ **Interactive Terminal** – Run Prisma commands (`migrate`, `db push`, `generate`) directly in-app  
✅ **Live Log Streaming** – View Prisma execution logs in real-time using Server-Sent Events (SSE)  
✅ **Yup Validation** – Ensures correct input for fields and schema definition  
✅ **MUI-Powered UI** – Clean, modern UI built with Material-UI  
✅ **TypeScript Support** – Strong type safety across the app  
✅ **Prisma & PostgreSQL** – Fully integrated with Prisma ORM and PostgreSQL  

## 🎥 Demo

🚧 **Live demo coming soon!** 🚧

## 🛠️ Tech Stack

| Technology    | Description                           |
|--------------|-------------------------------------|
| **Next.js**  | React framework for SSR & API routes |
| **TypeScript** | Static type-checking for better development |
| **Prisma**   | Modern ORM for PostgreSQL management |
| **MUI**      | Material UI for a beautiful interface |
| **SSE**      | Real-time log streaming for terminal |
| **React Hook Form** | Form handling with validation |

## 🚀 Getting Started

### 📦 **Installation**

Clone the repository:

```sh
git clone https://github.com/your-username/dynamic-prisma-schema-manager.git
cd dynamic-prisma-schema-manager
```

Install dependencies:

```sh
npm install
# or
yarn install
```

### 🔧 **Setup Environment Variables**

Create a `.env` file and configure your database:

```ini
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

### 🏗️ **Run the App**

Run the development server:

```sh
npm run dev
```

The app will be available at **`http://localhost:3000`**.

## 📂 Folder Structure

```
📦 dynamic-prisma-schema-manager
├── 📁 pages              # Next.js API Routes & Pages
│   ├── 📁 api
│   │   ├── createModel.ts # API for handling schema updates
│   ├── index.tsx        # Main UI page
├── 📁 components         # UI Components (Drawer, Form, Terminal)
├── 📁 hooks             # Custom React Hooks (e.g., useLoading)
├── 📁 prisma            # Prisma schema directory
│   ├── schema.prisma    # Prisma schema definition
├── 📁 public            # Static assets
├── 📁 styles            # Global styles
├── .env.example        # Example environment variables
├── README.md           # Project documentation
└── tsconfig.json       # TypeScript configuration
```

## ✨ Usage

### 🔹 **Adding a Model & Fields**
1. Open the **Dynamic Schema Form**.
2. Enter the **Model Name** (e.g., `User`).
3. Click **Add Field** to add attributes like `name: String`, `email: String @unique`, etc.
4. Click **Create Model** to generate the Prisma schema.

### 🔹 **Using the Terminal**
- **Run Prisma Commands**: Execute `prisma migrate dev`, `db push`, etc.
- **Clear Logs**: Use the **clear** button to reset logs.

## 🛠️ Prisma Commands

| Command | Description |
|---------|------------|
| `prisma db push` | Sync schema changes with the database |
| `prisma migrate dev` | Create & apply migrations |
| `prisma generate` | Regenerate Prisma Client |

## 🚀 Roadmap

- [ ] **Schema Versioning**
- [ ] **Custom Prisma Decorators**
- [ ] **Cloud Database Support**
- [ ] **Dark Mode UI**
- [ ] **Export & Import Schema Configs**

## 🤝 Contributing

Want to improve this project? Contributions are welcome!  

1. **Fork** the repo  
2. Create a **feature branch** (`git checkout -b feature-name`)  
3. **Commit** your changes (`git commit -m "Added feature X"`)  
4. **Push** to the branch (`git push origin feature-name`)  
5. Open a **Pull Request** 🚀  

## 🛡️ License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 📬 Contact

📧 **Email:** edvillan15@gmail.com 
🐦 **Twitter:** [@yourhandle](https://twitter.com/meetlily)  
🔗 **LinkedIn:** [Your Profile](https://linkedin.com/in/evillanueva0315)  

---

⭐ **If you like this project, please consider giving it a star!** ⭐
```