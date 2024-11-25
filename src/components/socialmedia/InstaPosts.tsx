'use client'
import { useEffect, useState } from 'react';

const InstagramEmbed = ({ postLink }: { postLink: string }) => {
  const [isClient, setIsClient] = useState(false);

  // Set state to true once the component is mounted on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder or an empty div during SSR
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={postLink}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "3px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px",
          maxWidth: "200px",
          minWidth: "100px",
          padding: "0",
          width: "calc(100% - 2px)",
        }}
      >
        <div style={{ padding: "16px" }}>
          <a
            href={postLink}
            style={{
              background: "#FFFFFF",
              lineHeight: "0",
              padding: "0 0",
              textAlign: "center",
              textDecoration: "none",
              width: "100%",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            View this post on Instagram
          </a>
        </div>
      </blockquote>
      <script async src="//www.instagram.com/embed.js"></script>
    </div>
  );
};

export default InstagramEmbed;
