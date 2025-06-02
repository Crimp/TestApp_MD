using DevExpress.ExpressApp.ApplicationBuilder;
using DevExpress.ExpressApp.Blazor.ApplicationBuilder;
using DevExpress.ExpressApp.Blazor.Services;
using DevExpress.ExpressApp.Security;
using DevExpress.ExpressApp.WebApi.Services;
using MainDemo.Blazor.Server.Services;
using MainDemo.Module;
using MainDemo.Module.Authentication;
using MainDemo.Module.BusinessObjects;
using MainDemo.Module.BusinessObjects.NonPersistent;
using MainDemo.WebApi.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Server.Circuits;
using Microsoft.AspNetCore.OData;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace MainDemo.Blazor.Server;

public class Startup {
    public Startup(IConfiguration configuration) {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services) {
        services.AddSingleton<GlobalMessenger>();

        services.AddScoped<IDataService, CustomDataService>();

        services.AddSingleton(typeof(HubConnectionHandler<>), typeof(ProxyHubConnectionHandler<>));

        services.AddRazorPages();
        services.AddServerSideBlazor();
        services.AddHttpContextAccessor();
        services.AddScoped<CircuitHandler, Services.Circuits.CircuitHandlerProxy>();
        services.AddXaf(Configuration, builder => {
            builder.UseApplication<MainDemoBlazorApplication>();

            builder.AddXafWebApi(webApiBuilder => {
                webApiBuilder.ConfigureOptions(options => {
                    options.BusinessObject<ApplicationUser>();
                    options.BusinessObject<Department>();
                    options.BusinessObject<Employee>();
                    options.BusinessObject<Location>();
                    options.BusinessObject<Paycheck>();
                    options.BusinessObject<PortfolioFileData>();
                    options.BusinessObject<Position>();
                    options.BusinessObject<Resume>();
                    options.BusinessObject<DemoTask>();

                    options.BusinessObject<CustomNonPersistentObject>();

                    options.ConfigureBusinessObjectActionEndpoints(options => {
                        options.EnableActionEndpoints = true;
                    });
                });
            });

            builder.Modules
                .AddAuditTrailEFCore()
                .AddConditionalAppearance()
                .AddFileAttachments()
                .AddOffice()
                .AddReports(options => {
                    options.EnableInplaceReports = true;
                    options.ReportDataType = typeof(DevExpress.Persistent.BaseImpl.EF.ReportDataV2);
                    options.ReportStoreMode = DevExpress.ExpressApp.ReportsV2.ReportStoreModes.XML;
                })
                .AddValidation(options => {
                    options.AllowValidationDetailsAccess = false;
                })
                .AddScheduler()
                .AddNotifications()
                .AddMainDemoModule()
                .Add<MainDemoBlazorModule>();

            builder.ObjectSpaceProviders
                .AddSecuredEFCore(o => o.PreFetchReferenceProperties())
                    .WithAuditedDbContext(contexts => {
                        contexts.Configure<MainDemoDbContext, AuditingDbContext>(
                            (serviceProvider, businessObjectDbContextOptions) => {

                                businessObjectDbContextOptions.UseInMemoryDatabase("InMemory");


                                string connectionString = GetConnectionString(Configuration);
                                //bool isSqlServerAccessible = DemoDbEngineDetectorHelper.IsSqlServerAccessible();
                                //ArgumentNullException.ThrowIfNull(connectionString);

                                //if(isSqlServerAccessible) {
                                //    businessObjectDbContextOptions.UseSqlServer(connectionString);
                                //}
                                //else {
                                businessObjectDbContextOptions.UseInMemoryDatabase("InMemory");
                                //}
                                businessObjectDbContextOptions.UseLazyLoadingProxies();
                                businessObjectDbContextOptions.UseChangeTrackingProxies();
                                businessObjectDbContextOptions.UseObjectSpaceLinkProxies();
                                businessObjectDbContextOptions.ConfigureWarnings(x => x.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.MultipleCollectionIncludeWarning));
                            },
                            (serviceProvider, auditHistoryDbContextOptions) => {
                                string connectionString = GetConnectionString(Configuration);
                                //bool isSqlServerAccessible = DemoDbEngineDetectorHelper.IsSqlServerAccessible();
                                //ArgumentNullException.ThrowIfNull(connectionString);

                                //if(isSqlServerAccessible) {
                                //    auditHistoryDbContextOptions.UseSqlServer(connectionString);
                                //}
                                //else {
                                auditHistoryDbContextOptions.UseInMemoryDatabase("InMemory");
                                //}
                                auditHistoryDbContextOptions.UseLazyLoadingProxies();
                                auditHistoryDbContextOptions.UseChangeTrackingProxies();
                            });
                    })
                .AddNonPersistent();

            builder.Security
                .UseIntegratedMode(options => {
                    // See the security configuration in the MainDemoModuleExtensions.ConfigureSecurity method.
                })
                .AddPasswordAuthentication((AuthenticationStandardProviderOptions options) => {
                    options.IsSupportChangePassword = true;
                    options.LogonParametersType = typeof(CustomAuthenticationStandardLogonParameters);

                    options.Events.OnFindUser = context => {
                        string userData = ((CustomAuthenticationStandardLogonParameters)context.LogonParameters).Email;
                        ApplicationUser applicationUser = null;
                        if(userData.Contains("@")) {
                            applicationUser = context.ObjectSpace.FirstOrDefault<ApplicationUser>(e => e.Email == userData);
                        } else {
                            applicationUser = context.ObjectSpace.FirstOrDefault<ApplicationUser>(e => e.UserName == userData);
                        }
                        context.User = applicationUser;
                    };
                })
                .AddAuthenticationProvider<CustomAuthenticationProvider>();

            builder.AddBuildStep(application => {
                application.ApplicationName = "MainDemo";
                application.CheckCompatibilityType = DevExpress.ExpressApp.CheckCompatibilityType.DatabaseSchema;
                application.DatabaseVersionMismatch += (s, e) => {
                    e.Updater.Update();
                    e.Handled = true;
                };
                application.LastLogonParametersRead += (s, e) => {
                    if(e.LogonObject is CustomAuthenticationStandardLogonParameters logonParameters && string.IsNullOrEmpty(logonParameters.UserName)) {
                        logonParameters.Email = "Sam@test.com";
                    }
                };
            });
        });

