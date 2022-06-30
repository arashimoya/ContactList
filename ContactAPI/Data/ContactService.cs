using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactAPI.Model;
using ContactAPI.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ContactAPI.Data{
    public class ContactService : IContactService{

        private ContactDbContext _context;

        public ContactService(ContactDbContext ctx){
            this._context = ctx;
        }
        public async Task<Contact> AddContactAsync(Contact contact){
            EntityEntry<Contact> newlyAdded = await _context.Contacts.AddAsync(contact);
            await _context.SaveChangesAsync();
            return newlyAdded.Entity;
        }

        public async Task DeleteContactAsync(int contactId){
            var toDelete = await _context.Contacts.FirstOrDefaultAsync(c => c.ContactId == contactId);
            if (toDelete != null) {
                _context.Contacts.Remove(toDelete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Contact> UpdateContactAsync(Contact contact){
            try {
                var toUpdate = await _context.Contacts.FirstAsync(c => c.ContactId == contact.ContactId);
                toUpdate.Category = contact.Category;
                toUpdate.Email = contact.Email;
                toUpdate.Password = contact.Password;
                toUpdate.Subcategory = contact.Subcategory;
                toUpdate.FirstName = contact.FirstName;
                toUpdate.LastName = contact.LastName;
                toUpdate.PhoneNumber = contact.PhoneNumber;
                toUpdate.DateOfBirth = contact.DateOfBirth;
                _context.Update(toUpdate);
                await _context.SaveChangesAsync();
                return toUpdate;
            }
            catch (Exception e) {
                throw new Exception($"Could not update contact with id {contact.ContactId}");
            }
        }

        public async Task<Contact> GetContactAsync(int contactId){
            var contact = await _context.Contacts.FirstOrDefaultAsync(c => c.ContactId == contactId);
            return contact;
        }

        public async Task<List<Contact>> GetContactsAsync(){
            IQueryable<Contact> asQueryable = _context.Contacts.AsQueryable();

            return await asQueryable.ToListAsync();
        }
    }
}