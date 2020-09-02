import React from "react";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";

let Comments = (props) => {
  let [comments, setComments] = React.useState([]);
  let [channelName, setChannelName] = React.useState("comment");

  const keywordData = useSelector(state => state.keywordReducer);

  const pusher = new Pusher("d273be1112c5357e923f", {
    cluster: "ap2",
    encrypted: true
  });
  React.useEffect(() => {
    const channel = pusher.subscribe(channelName);
    channel.bind("message", data => {
      if(isKeywordExist(data.message)){
        setComments(prevData => [...prevData, data]);
      }
    });
  }, []);


  let unsubscribe_channel = channelName => {
    setChannelName(channelName);
    pusher.unsubscribe(channelName);
    props.history.push('/dashboard')
  };

  let isKeywordExist =(message)=>{
    let messageArry = message.split(' ')
    let count = 0
    keywordData.keywords.map(keyword =>{
      if(messageArry.includes(keyword)){
        count += 1
        return;
      }
    })
    if(count >= 1){
      return true
    }
    else{
      return false
    }

  }

  return (
    <React.Fragment>
      <div className="comment_section">
        <div className="keword_Url_section ">
          <p>URL : {keywordData.streamUrl}</p>
          <div className="keywords_section comment_sub"> Keywords :
            {keywordData &&
              keywordData.keywords.map((keyword, i) => (
                <span className="keywords" key={i}>{keyword}</span>
              ))}
          </div>
          <div className="comments">
          <h3 className="comment_header">Comments :</h3>
          <div className="comments_box">
          {comments.map((comment,i) => (
            <p key={i} className="comment_message">{comment.message}</p>
          ))}
          </div>
        </div>
        <button className="unsub_btn" onClick={() => unsubscribe_channel("comment")}>Unsubscribe</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Comments;
