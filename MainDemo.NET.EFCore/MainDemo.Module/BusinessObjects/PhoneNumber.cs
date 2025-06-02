using DevExpress.Persistent.BaseImpl.EF;
using System.ComponentModel;

namespace MainDemo.Module.BusinessObjects;

[DefaultProperty(nameof(Number))]
public class PhoneNumber : BaseObject {

    public virtual String Number { get; set; }

    public virtual String PhoneType { get; set; }

    public virtual Employee Employee { get; set; }
}
