import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { setLanguage } from "../store/languageSlice";
import { colors } from "../constants/colors";
import { useRTL } from "../hooks/useRTL";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const isRTL = useRTL();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    dispatch(setLanguage(newLanguage));
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.container, isRTL && styles.rtlContainer]}
        onPress={toggleLanguage}
        activeOpacity={0.7}
      >
        <Ionicons name="language" size={20} color={colors.white} />
        <Text style={styles.text}>
          {currentLanguage === "en" ? "العربية" : "English"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingVertical: 12,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  rtlContainer: {
    flexDirection: "row-reverse",
  },
  text: {
    color: colors.white,
    marginHorizontal: 8,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default LanguageSwitcher;