        var authenticationBuilder = services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options => {
                options.LoginPath = "/LoginPage";
            })
            .AddJwtBearer(options => {
                options.TokenValidationParameters = new TokenValidationParameters() {
                    ValidIssuer = Configuration["Authentication:Jwt:ValidIssuer"],
                    ValidAudience = Configuration["Authentication:Jwt:ValidAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Authentication:Jwt:IssuerSigningKey"]))
                };
            });

        services.AddAuthorizationBuilder()
            .SetDefaultPolicy(new AuthorizationPolicyBuilder(
                JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser()
                    .RequireXafAuthentication()
                    .Build());

        services
            .AddControllers()
            .AddOData((options, serviceProvider) => {
                options
                    .EnableQueryFeatures(100)
                    .AddRouteComponents("api/odata", new EdmModelBuilder(serviceProvider).GetEdmModel());
            });

        services.AddSwaggerGen(c => {
            c.EnableAnnotations();
            c.SwaggerDoc("v1", new OpenApiInfo {
                Title = "MainDemo",
                Version = "v1"
            });

            c.AddSecurityDefinition("JWT", new OpenApiSecurityScheme() {
                Type = SecuritySchemeType.Http,
                Name = "Bearer",
                Scheme = "bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header
            });
            c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                        {
                            new OpenApiSecurityScheme() {
                                Reference = new OpenApiReference() {
                                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                                    Id = "JWT"
                                }
                            },
                            new string[0]
                        },
                });
        });

        services.Configure<Microsoft.AspNetCore.Mvc.JsonOptions>(o => {
            o.JsonSerializerOptions.PropertyNamingPolicy = null;
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
        if(env.IsDevelopment()) {
            app.UseDeveloperExceptionPage();

            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MainDemo WebApi v1");
            });
        } else {
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }
        app.UseHttpsRedirection();
        app.UseRequestLocalization();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseXaf();
        app.UseEndpoints(endpoints => {
            endpoints.MapBlazorHub();
            endpoints.MapFallbackToPage("/_Host");
            endpoints.MapControllers();
            endpoints.MapXafEndpoints();
        });
    }

    string GetConnectionString(IConfiguration configuration) {
        string connectionString = null;
        if(configuration.GetConnectionString("ConnectionString") != null) {
            connectionString = configuration.GetConnectionString("ConnectionString");
        }
        return connectionString;
    }
}

