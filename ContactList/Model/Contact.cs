
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ContactAPI.Model{
    public class Contact{
        public int ContactId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Category { get; set; }
        public string Subcategory { get; set; }
        public string PhoneNumber { get; set; }
        public string DateOfBirth { get; set; }
        public List<Contact> Contacts { get; set; }
    } 
}