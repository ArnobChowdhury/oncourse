import { useEffect, useState, ChangeEvent } from "react";
import type { NextPage } from "next";
import { orbis } from "../orbis";
import Content from "../Content";
import TopBar from "../Components/TopBar";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Modal from "../Components/Modal";
import CreatePost from "../Components/CreatePost";
import ReplyPost from "../Components/ReplyBox";
import { streamIds } from "../streamids";
import { SelectedCategoryType } from "../Components/CreatePost";

const Home: NextPage = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    orbis.isConnected().then((res: any) => {
      setUser(res);
    });
  }, []);

  async function handleSignin() {
    let res = await orbis.connect();
    if (res.status == 200) {
      const did = res.did;
      localStorage.setItem("did", did);
      setUser(did);
    } else {
      console.error("Error connecting to Ceramic: ", res);
      alert("Error connecting to Ceramic.");
    }
  }

  const [showModal, setShowModal] = useState(false);

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyVal, setReplyVal] = useState("");

  const [showPostCategory, setShowPostCategory] =
    useState<SelectedCategoryType>("linux");
  const [posts, setPosts] = useState<any[] | null>(null);

  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [shownPost, setShownPost] = useState<{ [key: string]: any } | null>(
    null
  );
  const [shownPostComments, setShownPostComments] = useState<
    | {
        [key: string]: any;
      }[]
    | null
  >(null);

  useEffect(() => {
    const shownPost = posts?.find((post) => {
      return post.stream_id === selectedPost;
    });
    setShownPost(shownPost);
  }, [selectedPost, posts]);

  const [isFetchingPosts, setIsFetchingPosts] = useState(false);
  async function fetchPosts(channelId: string) {
    setIsFetchingPosts(true);
    let { data, error } = await orbis.getPosts({ context: channelId });
    if (error) {
      alert(`Failed to fetch posts for the channel - ${channelId}`);
      return;
    }
    setIsFetchingPosts(false);
    setPosts(data);
  }

  async function fetchComments(postId: string) {
    let { data, error } = await orbis.getPosts({ master: postId });
    if (error) {
      alert(`Failed to fetch comments for the post - ${postId}`);
      return;
    }
    setShownPostComments(data);
  }

  useEffect(() => {
    fetchPosts(streamIds[showPostCategory]);
  }, [showPostCategory]);

  useEffect(() => {
    if (shownPost) {
      fetchComments(shownPost.stream_id);
    }
  }, [shownPost]);

  const [createPostLoading, setCreatePostLoading] = useState(false);
  async function handleCreatePost(
    postHeader: string,
    selectedCategory: "javascript" | "python" | "linux",
    postBody: string
  ) {
    setCreatePostLoading(true);

    let res = await orbis.createPost({
      body: postBody,
      context: streamIds[selectedCategory],
      header: postHeader,
    });

    if (res.status == 200) {
      console.log("Shared post with stream_id: ", res.doc);
    } else {
      console.error("Error sharing post: ", res);
      alert("Error sharing post.");
    }

    fetchPosts(streamIds[showPostCategory]);
    setCreatePostLoading(false);
    closeModal();
  }

  const closeModal = () => {
    setShowModal(false);
    setShowReplyModal(false);
    setReplyVal("");
  };

  const handleReply = async () => {
    setCreatePostLoading(true);

    let res = await orbis.createPost({
      body: replyVal,
      master: shownPost?.stream_id,
    });

    if (res.status == 200) {
      console.log("Shared post with stream_id: ", res.doc);
    } else {
      console.error("Error sharing post: ", res);
      alert("Error sharing post.");
    }

    console.log("shownPost", "fetching");
    if (shownPost) {
      setTimeout(() => {
        fetchComments(shownPost.stream_id);
      }, 2000);
    }
    setCreatePostLoading(false);
    closeModal();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Oncourse</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showModal && (
        <Modal hideModal={closeModal}>
          {!showReplyModal && (
            <CreatePost
              isSubmitting={createPostLoading}
              onPostSubmission={handleCreatePost}
            />
          )}
          {showReplyModal && (
            <ReplyPost
              value={replyVal}
              onReplyValChange={(e) => setReplyVal(e.currentTarget.value)}
              onReply={handleReply}
              isReplying={createPostLoading}
            />
          )}
        </Modal>
      )}
      <TopBar onClick={handleSignin} user={user} />
      <main className={styles.main}>
        <h1 className={styles.title}>Oncourse</h1>
        <h3 className={styles.subheader}>A forum for everything programming</h3>
        <div className={styles.box}>
          <Content
            showModal={() => {
              setShowModal(true);
            }}
            posts={posts}
            categoryVal={showPostCategory}
            onCategorySelect={(e: ChangeEvent<HTMLSelectElement>) =>
              setShowPostCategory(e.currentTarget.value as SelectedCategoryType)
            }
            shownPost={shownPost}
            onPostSelect={(streamId) => setSelectedPost(streamId)}
            onReplyClick={() => {
              setShowModal(true);
              setShowReplyModal(true);
            }}
            onGoingBack={() => {
              setSelectedPost(null);
              setShownPost(null);
              setShownPostComments(null);
            }}
            shownPostComments={shownPostComments}
            isLoading={isFetchingPosts}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
