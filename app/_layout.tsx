import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { useTranslation } from "react-i18next";
import { I18nManager, StatusBar } from "react-native";
import { store } from "../store";
import "../i18n";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { colors } from "../constants/colors";
import { CustomHeaderTitle } from "@/components/CustomHeader";
import { useRTL } from "@/hooks/useRTL";

export default function Layout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const { t, i18n } = useTranslation();
  const language = useSelector((state: RootState) => state.language.language);
  const isRTL = useRTL();

  useEffect(() => {
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);
      i18n.changeLanguage(language);
    }
  }, [isRTL, language, i18n]);

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerBackTitle: t("common.back"),
          animation: isRTL ? "slide_from_left" : "slide_from_right",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => (
              <CustomHeaderTitle title={t("postsScreen.title")} />
            ),
          }}
        />
        <Stack.Screen
          name="post/[id]"
          options={{
            title: t("detailsScreen.title"),
          }}
        />
      </Stack>
    </>
  );
}
