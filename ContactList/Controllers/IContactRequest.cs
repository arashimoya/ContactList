using System.Collections.Generic;
using System.Threading.Tasks;
using ContactAPI.Model;

namespace ContactList.Controllers{
    public interface IContactRequest{
        Task<Contact> CreateContact(Contact contact);
        Task<Contact> UpdateContact(Contact contact);
        Task<bool> DeleteContact(int contactId);
        Task<Contact> GetContact(int contactId);
        Task<List<Contact>> GetAllContact(int contactId);

    }
}