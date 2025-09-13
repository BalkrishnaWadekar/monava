import React from "react";
import { Animated, View, Text, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { SELECT_OPTIONS } from "../constants/data";
import { styles } from "../styles/styles";

/**
 * Props:
 * - openSelect (null | "Type"|"Style"|"Mood"|"Color")
 * - setOpenSelect(fn)
 * - selectedType, setSelectedType
 * - selectedStyle, setSelectedStyle
 * - selectedMood, setSelectedMood
 * - selectedColor, setSelectedColor
 * - sheetTranslateY: Animated interpolation / value for translateY
 */
export default function SelectSheet({
  openSelect,
  setOpenSelect,
  selectedType,
  setSelectedType,
  selectedStyle,
  setSelectedStyle,
  selectedMood,
  setSelectedMood,
  selectedColor,
  setSelectedColor,
  sheetTranslateY,
}) {
  if (!openSelect) return null;

  const handleSelectOption = (category, value) => {
    if (category === "Type") setSelectedType(value);
    if (category === "Style") setSelectedStyle(value);
    if (category === "Mood") setSelectedMood(value);
    if (category === "Color") setSelectedColor(value);
    setTimeout(() => setOpenSelect(null), 120);
  };

  const category = openSelect;
  const options = category === "Color" ? SELECT_OPTIONS.Color : SELECT_OPTIONS[category] || [];

  return (
    <Animated.View style={[styles.sheetContainer, { transform: [{ translateY: sheetTranslateY }] }]}>
      <View style={styles.sheetHandle} />
      <Text style={styles.sheetTitle}>{category}</Text>

      <ScrollView style={styles.sheetList}>
        {category === "Color" ? (
          <View style={styles.colorGrid}>
            {options.map((c) => {
              const isSelected = selectedColor === c.hex || selectedColor === c.name;
              return (
                <Pressable
                  key={c.hex}
                  onPress={() => handleSelectOption("Color", c.hex)}
                  style={({ pressed }) => [
                    styles.colorSwatchWrap,
                    isSelected && { transform: [{ scale: 1.06 }] },
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <View style={[styles.swatch, { backgroundColor: c.hex, borderColor: isSelected ? "#111" : "transparent" }]} />
                  <Text style={styles.colorLabel}>{c.name}</Text>
                  {isSelected && <Text style={styles.check}>✔</Text>}
                </Pressable>
              );
            })}
          </View>
        ) : (
          options.map((opt) => {
            let selected = false;
            if (category === "Type") selected = selectedType === opt;
            if (category === "Style") selected = selectedStyle === opt;
            if (category === "Mood") selected = selectedMood === opt;
            return (
              <Pressable
                accessibilityRole="button"
                key={opt}
                onPress={() => handleSelectOption(category, opt)}
                style={({ pressed }) => [
                  styles.sheetRow,
                  selected && { backgroundColor: "#F3F4F6" },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Text style={[styles.sheetRowText]}>{opt}</Text>
                {selected && <Text style={styles.check}>✔</Text>}
              </Pressable>
            );
          })
        )}
      </ScrollView>

      <View style={{ height: 24 }} />
      <TouchableOpacity style={styles.sheetCloseBtn} onPress={() => setOpenSelect(null)}>
        <Text style={styles.sheetCloseText}>Close</Text>
      </TouchableOpacity>
      <View style={{ height: 24 }} />
    </Animated.View>
  );
}
