import React, { useState, useEffect } from "react";
import axios from "axios";

function VideoList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&q=react-redux&key=AIzaSyD-w8GimrLZJV5Bp-8I-wYDcnqe0AXHVwg"
      );

      setData(result.data.items);
    };

    fetchData();
  }, []);

  const videos: any = !data ? (
    <p>loading</p>
  ) : (
    data.map((video: any) => {
      console.log("this are videos", video);
      return (
        <>
          <p>{video.snippet.title}</p>
          <p>{video.id.videoId}</p>
          <p>
            {" "}
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                width={video.snippet.thumbnails.high.width}
                height={video.snippet.thumbnails.high.height}
              ></img>
            </a>
          </p>
        </>
      );
    })
  );

  return (
    <>
      <p>{videos}</p>
    </>
  );
}

export default VideoList;