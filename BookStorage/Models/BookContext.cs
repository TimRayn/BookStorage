using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BookStorage.Models
{
    public class BookContext : DbContext
    {
        public DbSet<Book> Books { get; set; }

        public BookContext(DbContextOptions<BookContext> options) : base(options)
        {
            //Database.EnsureCreated();
        }

    }
}
