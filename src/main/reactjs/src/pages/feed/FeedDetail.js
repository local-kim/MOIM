import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FeedDetail = () => {
  const {feedId} = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [feed, setFeed] = useState({});

  useEffect(() => {
    axios.get(`/feed/${feedId}`)
    .then(res => {
      // console.log(res.data);
      setFeed(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      {feed.content}
    </div>
  );
};

export default FeedDetail;