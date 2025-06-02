using DevExpress.ExpressApp;
using DevExpress.ExpressApp.Actions;
using DevExpress.Persistent.Base;
using MainDemo.Module.BusinessObjects;

namespace MainDemo.Module.Controllers;

public class ClearEmployeeTasksController : ObjectViewController<DetailView, Employee> {
    private SimpleAction clearTasksAction;
    public ClearEmployeeTasksController() {
        clearTasksAction = new SimpleAction(this, "ClearTasksAction", PredefinedCategory.RecordEdit) {
            Caption = "Clear Tasks",
            ConfirmationMessage = "Are you sure you want to clear the Tasks list?",
            ImageName = "Action_Clear"
        };
        clearTasksAction.Execute += ClearTasksAction_Execute;

        TargetViewNesting = Nesting.Root;
    }

    void ClearTasksAction_Execute(Object sender, SimpleActionExecuteEventArgs e) {
        ((Employee)View.CurrentObject).Tasks.Clear();
        ObjectSpace.SetModified(View.CurrentObject);
    }
}
