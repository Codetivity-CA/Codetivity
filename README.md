# Codetivity
Real-time collaborative web-based code editor 

## How to Run
#### First, make sure you have the dependencies installed
1. If you don't have npm and NodeJS installed:
    - First, check if you have NodeJS and npm installed by running `npm --version` in your terminal.
    - If you don't have NodeJS and npm installed, follow [this link](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x) to get it on MacOSX.
    - Be sure to update your npm to the latest version by running `sudo npm install npm -g`.
2. Once you know you have npm and NodeJS, be sure to install express by running `npm install express`.


1. In your terminal, change your directory to /Codetivity/
2. Execute 'npm start' command.
2. Open 'localhost:3000' in your browser to view Codetivity

## MVC file structure

- **Model** `/routes/` – Back-end connecting with Firebase
- **View** `/views/` – Rendered expressJS view (what the client-side sees)
- **Controller** `/public/javascripts` – Angular javascript code that controls the view

