import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useGetPostQuery, useGetUserQuery } from "../../api/api";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import { colors } from "../../constants/colors";
import { useRTL } from "../../hooks/useRTL";
import { User } from "../../types";

// User Card Component
const UserCard = ({ user }: { user: User }) => {
  const { t } = useTranslation();
  const isRTL = useRTL();
  const textStyle = isRTL ? styles.rtlText : styles.ltrText;

  return (
    <View style={styles.card}>
      <Text style={[styles.sectionTitle, textStyle]}>
        {t("detailsScreen.author")}
      </Text>
      <View
        style={[
          styles.userInfo,
          isRTL ? styles.userInfoRTL : styles.userInfoLTR,
        ]}
      >
        <View
          style={[
            styles.userAvatar,
            isRTL ? styles.userAvatarRTL : styles.userAvatarLTR,
          ]}
        >
          <Text style={styles.userInitial}>{user.name.charAt(0)}</Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={[styles.userName, textStyle]}>{user.name}</Text>
          <Text style={[styles.userEmail, textStyle]}>{user.email}</Text>
        </View>
      </View>
    </View>
  );
};

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const isRTL = useRTL();
  const postId = typeof id === "string" ? parseInt(id, 10) : -1;

  const {
    data: post,
    isLoading: isLoadingPost,
    isError: isPostError,
    error: postError,
    refetch: refetchPost,
  } = useGetPostQuery(postId, { skip: postId <= 0 });

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isUserError,
    error: userError,
  } = useGetUserQuery(post?.userId || 0, { skip: !post?.userId });

  if (postId <= 0) {
    return <ErrorMessage message={t("detailsScreen.invalidId")} />;
  }

  if (isLoadingPost || isLoadingUser) {
    return <LoadingIndicator message={t("detailsScreen.loading")} />;
  }

  if (isPostError || isUserError) {
    const error = isPostError ? postError : userError;
    const errorMessage =
      error && "status" in error
        ? `Error: ${error.status}`
        : error?.message || t("detailsScreen.error");
    return (
      <ErrorMessage
        message={errorMessage}
        onRetry={isPostError ? refetchPost : undefined}
      />
    );
  }

  if (!post) {
    return <ErrorMessage message={t("detailsScreen.notFound")} />;
  }

  const textStyle = isRTL ? styles.rtlText : styles.ltrText;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={[styles.title, textStyle]}>{post.title}</Text>
        <View style={styles.divider} />
        <Text style={[styles.body, textStyle]}>{post.body}</Text>
      </View>

      {user && <UserCard user={user} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoLTR: {
    flexDirection: "row",
  },
  userInfoRTL: {
    flexDirection: "row-reverse",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  userAvatarLTR: {
    marginRight: 16,
    marginLeft: 0,
  },
  userAvatarRTL: {
    marginLeft: 16,
    marginRight: 0,
  },
  userInitial: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  ltrText: {
    textAlign: "left",
  },
  rtlText: {
    textAlign: "right",
  },
});
