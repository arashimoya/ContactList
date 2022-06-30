using System.Threading.Tasks;
using ContactAPI.Model;

namespace ContactAPI.Data{
    public interface IUserService{
        Task<User> Login(string username, string password);
    }
}