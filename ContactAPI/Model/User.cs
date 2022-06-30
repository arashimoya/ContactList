using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ContactAPI.Model{
    public class User{
        [JsonPropertyName("userId"), Key]
        public string UserId { get; set; }
        [JsonPropertyName("username")]
        [Required]
        public string Username { get; set; }
        [JsonPropertyName("password") ]
        [Required, MinLength(6)]
        public string Password { get; set; }
    }
}