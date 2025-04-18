using Microsoft.AspNetCore.SignalR;
using Models;

namespace Services{
    public class NotificationHub : Hub{
        private static readonly Dictionary<string,HashSet<string>> UserConnections = new();

        public override Task OnConnectedAsync()
        {
            var userId = Context.GetHttpContext()?.Request.Query["userId"].ToString();

            if(!string.IsNullOrEmpty(userId)){
                lock(UserConnections){
                    if(!UserConnections.ContainsKey(userId))
                        UserConnections[userId] = new HashSet<string>();
                    
                    UserConnections[userId].Add(Context.ConnectionId);
                }
            }
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var userId = Context.GetHttpContext()?.Request.Query["userId"].ToString();
            
            if(!string.IsNullOrEmpty(userId)){
                lock(UserConnections){
                    if(UserConnections.TryGetValue(userId,out var connections)){
                        connections.Remove(Context.ConnectionId);
                        if(connections.Count == 0)
                            UserConnections.Remove(userId);
                    }
                }
            }
            
            return base.OnDisconnectedAsync(exception);
        }
        public async Task SendNotification(string userId,string message){

            if(UserConnections.TryGetValue(userId, out var connectionIds)){
                foreach(var conId in connectionIds){
                    await Clients.Client(conId).SendAsync("ReceiveNotification",message);
                }
            }
            
        }
    }
}