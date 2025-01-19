# Cross-Tabs Countdown
A small JS script that creates a countdown which works cross browser tabs.
The library uses the [Browser API localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). And handles localStorage modification by recounting down the time left.
I needed it to countdown the session timeout.

## Options
| Part Type | Required | Type     | Description                | Default     |
| :-------- | :------- | :------- | :------------------------- | :------- |
| `name` | optional | string | Set a name to the countdown, to be used when debug is set to true. |
| `debug` | optional | boolean  | Mustache object. | `false`
| `duration` | optional | integer  | The seconds that the countdown will begin from. | `900`
| `sessionLocalStorageName` | optional | string  | The name for the local storage. Has to be set to differentiate between countdowns, if there's many. | `sessionStart`
| `onStart` | optional | string  | An event to be fired when the countdown starts. | 
| `onFinish` | optional | string  | An event to be fired when the countdown finishes. | 

## Example
```JavaScript
var expireCounter = new CrossTabsCountdown({
    duration: 600,
    onFinish: function () {
        window.alert('Session has expired');
    }
});

expireCounter.start();
```
    