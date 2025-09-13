import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated, SafeAreaView } from "react-native";
import { ChevronDown, Plus } from "lucide-react-native";

import { TABS, FILTER_CHIPS, INITIAL_ITEMS, SELECT_OPTIONS } from "../constants/data";
import usePanResponder from "../hooks/usePanResponder";
import ItemCard from "../components/ItemCard.jsx";
import BottomNav from "../components/BottomNav.jsx";
import SelectSheet from "../components/SelectSheet.jsx";
import { styles } from "../styles/styles.js";

export default function HomeScreen() {
  // UI state
  const [activeTab, setActiveTab] = useState("Items");
  const [activeFilters, setActiveFilters] = useState(["Work"]);
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [bottomTab, setBottomTab] = useState("Home"); // Home | Square | Saved

  // select states (single-select)
  const [selectedType, setSelectedType] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // modal / bottom sheet animation
  const [openSelect, setOpenSelect] = useState(null); // null or "Type" | "Style" | "Mood" | "Color"
  const sheetAnim = useRef(new Animated.Value(0)).current; // 0 closed, 1 open
  const sheetTranslateY = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });
  const backdropAnim = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.55],
  });

  // scrolling physics from previous file
  const scrollY = useRef(new Animated.Value(0)).current;
  const tabIndexAnim = useRef(new Animated.Value(TABS.indexOf(activeTab))).current;
  const bottomIndexAnim = useRef(new Animated.Value(["Home", "Square", "Saved"].indexOf(bottomTab))).current;

  useEffect(() => {
    Animated.spring(tabIndexAnim, {
      toValue: TABS.indexOf(activeTab),
      useNativeDriver: true,
      stiffness: 200,
      damping: 20,
      mass: 0.8,
    }).start();
  }, [activeTab, tabIndexAnim]);

  useEffect(() => {
    Animated.spring(bottomIndexAnim, {
      toValue: ["Home", "Square", "Saved"].indexOf(bottomTab),
      useNativeDriver: true,
      stiffness: 220,
      damping: 22,
      mass: 0.9,
    }).start();
  }, [bottomTab, bottomIndexAnim]);

  useEffect(() => {
    // animate sheet
    if (openSelect) {
      Animated.spring(sheetAnim, { toValue: 1, useNativeDriver: true, stiffness: 220, damping: 22 }).start();
    } else {
      Animated.timing(sheetAnim, { toValue: 0, duration: 220, useNativeDriver: true }).start();
    }
  }, [openSelect, sheetAnim]);

  const { panResponder } = usePanResponder(bottomTab, setBottomTab);

  const toggleFilter = (filterName) => {
    setActiveFilters((prev) => (prev.includes(filterName) ? prev.filter((f) => f !== filterName) : [...prev, filterName]));
  };

  const toggleBookmark = (id) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, isSaved: !item.isSaved } : item)));
  };

  const getDisplayedItems = () => {
    let list = items;
    if (bottomTab === "Home") list = items;
    if (bottomTab === "Square") list = items.slice(0, 6);
    if (bottomTab === "Saved") list = items.filter((i) => i.isSaved);

    if (selectedType) {
      list = list.filter((_, idx) => (selectedType === "Top" ? idx % 2 === 0 : idx % 2 === 1) || selectedType !== "Top");
    }
    return list;
  };

  const tabUnderlineTranslate = tabIndexAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 80, 160],
  });

  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          {TABS.map((tab) => {
            const active = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabButton, active && styles.activeTab]}
                activeOpacity={0.85}
              >
                <Text style={[styles.tabText, active && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* underline */}
        <View style={{ height: 6, marginBottom: 12, marginTop: -18 }}>
          <Animated.View
            style={{
              width: 72,
              height: 1.6,
              backgroundColor: "#111",
              borderRadius: 2,
              transform: [{ translateX: tabUnderlineTranslate }],
            }}
          />
        </View>

        {/* Filters (chips) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          <TouchableOpacity style={styles.addNewBtn} activeOpacity={0.85}>
            <Plus size={16} color="#374151" />
            <Text style={{ marginLeft: 6, color: "#374151" }}>Add new</Text>
          </TouchableOpacity>

          {FILTER_CHIPS.map((chip) => {
            const active = activeFilters.includes(chip.name);
            return (
              <TouchableOpacity
                key={chip.name}
                onPress={() => toggleFilter(chip.name)}
                style={[styles.filterChip, active && styles.filterChipActive]}
                activeOpacity={0.85}
              >
                <Text style={{ marginRight: 4 }}>{chip.icon}</Text>
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{chip.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Dropdown Filters (now interactive) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
          {["Type", "Style", "Mood", "Color"].map((f) => {
            let current = "";
            if (f === "Type") current = selectedType;
            if (f === "Style") current = selectedStyle;
            if (f === "Mood") current = selectedMood;
            if (f === "Color") {
              current = selectedColor ? "" : "";
            }

            const showText = current ? `${f}: ${current}` : f;
            return (
              <TouchableOpacity
                key={f}
                style={styles.dropdownFilter}
                onPress={() => setOpenSelect((prev) => (prev === f ? null : f))}
                activeOpacity={0.85}
              >
                {f === "Color" && selectedColor ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={[styles.miniSwatch, { backgroundColor: selectedColor }]} />
                    <Text style={{ marginLeft: 8, color: "#374151" }}>{f}</Text>
                  </View>
                ) : (
                  <>
                    <Text style={{ color: "#374151", marginRight: 6 }}>{showText}</Text>
                    <ChevronDown size={14} color="#374151" />
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Content Grid */}
      <Animated.FlatList
        data={getDisplayedItems()}
        renderItem={({ item, index }) => <ItemCard item={item} index={index} scrollY={scrollY} toggleBookmark={toggleBookmark} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        bounces={true}
        removeClippedSubviews={true}
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={11}
      />

      {/* Bottom Nav */}
      <BottomNav bottomTab={bottomTab} setBottomTab={setBottomTab} bottomIndexAnim={bottomIndexAnim} />

      {/* Animated Backdrop + Bottom Sheet */}
      {openSelect && <Animated.View pointerEvents="auto" style={[styles.backdrop, { opacity: backdropAnim }]} />}

      <SelectSheet
        openSelect={openSelect}
        setOpenSelect={setOpenSelect}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        sheetTranslateY={sheetTranslateY}
      />
    </SafeAreaView>
  );
}
