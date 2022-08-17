# Contributing guidelines

## Getting started 🚀

-   If it is your first time working on this project, it is recommended to start working on issues labelled `good first issue`.
-   Choose an issue that is Available and claim it in the comment section of the respective issue.
-   Once the maintainer of the repository assigns it to you, you can start working on it.
-   Make sure you keep updating us on your work.
-   Any changes made must be on a new branch created on the local repository. The name must be synonynous to the issue title.
-   Please make sure to follow the [Commit Message Guidelines](/docs/COMMIT_MESSAGE_GUIDELINES.md) when creating commits.
-   If you are new to Open Source, please read the [Basic Commands](https://github.com/firstcontributions/first-contributions) to get started .

---

</br>

## Setup 🛠️

### Step 1

-   Fork this repository by clicking `fork button` on the top right corner of the page.
-   Clone the repository in your local machine by typing

    ```bash
    git clone https://github.com/<your-username>/kodeit-frontend.git
    ```

    in your terminal(for mac/linux) or Git Bash (for windows).

-   Now create a new branch using
    ```bash
    git checkout -b <your-new-branch-name>
    ```

### Step 2

-   Install `nodejs` and `npm` on your local machine. For [windows](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/), [linux](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) and [mac](https://nodesource.com/blog/installing-nodejs-tutorial-mac-os-x/)
-   Navigate to the `kodeit-frontend` directory and run the following command in your terminal(for mac/linux) or Git Bash (for windows):
    ```bash
    npm install
    ```

Now you can start working on the project.

### Step 3

-   Now that we have everything set up, the last thing to do is configure .env. A dummy placeholder file named [.env-dummy](../.env-dummy) is already provided in the root directory.
-   If you are working on some feature that does not require you to do authenticated stuff or doesn't involve sending requests to and from the backend, then you are free to jump to step 4.
-   If that is not the case, you first need to set up the [backend server](https://github.com/KodeIt/kodeit-backend)

### Step 4

-   To start the development server, run the following command in your terminal(for mac/linux) or Git Bash (for windows):
    ```bash
    npm start
    ```
-   You can now access the development server at [http://localhost:3000](http://localhost:3000).

## Pushing the code

Once done, push the code to your local repository

## Create a pull request

Mention the issue # in the title of the pull request.
