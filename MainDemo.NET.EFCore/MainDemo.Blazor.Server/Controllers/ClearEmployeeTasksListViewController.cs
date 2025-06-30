using DevExpress.ExpressApp;
using DevExpress.ExpressApp.Actions;
using DevExpress.Persistent.Base;
using MainDemo.Module.BusinessObjects;

namespace MainDemo.Module.Controllers;

public class ClearEmployeeTasksListViewController : ObjectViewController<ListView, Employee> {
    private SimpleAction clearTasksAction;
    public ClearEmployeeTasksListViewController() {
        clearTasksAction = new SimpleAction(this, "ClearEmployeesListViewAction", PredefinedCategory.RecordEdit) {
            Caption = "Unlink all not 'InProgress' Tasks",
            ConfirmationMessage = "Are you sure you want to unlink all not in progress tasks?",
            ImageName = "Action_Clear"
        };
        clearTasksAction.Execute += ClearTasksAction_Execute;

        TargetViewNesting = Nesting.Root;
    }

    void ClearTasksAction_Execute(Object sender, SimpleActionExecuteEventArgs e) {
        foreach(var selectedItem in View.SelectedObjects) {
            var tasks = ((Employee)selectedItem).Tasks;
            while(tasks.Count > 0) {
                tasks.RemoveAt(tasks.Count - 1);
            }
            ObjectSpace.SetModified(selectedItem);
        }
        ObjectSpace.CommitChanges();
    }

    protected override void UpdateActionActivity(ActionBase action) {
        base.UpdateActionActivity(action);
    }

    protected override void OnActivated() {
        base.OnActivated();
        View.SelectionChanged += View_SelectionChanged;
    }
    protected override void OnDeactivated() {
        base.OnDeactivated();
        View.SelectionChanged -= View_SelectionChanged;
    }

    const string InProgressTasksKey = "Has 'InProgress' tasks";
    private void View_SelectionChanged(object sender, EventArgs e) {
        int taskCount = 0;
        foreach(var selectedItem in View.SelectedObjects) {
            foreach(var task in ((Employee)selectedItem).Tasks) {
                if(task.Status == BusinessObjects.TaskStatus.InProgress) {
                    clearTasksAction.Enabled.SetItemValue(InProgressTasksKey, false);
                    return;
                }
                taskCount++;
            }
        }
        clearTasksAction.Enabled.RemoveItem(InProgressTasksKey);
        clearTasksAction.ConfirmationMessage = $"Are you sure you want to unlink {taskCount} not in progress tasks?";

    }

    public SimpleAction ClearTasksAction => clearTasksAction;
}