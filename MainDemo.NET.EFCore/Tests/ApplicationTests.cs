using DevExpress.ExpressApp;
using DevExpress.ExpressApp.Blazor;
using DevExpress.ExpressApp.Blazor.AmbientContext;
using DevExpress.ExpressApp.Blazor.Services;
using DevExpress.ExpressApp.Model;
using DevExpress.ExpressApp.Security;
using MainDemo.Blazor.Server;
using MainDemo.Module.Authentication;
using MainDemo.Module.BusinessObjects;
using MainDemo.Module.Controllers;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using System.Collections;

namespace Tests;
public class ApplicationTests : IClassFixture<WebApplicationFactory<Startup>> {
    readonly WebApplicationFactory<Startup> webApplicationFactory;
    public ApplicationTests(WebApplicationFactory<Startup> webApplicationFactory) {
        this.webApplicationFactory = webApplicationFactory;
    }

    [Fact]
    public async Task SignInByLogonParameters() {
        await Task.Yield();

        var serviceScopeFactory = webApplicationFactory.Services.GetRequiredService<IServiceScopeFactory>();
        using var scope = serviceScopeFactory.CreateScope();
        var services = scope.ServiceProvider;
        var valueManagerStorageContext = scope.ServiceProvider.GetRequiredService<IValueManagerStorageContext>();
        services.GetRequiredService<IValueManagerStorageContainerInitializer>().Initialize();

        var signInManager = services.GetRequiredService<SignInManager>();
        var logonParameters = new CustomAuthenticationStandardLogonParameters {
            Password = "",
            UserData = "Sam@test.com",
        };
        var result = signInManager.SignInByLogonParameters(logonParameters);
        var errorMessage = result.Succeeded ? "" : result.Error.Message;
        Assert.True(result.Succeeded, $"SignInByLogonParameters failed: {errorMessage}");
    }


    [Fact]
    public async Task ClearEmployeeTasksListViewController_test() {
        await Task.Yield();

        var serviceScopeFactory = webApplicationFactory.Services.GetRequiredService<IServiceScopeFactory>();
        using var scope = serviceScopeFactory.CreateScope();
        var services = scope.ServiceProvider;
        var valueManagerStorageContext = scope.ServiceProvider.GetRequiredService<IValueManagerStorageContext>();
        services.GetRequiredService<IValueManagerStorageContainerInitializer>().Initialize();

        var signInManager = services.GetRequiredService<SignInManager>();
        var logonParameters = new CustomAuthenticationStandardLogonParameters {
            Password = "",
            UserData = "Sam",
        };
        signInManager.SignInByLogonParameters(logonParameters);

        var appProvider = services.GetRequiredService<IXafApplicationProvider>();
        using var application = appProvider.GetApplication();
        application.CreateMainWindow();
        application.ListViewCreating += delegate (object? sender, ListViewCreatingEventArgs e) {
            IModelListView modelListView = (IModelListView)application.FindModelView(e.ViewID);
            e.View = new ListViewForTest(modelListView, e.CollectionSource, application, e.IsRoot);
        };

        var listView = (ListViewForTest)application.CreateListView(typeof(Employee), true);
        ShowViewParameters viewParams = new ShowViewParameters() { TargetWindow = TargetWindow.Current, CreatedView = listView };
        application.ShowViewStrategy.ShowView(viewParams, new ShowViewSource(application.MainWindow, null));
        var viewShortcutString = listView.CreateShortcut().ToString();
        var window = ((BlazorWindow)application.MainWindow).FindWindowByViewShortcut(viewShortcutString);

        var karl = listView.ObjectSpace.FirstOrDefault<Employee>(x => x.FirstName == "Karl" && x.LastName == "Jablonski");
        var anita = listView.ObjectSpace.FirstOrDefault<Employee>(x => x.FirstName == "Anita" && x.LastName == "Cardle");

        listView.SetSelectedObjects(new[] { karl, anita });
        var controller = window.GetController<ClearEmployeeTasksListViewController>();

        Assert.True(controller.ClearTasksAction.Active);
        Assert.True(controller.ClearTasksAction.Enabled);
        controller.ClearTasksAction.DoExecute();
    }

    public class ListViewForTest : ListView {
        IList _selectedObjects = new List<object>();

        public ListViewForTest() : base() { }
        public ListViewForTest(IModelListView modelListView, CollectionSourceBase collectionSource, XafApplication application, bool isRoot) : base(modelListView, collectionSource, application, isRoot) { }
        protected override void LoadModelCore() { }
        public void SetId(string id) {
            Id = id;
        }
        public override IList SelectedObjects {
            get {
                return _selectedObjects;
            }
        }
        public void SetSelectedObjects(object[] objects) {
            _selectedObjects.Clear();
            foreach(var obj in objects) {
                _selectedObjects.Add(obj);
            }
            OnSelectionChanged();
        }
    }
}

