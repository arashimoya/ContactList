using System;
using System.Threading.Tasks;
using ContactAPI.Data;
using ContactAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace ContactAPI.Controllers{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase{
        private IUserService UserService;

        public UserController(IUserService userService){
            this.UserService = userService;
        }

        [HttpGet]
        [Route("login")]
        public async Task<ActionResult<User>> Login(
            [FromQuery] string userName, [FromQuery] string password){
            try {
                var user = await UserService.Login(userName, password);
                return Ok(user);
            }
            catch (Exception e){
                if (e.Message.Equals("Password does not match")|| e.Message.Equals("Could not find user with this username")) {
                    return StatusCode(201, e.Message);
                }

                Console.WriteLine(e);
                return StatusCode(500, e.Message);
            }
        }
    }
}