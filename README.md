# toastify-react-native

[![npm version](https://badge.fury.io/js/toastify-react-native.svg)](https://badge.fury.io/js/toastify-react-native)

🎉 toastify-react-native allows you to add notifications to your React Native app (iOS, Android) with ease. No more nonsense!

## Demo

https://user-images.githubusercontent.com/46484008/190667640-02a77a0c-8aed-4dc9-a1d3-abf9cb5b3c0a.mp4

## Features

- 🚀 **Simple API**: Easy to use with minimal setup
- 🎨 **Highly customizable**: Customize colors, icons, animations, and more
- 📱 **Responsive**: Adapts to different screen sizes
- 🌓 **Dark & Light mode**: Built-in theme support
- 🔄 **RTL support**: Right-to-left language support
- ⏱️ **Progress bar**: Visual indicator of toast duration
- 🖐️ **Interactive**: Pause on touch, resume on release
- 🧩 **Custom components**: Create your own toast components
- 🔄 **Animation options**: Choose from different animation styles
- 📝 **Multiple lines**: Support for title and description
- 🔍 **TypeScript support**: Full type definitions included
- ✨ **Smooth animations**: Beautiful enter/exit animations
- ⚡ **Quick setup**: Get up and running in less than 10 seconds!
- 🎛️ **Per-toast behavior**: Define different behaviors for each toast
- 📊 **Progress control**: Control the progress bar like nprogress
- 🔧 **Super easy to customize**: Modify every aspect to match your app's design
- 🎭 **And much more!**: Discover all the possibilities!

## Installation

```sh
npm install toastify-react-native
```

### Required Dependencies

This package requires `react-native-vector-icons`:

```sh
npm install react-native-vector-icons
```

Follow the [react-native-vector-icons installation guide](https://github.com/oblador/react-native-vector-icons#installation) to complete the setup for your platform.

## Basic Usage

```jsx
import React from 'react'
import { View, Button } from 'react-native'
import Toast, { Toast as ToastFunc } from 'toastify-react-native'

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title='Show Success Toast'
        onPress={() => {
          ToastFunc.success('Success message!')
        }}
      />

      <Button
        title='Show Error Toast'
        onPress={() => {
          ToastFunc.error('Error message!')
        }}
      />

      <Button
        title='Show Info Toast'
        onPress={() => {
          ToastFunc.info('Info message!')
        }}
      />

      <Button
        title='Show Warning Toast'
        onPress={() => {
          ToastFunc.warn('Warning message!')
        }}
      />

      {/* Toast provider should be at the root level */}
      <Toast />
    </View>
  )
}
```

## Advanced Usage

### Custom Configuration

```jsx
import React from 'react'
import { View, Button, Text } from 'react-native'
import Toast, { Toast as ToastFunc } from 'toastify-react-native'

// Custom toast configuration
const toastConfig = {
  success: (props) => (
    <View style={{ backgroundColor: '#4CAF50', padding: 16, borderRadius: 10 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.text1}</Text>
      {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
    </View>
  ),
  // Override other toast types as needed
}

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title='Show Custom Toast'
        onPress={() => {
          ToastFunc.show({
            type: 'success',
            text1: 'Main message',
            text2: 'Secondary message',
            position: 'bottom',
            visibilityTime: 4000,
            autoHide: true,
            onPress: () => console.log('Toast pressed'),
            onShow: () => console.log('Toast shown'),
            onHide: () => console.log('Toast hidden'),
          })
        }}
      />

      {/* Toast provider with custom config */}
      <Toast config={toastConfig} />
    </View>
  )
}
```

### Toast Positions

```jsx
ToastFunc.success('Top toast', 'top') // default
ToastFunc.error('Center toast', 'center')
ToastFunc.info('Bottom toast', 'bottom')
```

### Customizing Individual Toasts

```jsx
ToastFunc.show({
  type: 'success',
  text1: 'Custom Toast',
  text2: 'With many options',
  position: 'bottom',
  visibilityTime: 5000,
  autoHide: true,
  backgroundColor: '#333',
  textColor: '#fff',
  iconColor: '#4CAF50',
  iconSize: 24,
  progressBarColor: '#4CAF50',
  theme: 'dark',
})
```

## Available Props

### ToastManager Props

| Prop            | Type                          | Default   | Description                                        |
| --------------- | ----------------------------- | --------- | -------------------------------------------------- |
| width           | number \| string \| 'auto'    | '90%'     | Width of the toast                                 |
| height          | number \| string \| 'auto'    | 61        | Height of the toast                                |
| style           | StyleProp<ViewStyle>          | {}        | Custom style for the toast container               |
| textStyle       | StyleProp<TextStyle>          | {}        | Custom style for the toast text                    |
| theme           | 'light' \| 'dark'             | 'light'   | Theme of the toast                                 |
| animationStyle  | 'none' \| 'slide' \| 'fade'   | 'fade'    | Animation style for the toast                      |
| position        | 'top' \| 'center' \| 'bottom' | 'top'     | Position of the toast                              |
| duration        | number                        | 3000      | Duration in ms before the toast disappears         |
| showCloseIcon   | boolean                       | true      | Whether to show the close icon                     |
| showProgressBar | boolean                       | true      | Whether to show the progress bar                   |
| isRTL           | boolean                       | false     | Right-to-left support                              |
| topOffset       | number                        | 40        | Distance from the top when position is 'top'       |
| bottomOffset    | number                        | 40        | Distance from the bottom when position is 'bottom' |
| iconSize        | number                        | 22        | Size of the icon                                   |
| config          | ToastConfig                   | undefined | Custom toast components configuration              |

### Toast.show() Options

| Option           | Type                                                  | Default   | Description                                 |
| ---------------- | ----------------------------------------------------- | --------- | ------------------------------------------- |
| type             | 'success' \| 'error' \| 'info' \| 'warn' \| 'default' | 'default' | Type of toast                               |
| text1            | string                                                | ''        | Main text                                   |
| text2            | string                                                | undefined | Secondary text                              |
| position         | 'top' \| 'center' \| 'bottom'                         | 'top'     | Position of the toast                       |
| visibilityTime   | number                                                | 3000      | Duration in ms before the toast disappears  |
| autoHide         | boolean                                               | true      | Whether the toast should hide automatically |
| onShow           | () => void                                            | undefined | Callback when toast is shown                |
| onHide           | () => void                                            | undefined | Callback when toast is hidden               |
| onPress          | () => void                                            | undefined | Callback when toast is pressed              |
| progressBarColor | string                                                | undefined | Color of the progress bar                   |
| backgroundColor  | string                                                | undefined | Background color of the toast               |
| textColor        | string                                                | undefined | Color of the text                           |
| iconColor        | string                                                | undefined | Color of the icon                           |
| iconSize         | number                                                | undefined | Size of the icon                            |
| theme            | 'light' \| 'dark'                                     | undefined | Theme of the toast                          |

## Custom Components

You can create your own toast components by providing a custom configuration:

```jsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Toast, { Toast as ToastFunc } from 'toastify-react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const CustomToast = ({ text1, text2, hide }) => {
  return (
    <View style={styles.customToast}>
      <Icon name='star' size={24} color='#FFD700' />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1}</Text>
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
      <Icon name='close' size={20} color='#fff' onPress={hide} />
    </View>
  )
}

const styles = StyleSheet.create({
  customToast: {
    width: '90%',
    backgroundColor: '#673AB7',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
})

export default function App() {
  const toastConfig = {
    custom: (props) => <CustomToast {...props} />,
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title='Show Custom Toast'
        onPress={() => {
          ToastFunc.show({
            type: 'custom',
            text1: 'Custom Component',
            text2: 'This is a fully custom toast component!',
          })
        }}
      />

      <Toast config={toastConfig} />
    </View>
  )
}
```

## API Reference

### Toast Functions

- `Toast.show(options)`: Show a toast with custom options
- `Toast.success(message, position?)`: Show a success toast
- `Toast.error(message, position?)`: Show an error toast
- `Toast.info(message, position?)`: Show an info toast
- `Toast.warn(message, position?)`: Show a warning toast
- `Toast.hide()`: Hide the current toast

## Upgrading from v6.x

If you're upgrading from version 6.x, please note the following changes:

- The animation system has been simplified to use React Native's built-in Modal animations
- Some props have been removed or renamed for clarity
- The styling system has been improved for better customization
- Custom components now receive more props for better control

For users of v6.x and below, refer to the [legacy documentation](./README-legacy.md).

## Contributing

Pull requests, feedback, and suggestions are welcome! Feel free to contribute to this project.

## License

toastify-react-native is [MIT licensed](https://github.com/zahidalidev/toastify-react-native/blob/master/LICENSE).
