<p align="center">
  <br>
    <img src="./public/readme/educard-logo.svg" width="100"/>
  <br>
</p>

# EduCard

EduCard is a web application that helps teachers develop their students' active recall and spaced repetition habits through the use of flashcards.

As a teacher: Create courses and decks of flashcards and invite students.

As a student: Study the cards and get individual reminders to review them according to your performance.

https://github.com/borjaMarti/educard/assets/86715948/f6d13954-7a0f-4784-90d9-80bc910de2f6

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

The two study methods [proven to be the most effective](https://scholar.google.es/scholar_url?url=https://bibliotecadigital.mineduc.cl/bitstream/handle/20.500.12365/17388/dunloskyimprovinglearning.pdf&hl=en&sa=X&ei=iyMEZd7_CNmDy9YPj-Ki8Ag&scisig=AFWwaeaysE_TSEk3SAVaAbKvAOTU&oi=scholarr) are active recall testing, which consists of actively trying to remember the content we want to memorize, for example, by asking ourselves questions about what we just read, and spaced repetition, done by studying continuously and progressively, as opposed to cramming everything the day before an exam. A very efficient way to combine these techniques is using flashcards. By following a system such as [Leitner's](https://en.wikipedia.org/wiki/Leitner_system), we can determine which cards need a higher frequency of repetition to consolidate, thus flattening the specific [forgetting curve](https://en.wikipedia.org/wiki/Forgetting_curve) of each one without wasting time reviewing the information we've already memorized.

These are the reasons why, for my personal study, I use a flashcards app, [Anki](https://apps.ankiweb.net/). Anki allows users to create their own decks of flashcards, study them, and schedule the cards' next study session following an algorithm based on the difficulty they had recalling. While working as a teacher, I wanted to help my students develop their study habits and techniques through the use of a similar system. While Anki is a very powerful tool, it may prove too complex for younger students. It's also oriented towards personal learning, so it lacks features that allow users to interact with each other in direct ways (you can share decks, but only through exporting/importing files). When thinking about the use of flashcards with students, I felt I needed a more streamlined tool, which was easy to use, and allowed teachers to create and share decks with their students in a non-cumbersome way.

Enter [EduCard](https://educard.es).

![EduCard Homepage](./public/readme/homepage.svg)

EduCard's objective is to give teachers (and students) an easy-to-use tool that allows them to create decks of flashcards that can be easily shared with their students, with the ability to modify them on the fly without their students having to do anything. It serves as an introduction to the methodology of spaced repetition and active recall testing, which if

### Links

- Live Site: [https://educard.es](https://educard.es)
- GitHub Repository: [https://github.com/borjaMarti/educard](https://github.com/borjaMarti/educard)

Note - If you don't want to create a new user to test the application, you can log using the following account:

Email: educardtest@proton.me
Password: edutesting123

## My process

### Built with

- [Miro](https://miro.com/) for web design
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
- [Inkscape](https://inkscape.org/) for SVG editing
- Server hosted on [Vercel](https://vercel.com/) and database on [MongoDB Atlas](https://www.mongodb.com/atlas/database)

### How I did it

[EduCard's Miro board](https://miro.com/app/board/uXjVMEoRV0k=/?share_link_id=891155910537)

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
  color: papayawhip;
}
```

```js
const proudOfThisFunc = () => {
  console.log("🎉");
};
```

### Continued development

Room for improvement:

1- Server response handling
2- Client state vs constant fetches

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

## Author

- [Borja Martí](https://borjamarti.dev)

## Acknowledgments

Thanks to [Leon Noel](https://twitter.com/leonnoel) and the [100Devs](https://leonnoel.com/100devs/) community for helping me get started on this journey!
