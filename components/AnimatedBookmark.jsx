import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Bookmark } from "lucide-react-native";

/**
 * Small animated bookmark used in item card
 * props: isSaved (boolean)
 */
export default function AnimatedBookmark({ isSaved }) {
  const anim = useRef(new Animated.Value(isSaved ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: isSaved ? 1 : 0,
      useNativeDriver: true,
      stiffness: 300,
      damping: 20,
      mass: 0.8,
    }).start();
  }, [isSaved, anim]);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.1] });

  return (
    <Animated.View style={{ transform: [{ scale }], alignItems: "center", justifyContent: "center" }}>
      <Bookmark size={18} color={isSaved ? "#111" : "#6B7280"} fill={isSaved ? "#111" : "transparent"} />
    </Animated.View>
  );
}
