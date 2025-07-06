// Program.cs  ── 完整可直接替换
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Handlers;
using Server.Models;
using Server.Repositories;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ──────────────── 1. 基础服务 ────────────────
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));



// ──────────────── 2. JWT 认证 ────────────────
var jwtSection = builder.Configuration.GetSection("Jwt");
Console.WriteLine($"[DEBUG] Jwt:Key = {builder.Configuration["Jwt:Key"]}");
Console.WriteLine($"[DEBUG] Jwt:Issuer = {builder.Configuration["Jwt:Issuer"]}");
Console.WriteLine($"[DEBUG] Jwt:Audience = {builder.Configuration["Jwt:Audience"]}");

// 1️⃣ Identity first – keep whatever you need (roles, UserManager, etc.)
builder.Services.AddIdentity<AppUser, IdentityRole<int>>()
       .AddEntityFrameworkStores<AppDbContext>();

// 2️⃣ NOW set the default scheme = Bearer again
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme    = JwtBearerDefaults.AuthenticationScheme;
});

// 3️⃣ Normal JWT-Bearer registration (unchanged)
builder.Services.AddAuthentication()          // ←  no options needed here
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
             ValidateIssuer           = true,
            ValidateAudience         = true,
            ValidateIssuerSigningKey = true,
            ValidateLifetime         = true,
            ValidIssuer   = jwtSection["Issuer"],
            ValidAudience = jwtSection["Audience"],
            IssuerSigningKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtSection["Key"]!))
        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = ctx =>
            {
                var token = ctx.Request.Query["access_token"];
                if (!string.IsNullOrEmpty(token) &&
                    ctx.HttpContext.Request.Path.StartsWithSegments("/chatHub"))
                    ctx.Token = token;
                return Task.CompletedTask;
            }
        };
    });

// ──────────────── 3. 依赖注入 ────────────────
builder.Services.AddScoped<IJwtService,       JwtService>();
builder.Services.AddScoped<IUserHandler,      UserHandler>();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

// CORS：前端本地 Vite (http://localhost:5173)
const string CorsPolicy = "Frontend";
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(CorsPolicy, p =>
    {
        p.WithOrigins("http://localhost:5173")
         .AllowAnyHeader()
         .AllowAnyMethod()
         .AllowCredentials();      // SignalR 必须
    });
});

var app = builder.Build();

// ──────────────── 4. HTTP 管道顺序 ────────────────
// a. 路由
app.UseRouting();

// b. CORS（一定要在 Routing 后、Auth 前）
app.UseCors(CorsPolicy);

// c. 认证 / 授权
app.UseAuthentication();  // ⭐ 之前被注释掉，导致协商 401
app.UseAuthorization();

// d. 开发工具
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// e. 映射终结点
app.MapControllers();
app.MapHub<Server.Hubs.ChatHub>("/chatHub");

// ──────────────── 5. 自动建库 & 种子 ────────────────
using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    ctx.Database.EnsureCreated();
    SeedData.Initialize(scope.ServiceProvider);
}

app.Run();
