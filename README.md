# Codetivity
Real-time collaborative web-based code editor.<br>
[Codetivity Website →](https://codetivity.herokuapp.com/)<br>
[Project Writeup →](https://abhathal.github.io/Codetivity)

[![Codetivity](https://github.com/abhathal/Codetivity/raw/master/website_files/images/Screen%20Shot%202017-04-08%20at%2011.25.53%20PM.png)](https://www.youtube.com/watch?v=lhMnN3gKrIo "Codetivity")

## How to Run

#### If you don't have git, install it [here](https://git-scm.com/downloads). 
Now, open your terminal and in a directory of your choice run `git clone https://github.com/abhathal/Codetivity.git`, then change your directory to `Codetivity/`.

#### Next, make sure you have the dependencies installed:
1. Check if you have NodeJS and npm installed by running `npm --version` in your terminal/command line.
    - If you don't have NodeJS and npm installed, follow [this link](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x) to get it on MacOSX, [this link](http://blog.teamtreehouse.com/install-node-js-npm-windows) to get it on Windows, and [this link](http://blog.teamtreehouse.com/install-node-js-npm-linux) to get it on Linux.
    - If you already have them, you can update NodeJS by reading [this link](http://www.hostingadvice.com/how-to/update-node-js-latest-version/) and update npm by reading [this link](https://docs.npmjs.com/getting-started/installing-node).
2. Next, be sure to install all dependencies by running `npm install`. By default, this command will install all modules listed as dependencies in `package.json`.
3. If you run into issues, try installing the dependencies individually by running `npm install <module name>`.

#### Then, run the project:
1. Ensure you're in `Codetivity/` and execute `npm start` command.
2. Open 'localhost:3000' in your browser to view Codetivity

#### How to run on Heroku:
Click this button to set up the project and deploy it to Heroku's servers:<br><br>
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## MVC file structure

- **Model** `/routes/` – Back-end connecting with Firebase
- **View** `/views/` – Rendered expressJS view (what the client-side sees)
- **Controller** `/public/javascripts` – Angular javascript code that controls the view
