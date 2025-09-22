"use client"; // This is required for using React hooks like useState and useEffect

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Send } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

// --- Mock Data and API ---
// In a real app, you would fetch this from your backend API.

interface Story {
  id: number;
  username: string;
  avatar: string;
}

interface Post {
  id: number;
  username: string;
  avatar: string;
  imageUrl: string;
  caption: string;
}

const storiesData: Story[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  username: `user_${i + 1}`,
  avatar: `https://i.pravatar.cc/150?u=story${i + 1}`,
}));

// This function simulates fetching posts from an API with pagination.
const fetchPosts = async (page: number, limit: number = 5): Promise<Post[]> => {
  console.log(`Fetching page ${page}...`);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Stop fetching after 4 pages for this demo
  if (page > 4) {
    return [];
  }

  return Array.from({ length: limit }, (_, i) => {
    const postId = (page - 1) * limit + i + 1;
    return {
      id: postId,
      username: `travel_blogger_${postId}`,
      avatar: `https://i.pravatar.cc/150?u=avatar${postId}`,
      imageUrl: `https://picsum.photos/600/600?random=${postId}`,
      caption: `This is an amazing view! Photo #${postId}`,
    };
  });
};

// --- Components ---

// 1. Stories Component
// 1. Stories Component
// 1. Stories Component
function StoryCarousel() {
  return (
    <Card className="mb-6 sticky top-5 z-10 bg-background">
      {/* Changed p-3 to px-3 py-2 to reduce vertical padding */}
      <CardContent className="px-3 py-2">
        <div className="flex space-x-4 overflow-x-auto no-scrollbar">
          {storiesData.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
                <Avatar className="w-full h-full border-2 border-white dark-border-black">
                  <AvatarImage src={story.avatar} alt={story.username} />
                  <AvatarFallback>{story.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-xs font-medium truncate w-14 text-center">{story.username}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
// 2. Ad Banner Component
function AdBanner() {
  return (
    <Card className="mb-6 bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col items-center justify-center gap-4 p-4 text-center">
        <div className="flex max-w-xs flex-col items-center gap-2">
          <h2 className="text-lg font-semibold">Sponsored by Thumps Up</h2>
          <p className="text-sm text-muted-foreground">
           Taste thunder thunder..
          </p>
        </div>
      </div>
    </Card>
  );
}

// 3. Single Post Card Component
// 3. Single Post Card Component
function PostCard({ post }: { post: Post }) {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src={post.avatar} alt={post.username} />
          <AvatarFallback>{post.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <p className="font-semibold">{post.username}</p>
      </CardHeader>
      <CardContent className="p-0">
        <Image
          // Corrected this to use the dynamic URL from the post data
          src="/image.png"
          alt={`Post by ${post.username}`}
          width={600}
          height={250}
          className="w-full h-auto"
        />
      </CardContent>
      <div className="p-4">
        <div className="flex gap-4 mb-2">
          <Heart className="cursor-pointer" />
          <MessageCircle className="cursor-pointer" />
          <Send className="cursor-pointer" />
        </div>
        <p className="text-sm">
          <span className="font-semibold">{post.username}</span> {post.caption}
        </p>
      </div>
    </Card>
  );
}

// --- Main Page Component ---
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Function to load more posts
  const loadMorePosts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const newPosts = await fetchPosts(page);
    if (newPosts.length > 0) {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  }, [page, isLoading, hasMore]);
  
  // Initial load
  useEffect(() => {
    loadMorePosts();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect for handling scroll event
  useEffect(() => {
    const handleScroll = () => {
      // Check if user is near the bottom of the page
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, [loadMorePosts]);

  return (
    <>
    <div className="sticky top-5 mx-auto max-w-3xl py-0 px-0 z-10 ">
      <StoryCarousel />
    </div>
    <main className="container mx-auto max-w-2xl py-0 px-0 ">
      {/* 1. Stories Section */}
      
      
      {/* 2. Ad Section */}
      <AdBanner />
      
      {/* 3. Infinite Scroll Post Feed */}
      <div id="post-feed">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Loading and End-of-Feed Indicators */}
      {isLoading && <p className="text-center text-muted-foreground">Loading more posts...</p>}
      {!hasMore && posts.length > 0 && <p className="text-center text-muted-foreground">You've reached the end!</p>}
    </main>
    </>
    
  );
}