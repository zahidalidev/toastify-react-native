# Contributing

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

When contributing to this repository, please first discuss the change you wish to make via issue before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## General Guidelines

- Ensure that nothing gets broken. You can use the sample project for that
- Use prettier before committing (`npm run prettier`)
- When solving a bug, please provide the steps to reproduce it (codesandbox is our best friend for that)
- Keep it chill 👌

## Setup

### Pre-requisites
- _Node:_ `>=16.0.0`
- _npm_ or _yarn_

### Install

Clone the repository and create a local branch:

```sh
git clone https://github.com/zahidalidev/toastify-react-native.git
cd toastify-react-native

git checkout -b my-branch
```

Install dependencies:

```sh
npm install
```

## Developing

The library doesn't use a state management library like Redux or MobX to dispatch notifications. Instead, it uses a singleton pattern with refs.

### Testing with the Sample Project

We've included a sample project to help you test your changes in a real React Native environment:

1. First, install the dependencies for the main package:
   ```sh
   npm install
   ```

2. Navigate to the sample project directory:
   ```sh
   cd sample
   ```

3. Install the sample project dependencies:
   ```sh
   npm install
   ```

4. Start the sample project:
   ```sh
   npm start
   ```

5. Use Expo to run the app on your device or simulator:
   ```sh
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

The sample project is set up to use the local version of toastify-react-native, so any changes you make to the library code will be reflected in the sample app (If not try reloading it).

### Project structure

#### Main package

- `/components`: Contains all the toast components
- `/utils`: Helper functions, interfaces, and default configurations
- `/config`: Theme and styling configurations
- `index.ts`: Main entry point for the package

#### Sample project

The sample project in the `/sample` directory lets you test your changes in a real React Native environment. It's a great way to verify that your changes work as expected before submitting a pull request.

## Making Changes

1. Make your changes to the library code
2. Test your changes using the sample project
3. Run prettier to format your code:
   ```sh
   npm run prettier
   ```
4. Commit your changes with a descriptive commit message
5. Push your changes to your fork
6. Submit a pull request

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
