import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useRTL = () => {
  const { i18n } = useTranslation();
  // Memoize the result to prevent recalculation on each render
  return useMemo(() => i18n.language === "ar", [i18n.language]);
};
