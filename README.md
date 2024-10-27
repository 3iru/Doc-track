# DocTrack

DocTrack is a simple minimalistic system that keeps track of documents given out and returned. It helps people manage their documents easily.

![DocTrack Logo](https://i.imgur.com/uvMV31m.png)

## Features

- User authentication with NextAuth.js
- Document creation and tracking
- Real-time status updates
- Search functionality for documents and employees
- Responsive design for desktop and mobile use

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/3iru/Doc-track.git
   cd Doc-track
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   DATABASE_URL="your_database_url_here"
   NEXTAUTH_SECRET="your_nextauth_secret_here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up Prisma:
   ```
   npx prisma migrate dev
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building web applications
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [PostgreSQL](https://www.postgresql.org/) - Powerful, open source object-relational database system
- [v0.dev](https://v0.dev/) - AI-powered UI design and component generation tool


## Future Enhancements

While DocTrack serves its current purpose, there are a few areas considering for future improvements:

1. Collaborative Tracking
2. UI Improvements
3. Additional Features

## Learning Project

This project was created as a hobby to learn and practice modern web development technologies. It's not intended for production use but serves as a great starting point for understanding how to build full-stack applications with Next.js, Prisma, and NextAuth.js.

Feel free to explore, modify, and build upon this project for your own learning purposes!


