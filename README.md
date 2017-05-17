# React-native-ncmb

http://mb.cloud.nifty.com/doc/current/rest/common/format.html

Use Nifty mobile backend 's REST API to correspond to React Native

## install
```
yarn add react-native-ncmb
```

## Current function
- [User Registration](http://mb.cloud.nifty.com/doc/current/rest/user/userRegistration.html)
- [user Login](http://mb.cloud.nifty.com/doc/current/rest/user/userLogin.html)
- [User Get](http://mb.cloud.nifty.com/doc/current/rest/user/userGet.html)
- [Password Registration](http://mb.cloud.nifty.com/doc/current/rest/user/passwordRegistration.html)

## Manage instances with Redux Reducer
```
import NCMB from 'react-native-ncmb';

const ncmb = new NCMB({
  applicationkey: 'abcdefghijklmnopqrstuvwxyz',
  clientKey: 'abcdefghijklmnopqrstuvwxyz',
});

export default function () {
  return ncmb;
}

```
