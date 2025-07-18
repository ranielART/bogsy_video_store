BOGSY VIDEO STORE - ASP.NET Core 8.0 MVC + MySQL + EF Core

==========================================
🧾 PROJECT OVERVIEW
This is a simple video rental store management system built using:
- ASP.NET Core 8.0 (Web API)
- Entity Framework Core 8.0 (Pomelo for MySQL)
- MySQL as the database
- Swagger for API documentation

==========================================
🚀 HOW TO SET UP AND RUN

1. ✅ INSTALL REQUIRED TOOLS
   - Visual Studio 2022 or later with ASP.NET & EF workloads
   - XAMPP (for MySQL and phpMyAdmin)
   - .NET 8 SDK

2. ⚙️ SET UP MYSQL DATABASE
   - Open **XAMPP Control Panel**
   - Start **Apache** and **MySQL**
   - Open **phpMyAdmin**
   - Create a new database named: `bogsy_db`

3. 📥 CLONE THE PROJECT
   Open terminal or Git Bash, then run:
4. 📂 OPEN IN VISUAL STUDIO
- Open the cloned folder using Visual Studio
- Make sure the selected startup project is correct

5. 🔐 USER SECRETS / CONNECTION STRING
This project uses **UserSecrets** for managing connection strings:
- Run this command in terminal inside the project folder:
  ```
  dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost;Database=bogsy_db;User=root;Password=;"
  ```

6. 🔄 APPLY MIGRATIONS
- Open Package Manager Console or terminal
- Run the following commands:
  ```
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  ```

7. ▶️ RUN THE PROJECT
- Press F5 or click on "Run"
- Swagger UI will open at `https://localhost:<port>/swagger`
- Test endpoints directly from Swagger

==========================================
📦 NUGET PACKAGES USED

<Project Sdk="Microsoft.NET.Sdk.Web">

<PropertyGroup>
 <TargetFramework>net8.0</TargetFramework>
 <Nullable>enable</Nullable>
 <ImplicitUsings>enable</ImplicitUsings>
 <UserSecretsId>37929a43-0d92-44a1-aafe-63f2368de1ac</UserSecretsId>
 <DockerDefaultTargetOS>Linux</DockerDefaultTargetOS>
 <DockerfileContext>.</DockerfileContext>
</PropertyGroup>

<ItemGroup>
 <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.4">
   <PrivateAssets>all</PrivateAssets>
   <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
 </PackageReference>
 <PackageReference Include="Microsoft.VisualStudio.Azure.Containers.Tools.Targets" Version="1.22.1" />
 <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="8.0.3" />
 <PackageReference Include="Swashbuckle.AspNetCore" Version="6.6.2" />
</ItemGroup>

<ItemGroup>
 <Folder Include="Migrations\" />
 <Folder Include="Models\" />
</ItemGroup>

</Project>
