// using System;
// using System.Collections.Generic;
// using System.Net.Http;
// using System.Text.Json;
// using System.Threading.Tasks;
// using System.Web;
// using ContactAPI.Model;
//
// namespace ContactList.Controllers{
//     public class ContactRequest : IContactRequest{
//         public Task<Contact> CreateContact(Contact contact){
//             throw new System.NotImplementedException();
//         }
//
//         public Task<Contact> UpdateContact(Contact contact){
//             throw new System.NotImplementedException();
//         }
//
//         public Task<bool> DeleteContact(int contactId){
//             throw new System.NotImplementedException();
//         }
//
//         public Task<Contact> GetContact(int contactId){
//             throw new System.NotImplementedException();
//         }
//
//         public async Task<List<Contact>> GetAllContact(int contactId){
//             HttpClient client = new HttpClient();
//             HttpResponseMessage responseMessage = await client.GetAsync("https://localhost:5001");
//
//             if (!responseMessage.IsSuccessStatusCode) {
//                 throw new Exception($@"Error: {responseMessage.StatusCode}, {responseMessage.ReasonPhrase}");
//             }
//
//             string result = await responseMessage.Content.ReadAsStringAsync();
//
//             List<Contact> contacts = JsonSerializer.Deserialize<List<Contact>>(result, new JsonSerializerOptions
//             {
//                 PropertyNamingPolicy = JsonNamingPolicy.CamelCase
//             });
//             return contacts;
//         }
//     }
// }