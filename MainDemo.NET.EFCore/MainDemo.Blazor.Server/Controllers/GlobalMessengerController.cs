using DevExpress.ExpressApp;
using DevExpress.ExpressApp.Actions;
using MainDemo.Blazor.Server.Services;

namespace MainDemo.Blazor.Server.Controllers {
    public class GlobalMessengerController : WindowController {
        readonly GlobalMessenger messenger;

        public GlobalMessengerController() {
            ParametrizedAction parametrizedAction = new ParametrizedAction(this, "ShowMessage", DevExpress.Persistent.Base.PredefinedCategory.Edit, typeof(string));
            parametrizedAction.Execute += (s, e) => {
                string message = e.ParameterCurrentValue as string;
                if(!string.IsNullOrEmpty(message)) {
                    messenger.AddMessage(message);
                }
            };
        }
        [ActivatorUtilitiesConstructor]
        public GlobalMessengerController(GlobalMessenger messenger) : this() {
            this.messenger = messenger;
        }

        void OnMessageAdded(string message) {
            Application.ShowViewStrategy.ShowMessage(message, InformationType.Success, 5000);
        }

        protected override void OnActivated() {
            base.OnActivated();
            messenger.MessageAdded += OnMessageAdded;
        }
    }
}
