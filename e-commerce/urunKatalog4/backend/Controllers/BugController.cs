using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace urunKatalog4.Controllers
{
    public class BugController:BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
          return NotFound();
        }
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
          return BadRequest(new ProblemDetails{Title="this is a bad request"});
        }
        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
          return Unauthorized();
        }
        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
          ModelState.AddModelError("problem1","this is the first error");
          ModelState.AddModelError("problem2","this is the second error");
          return ValidationProblem();

        }
         [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
          throw new Exception("this is a server error");
        }

    }
    
}