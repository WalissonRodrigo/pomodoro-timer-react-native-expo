import { vibrate } from "../utils";
import SoundPlayer from "react-native-sound-player";
import { Audio } from "expo-av";

Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  staysActiveInBackground: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  playThroughEarpieceAndroid: false,
});

async function playSound() {
  console.log("Loading Sound");
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/alert.mp3")
  );
  console.log("Playing Sound");
  await sound.playAsync();
}

export default (state, action) => {
  switch (action.type) {
    case "togglePause": {
      return {
        ...state,
        paused: !state.paused,
      };
    }

    case "reset": {
      return {
        ...state,
        paused: true,
        time: state.initialTime,
      };
    }

    case "decrease": {
      const nextTime = state.time - 1;

      if (nextTime === 0) {
        vibrate();
        try {
          setTimeout(async () => {
            await playSound();
          });
        } catch (e) {
          console.log(e);
        }
      } else if (nextTime === -1) {
        return state.breakTime > 0 && state.work === true
          ? { ...state, time: state.breakTime, work: false }
          : { ...state, time: state.initialTime, work: true };
      }

      return {
        ...state,
        time: state.time - 1,
      };
    }

    case "changeInitialTime": {
      const value = action.value > 0 ? action.value : 0;
      return {
        ...state,
        work: true,
        paused: true,
        time: action.value,
        initialTime: action.value,
      };
    }

    case "changeBreak": {
      const value = action.value > 0 ? action.value : 0;
      return {
        ...state,
        paused: true,
        breakTime: value,
        work: true,
      };
    }

    default: {
      return { ...state };
    }
  }
};
