using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContactAPI.Model;

namespace ContactAPI.Data{
    public interface IContactService{
        Task<Contact> AddContactAsync(Contact contact);
        Task DeleteContactAsync(int contactId);
        Task<Contact> UpdateContactAsync(Contact contact);
        Task<Contact> GetContactAsync(int contactId);
        Task<List<Contact>> GetContactsAsync();
    }
}