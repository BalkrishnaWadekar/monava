import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Home, Bookmark } from "lucide-react-native";
import { styles } from "../styles/styles";

/**
 * BottomNav props:
 * - bottomTab (string)
 * - setBottomTab (fn)
 * - bottomIndexAnim (Animated.Value)
 */
export default function BottomNav({ bottomTab, setBottomTab, bottomIndexAnim }) {
  const homeScale = bottomIndexAnim.interpolate({ inputRange: [0, 1, 2], outputRange: [1.18, 0.95, 0.95] });
  const squareScale = bottomIndexAnim.interpolate({ inputRange: [0, 1, 2], outputRange: [0.95, 1.18, 0.95] });
  const savedScale = bottomIndexAnim.interpolate({ inputRange: [0, 1, 2], outputRange: [0.95, 0.95, 1.18] });

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navBtn} onPress={() => setBottomTab("Home")} activeOpacity={0.85}>
        <AnimatedIconView transformScale={homeScale}>
          <Home size={24} color={bottomTab === "Home" ? "#111" : "#6B7280"} />
        </AnimatedIconView>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navBtn} onPress={() => setBottomTab("Square")} activeOpacity={0.85}>
        <AnimatedIconView transformScale={squareScale}>
          <View style={[styles.squareBox, bottomTab === "Square" && { backgroundColor: "#111" }]} />
        </AnimatedIconView>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navBtn} onPress={() => setBottomTab("Saved")} activeOpacity={0.85}>
        <AnimatedIconView transformScale={savedScale}>
          <Bookmark size={24} color={bottomTab === "Saved" ? "#EF4444" : "#6B7280"} fill={bottomTab === "Saved" ? "#EF4444" : "transparent"} />
        </AnimatedIconView>
      </TouchableOpacity>
    </View>
  );
}

// small helper = avoid extra import in parent file
import { Animated } from "react-native";
function AnimatedIconView({ children, transformScale }) {
  return <Animated.View style={{ transform: [{ scale: transformScale }] }}>{children}</Animated.View>;
}
