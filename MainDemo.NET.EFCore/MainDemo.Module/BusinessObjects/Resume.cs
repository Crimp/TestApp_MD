using System.Collections.ObjectModel;
using DevExpress.ExpressApp.DC;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl.EF;
using DevExpress.Persistent.Validation;

namespace MainDemo.Module.BusinessObjects;

[DefaultClassOptions]
[ImageName("BO_Resume")]
public class Resume : BaseObject {

    [Aggregated]
    public virtual IList<PortfolioFileData> Portfolio { get; set; } = new ObservableCollection<PortfolioFileData>();

    [RuleRequiredField]
    public virtual Employee Employee { get; set; }

    public virtual FileData File { get; set; }
}

