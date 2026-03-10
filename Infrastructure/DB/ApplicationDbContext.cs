using System;
using System.Collections.Generic;
using System.Text;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;



public class ApplicationDbContext : DbContext
    {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
    {

    }

    }

