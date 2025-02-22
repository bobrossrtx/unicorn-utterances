---
{
    title: "How to get started with .NET",
    description: "Did you know that 35% of developers are using .NET? This is a great article to read to get started with .NET.",
    published: '2022-01-18T19:20:19.000Z',
    authors: ['bobrossrtx'],
    tags: ['dotnet', 'c#'],
    attached: [],
    license: 'cc-by-4',
    originalLink: 'https://dev.to/bobrossrtx/how-to-get-started-with-net-50bh'
}
---

I am very new to blogging, so I thought I would write a little bit about myself. I am a software developer, programming since October 2020.
I have worked on a number of projects, ranging from small to large scale, and I have been working on a number of different languages.
The reason I am writing this blog is to share my experiences with the .NET platform, and how you can get started with it too!

I'm not a professional programmer, I just like to write code and learn new things. The approach I took to learning to code was average,
I had been playing with HTML and CSS, then I moved to JavaScript, then I started playing with React. I have learned a lot of things since then,
ranging from Low level programming in C to modern JavaScript, to the latest frameworks like React. I had always struggled to get started with .NET and
C#. It had always felt like a daunting task, mainly because I had never worked with C# before, and the people I have seen using it were amazing.

After I finally decided to learn C#, I was able to get started with it. I was able to write a simple program in Visual Studio, and I was able to
get it to run. I felt a great sense of accomplishment, but also disappointment, I was thinking about how I could have done better, started earlier.
It was no different to learning another language, like Python, JavaScript, or even C. Now I am going to take you through the process of getting started with
.NET.

# How to get started with .NET

First of, we are going to start with something extremely simple. We are going to create a simple Console Application. There is just one small, but important
step we must take before we can start writing code. Now unfortunately, if you use a Linux based system, you will need to install the .NET Core SDK, which can
be tedious. You can download the SDK from the following link: https://www.microsoft.com/net/core

On Windows or MacOS, you can install Visual Studio, which comes with the .NET Core SDK already installed. You can download Visual Studio from the following
link: https://visualstudio.microsoft.com/downloads

This article is directed at windows users, but you can also use Visual Studio on MacOS. If you are using Linux, you will need to use another IDE/Text Editor
and the dotnet CLI. You can download the dotnet CLI from the following link: https://dotnet.microsoft.com/download

# Creating a project

In Visual Studio, you can create a new project by clicking new->project. You can also create a new project by right clicking on the solution explorer, and
then clicking new->project. You will be prompted to select the type of project you want to create, pick the Console Application, and then you will be prompted
to name the project, and choose the location where you want to save it. Once you have created the project, you will be able to start writing code.

You should be greeted with the following code:
```cs
using System;

namespace BoilerPlateConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
```

The code you see above is called boilerplate code. This is code that is automatically generated by Visual Studio when you create a new project. You can
run the project, and it will run the code you see above. The will then see "Hello World!" printed to the console. Good job! You have just created your
first .NET project!

# Writing Code

I know what you are probably thinking, why haven't we written any code yet? Well, the answer is that we haven't needed to. First we need to decide what
we want out code to do. I will show you how to write a small program that will print a list of films. This will include the title, the year, and the director.

We will create a new class called Film, and then we will create a new method called `PrintFilmInfo` which will print the title, year, and director of the film.
We will also create a List of films, and then we will add a few films to the list.

Lets get started with writing code:
```cs
using System;
using System.Collections.Generic;

namespace BoilerPlateConsoleApp
{
    class Film
    {
        public string Title { get; set; }
        public int Year { get; set; }
        public string Director { get; set; }

        public void PrintFilmInfo()
        {
            Console.WriteLine($"Title: {Title}");
            Console.WriteLine($"Year: {Year}");
            Console.WriteLine($"Director: {Director}");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            List<Film> films = new List<Film>();
            films.Add(new Film() { Title = "The Shawshank Redemption", Year = 1994, Director = "Frank Darabont" });
            films.Add(new Film() { Title = "The GodFather Part II", Year = 1974, Director = "Francis Ford Coppola" });
            films.Add(new Film() { Title = "The Dark Night", Year = 2008, Director = "Christopher Nolan" });

            foreach (var film in films)
            {
                film.PrintFilmInfo();
            }
        }
    }
}
```

This is the complete code for the film list. You can run the code to see the output. Might I also mention that I have used the `foreach` loop to print out
the films. This is a very common loop in C#, and it is very easy to use. You can use it to loop through a list of items, and then print out the items.
The `List<Film>` is a data structure that is used to store a list of items. The `Film` class is a class that we created to store information about a film.
Inside of the `Film` class, we have three properties, `Title`, `Year`, and `Director`. Properties are like variables, and they are used to store information.

I'm not going to go into nitty gritty details about what is going on here, as I expect you to be familiar with some of the concepts already. I really recommend
reading up on the C# language, and reading the documentation, at https://docs.microsoft.com/dotnet/csharp to get a better understanding of what is going on here.

I fully understand that dotnet can be a bit confusing at first, but I hope that this article will help you get started with .NET. I hope you enjoyed the article!

# Contact

If you have any questions, comments, or concerns, feel free to contact me at https://www.owenboreham.tech/contact
