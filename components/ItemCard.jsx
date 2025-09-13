import React from "react";
import { View, Text, Image, TouchableOpacity, Animated, Platform } from "react-native";
import { Plus } from "lucide-react-native";
import AnimatedBookmark from "./AnimatedBookmark.jsx";
import { ITEM_CARD_HEIGHT } from "../constants/data";
import { styles } from "../styles/styles";

/**
 * ItemCard props:
 * - item: object
 * - index: index in array
 * - scrollY: Animated.Value
 * - toggleBookmark: fn(id)
 */
export default function ItemCard({ item, index, scrollY, toggleBookmark }) {
  const position = Math.floor(index / 2);
  const itemOffset = position * ITEM_CARD_HEIGHT;
  const inputRange = [itemOffset - ITEM_CARD_HEIGHT * 1.5, itemOffset, itemOffset + ITEM_CARD_HEIGHT * 1.5];

  const translateY = scrollY.interpolate({
    inputRange,
    outputRange: [10, 0, -6],
    extrapolate: "clamp",
  });

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [0.97, 1, 0.995],
    extrapolate: "clamp",
  });

  const opacity = scrollY.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.95],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.card, { transform: [{ translateY }, { scale }], opacity }]}>
      <View style={{ position: "relative" }}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <TouchableOpacity style={styles.bookmarkBtn} onPress={() => toggleBookmark(item.id)} activeOpacity={0.85}>
          <AnimatedBookmark isSaved={item.isSaved} />
        </TouchableOpacity>
        {index % 3 === 2 && (
          <TouchableOpacity style={styles.plusBtn} onPress={() => alert(`Added ${item.name} to collection!`)}>
            <Plus size={16} color="#4B5563" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cardContent}>
        <View style={styles.categoryRow}>
          <Text style={styles.categoryIcon}>{item.categoryIcon}</Text>
          <View style={[styles.categoryTag, { backgroundColor: item.categoryColor }]}>
            <Text style={[styles.categoryText, { color: item.categoryText }]}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
    </Animated.View>
  );
}
