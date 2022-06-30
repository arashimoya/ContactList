using System;
using System.Threading.Tasks;
using ContactAPI.Model;
using ContactAPI.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ContactAPI.Data{
    public class UserService : IUserService{

        private ContactDbContext _context;

        public UserService(ContactDbContext ctx){
            this._context = ctx;
        }
        public async Task<User> Login(string username, string password){
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.Equals(username));
            if (user == null) {
                throw new Exception("Could not find user with this username");
            }
            if (!user.Password.Equals(password)) {
                throw new Exception("Password does not match");
            }
            return user;
            
        }
    }
}