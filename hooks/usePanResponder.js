import { useRef } from "react";
import { Animated, PanResponder } from "react-native";

/**
 * bottomTab: current bottomTab string ("Home"|"Square"|"Saved")
 * setBottomTab: function to change bottomTab
 * returns panResponder (object) and panX animated value
 */
export default function usePanResponder(bottomTab, setBottomTab) {
  const panX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy);
      },
      onPanResponderGrant: () => panX.setValue(0),
      onPanResponderMove: Animated.event([null, { dx: panX }], { useNativeDriver: false }),
      onPanResponderRelease: (_, { dx, vx }) => {
        const threshold = 60;
        if (dx < -threshold || (dx < 0 && vx < -0.5)) {
          setBottomTab((prev) => (prev === "Home" ? "Square" : prev === "Square" ? "Saved" : "Saved"));
        } else if (dx > threshold || (dx > 0 && vx > 0.5)) {
          setBottomTab((prev) => (prev === "Saved" ? "Square" : prev === "Square" ? "Home" : "Home"));
        } else {
          Animated.spring(panX, { toValue: 0, useNativeDriver: false, stiffness: 200, damping: 20 }).start();
        }
        Animated.timing(panX, { toValue: 0, duration: 200, useNativeDriver: false }).start();
      },
    })
  ).current;

  return { panResponder, panX };
}
