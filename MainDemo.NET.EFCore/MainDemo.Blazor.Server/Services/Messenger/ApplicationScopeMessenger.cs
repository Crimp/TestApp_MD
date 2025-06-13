namespace MainDemo.Blazor.Server.Services {
    public class ApplicationScopeMessenger {
        public Action<string> MessageAdded { get; set; }
        private readonly GlobalMessenger globalMessenger;

        public ApplicationScopeMessenger(GlobalMessenger globalMessenger) {
            this.globalMessenger = globalMessenger;
            this.globalMessenger.MessageAdded += OnMessageAdded;
        }
        public void AddMessage(string message) {
            globalMessenger.AddMessage(message);
        }

        void OnMessageAdded(string message) {
            MessageAdded?.Invoke(message);
        }
    }
}
