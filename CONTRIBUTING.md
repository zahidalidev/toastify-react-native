# Contributing 

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

When contributing to this repository, please first discuss the change you wish to make via issue before making a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

## General Guidelines

- If adding a new feature, write the corresponding test
- Ensure that nothing get broke. You can use the playground for that
- Use prettier before commiting 😭
- When solving a bug, please provide the steps to reproduce it(codesandbox is our best friend for that)
- Tchill 👌

## Setup

### Pre-requisites

- *Node:* `12.20.0`
- *npm*

### Install

Clone the repository and create a local branch:

```sh
git clone https://github.com/zahidalidev/toastify-react-native.git
cd react-toastify

git checkout -b my-branch
```

Install dependencies:

```sh
npm install
```

## Developing

How it works ? The library don't use a state management library like redux or mobx to dispatch the notifications.


```sh
# launch the playground
npm start
```

### Project structure

#### Example dir

The playground let you test your changes, it's like the demo of toastify-react-native. Most of the time you don't need to modify it unless you add new features.

## License
By contributing, you agree that your contributions will be licensed under its MIT License.