# toastify-react-native

[![npm version](https://badge.fury.io/js/toastify-react-native.svg)](https://badge.fury.io/js/toastify-react-native)


🎉 toastify-react-native allows you to add notifications to your react-native app (ios, android) with ease. No more nonsense!

## Demo

## [View examples on snack.expo.io](https://snack.expo.io/@zahidalidev/toastify-react-native)

![20210515_231132](https://user-images.githubusercontent.com/46484008/118374176-1bdb8e80-b5d4-11eb-8ffa-aee7a465a058.gif)


## Features

- Smooth enter/exit animations
- Plain simple and flexible APIs
- Resize itself correctly on device rotation
- Swipeable
- Easy to set up for real, you can make it work in less than 10sec!
- Super easy to customize
- RTL support
- Swipe to close 👌
- Can choose swipe direction
- Super easy to use an animation of your choice. Works well with animate.css for example
- Define behavior per toast
- Pause toast by click on the toast 👁
- Fancy progress bar to display the remaining time
- Possibility to update a toast
- You can control the progress bar a la nprogress 😲
- You can display multiple toast at the same time
- Dark mode 🌒
- And much more !

## Installation
```sh
$ npm install toastify-react-native
```

## A complete example

### App.js
```javascript
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import Another from './app/components/Another';
import ToastManager, { Toast } from 'toastify-react-native';

export default function App() {

  return (
    <View style={styles.container} >
      {/* Toast Manager */}
      <ToastManager />

      {/* another component */}
      <Another />

      {/* Button */}
      <TouchableOpacity onPress={() => Toast.success("This is success message")} style={styles.buttonStyle} >
        <Text>
          SHOW SOME AWESOMENESS !
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    padding: 10
  }
});

```

### another.js
```javascript
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Toast } from 'toastify-react-native';
export default function Another() {

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => Toast.dark("This is dark Message")} style={styles.buttonStyle} >
                <Text>
                    SHOW SOME AWESOMENESS!
                </Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        marginTop: 10,
        backgroundColor: "white",
        borderColor: "green",
        borderWidth: 2,
        padding: 10
    }
});

```

For a more complex example take a look at the `/example` directory.

## Available props

| Name                           | Type             | Default                        | Description                                                                                                                                |
| ------------------------------ | ---------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| width                    | number             | 256                           | Width of toast                          |
| height                    | number             | 68                           | Height of the toast                                                                                                                        |
| style                  | any           | null                        | Style applied to the toast                                                                                                              |
| position                | top, center or bottom           | top                           | Position of toast                                                                                             |
| positionValue     | number           | 50                            | position value of toast                                                                                                           |
| duration    | number           | 3000                            | The display time of toast.                                                                                                           |
| animationStyle                 | rightInLeftOut, rightInOut or fancy             | rightInLeftOut                           | The animation style of toast                                                                                                                |
| animationIn                       | string or object             | 'slideInRight'                   | Toast show animation                                                                                                                          |
| animationOut                   | string or object           | 'slideOutLeft'                           | Toast hide animation                                                                         |
| animationInTiming                    | number           | 300                           | Timing for the Toast show animation (in ms)                                                                          |
| animationOutTiming                      | number             | 300                   | Timing for the toast hide animation (in ms)                                                                                                                            |
| backdropTransitionInTiming              | number             | 300                     | The backdrop show timing (in ms)                                                                                             |
| backdropTransitionOutTiming                | number             | 300                     | The backdrop hide timing (in ms)                                                                                                        |
| hasBackdrop                | bool             | false                     | Render the backdrop                                                                                              |
| backdropColor                    | string             | 'black'                     | The backdrop background color                                                                                                 |
| backdropOpacity                | number             | 0.5                     | The backdrop opacity when the toast is visible                                                                                              |
| 

## Available animations

Take a look at [react-native-animatable](https://github.com/oblador/react-native-animatable) to see the dozens of animations available out-of-the-box.
## Acknowledgements
Pull requests, feedbacks and suggestions are welcome!

## License

toastify-react-native is [MIT licensed](https://github.com/zahidalidev/toastify-react-native/blob/master/LICENSE) and built with :heart: by Zahid Ali.
