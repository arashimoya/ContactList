using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.DataAccess;
using WebApplication1.Model;

namespace WebApplication1.Controllers{
    public class ContactController : Controller{
        // GET
        public IList<Contact> GetAllContacts(){
            using var context = new ContactDbContext();
            return context.Contacts.ToList();
        }
    }
}