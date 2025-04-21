import React, { useCallback, useMemo, memo } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useGetPostsQuery } from "../api/api";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";
import { useRouter } from "expo-router";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { colors } from "../constants/colors";
import { Post } from "../types";
import { useRTL } from "../hooks/useRTL";
import { Ionicons } from "@expo/vector-icons";

// PostItem component with premium styling
const PostItem = memo(
  ({ post, onPress }: { post: Post; onPress: (id: number) => void }) => {
    const isRTL = useRTL();
    const { t } = useTranslation();

    // Use useCallback to prevent recreation of the function on each render
    const handlePress = useCallback(() => {
      onPress(post.id);
    }, [post.id, onPress]);

    return (
      <TouchableOpacity
        style={[
          styles.postContainer,
          isRTL ? styles.postContainerRTL : styles.postContainerLTR,
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        {/* decorative element to indicate direction */}
        <View
          style={[
            styles.directionIndicator,
            isRTL ? styles.directionIndicatorRTL : styles.directionIndicatorLTR,
          ]}
        >
          <Ionicons
            name={isRTL ? "chevron-back" : "chevron-forward"}
            size={16}
            color={colors.white}
          />
        </View>

        {/* Post ID Badge */}
        <View
          style={[
            styles.idBadge,
            isRTL ? styles.idBadgeRTL : styles.idBadgeLTR,
          ]}
        >
          <Text style={styles.idText}>{post.id}</Text>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
          {/* Title with direction-aware styling */}
          <Text
            style={[styles.title, isRTL ? styles.titleRTL : styles.titleLTR]}
            numberOfLines={2}
          >
            {post.title}
          </Text>

          {/* Preview of post body */}
          <Text
            style={[
              styles.preview,
              isRTL ? styles.previewRTL : styles.previewLTR,
            ]}
            numberOfLines={1}
          >
            {post.body.substring(0, 60)}...
          </Text>

          {/* Read more button */}
          <View
            style={[
              styles.readMoreContainer,
              isRTL ? styles.readMoreRTL : styles.readMoreLTR,
            ]}
          >
            <Text style={styles.readMoreText}>{t("postsScreen.readMore")}</Text>
            <Ionicons
              name={isRTL ? "arrow-back" : "arrow-forward"}
              size={14}
              color={colors.primary}
              style={styles.readMoreIcon}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

export default function PostsListScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPostsQuery();

  // Memoize the navigation handler
  const handlePostPress = useCallback(
    (id: number) => {
      router.push(`/post/${id}`);
    },
    [router]
  );

  // Memoize the renderItem function
  const renderItem = useCallback<ListRenderItem<Post>>(
    ({ item }) => <PostItem post={item} onPress={handlePostPress} />,
    [handlePostPress]
  );

  // Memoize the keyExtractor
  const keyExtractor = useCallback((item: Post) => item.id.toString(), []);

  // Memoize the header component
  const ListHeader = useMemo(() => <LanguageSwitcher />, []);

  if (isLoading) {
    return <LoadingIndicator message={t("postsScreen.loading")} />;
  }

  if (isError) {
    const errorMessage =
      "status" in error
        ? `Error: ${error.status}`
        : error.message || t("postsScreen.error");
    return <ErrorMessage message={errorMessage} onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        refreshing={isLoading}
        onRefresh={refetch}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  postContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 0,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    overflow: "hidden",
    position: "relative",
  },
  postContainerLTR: {
    borderTopLeftRadius: 0,
  },
  postContainerRTL: {
    borderTopRightRadius: 0,
  },
  directionIndicator: {
    position: "absolute",
    top: 0,
    width: 30,
    height: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  directionIndicatorLTR: {
    left: 0,
    borderBottomRightRadius: 16,
  },
  directionIndicatorRTL: {
    right: 0,
    borderBottomLeftRadius: 16,
  },
  idBadge: {
    position: "absolute",
    top: 6,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  idBadgeLTR: {
    right: 12,
  },
  idBadgeRTL: {
    left: 12,
  },
  idText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.textSecondary,
  },
  contentArea: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
    paddingTop: 8,
  },
  titleLTR: {
    textAlign: "left",
    paddingLeft: 16,
  },
  titleRTL: {
    textAlign: "right",
    paddingRight: 16,
  },
  preview: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  previewLTR: {
    textAlign: "left",
    paddingLeft: 16,
  },
  previewRTL: {
    textAlign: "right",
    paddingRight: 16,
  },
  readMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  readMoreLTR: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  readMoreRTL: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
  },
  readMoreText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  readMoreIcon: {
    marginLeft: 4,
    marginRight: 4,
  },
});
