# toastify-react-native

[![npm version](https://badge.fury.io/js/toastify-react-native.svg)](https://badge.fury.io/js/toastify-react-native)

🎉 toastify-react-native allows you to add notifications to your react-native app (ios, android) with ease. No more nonsense!

## Demo

## [View examples on snack.expo.io](https://snack.expo.io/@zahidalidev/toastify-react-native)

https://user-images.githubusercontent.com/46484008/190667640-02a77a0c-8aed-4dc9-a1d3-abf9cb5b3c0a.mp4

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
- Dark and light mode 🌒
- And much more !

## Installation

```sh
$ npm install toastify-react-native
```

## A complete example

### App.js

```javascript
import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import ToastManager, { Toast } from 'toastify-react-native'

import Another from './Another'

const App = () => {
  const showToasts = () => {
    Toast.success('Promised is resolved')
  }

  return (
    <View style={styles.container}>
      <ToastManager />
      <Another />
      <TouchableOpacity
        onPress={showToasts}
        style={{
          backgroundColor: 'white',
          borderColor: 'green',
          borderWidth: 1,
          padding: 10,
        }}
      >
        <Text>SHOW SOME AWESOMENESS!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
```

### Another.js

```javascript
import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Toast } from 'toastify-react-native'
const Another = () => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => Toast.info('Lorem ipsum info', 'bottom')}
      style={styles.buttonStyle}
    >
      <Text>SHOW SOME AWESOMENESS!</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: 'white',
    borderColor: 'green',
    borderWidth: 2,
    padding: 10,
  },
})

export default Another
```

For a more complex example take a look at the `/example` directory.

## Available props

| Name                        | Type                               | Default        | Description                                    |
| --------------------------- | ---------------------------------- | -------------- | ---------------------------------------------- |
| width                       | number                             | 256            | Width of toast                                 |
| height                      | number                             | 68             | Height of the toast                            |
| style                       | any                                | null           | Style applied to the toast                     |
| textStyle                   | any                                | null           | Style applied to the toast content             |
| position                    | top, center or bottom              | top            | Position of toast                              |
| positionValue               | number                             | 50             | position value of toast                        |
| duration                    | number                             | 3000           | The display time of toast.                     |
| animationStyle              | upInUpOut, rightInOut or zoomInOut | upInUpOut      | The animation style of toast                   |
| animationIn                 | string or object                   | 'slideInRight' | Toast show animation                           |
| animationOut                | string or object                   | 'slideOutLeft' | Toast hide animation                           |
| animationInTiming           | number                             | 300            | Timing for the Toast show animation (in ms)    |
| animationOutTiming          | number                             | 300            | Timing for the toast hide animation (in ms)    |
| backdropTransitionInTiming  | number                             | 300            | The backdrop show timing (in ms)               |
| backdropTransitionOutTiming | number                             | 300            | The backdrop hide timing (in ms)               |
| hasBackdrop                 | bool                               | false          | Render the backdrop                            |
| backdropColor               | string                             | 'black'        | The backdrop background color                  |
| backdropOpacity             | number                             | 0.2            | The backdrop opacity when the toast is visible |

## Available animations

Take a look at [react-native-animatable](https://github.com/oblador/react-native-animatable) to see the dozens of animations available out-of-the-box.

## Acknowledgements

Pull requests, feedbacks and suggestions are welcome!

## License

toastify-react-native is [MIT licensed](https://github.com/zahidalidev/toastify-react-native/blob/master/LICENSE) and built with :heart: by Zahid Ali.
