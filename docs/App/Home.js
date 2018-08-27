import React from "react";

const Home = () => (
  <div className="home-page">
    <p>
      <strong>AsyncFetcher</strong> it is a simple and useful React <em>(web or native)</em> component for asynchronous
      loading/fetch online data with help of{" "}
      <a href="https://github.com/axios/axios" target="_blank" rel="noopener">
        axios
      </a>
      .
    </p>
    <iframe
      src="https://ghbtns.com/github-btn.html?user=lucasferreira&amp;repo=react-async-fetcher&amp;type=star&amp;count=true&amp;size=large"
      frameborder="0"
      scrolling="0"
      style={{ width: 160, height: 30, marginTop: 12 }}
    />
    <p>
      <img
        src="https://user-images.githubusercontent.com/234495/44481891-672c0280-a61d-11e8-8898-d987b7808b90.png"
        alt="AsyncFetcher"
        style={{ width: 640 }}
      />
    </p>
  </div>
);

export default Home;
