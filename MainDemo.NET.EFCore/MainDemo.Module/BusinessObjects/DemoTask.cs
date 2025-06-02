﻿using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Text.Json.Serialization;
using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.DC;
using DevExpress.ExpressApp.Model;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl.EF;
using DevExpress.Persistent.Validation;

namespace MainDemo.Module.BusinessObjects;

[DefaultClassOptions]
[ModelDefault("Caption", "Task")]
[Appearance("FontColorRed", AppearanceItemType = "ViewItem", TargetItems = "*", Context = "ListView", Criteria = "Status=='Completed'", FontStyle = DevExpress.Drawing.DXFontStyle.Strikeout)]
[RuleCriteria("Task_Status", DefaultContexts.Save, "IIF(Status != 'NotStarted' and Status != 'Deferred', AssignedTo is not null, True)", CustomMessageTemplate = @"The task must have an assignee when its Status is ""In progress"", ""Waiting for someone else"", or ""Completed"".", SkipNullOrEmptyValues = false)]
[RuleCriteria("TaskIsNotStarted", DefaultContexts.Save, "Status != 'NotStarted'", CustomMessageTemplate = "Cannot set the task completed because it's not started.", TargetContextIDs = "MarkCompleted")]
[DefaultProperty(nameof(Subject))]
public class DemoTask : BaseObject {
    public virtual DateTime? DateCompleted { get; set; }

    public virtual String Subject { get; set; }

    [FieldSize(FieldSizeAttribute.Unlimited)]
    public virtual String Description { get; set; }

    public virtual DateTime? DueDate { get; set; }

    public virtual DateTime? StartDate { get; set; }

    public virtual int PercentCompleted { get; set; }

    public virtual Employee AssignedTo { get; set; }

    private TaskStatus status;

    public virtual TaskStatus Status {
        get { return status; }
        set {
            status = value;
            if(isLoaded) {
                if(value == TaskStatus.Completed) {
                    DateCompleted = DateTime.Now;
                }
                else {
                    DateCompleted = null;
                }
            }
        }
    }

    public virtual IList<Employee> Employees { get; set; } = new ObservableCollection<Employee>();

    [Appearance("PriorityBackColorPink", AppearanceItemType = "ViewItem", Criteria = "Priority=2", BackColor = "0xfff0f0")]
    public virtual Priority Priority { get; set; }

    [RuleValueComparison("Task_ActualWorkHours", DefaultContexts.Save, ValueComparisonType.GreaterThanOrEqual, 0)]
    public virtual int ActualWorkHours { get; set; }

    [RuleValueComparison("Task_EstimatedWorkHours", DefaultContexts.Save, ValueComparisonType.GreaterThanOrEqual, 0)]
    public virtual int EstimatedWorkHours { get; set; }

    public override String ToString() {
        return Subject;
    }

    [Action(ToolTip = "Postpone the task to the next day", ImageName = "State_Task_Deferred")]
    public void Postpone() {
        if(DueDate == DateTime.MinValue) {
            DueDate = DateTime.Now;
        }
        DueDate = DueDate + TimeSpan.FromDays(1);
    }

    [Action(ImageName = "State_Task_Completed", SelectionDependencyType = MethodActionSelectionDependencyType.RequireSingleObject)]
    public void MarkCompleted() {
        Status = TaskStatus.Completed;
    }

    private bool isLoaded = false;
    public override void OnLoaded() {
        isLoaded = true;
    }

    #region IXafEntityObject

    public override void OnCreated() {
        Priority = Priority.Normal;
    }

    #endregion
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Priority {
    [ImageName("State_Priority_Low")]
    Low = 0,
    [ImageName("State_Priority_Normal")]
    Normal = 1,
    [ImageName("State_Priority_High")]
    High = 2
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TaskStatus {
    [ImageName("State_Task_NotStarted")]
    NotStarted,
    [ImageName("State_Task_InProgress")]
    InProgress,
    [ImageName("State_Task_WaitingForSomeoneElse")]
    WaitingForSomeoneElse,
    [ImageName("State_Task_Deferred")]
    Deferred,
    [ImageName("State_Task_Completed")]
    Completed
}
