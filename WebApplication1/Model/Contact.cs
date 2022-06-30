using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebApplication1.Model{
    public class Contact{
        [JsonPropertyName("contactId"),Key]
        public int ContactId { get; set; } 
        [Required]
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }
        [JsonPropertyName("lastName")]
        public string LastName { get; set; }
        [Required]
        [JsonPropertyName("email")]
        public string Email { get; set; }
        [Required, MinLength(6)]
        [JsonPropertyName("password")]
        public string Password { get; set; }
        [JsonPropertyName("category")]
        public string Category { get; set; }
        [JsonPropertyName("subcategory")]
        public string Subcategory { get; set; }
        [JsonPropertyName("phoneNumber")]
        public string PhoneNumber { get; set; }
        [JsonPropertyName("dateOfBirth")]
        public string DateOfBirth { get; set; }
        [JsonPropertyName("contacts")]
        public List<Contact> Contacts { get; set; }
    } 
}