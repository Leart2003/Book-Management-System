using Application.Services;
using Domain.Entities;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Tests.ApiTest
{


    public class BookControllerTest
    {
        [Fact]
        public async Task Test1()
        {
            var book = new Book { Title = "Clean Code", Price = 20 };

            // Act
            bool isValid = book.Price > 0;

            // Assert
            Assert.True(isValid);
        }
    }
}
