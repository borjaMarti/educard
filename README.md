<p align="center">
  <br>
    <img src="./public/readme/educard-logo.svg" width="100"/>
  <br>
</p>

# EduCard

EduCard is a web application that helps teachers develop their students' active recall and spaced repetition habits through the use of flashcards.

As a teacher: Create courses and decks of flashcards and share them with your students.

As a student: Study cards and get individual reminders to review them based on your recalling performance.

(Or do both!)

https://github.com/borjaMarti/educard/assets/86715948/09b5c951-99cb-41b0-b125-37d6aaaf6f16

<details>
<summary>Table of contents</summary>

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Features](#features)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [How I did it](#how-i-did-it)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Installation](#installation)
  - [External dependencies](#external-dependencies)
  - [Environment variables](#environment-variables)
  - [Running](#running)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

</details>

## Overview

### The challenge

The two study methods [proven to be the most effective](https://scholar.google.es/scholar_url?url=https://bibliotecadigital.mineduc.cl/bitstream/handle/20.500.12365/17388/dunloskyimprovinglearning.pdf&hl=en&sa=X&ei=iyMEZd7_CNmDy9YPj-Ki8Ag&scisig=AFWwaeaysE_TSEk3SAVaAbKvAOTU&oi=scholarr) are active recall testing, which consists of actively trying to remember the content we want to memorize, for example, by asking ourselves questions about what we just read, and spaced repetition, done by studying continuously and progressively, as opposed to cramming everything the day before an exam. A very efficient way to combine these techniques is using flashcards. By following a system such as [Leitner's](https://en.wikipedia.org/wiki/Leitner_system), we can determine which cards need a higher frequency of repetition to consolidate, thus flattening the specific [forgetting curve](https://en.wikipedia.org/wiki/Forgetting_curve) of each one without wasting time reviewing the information we've already memorized.

(If you want a more in-depth look into the topic, checkout the [Useful resources](#useful-resources) section)

These are the reasons why, for my personal study, I use a flashcards app, [Anki](https://apps.ankiweb.net/). Anki allows users to create their own decks of flashcards, study them, and schedule the cards' next study session following an algorithm based on the difficulty they had recalling. While working as a teacher, I wanted to help my students develop their study habits and techniques through the use of a similar system. While Anki is a very powerful tool, it may prove too complex for younger students. It's also oriented towards personal learning, so it lacks features that allow users to interact with each other in direct ways (you can share decks, but only through exporting/importing files). When thinking about the use of flashcards with students, I felt I needed a more streamlined tool, which was easy to use, and allowed teachers to create and share decks with their students in a non-cumbersome way.

Enter [EduCard](https://educard.es).

![EduCard Homepage](./public/readme/homepage.svg)

EduCard's objective is to give teachers (and students) an easy-to-use tool that allows them to create decks of flashcards that can be easily shared with their students, with the ability to modify them on the fly without their students having to do anything. It serves as an introduction to the methodology of spaced repetition and active recall testing, which if nurtured will serve the students for their life-long learning journeys.

As a teacher, you create courses and populate them with the subjects' flashcards, organized by decks which could represent learning units or discrete topics. Then, you can invite your students to give them access to your collection. The moment they are part of the course, EduCard creates a record for each of the cards and students which keeps track of when the student should review the card to keep it in memory, based on past performance reviewing it.

### Features

🗃️ Create courses, and organize your flashcards into decks<br>
✉️ Invite your students to share the cards with them<br>
📈 Practice active recall efficiently by following a spaced repetition algorithm<br>

### Links

- Live Site: [https://educard.es](https://educard.es)
- GitHub Repository: [https://github.com/borjaMarti/educard](https://github.com/borjaMarti/educard)

Note - If you don't want to create a new user to test the application, you can log using the following account:

Email: **educardtest@proton.me**<br>
Password: **edutesting123**

## My process

### Built with

- [HTML5](https://html.spec.whatwg.org/) - Semantically rich HTML
- [CSS3](https://www.w3.org/Style/CSS/specs.en.html/) - Custom CSS with mobile-first workflow
- [BEM Methodology](https://getbem.com/) - BEM Naming methodology for better structured CSS
- [JavaScript](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React web framework
- [MongoDB](https://www.mongodb.com/) - Document-oriented database
- [Mongoose](https://mongoosejs.com/) - MongoDB library
- [Node.js](https://nodejs.org/) - Runtime environment
- [Clerk](https://clerk.com/) - Authentication and user management
- [Svix](https://www.svix.com/) - Webhooks platform
- [Postman](https://www.postman.com/) - Endpoint testing
- [Miro](https://miro.com/) - For intial app design/use-flow sketches
- [Inkscape](https://inkscape.org/) - SVG editing
- [Vercel](https://vercel.com/) - Deployment service
- [Atlas](https://www.mongodb.com/atlas/database) - Database hosting

### How I did it

When I had a clear idea of what EduCard's purpose would be, I started thinking about which features would be needed for the minimal expression of the idea (that is to say, the Minimal Viable Product). To organize my thinking, I used Miro to make a mock-up of the application and the business logic of the database. You can check it out here, including the iterations I went over for the database structure:

[EduCard's Miro board](https://miro.com/app/board/uXjVMEoRV0k=/?share_link_id=891155910537)

Once I was happy with the design and structure, it was time to code it. I needed data persistence across devices as well as user authentication, which spelled full-stack application. I'd already been working with React for a while and knew it would fit the study part of the application well, so it seemed like a good option. I also needed a web framework to handle the routing. Next.js had just marked its new app directory [as stable](https://nextjs.org/blog/next-13-4), and I was intrigued by the features it offered - specifically, the distinction between client and server components, the way route handlers are structured, and data fetching from server components - so I decided to give it a shot and learn the most current techonolgy.

For persistence, I had experience with MongoDB and Mongoose from previous projects, paired with the option to host the database at Mongo Atlas, I went with those (note that if I had to do it again I might have used a relational database - more info on the [Continued development](#continued-development) section).

Next I had to decide how to go about the user authentication strategy. I had experience using [Passport.js](https://www.passportjs.org/), but that was using the [Express.js](https://expressjs.com/) framework, and, given how recent the new Next.js app router was, I had a hard time finding docs/examples of Passport.js integration. In my search, I came across [Clerk](https://clerk.com/), and looking through their docs I noticed they had already prepared for integration with Next.js's app router before its stable release. It offered all the functionality I needed, and I could connect their database to mine via webhooks through [Svix](https://www.svix.com/), so I went with them.

Now that the stack was decided, I started setting up my backend in Next.js. Next.js uses a [file-system based router](https://nextjs.org/docs/app/building-your-application/routing), which means that folders are used to define routes, and files create the UI for a given route segment. For server-side API endpoints, [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) are used, and they are represented by `route.js` files. The root folder inside the project directory (`app` in my case) acts as the `/` endpoint, and new folders and sub-folders with `route.js` files inside them will represent the given endpoint. Inside `route.js` you write functions to handle each HTTP Request Method. The following is a function example from `app/api/courses` `route.js` (note that the endpoint would then be `domain.url/api/courses`):

```js
// @desc Create new course.
// @route POST /api/courses
export async function POST(req) {
  await dbConnect();
  const { userId } = getAuth(req);
  const data = await req.json();

  try {
    const course = await Course.create({
      ownerId: userId,
      courseName: data.name,
    });

    return NextResponse.json(course);
  } catch (err) {
    console.log(err);
  }
}
```

During the endpoint set-up process, I used [Postman](https://www.postman.com/) to test the functionality.

Finally, with all the backend in place, it was time for the frontend. The client-side routing is also straight-forward with Next.js. Instead of `route.js` files, we use `page.jsx` files to define the UI for a given endpoint and make it publicly accessible. Inside our `page.jsx` files we export the functions just as we would for a React component. By default, all `page.jsx` files are [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components), meaning that are rendered (and cached) on the server, helping with Search Engine Optimization and allowing us to asynchronously fetch our data.

Then, for any components that needed interactivity (or the usage of React's hooks), I created regular React components with a `"use client"` declaration, indicating to Next.js that these were [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components).

### What I learned

Webhooks

Next.js routing

Dialogs

React context provider

### Continued development

Room for improvement:

1- Server response handling
2- Client state vs constant fetches
3- Relational database
4- CSS modularization

### Useful resources

- [MDN Docs](https://developer.mozilla.org/)

So much information about web development and accesibility in one place.

Fun fact: While browsing MDN, I got prompted to complete a survey about my usage (which I did out of gratitude). That ended up in an invitation to participate in a 1 week study of its new AI Helper tool's UI/UX with diary entries and an interview.

- [React Docs](https://react.dev/)

React's official docs are super easy to follow and didactic. Great source of info.

- [Next.js Docs](https://nextjs.org/docs/)

Unfortunately, when I decided to use Next.js 13 with its new App directory, it just had been given the approval from Vercel for production usage, so they still were (might still be) in progress. Nonetheless, they are up there with React's docs in quality.

- [Traversy Media's Next.js 13 Crash Course](https://www.youtube.com/watch?v=Y6KDk5iyrYE)

I'm super grateful for Traversy's channel. His tutorials for web development are well produced and concise. This crash course helped me get started with Next.js in no time.

- [CSS guidelines](https://cssguidelin.es/)

These guidelines helped me improve the way I structure my HTML and CSS.

- [How to Study for Exams - Evidence-based revision tips](https://www.youtube.com/watch?v=ukLnPbIffxE)

- [How to Study for Exams - Spaced Repetition](https://www.youtube.com/watch?v=Z-zNHHpXoMM)

## Installation

If you want to make your own copy of EduCard, you'll first need configure a couple of things.

Start by installing the dependencies:

`npm install`

### External dependencies

EduCard makes use of [MongoDB Atlas](https://www.mongodb.com/atlas/database) for its documents database, and [Clerk](https://clerk.com/) for authentication and user management.

You'll need to create accounts and projects for both. Follow their respective instructions for the project creation part. In the next section, you can find about what you'll need to get from them to set up the app.

### Environment variables

The following configuration is for development builds.

To deploy the project, you'll need to provide these variables to the hosting service's environment.

(Note 1: If you aren't using Vercel, you'll need to change `app/layout.jsx`'s metadata configuration, since it's dependent on the VERCEL_URL env variable provided by Vercel)

(Note 2: For deployment, Clerk needs you to use Production mode, which requires [further configuration](https://clerk.com/docs/deployments/overview))

- Create a `.env.local` file in the main directory and add the following lines:

  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard`
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`
  - `NEXT_PUBLIC_APP_URL="http://localhost:3000"`

    Subsitute 3000 with whatever port you use.

  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""`

    You'll get this value from Clerk.

  - `CLERK_SECRET_KEY=""`

    You'll also get this value from Clerk.

  - `WEBHOOK_SECRET=""`

    You'll get this value enabling an endpoint through the Webhooks menu in Clerk.

    The webhook allows us to synchronize our Mongo database to Clerk's user database.

    The endpoint should point to `(project.url)/api/webhooks/user`.

    `project.url` will be the deploy link, or a proxy if you are using localhost. I recommend using [ngrok](https://ngrok.com/) to set up a proxy for local development.

    For more info on how to configure Clerk Webhooks, visit [this link](https://clerk.com/docs/users/sync-data) (or ask [me](https://github.com/borjaMarti) about it!).

  - `MONGODB_URI=""`
    You'll get this value from MongoDB Atlas when configuring your database through the "Connect using drivers" option.

### Running

And finally, use `npm run dev` to start a local instance!

## Author

- [Borja Martí](https://github.com/borjaMarti)

## Acknowledgments

Thanks to [Leon Noel](https://twitter.com/leonnoel) and the [100Devs](https://leonnoel.com/100devs/) community for helping me get started on this journey!
