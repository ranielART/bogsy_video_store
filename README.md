BOGSY VIDEO STORE
==========================
A simple ASP.NET Core 8.0 Web API for managing a video rental store.

**Built with:**
- ASP.NET Core **8.0** (Web API)
- Entity Framework Core (**Pomelo** for MySQL)
- **MySQL** database
- **Swagger** for API testing and documentation

-------------------------------------------------------
1. PROJECT STRUCTURE
-------------------------------------------------------

/Controllers
    - VideoController.cs
    - RentalController.cs
    - ReportController.cs

/Models
    - video.cs
    - rental.cs

/Data
    - ApplicationDbContext.cs

Other Important Files:
    - Program.cs
    - appsettings.json
    - Properties/launchSettings.json
    - .csproj file (configured with Docker, EF, and MySQL packages)

-------------------------------------------------------
2. SETUP INSTRUCTIONS
-------------------------------------------------------

**Step 1: Install Requirements**
-----------------------------------
- .NET 8 SDK
- Visual Studio 2022 or later (with ASP.NET + EF Core support)
- XAMPP or standalone MySQL server
- MySQL Workbench or phpMyAdmin (optional for managing DB)

**Step 2: Start MySQL Server**
-----------------------------------
- **Open XAMPP**
- Click **Start** on both **Apache** and **MySQL**
- Visit http://localhost/phpmyadmin to verify MySQL is running

**Step 3: Create Database**
-----------------------------------
- In phpMyAdmin or MySQL Workbench, create a database named:
    **bogsy_db**

**Step 4: Clone the Project**
-----------------------------------
Run the following in terminal:

    git clone https://github.com/yourusername/bogsy-video-store.git

**Step 5: Add User Secrets for Connection String**
----------------------------------------------------
In the project root folder, run:

    dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost;Database=bogsy_db;User=root;Password=;"

**Step 6: Apply Migrations**
-------------------------------
Generate initial migration and update the database:

    dotnet ef migrations add InitialCreate
    dotnet ef database update

**Step 7: Run the Application**
-----------------------------------
Run from Visual Studio using **F5** or from terminal:

    dotnet run

Open your browser and navigate to:

    https://localhost:5001/swagger

You'll see **Swagger UI** for interacting with the API.
