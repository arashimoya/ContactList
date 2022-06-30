using System.Collections;
using System.Collections.Generic;
using System.Web.Http;
using ContactAPI.Model;

namespace ContactList.Controllers{
    public class ContactController : ApiController{
        public IList<Contact> GetAllContacts(int id){
            return new List<Contact>
            {
                new Contact
                {
                    FirstName = "Adam",
                    LastName = "Arasimowicz",
                    Email = "arasimowicz.adam@hotmail.com",
                    PhoneNumber = "+4531833025",
                },
                new Contact
                {
                    FirstName = "Jan Pawel",
                    LastName = "Drugi",
                    Email = "ojciec.swiety2137@vatican.org"
                },
                new Contact
                {
                    FirstName = "Mariano",
                    LastName = "Italiano"
                },
            };
        }
        
    }
}