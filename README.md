# 🎬 BOGSY VIDEO STORE

A simple full-stack **video rental system** built with:

- ⚙️ **ASP.NET Core 8.0 Web API** (Backend)
- ⚛️ **React + Vite** (Frontend)
- 🐬 **MySQL** database (via XAMPP)
- 📦 **Entity Framework Core** (Pomelo for MySQL)
- 📚 **Swagger** for API testing and documentation

---

## 📁 Project Structure

```
/Controllers
    ├── VideoController.cs
    ├── RentalController.cs
    └── ReportController.cs

/Models
    ├── video.cs
    └── rental.cs

/Data
    └── ApplicationDbContext.cs

/Frontend/bogsy-frontend
    └── React + Vite frontend files
```

---

## ✅ Requirements

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Visual Studio 2022+](https://visualstudio.microsoft.com/) with ASP.NET & EF Core
- [Node.js](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/index.html)

---

## 🧰 Backend Setup

1. Start **XAMPP**, then run **Apache** and **MySQL**
2. Open [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
3. Create a new database: `bogsy_db`
4. Update your connection string in `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;port=3306;user=root;password=;database=bogsy_db"
}
```

5. Open terminal in the backend folder and run:

```bash
dotnet ef database update
dotnet run
```

6. Swagger should now be available at: [https://localhost:port/swagger](https://localhost:port/swagger)

---

## 💻 Frontend Setup (React + Vite)

1. Navigate to the frontend folder:

```bash
cd ./Frontend/bogsy-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the app:

```bash
npm run dev
```

4. Make sure the backend (Swagger/API) is running before using the frontend.

---

## 📝 Features

- Add, edit, delete, and list videos
- Rent and return videos
- Report of unreturned rentals
- Customer rental modal
- Backend API built using clean architecture
- Modern frontend UI using TailwindCSS and ShadCN components
