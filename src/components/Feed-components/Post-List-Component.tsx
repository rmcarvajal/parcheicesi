// src/components/Feed-components/Post-List-Component.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../../supabaseClient";
import PostComponent from "./Post-Component";
import PostForm from "./PostForm";

/* Tipos (recrear los tuyos locales para seguridad) */
interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  user_name?: string;
  text: string;
  created_at: string;
}

interface Post {
  id: string;
  user_id: string;
  user?: string;
  profilePic?: string;
  created_at: string;
  text: string;
  image?: string;
  likes_count: number;
  commentsList: Comment[];
  category?: string;
}

/* Props */
interface PostListProps {
  userFilter?: string;
}

const POSTS_PER_PAGE = 20;

function PostList({ userFilter }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Helper to normalize rows coming from Supabase
  const normalizePosts = (rows: any[]): Post[] => {
    return rows.map((p: any) => {
      const postComments = (p.comments || []).map((c: any) => ({
        id: c.id,
        post_id: c.post_id,
        user_id: c.user_id,
        user_name: c.users?.username ?? undefined,
        text: c.text,
        created_at: c.created_at,
      }));
      return {
        id: p.id,
        user_id: p.user_id,
        user: p.users?.username ?? "Unknown",
        profilePic: p.users?.profile_pic ?? undefined,
        created_at: p.created_at,
        text: p.text,
        image: p.image,
        likes_count: p.likes_count ?? 0,
        commentsList: postComments,
        category: p.category,
      } as Post;
    });
  };

  // Fetch a page (no race conditions): if a fetch is in-flight, ignore subsequent calls
  const fetchPage = useCallback(
    async (pg: number) => {
      if (loading) return;
      setLoading(true);
      try {
        const start = pg * POSTS_PER_PAGE;
        const end = start + POSTS_PER_PAGE - 1;

        // Traer posts + user (relación posts_user_id_fkey)
        const { data: postsData, error: err } = await supabase
          .from("posts")
          .select(`
            id,
            created_at,
            user_id,
            text,
            image,
            category,
            likes_count,
            users:users!posts_user_id_fkey ( id, username, profile_pic )
          `)
          .order("created_at", { ascending: false })
          .range(start, end);

        if (err) throw err;

        // fetch comments in bulk for those post ids
        const postIds = (postsData || []).map((p: any) => p.id);
        let comments: any[] = [];
        if (postIds.length) {
          const { data: cData, error: cErr } = await supabase
            .from("comments")
            .select("id, post_id, user_id, text, created_at, users ( username )")
            .in("post_id", postIds)
            .order("created_at", { ascending: true });
          if (cErr) throw cErr;
          comments = cData || [];
        }

        // merge comments into posts (we already normalize below)
        const merged = (postsData || []).map((p: any) => {
          return {
            ...p,
            comments: comments.filter((c: any) => c.post_id === p.id),
          };
        });

        const normalized = normalizePosts(merged);

        // Avoid duplicates: keep a set of ids
        setPosts((prev) => {
          const existingIds = new Set(prev.map((x) => x.id));
          const newItems = normalized.filter((x) => !existingIds.has(x.id));
          return [...prev, ...newItems].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        });

        // If returned less than page size -> no more
        if (!postsData || postsData.length < POSTS_PER_PAGE) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setPage((p) => Math.max(p, pg + 1));
      } catch (e) {
        console.error("fetchPage error", e);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  // initial load
  useEffect(() => {
    setPosts([]);
    setPage(0);
    setHasMore(true);
    fetchPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    if (!("IntersectionObserver" in window)) return;

    let io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loading && hasMore) {
          fetchPage(page);
        }
      });
    }, { root: null, rootMargin: "200px", threshold: 0.1 });

    io.observe(sentinel);
    return () => io.disconnect();
  }, [fetchPage, page, loading, hasMore]);

  // Realtime subscription: new posts
  useEffect(() => {
    const postSub = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          // payload.new has the new row; fetch its user and comments minimal info and prepend if not present
          const newRow = payload.new;
          (async () => {
            try {
              const { data: userData } = await supabase
                .from("users")
                .select("username, profile_pic")
                .eq("id", newRow.user_id)
                .single();

              const { data: commentsData } = await supabase
                .from("comments")
                .select("id, post_id, user_id, text, created_at, users ( username )")
                .eq("post_id", newRow.id)
                .order("created_at", { ascending: true });

              const normalizedNew: Post = {
                id: newRow.id,
                user_id: newRow.user_id,
                user: userData?.username ?? "Unknown",
                profilePic: userData?.profile_pic ?? undefined,
                created_at: newRow.created_at,
                text: newRow.text,
                image: newRow.image,
                likes_count: newRow.likes_count ?? 0,
                commentsList: (commentsData || []).map((c: any) => ({
                  id: c.id,
                  user_id: c.user_id,
                  user_name: c.users?.username,
                  text: c.text,
                  created_at: c.created_at,
                })),
                category: newRow.category,
              };

              setPosts((prev) => {
                if (prev.some(p => p.id === normalizedNew.id)) return prev;
                return [normalizedNew, ...prev].sort((a,b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
              });
            } catch (e) {
              console.warn("realtime INSERT handling failed", e);
            }
          })();
        }
      )
      .subscribe();

    // Also listen to updates (likes_count changed, etc.)
    const postUpd = supabase
      .channel("public:posts_updates")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "posts" },
        (payload) => {
          const updated = payload.new;
          setPosts((prev) => prev.map(p => p.id === updated.id ? { ...p, likes_count: updated.likes_count, text: updated.text, image: updated.image } : p));
        }
      )
      .subscribe();

    return () => {
      postSub.unsubscribe();
      postUpd.unsubscribe();
    };
  }, []);

  // scroll to top button
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // handle new post created in PostForm
  const handlePostCreated = (createdPost: Post | null) => {
    if (!createdPost) {
      // If PostForm didn't return post (maybe it created and we rely on realtime) do a soft refresh
      setPosts([]);
      setPage(0);
      setHasMore(true);
      fetchPage(0);
      return;
    }
    // prepend safely (avoid duplicates)
    setPosts((prev) => {
      if (prev.some(p => p.id === createdPost.id)) return prev;
      return [createdPost, ...prev].sort((a,b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    });
  };

  // apply userFilter
  const filteredPosts = userFilter ? posts.filter(p => p.user === userFilter) : posts;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div id="post-list-container" className="flex flex-col items-center gap-2.5 px-4 py-40 md:py-8 min-h-screen w-full bg-gradient-to-b from-brand-light to-white">
      <div id="post-list-header" className="flex flex-row justify-between max-w-100 w-full px-2">
        <h1 className="font-bold text-2xl">Últimas publicaciones</h1>
        <button id="añadir-btn" className="text-brand font-bold bg-white rounded-2xl p-2 px-6 border hover:bg-brand hover:text-white cursor-pointer" onClick={() => setShowForm(!showForm)}>+ Añadir</button>
      </div>

      {showForm && <PostForm onSubmit={(p) => { handlePostCreated(p); setShowForm(false); }} />}

      <div id="post-list" className="flex flex-col items-center h-fit w-full max-w-lg gap-6 mt-4">
        {filteredPosts.map((p) => (
          <PostComponent
            key={p.id}
            id={p.id}
            user={p.user}
            pic={p.profilePic || ''}
            time={new Date(p.created_at).getTime()}
            text={p.text || ''}
            img={p.image || ''}
            cat={p.category}
            likes={p.likes_count}
            commentsList={p.commentsList}
            user_id={p.user_id}
          />
        ))}

        {loading && posts.length === 0 && (
          <div className="w-full space-y-4">
            {[1,2,3].map(i=>(
              <div key={i} className="animate-pulse p-4 bg-white rounded-lg border">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div ref={sentinelRef} className="w-full h-6" />

      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed md:bottom-6 md:right-6 md:top-auto top-30 px-6 py-2 md:p-4 h-fit rounded-full cursor-pointer shadow-xl bg-brand text-white transition-all">↑</button>
      )}

      <div className="w-full max-w-lg flex justify-center my-6">
        {hasMore ? (
          <button className="px-6 py-2 bg-brand text-white rounded-lg disabled:opacity-50" disabled={loading} onClick={() => fetchPage(page)}>
            {loading ? 'Cargando...' : 'Cargar más'}
          </button>
        ) : (
          <p className="text-sm text-gray-500">No hay más publicaciones</p>
        )}
      </div>
    </div>
  );
}

export default PostList;
