<h1></h1> Book Management System</h1>

<p>A backend API for managing books, authors, and comments — built with <strong>ASP.NET Core Web API</strong>, <strong>Entity Framework Core</strong>, and <strong>SQL Server</strong>, following <strong>Clean Architecture</strong> principles.</p>

<h2>Overview</h2>
<p>This project started as a way to practice building a properly structured, production-style .NET backend — and grew into my main portfolio piece. It covers full CRUD operations, authentication, and a clean separation of concerns across layers.</p>

<h2>Features</h2>
<ul>
  <li><strong>CRUD operations</strong> for books, authors, and comments</li>
  <li><strong>Authentication &amp; Authorization</strong> with ASP.NET Core Identity</li>
  <li><strong>Role-based access control</strong></li>
  <li><strong>Repository Pattern</strong> + full <strong>Service Layer</strong> (interfaces, services, DTOs)</li>
  <li><strong>EF Core Code First</strong> with migrations</li>
  <li><strong>Unit Tests</strong> (xUnit + Moq) covering services and controllers</li>
  <li><strong>XML documentation</strong> across the codebase</li>
  
</ul>

<h2>Tech Stack</h2>
<table>
  <thead>
    <tr><th>Layer</th><th>Technology</th></tr>
  </thead>
  <tbody>
    <tr><td>API</td><td>ASP.NET Core Web API</td></tr>
    <tr><td>ORM</td><td>Entity Framework Core (Code First)</td></tr>
    <tr><td>Database</td><td>SQL Server</td></tr>
    <tr><td>Auth</td><td>ASP.NET Core Identity</td></tr>
    <tr><td>Testing</td><td>xUnit, Moq</td></tr>
  
    <tr><td>Architecture</td><td>Clean Architecture, Repository Pattern</td></tr>
  </tbody>
</table>

<h2>Project Structure</h2>
<pre>
BookManagementSystem/
├── src/
│   ├── API/              # Controllers, Program.cs, middleware
│   ├── Application/      # Services, DTOs, interfaces
│   ├── Domain/            # Entities, core business logic
│   └── Infrastructure/   # EF Core, repositories, Identity
    └──Frontend           #ReactJs
├── tests/
│   └── UnitTests/        # xUnit + Moq test suites
└── README.md
</pre>

<h2>Getting Started</h2>

<h3>Prerequisites</h3>
<ul>
  <li>.NET SDK (8.0 or later)</li>
  <li>SQL Server</li>
</ul>

<h3>Run locally</h3>
<pre><code>git clone https://github.com/&lt;your-username&gt;/BookManagementSystem.git
cd BookManagementSystem
<h3>Run locally</h3>
<pre><code>Make sure to create a database named :"BookMangment" and then put your database info on the connection string: "Data Source=ServerName;Initial Catalog=SmartCity;Integrated Security=True; TrustServerCertificate=True"
cd BookManagementSystem
dotnet ef database update

dotnet run --project src/API
</code></pre>



<p>This spins up the API and SQL Server together, applying EF Core migrations automatically on startup.</p>

<h2>Running Tests</h2>
<pre><code>dotnet test
</code></pre>


