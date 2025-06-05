using DevExpress.ExpressApp;
using DevExpress.ExpressApp.Actions;
using DevExpress.Persistent.Base;
using MainDemo.Module.BusinessObjects;

namespace MainDemo.Module.Controllers;

public class ClearEmployeeTasksListViewController : ObjectViewController<ListView, Employee> {
    private SimpleAction clearTasksAction;
    public ClearEmployeeTasksListViewController() {
        clearTasksAction = new SimpleAction(this, "ClearEmployeesListViewAction", PredefinedCategory.RecordEdit) {
            Caption = "Clear Tasks",
            ConfirmationMessage = "Are you sure you want to clear the Tasks list?",
            ImageName = "Action_Clear"
        };
        clearTasksAction.Execute += ClearTasksAction_Execute;

        TargetViewNesting = Nesting.Root;
    }

    void ClearTasksAction_Execute(Object sender, SimpleActionExecuteEventArgs e) {
        foreach(var selectedItem in View.SelectedObjects) {
            ((Employee)selectedItem).Tasks.Clear();
            ObjectSpace.SetModified(selectedItem);
        }
        ObjectSpace.CommitChanges();
    }
}