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
https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB&label=REACT

https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB&label=REACT

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

[![HTML5][html5-badge]][html5-url] - Semantically rich HTML
[![CSS3][css3-badge]][css3-url] - Custom CSS with mobile-first workflow
[![BEM][bem-badge]][bem-url] - BEM Naming methodology for better structured CSS
[![JavaScript][js-badge]][js-url] -
[![React][react-badge]][react-url] - JavaScript UI library
[![Next.js][next.js-badge]][next.js-url] - React web framework
[![MongoDB][mongodb-badge]][mongodb-url] - Document-oriented database
[![Mongoose][mongoose-badge]][mongoose-url] - JS Librarymongodb
[![Node.js][node.js-badge]][node.js-url] - Runtime environment
[![Clerk][clerk-badge]][clerk-url] - Authentication and user management
[![Svix][svix-badge]][svix-url] - Webhooks platform
[![Postman][postman-badge]][postman-url] - Endpoint testing
[![Miro][miro-badge]][miro-url] - For intial app design/use-flow sketches
[![Inkscape][inkscape-badge]][inkscape-url] - SVG editing
[![Vercel][vercel-badge]][vercel-url] - Deployment service
[![Atlas][atlas-badge]][atlas-url] - Database hosting

<!--
- [Miro](https://miro.com/) for intial app design/use-flow sketches
- Mobile-first workflow
- Semantic HTML5
- Custom CSS following [BEM Methodology](https://getbem.com/)
- JavaScript
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [MongoDB](https://www.mongodb.com/) - Document database
- [Mongoose](https://mongoosejs.com/) - MongoDB library
- [NodeJS](https://nodejs.org/) - Server environment
- [Clerk](https://clerk.com/) - Authentication and user management
- [Svix](https://www.svix.com/) - Webhooks platform
- [Postman](https://www.postman.com/) - For testing endpoints
- [Inkscape](https://inkscape.org/) for SVG editing
- Server hosted on [Vercel](https://vercel.com/) and database on [MongoDB Atlas](https://www.mongodb.com/atlas/database)
-->

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

<!-- Markdown Links -->

[html5-badge]: https://img.shields.io/badge/html5-white?style=for-the-badge&logo=html5&logoColor=E34F26
[html5-url]: https://html.spec.whatwg.org/
[css3-badge]: https://img.shields.io/badge/css3-white?style=for-the-badge&logo=css3&logoColor=1572B6
[css3-url]: https://www.w3.org/Style/CSS/specs.en.html
[bem-badge]: https://img.shields.io/badge/bem-000000?style=for-the-badge&logo=bem&logoColor=white
[bem-url]: https://getbem.com/
[js-badge]: https://img.shields.io/badge/javascript-2e302c?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[js-url]: https://www.ecma-international.org/publications-and-standards/standards/ecma-262/
[react-badge]: https://img.shields.io/badge/react-23272f?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[next.js-badge]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next.js-url]: https://nextjs.org/
[mongodb-badge]: https://img.shields.io/badge/mongodb-001d29?style=for-the-badge&logo=mongodb&logoColor=47A248
[mongodb-url]: https://www.mongodb.com/
[mongoose-badge]: https://img.shields.io/badge/mongoose-white?style=for-the-badge&logo=mongoose&logoColor=880000
[mongoose-url]: https://mongoosejs.com/
[node.js-badge]: https://img.shields.io/badge/nodedotjs-233056?style=for-the-badge&logo=node.js&logoColor=339933
[node.js-url]: https://nodejs.org/
[mongoose-badge]: https://img.shields.io/badge/mongoose-white?style=for-the-badge&logo=mongoose&logoColor=880000
[mongoose-url]: https://mongoosejs.com/
[clerk-url]: https://clerk.com/
[clerk-badge]: https://img.shields.io/badge/clerk-white?style=for-the-badge&logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjE5LjI4NzIyMiIKICAgaGVpZ2h0PSIyNC4wMDAwOTkiCiAgIHZpZXdCb3g9IjAgMCAxOS4yODcyMjIgMjQuMDAwMDk5IgogICBmaWxsPSJub25lIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcyNyIKICAgc29kaXBvZGk6ZG9jbmFtZT0iY2xlcmstbG9nby5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMi4xICg5YzZkNDFlNDEwLCAyMDIyLTA3LTE0KSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9Im5hbWVkdmlldzI5IgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzAwMDAwMCIKICAgICBib3JkZXJvcGFjaXR5PSIwLjI1IgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCIKICAgICBpbmtzY2FwZTpkZXNrY29sb3I9IiNkMWQxZDEiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjkuODMzMzMzMyIKICAgICBpbmtzY2FwZTpjeD0iMzguNTQyMzczIgogICAgIGlua3NjYXBlOmN5PSIxMi4wNTA4NDciCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjExMjEiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii05IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOSIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzI3IiAvPgogIDxwYXRoCiAgICAgZD0iTSAxOS4xMTYsMy4xNjA4IDE2LjIzNTQsNi4wNDEzNSBDIDE2LjE0NDksNi4xMzE3NyAxNi4wMjY2LDYuMTg5MTggMTUuODk5Niw2LjIwNDM3IDE1Ljc3MjUsNi4yMTk1NiAxNS42NDQxLDYuMTkxNjUgMTUuNTM0OCw2LjEyNTEzIDE0LjQwMTcsNS40NDE1NSAxMy4wOTQ5LDUuMTAwNjMgMTEuNzcyMiw1LjE0MzU0IDEwLjQ0OTUsNS4xODY0NSA5LjE2NzU5LDUuNjExMzQgOC4wODExNCw2LjM2NjkyIDcuNDEyOTUsNi44MzIwMiA2LjgzMjc2LDcuNDEyMjEgNi4zNjc2NSw4LjA4MDQgNS42MTI5Nyw5LjE2NzUxIDUuMTg4NDgsMTAuNDQ5NSA1LjE0NTI0LDExLjc3MjIgNS4xMDIwMSwxMy4wOTQ5IDUuNDQxODcsMTQuNDAxOSA2LjEyMzk1LDE1LjUzNiA2LjE5LDE1LjY0NTEgNi4yMTc2NCwxNS43NzMxIDYuMjAyNDYsMTUuODk5OCA2LjE4NzI4LDE2LjAyNjQgNi4xMzAxNSwxNi4xNDQzIDYuMDQwMTgsMTYuMjM0NyBMIDMuMTU5NjIsMTkuMTE1MiBDIDMuMTAxNjIsMTkuMTczNiAzLjAzMTY4LDE5LjIxODggMi45NTQ1OSwxOS4yNDc2IDIuODc3NTEsMTkuMjc2NSAyLjc5NTExLDE5LjI4ODMgMi43MTMwMiwxOS4yODI0IDIuNjMwOTMsMTkuMjc2NCAyLjU1MTEsMTkuMjUyOCAyLjQ3OSwxOS4yMTMxIDIuNDA2ODksMTkuMTczNCAyLjM0NDIyLDE5LjExODYgMi4yOTUyNywxOS4wNTI0IDAuNzM2NzA0LDE2LjkxMDEgLTAuMDY4NzU4OCwxNC4zMTIxIDAuMDA0NjAyMSwxMS42NjM5IDAuMDc3OTYzLDkuMDE1NjggMS4wMjYwMiw2LjQ2NjI1IDIuNzAwNzksNC40MTM1NCAzLjIxMjA4LDMuNzg1NDkgMy43ODYyMiwzLjIxMTM0IDQuNDE0MjgsMi43MDAwNiA2LjQ2NjgzLDEuMDI1NzQgOS4wMTU4OSwwLjA3Nzk2MjQgMTEuNjYzNywwLjAwNDYwMzMyIDE0LjMxMTUsLTAuMDY4NzU1NyAxNi45MDkxLDAuNzM2NDMyIDE5LjA1MTIsMi4yOTQ1MyBjIDAuMDY2NywwLjA0ODc5IDAuMTIxOSwwLjExMTQ1IDAuMTYxOSwwLjE4MzY1IDAuMDQwMSwwLjA3MjIgMC4wNjQsMC4xNTIyMiAwLjA3MDIsMC4yMzQ1NiAwLjAwNjIsMC4wODIzNCAtMC4wMDU2LDAuMTY1MDQgLTAuMDM0NSwwLjI0MjM5IC0wLjAyODksMC4wNzczNSAtMC4wNzQyLDAuMTQ3NTIgLTAuMTMyOCwwLjIwNTY3IHoiCiAgICAgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzI2NTY4XzIxNDMyNCkiCiAgICAgaWQ9InBhdGgxMiIKICAgICBzdHlsZT0iZmlsbDp1cmwoI3BhaW50MF9saW5lYXJfMjY1NjhfMjE0MzI0KSIgLz4KICA8cGF0aAogICAgIGQ9Im0gMTkuMTEzNSwyMC44Mjg5IC0yLjg4MDYsLTIuODgwNiBjIC0wLjA5MDUsLTAuMDkwNCAtMC4yMDg4LC0wLjE0NzggLTAuMzM1OCwtMC4xNjMgLTAuMTI3LC0wLjAxNTIgLTAuMjU1NSwwLjAxMjcgLTAuMzY0OCwwLjA3OTIgLTEuMDY4NCwwLjY0NDUgLTIuMjkyNSwwLjk4NTIgLTMuNTQwMiwwLjk4NTIgLTEuMjQ3OCwwIC0yLjQ3MTg4LC0wLjM0MDcgLTMuNTQwMjksLTAuOTg1MiAtMC4xMDkyOSwtMC4wNjY1IC0wLjIzNzc1LC0wLjA5NDQgLTAuMzY0OCwtMC4wNzkyIC0wLjEyNzA0LDAuMDE1MiAtMC4yNDUzLDAuMDcyNiAtMC4zMzU4MiwwLjE2MyBsIC0yLjg4MDU2LDIuODgwNiBjIC0wLjA2MDQxLDAuMDU4IC0wLjEwNzMsMC4xMjg3IC0wLjEzNzM0LDAuMjA2OSAtMC4wMzAwNSwwLjA3ODIgLTAuMDQyNTEsMC4xNjIxIC0wLjAzNjUxLDAuMjQ1NyAwLjAwNTk5LDAuMDgzNiAwLjAzMDMsMC4xNjQ4IDAuMDcxMjEsMC4yMzc5IDAuMDQwOSwwLjA3MzIgMC4wOTczOSwwLjEzNjQgMC4xNjU0NywwLjE4NTIgMi4wNTA0NSwxLjQ5MTkgNC41MjA5NiwyLjI5NTUgNy4wNTY3NCwyLjI5NTUgMi41MzU3LDAgNS4wMDYyLC0wLjgwMzYgNy4wNTY3LC0yLjI5NTUgMC4wNjgzLC0wLjA0ODUgMC4xMjUxLC0wLjExMTUgMC4xNjY0LC0wLjE4NDUgMC4wNDEyLC0wLjA3MyAwLjA2NTksLTAuMTU0MSAwLjA3MjMsLTAuMjM3NyAwLjAwNjMsLTAuMDgzNiAtMC4wMDU4LC0wLjE2NzYgLTAuMDM1NSwtMC4yNDU5IC0wLjAyOTgsLTAuMDc4NCAtMC4wNzY0LC0wLjE0OTMgLTAuMTM2NiwtMC4yMDc2IHoiCiAgICAgZmlsbD0iIzFmMDI1NiIKICAgICBpZD0icGF0aDE0IiAvPgogIDxwYXRoCiAgICAgZD0ibSAxMS45OTczLDE1LjQyMjMgYyAxLjg5MjYsMCAzLjQyNywtMS41MzQzIDMuNDI3LC0zLjQyNyAwLC0xLjg5MjYgLTEuNTM0NCwtMy40MjY5NCAtMy40MjcsLTMuNDI2OTQgLTEuODkyNywwIC0zLjQyNjk5LDEuNTM0MzQgLTMuNDI2OTksMy40MjY5NCAwLDEuODkyNyAxLjUzNDI5LDMuNDI3IDMuNDI2OTksMy40MjcgeiIKICAgICBmaWxsPSIjMWYwMjU2IgogICAgIGlkPSJwYXRoMTYiIC8+CiAgPGRlZnMKICAgICBpZD0iZGVmczI1Ij4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9InBhaW50MF9saW5lYXJfMjY1NjhfMjE0MzI0IgogICAgICAgeDE9IjE2LjQwODcwMSIKICAgICAgIHkxPSItMS43NTg4MSIKICAgICAgIHgyPSItNy44ODQ3Mjk5IgogICAgICAgeTI9IjIyLjUzNjUwMSIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3AKICAgICAgICAgc3RvcC1jb2xvcj0iIzE3Q0NGQyIKICAgICAgICAgaWQ9InN0b3AxOCIgLz4KICAgICAgPHN0b3AKICAgICAgICAgb2Zmc2V0PSIwLjUiCiAgICAgICAgIHN0b3AtY29sb3I9IiM1RDMxRkYiCiAgICAgICAgIGlkPSJzdG9wMjAiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgc3RvcC1jb2xvcj0iI0YzNUFGRiIKICAgICAgICAgaWQ9InN0b3AyMiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgo8L3N2Zz4K
[svix-url]: https://www.svix.com/
[svix-badge]: https://img.shields.io/badge/svix-white?style=for-the-badge&logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjAwMCAxOTk5Ljk4NCIKICAgaGVpZ2h0PSI1NDUuODQ0OTciCiAgIHZpZXdCb3g9IjAgMCA1NDUuODQ0MDEgNTQ1Ljg0NDk3IgogICB3aWR0aD0iNTQ1Ljg0Mzk5IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxNiIKICAgc29kaXBvZGk6ZG9jbmFtZT0ic3ZpeC5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMi4xICg5YzZkNDFlNDEwLCAyMDIyLTA3LTE0KSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMjAiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXcxOCIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiMwMDAwMDAiCiAgICAgYm9yZGVyb3BhY2l0eT0iMC4yNSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjZDFkMWQxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjQzMjM1NzE5IgogICAgIGlua3NjYXBlOmN4PSI4NzQuMjc3MTEiCiAgICAgaW5rc2NhcGU6Y3k9IjI3NC4wNzg5NCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTEyMSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTkiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii05IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnMTYiIC8+CiAgPGcKICAgICBjbGlwLXJ1bGU9ImV2ZW5vZGQiCiAgICAgZmlsbC1ydWxlPSJldmVub2RkIgogICAgIGlkPSJnMTQiPgogICAgPGcKICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODAuODg0LC03MjcuMDY5KSIKICAgICAgIGlkPSJnMTAiPgogICAgICA8cGF0aAogICAgICAgICBkPSJtIDM1Ni45OTYsODA3LjUyMSBjIC0yNC43NzksMjQuNzc2IC00MC4xMDQsNTkuMDA4IC00MC4xMDQsOTYuODEyIDAsMzcuODA5IDE1LjMyNSw3Mi4wMzQgNDAuMTA0LDk2LjgwOCA1NS4zNjQsNTUuMzcyIDEwNC4yMjUsMjQuOTggMTM1LjI4NSw1Ni4wNCA5Ljg0LDkuODQyIDE1LjkzMywyMy40NDcgMTUuOTMzLDM4LjQ3NCAwLDE1LjAyMyAtNi4wOTMsMjguNjMyIC0xNS45MzMsMzguNDczIC05Ljg0Myw5Ljg0NSAtMjMuNDUsMTUuOTM2IC0zOC40NzUsMTUuOTM2IC0xMC4wMjEsMCAtMTkuMzc1LC0yLjY4NiAtMjcuMzc3LC03LjM1NCAtMjUuOTc1LC0xNS4xNjEgLTMwLjUxOSwtNDguMDg0IC03MC4zNTMsLTcxLjMzOSAtMjAuMjg1LC0xMS44NDIgLTQzLjg0NiwtMTguNjM3IC02OC45NTQsLTE4LjYzNyAtMzUuMjg5LDAgLTY3LjQ1OSwxMy4zNTUgLTkxLjczNSwzNS4yODIgOS43NzIsMjguNjk3IDI0LjE5LDU1LjI0NiA0Mi4zNTksNzguNzQ5IDIuNzA3LC01LjgzIDYuNDEzLC0xMS4xMDIgMTAuOTAxLC0xNS41ODkgOS44NDEsLTkuODQyIDIzLjQ1LC0xNS45MzYgMzguNDc1LC0xNS45MzYgMTAuMDIxLDAgMTkuMzc1LDIuNjg2IDI3LjM3Niw3LjM1NCA4LjU1Niw0Ljk5NCAxNS41NSwxMS45ODkgMjAuMTkxLDIwLjIwMiAxMi4wNTksMjEuMzM3IDI5LjQyMywzOS4wMjkgNTAuMTYyLDUxLjEzNyAyMC4yODUsMTEuODQyIDQzLjg0NiwxOC42MzcgNjguOTU1LDE4LjYzNyAzNy44MDQsMCA3Mi4wMzYsLTE1LjMyNiA5Ni44MTIsLTQwLjEwNSAyNC43NzUsLTI0Ljc3NSA0MC4xMDQsLTU5LjAwMSA0MC4xMDQsLTk2LjgxIDAsLTM3LjgwMiAtMTUuMzI4LC03Mi4wMzQgLTQwLjEwNCwtOTYuODEgLTU1LjM2NywtNTUuMzY3IC0xMDQuMjI5LC0yNC45ODMgLTEzNS4yODUsLTU2LjAzOCAtOS44NDMsLTkuODQ1IC0xNS45MzUsLTIzLjQ0OCAtMTUuOTM1LC0zOC40NzMgMCwtMTUuMDI1IDYuMDkyLC0yOC42MzIgMTUuOTM1LC0zOC40NzUgOS44MzksLTkuODM5IDIzLjQ0OCwtMTUuOTMzIDM4LjQ3MywtMTUuOTMzIDEwLjAyMSwwIDE5LjM3NiwyLjY4MiAyNy4zNzgsNy4zNTQgMjUuOTczLDE1LjE2MiAzMC41MTcsNDguMDgzIDcwLjM1MSw3MS4zMzkgMjAuMjg0LDExLjg0MiA0My44NDYsMTguNjM1IDY4Ljk1NiwxOC42MzUgMzUuMjg0LDAgNjcuNDU5LC0xMy4zNTIgOTEuNzMzLC0zNS4yOCAtOS43NzIsLTI4LjcgLTI0LjE5LC01NS4yNDcgLTQyLjM1OSwtNzguNzUxIC0yLjcwNSw1LjgzMSAtNi40MTMsMTEuMTAyIC0xMC45MDEsMTUuNTg5IC05Ljg0Myw5Ljg0MyAtMjMuNDQ4LDE1LjkzNSAtMzguNDczLDE1LjkzNSAtMTAuMDIxLDAgLTE5LjM3NSwtMi42ODQgLTI3LjM3OCwtNy4zNTQgLTguNTU2LC00Ljk5NSAtMTUuNTQ4LC0xMS45OSAtMjAuMTksLTIwLjIwMiAtMTIuMDU5LC0yMS4zMzYgLTI5LjQyMiwtMzkuMDI5IC01MC4xNiwtNTEuMTM4IC0yMC4yODUsLTExLjg0MSAtNDMuODQ3LC0xOC42MzQgLTY4Ljk1NiwtMTguNjM0IC0zNy44MSwtMTBlLTQgLTcyLjAzNywxNS4zMjcgLTk2LjgxMSw0MC4xMDIgeiIKICAgICAgICAgZmlsbD0iI2ZmZmZmZiIKICAgICAgICAgaWQ9InBhdGgyIiAvPgogICAgICA8ZwogICAgICAgICBmaWxsPSIjMDE4ZmZhIgogICAgICAgICBpZD0iZzgiPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgZD0ibSA0NTMuODA2LDcyNy4wNjkgYyAtMTUwLjczMSwwIC0yNzIuOTIyLDEyMi4xOTIgLTI3Mi45MjIsMjcyLjkyNCAwLDMwLjc5NyA1LjEsNjAuNDAyIDE0LjUwMyw4OC4wMjEgMjQuMjc2LC0yMS45MjcgNTYuNDQ2LC0zNS4yODIgOTEuNzM1LC0zNS4yODIgMjUuMTA4LDAgNDguNjY5LDYuNzk1IDY4Ljk1NCwxOC42MzcgMzkuODMzLDIzLjI1NSA0NC4zNzcsNTYuMTc4IDcwLjM1Myw3MS4zMzkgOC4wMDIsNC42NjkgMTcuMzU2LDcuMzU0IDI3LjM3Nyw3LjM1NCAxNS4wMjUsMCAyOC42MzIsLTYuMDkxIDM4LjQ3NSwtMTUuOTM2IDkuODQsLTkuODQxIDE1LjkzMywtMjMuNDQ5IDE1LjkzMywtMzguNDczIDAsLTE1LjAyNiAtNi4wOTMsLTI4LjYzMiAtMTUuOTMzLC0zOC40NzQgLTMxLjA2LC0zMS4wNiAtNzkuOTIxLC0wLjY2OCAtMTM1LjI4NSwtNTYuMDQgLTI0Ljc3OSwtMjQuNzczIC00MC4xMDQsLTU4Ljk5OSAtNDAuMTA0LC05Ni44MDggMCwtMzcuODA0IDE1LjMyNSwtNzIuMDM2IDQwLjEwNCwtOTYuODEyIDI0Ljc3NCwtMjQuNzc2IDU5LjAwMSwtNDAuMTA0IDk2LjgxLC00MC4xMDQgMjUuMTA5LDAgNDguNjcxLDYuNzkzIDY4Ljk1NiwxOC42MzQgMjAuNzM4LDEyLjEwOCAzOC4xMDEsMjkuODAyIDUwLjE2LDUxLjEzOCA0LjY0Myw4LjIxMiAxMS42MzQsMTUuMjA4IDIwLjE5LDIwLjIwMiA4LjAwNCw0LjY3IDE3LjM1OCw3LjM1NCAyNy4zNzgsNy4zNTQgMTUuMDI1LDAgMjguNjMsLTYuMDkyIDM4LjQ3MywtMTUuOTM1IDQuNDg4LC00LjQ4OCA4LjE5NiwtOS43NTkgMTAuOTAxLC0xNS41ODkgQyA2MTkuOTUxLDc2OC42NSA1NDEuNzM1LDcyNy4wNjkgNDUzLjgwNiw3MjcuMDY5IFoiCiAgICAgICAgICAgaWQ9InBhdGg0IiAvPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgZD0ibSA1NTAuNjE3LDk5OC44NDQgYyAyNC43NzUsMjQuNzc2IDQwLjEwNCw1OS4wMDggNDAuMTA0LDk2LjgxIDAsMzcuODA5IC0xNS4zMjgsNzIuMDM0IC00MC4xMDQsOTYuODEgLTI0Ljc3NiwyNC43NzkgLTU5LjAwOCw0MC4xMDUgLTk2LjgxMiw0MC4xMDUgLTI1LjEwOCwwIC00OC42NywtNi43OTUgLTY4Ljk1NSwtMTguNjM3IC0yMC43MzgsLTEyLjEwNyAtMzguMTAzLC0yOS44IC01MC4xNjIsLTUxLjEzNyAtNC42NDEsLTguMjEzIC0xMS42MzUsLTE1LjIwOCAtMjAuMTkxLC0yMC4yMDIgLTguMDAyLC00LjY2OSAtMTcuMzU2LC03LjM1NCAtMjcuMzc2LC03LjM1NCAtMTUuMDI1LDAgLTI4LjYzNCw2LjA5NCAtMzguNDc1LDE1LjkzNiAtNC40ODgsNC40ODcgLTguMTk0LDkuNzU5IC0xMC45MDEsMTUuNTg5IDQ5LjkxNiw2NC41NzEgMTI4LjEzMiwxMDYuMTUgMjE2LjA2LDEwNi4xNSAxNTAuNzMyLDAgMjcyLjkyMywtMTIyLjE5IDI3Mi45MjMsLTI3Mi45MjEgMCwtMzAuNzk3IC01LjEwMiwtNjAuNDAzIC0xNC41MDUsLTg4LjAyIC0yNC4yNzQsMjEuOTI4IC01Ni40NDksMzUuMjggLTkxLjczMywzNS4yOCAtMjUuMTA5LDAgLTQ4LjY3MSwtNi43OTMgLTY4Ljk1NiwtMTguNjM1IC0zOS44MzQsLTIzLjI1NyAtNDQuMzc4LC01Ni4xNzggLTcwLjM1MSwtNzEuMzM5IC04LjAwMiwtNC42NzIgLTE3LjM1OCwtNy4zNTQgLTI3LjM3OCwtNy4zNTQgLTE1LjAyNSwwIC0yOC42MzQsNi4wOTQgLTM4LjQ3MywxNS45MzMgLTkuODQzLDkuODQzIC0xNS45MzUsMjMuNDUgLTE1LjkzNSwzOC40NzUgMCwxNS4wMjUgNi4wOTIsMjguNjI4IDE1LjkzNSwzOC40NzMgMzEuMDU2LDMxLjA1NSA3OS45MTgsMC42NzIgMTM1LjI4NSw1Ni4wMzggeiIKICAgICAgICAgICBpZD0icGF0aDYiIC8+CiAgICAgIDwvZz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=
[postman-badge]: https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white
[postman-url]: https://www.postman.com/
[miro-badge]: https://img.shields.io/badge/miro-ffd02f?style=for-the-badge&logo=miro&logoColor=050038
[miro-url]: https://miro.com/
[inkscape-badge]: https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white
[inkscape-url]: https://www.postman.com/
[vercel-badge]: https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white
[vercel-url]: https://vercel.com/
[atlas-badge]: https://img.shields.io/badge/atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[atlas-url]: https://www.mongodb.com/atlas/
