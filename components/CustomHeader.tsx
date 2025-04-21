import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useRTL } from "../hooks/useRTL";
import { colors } from "../constants/colors";

export const CustomHeaderTitle = ({ title }: { title: string }) => {
  const isRTL = useRTL();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isRTL ? styles.rtlTitle : styles.ltrTitle]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.white,
  },
  ltrTitle: {
    textAlign: "left",
  },
  rtlTitle: {
    textAlign: "right",
  },
});
