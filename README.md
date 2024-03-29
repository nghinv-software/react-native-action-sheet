
# @nghinv/react-native-action-sheet

A custom alert component with react-native-reanimated

---


[![Version][version-badge]][package]
[![MIT License][license-badge]][license]
[![All Contributors][all-contributors-badge]][all-contributors]

<img src="./assets/example.gif" height="600"/>

# Installation

## Installing the package

* Use yarn

```sh
yarn add @nghinv/react-native-action-sheet
```

* Use npm

```sh
npm install @nghinv/react-native-action-sheet
```

```sh
yarn add react-native-gesture-handler react-native-reanimated react-native-safe-area-context @nghinv/react-native-icons
```

* Peer dependencies 
	- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)
	- [@nghinv/react-native-icons](https://github.com/nghinv-software/react-native-icons)

# How to use

1. Wrapper `ActionSheetService` in the `Root Component`

```javascript
  import { ActionSheetService } from '@nghinv/react-native-action-sheet';

  ...
  return (
    <ActionSheetService>
      <RootComponent />
    </ActionSheetService>
  );
  ...
```

2. Use `ActionSheet.show()` and `ActionSheet.hide()`

```javascript
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { ActionSheet } from '@nghinv/react-native-action-sheet';

export default function Example() {
  const onPress = () => {
    ActionSheet.show({
      title: 'React Native Debug Menu',
      message: 'Running JSI (<JSCRuntime@0x6000003a3ad50>)',
      bottomTitle: 'Cancel',
      zIndex: 10,
      options: [
        {
          title: 'Hello',
          autoDismiss: false,
          onPress: () => {},
        },
        {
          title: 'Good morning',
          leftIconName: 'photo',
          checked: true,
          renderRight: () => (
            <View
              style={{
                width: 40, height: 40, backgroundColor: 'red'
              }}
            />
          ),
        },
        { title: 'Good afternoon', checked: true },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Button title='Show action sheet' onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue'
  }
});
```

---
## Credits

- [@Nghi-NV](https://github.com/Nghi-NV)

[version-badge]: https://img.shields.io/npm/v/@nghinv/react-native-action-sheet.svg?style=flat-square
[package]: https://www.npmjs.com/package/@nghinv/react-native-action-sheet
[license-badge]: https://img.shields.io/npm/l/@nghinv/react-native-action-sheet.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[all-contributors-badge]: https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square
[all-contributors]: #contributors