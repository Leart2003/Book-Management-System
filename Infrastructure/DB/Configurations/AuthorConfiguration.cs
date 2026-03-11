using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.DB.Configurations
{
    public class AuthorConfiguration : IEntityTypeConfiguration<Author>
    {
        public void Configure(EntityTypeBuilder<Author> builder)
        {
            {
                builder.HasKey(a => a.Id);

                builder.Property(a => a.FirstName)
                .IsRequired()
                .HasMaxLength(100);


                builder.Property(a => a.LastName)
                .IsRequired()
               .HasMaxLength(100);


                builder.Property(a => a.Bio)
                    .HasMaxLength(500);


            }

        }
    }
}
