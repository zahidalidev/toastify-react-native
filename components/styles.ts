import { StyleSheet } from 'react-native'

import { SCALE } from '../utils/helpers'

const styles = StyleSheet.create({
  containerRoot: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTop: {
    top: 0,
  },
  containerBottom: {
    bottom: 0,
  },
  mainContainer: {
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hideButton: {
    position: 'absolute',
    top: SCALE(3.2),
    right: SCALE(3.2),
  },
  textStyle: {
    fontSize: SCALE(16),
    fontWeight: '400',
    flex: 1,
    width: 'auto',
    maxWidth: '85%',
  },
  progressBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    height: 4,
    width: '100%',
    bottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconWrapper: {
    marginRight: SCALE(8),
  },
  pressable: {
    width: '100%',
  },
  toastContainer: {
    position: 'absolute',
    zIndex: 9999, // Very high zIndex to ensure it's on top of other elements
    elevation: 9999, // For Android
    left: 0,
    right: 0,
    alignItems: 'center',
  },
})

export default styles
