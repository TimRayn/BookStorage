using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStorage.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStorage.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class HomeController : ControllerBase
    {
        private BookContext db;

        public HomeController(BookContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> Get()
        {
            return await db.Books.ToListAsync();
        }


        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {
            db.Books.Add(book);
            await db.SaveChangesAsync();
            return Ok(book);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Book>> DeleteBook(int id)
        {
            Book book = db.Books.FirstOrDefault(b => b.BookId == id);
            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            await db.SaveChangesAsync();
            return Ok(book);
        }
    }
}