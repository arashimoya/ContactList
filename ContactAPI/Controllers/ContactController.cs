using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContactAPI.Data;
using ContactAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace ContactAPI.Controllers{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase{
        private IContactService ContactService;

        public ContactController(IContactService contactService){
            this.ContactService = contactService;
        }

        [HttpGet]
        [Route("contacts")]
        public async Task<ActionResult<IList<Contact>>> GetContacts(){
            try {
                IList<Contact> contacts = await ContactService.GetContactsAsync();
                return Ok(contacts);
            }
            catch (Exception e) {
                Console.WriteLine(e);
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<Contact>> GetContact([FromQuery] int id){
            try {
                var contact = await ContactService.GetContactAsync(id);
                return Ok(contact);
            }
            catch (Exception e) {
                Console.WriteLine(e);
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact([FromBody] Contact contact){
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            try {
                var added = await ContactService.AddContactAsync(contact);
                return Created($"/{added.ContactId}", added);
            }
            catch (Exception e) {
                Console.WriteLine(e);
                return StatusCode(500, e.Message);
            }
        }

        [HttpPatch]
        public async Task<ActionResult<Contact>> PatchContact([FromBody] Contact contact){
            Console.WriteLine(contact.PhoneNumber);
            try {
                var updatedContact = await ContactService.UpdateContactAsync(contact);
                return Ok(updatedContact);
            }
            catch (Exception e) {
                Console.WriteLine(e);
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult> DeleteContact([FromRoute] int id){
            try {
                await ContactService.DeleteContactAsync(id);
                return Ok();
            }
            catch (Exception e) {
                Console.WriteLine(e);
                return StatusCode(500, e.Message);
            }
        }
        
    }
}