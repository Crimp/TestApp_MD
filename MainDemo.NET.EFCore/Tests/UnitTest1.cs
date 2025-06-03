using DevExpress.ExpressApp.WebApi.Services;
using MainDemo.Blazor.Server;
using MainDemo.Module.BusinessObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace Tests {
    public class UnitTest1 : IClassFixture<WebApplicationFactory<Startup>> {
        readonly WebApplicationFactory<Startup> webApplicationFactory;
        public UnitTest1(WebApplicationFactory<Startup> webApplicationFactory) {
            this.webApplicationFactory = webApplicationFactory;
        }

        [Fact]
        public async Task BaseTestAsync() {
            using HttpClient httpClient = webApplicationFactory.CreateClient();
            string tokenString = await GetUserTokenAsync(httpClient, "John", "", "/api/Authentication/Authenticate");
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenString);

            using var response = await httpClient.GetAsync("/api/odata/ApplicationUser");
            response.EnsureSuccessStatusCode();

            var jsonResult = await response.Content.ReadFromJsonAsync<JsonElement>();
            var users = jsonResult.GetProperty("value").Deserialize<ApplicationUser[]>();
            Assert.Single(users!);
            Assert.Equal("John", users![0].UserName);
        }

        [Fact]
        public async Task No_secured_properties_in_response() {
            using HttpClient httpClient = webApplicationFactory.CreateClient();
            string tokenString = await GetUserTokenAsync(httpClient, "John", "", "/api/Authentication/Authenticate");
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenString);

            using var response = await httpClient.GetAsync("/api/odata/ApplicationUser");
            response.EnsureSuccessStatusCode();

            var jsonResult = await response.Content.ReadFromJsonAsync<JsonElement>();
            JsonElement firstItem = jsonResult.GetProperty("value")[0];

            Assert.False(firstItem.TryGetProperty(nameof(ApplicationUser.StoredPassword), out JsonElement storedPasswordElement));
        }

        [Fact]
        public async Task LoadTest() {
            using HttpClient httpClient = webApplicationFactory.CreateClient();
            string tokenString = await GetUserTokenAsync(httpClient, "John", "", "/api/Authentication/Authenticate");
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenString);

            var registeredTypes = webApplicationFactory.Services.GetRequiredService<IOptions<WebApiOptions>>().Value.BusinessObjects;

            var tasks = registeredTypes
                .Concat(registeredTypes)
                .Select(type => Task.Run(async () => {
                    using var response = await httpClient.GetAsync($"/api/odata/{type.Name}");
                    response.EnsureSuccessStatusCode();
                }))
                .ToList();

            await Task.WhenAll(tasks);
        }


        static async Task<string> GetUserTokenAsync(HttpClient httpClient, string userName, string password, string requestPath) {
            var request = new HttpRequestMessage(HttpMethod.Post, requestPath);
            request.Content = new StringContent(
                $"{{ \"Email\": \"{userName}\", \"password\": \"{password}\" }}", Encoding.UTF8, "application/json");

            var httpResponse = await httpClient.SendAsync(request);
            if(!httpResponse.IsSuccessStatusCode) {
                throw new UnauthorizedAccessException($"Authorization request failed! Code {(int)httpResponse.StatusCode}, '{httpResponse.ReasonPhrase}'");
            }
            var tokenString = await httpResponse.Content.ReadAsStringAsync();
            return tokenString;
        }
    }
}
