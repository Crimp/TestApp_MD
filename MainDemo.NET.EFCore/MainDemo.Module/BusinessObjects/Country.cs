using DevExpress.Persistent.BaseImpl.EF;
using System.Collections.ObjectModel;
using System.ComponentModel;

namespace MainDemo.Module.BusinessObjects;

[DefaultProperty(nameof(Name))]
public class Country : BaseObject {

    public virtual String Name { get; set; }

    public virtual String PhoneCode { get; set; }

    public virtual IList<Address> Addresses { get; set; } = new ObservableCollection<Address>();
}
