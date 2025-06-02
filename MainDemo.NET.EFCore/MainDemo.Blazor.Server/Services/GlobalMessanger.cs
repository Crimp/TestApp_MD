namespace MainDemo.Blazor.Server.Services {
    public class GlobalMessenger {
        public Action<string> MessageAdded { get; set; }
        public void AddMessage(string message) {
            MessageAdded?.Invoke(message);
        }
    }
}
