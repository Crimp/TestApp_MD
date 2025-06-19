using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DevExpress.ExpressApp.Security;

namespace MainDemo.Module.Authentication {
    public class CustomAuthenticationStandardLogonParameters : AuthenticationStandardLogonParameters {
        string _userData;

        public CustomAuthenticationStandardLogonParameters() { }
        public CustomAuthenticationStandardLogonParameters(string userName, string password) : base(userName, password) { }
        public string UserData {
            get { return _userData; }
            set { _userData = value; RaisePropertyChanged("UserData"); }
        }
    }
}
