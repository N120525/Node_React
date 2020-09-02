import React from "react";
import "react-responsive-modal/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-responsive-modal";
import { toast } from "react-toastify";
import { getUserKeywords } from "../../actions/action_keywords";
import { useDispatch } from "react-redux";
import axios from "axios";

let Dashboard = props => {
  const [enteredKeyWord, setEntredKeyWord] = React.useState("");
  const [keyWords, setkeyWords] = React.useState([]);
  const [streamingURl, setStreamingURl] = React.useState("");
  const [modelStatus, seModelStatus] = React.useState(false);
  const dispatch = useDispatch();
  toast.configure({ position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });

  let onOpenModal = () => {
    seModelStatus(true);
  };

  let onCloseModal = () => {
    seModelStatus(false);
  };
/**
 * To remove unwanted keywords
 * @param {string} keyWord 
 */
  let removeKeyword = keyWord => {
    let updatedKeywords = [...keyWords];
    updatedKeywords.splice(updatedKeywords.indexOf(keyWord), 1);
    setkeyWords(updatedKeywords);
  };


  let addKeyword = () => {
    if (enteredKeyWord.length === 0) {
      toast.error("keyword not empty");
    } else {
      if (keyWords.length <= 9) {
        if (keyWords.includes(enteredKeyWord)) {
          toast.error("keyword already exist");
        } else {
          setkeyWords(prevData => {
            return [...prevData, enteredKeyWord];
          });
          setEntredKeyWord("");
        }
      } else {
        toast.error("minumb number of keywords 10 only");
      }
    }
  };

  let returnKeywords = () => {
    return (
      <div className="keywords_section">
        {" "}
        keyWords :
        {keyWords &&
          keyWords.map((keyWord, i) => {
            return (
              <span className="keywords" key={i}>
                {keyWord}{" "}
                <span
                  className="cross_mark"
                  onClick={() => removeKeyword(keyWord)}
                >
                  X
                </span>{" "}
              </span>
            );
          })}
      </div>
    );
  };

  let sendSubscriptionData = () => {
    if (streamingURl && keyWords.length > 0) {
      if (isStreamingURL(streamingURl)) {
        dispatch(
          getUserKeywords({
            streamUrl: streamingURl,
            keywords: keyWords
          })
        );
        props.history.push("/comments");
        api_postStreamingUrl(streamingURl, keyWords);
      }
    } else {
      toast.error("Streaming URL and keywords are required");
    }
  };
/**
 * send Stream url and keyword to listen for comments
 * @param {string} streamingURl
 * @param {Array} keyWords
 */
  let api_postStreamingUrl = (streamingURl, keyWords) => {
    axios.post("http://localhost:5000/streamUrl", {
      streamUrl: streamingURl,
      keywords: keyWords
    })
  };

  let onKeywordEnter = eve => {
    if (hasWhiteSpace(eve.target.value)) {
      toast.error("Keywords which do not allow white spaces");
    } else {
      setEntredKeyWord(eve.target.value);
    }
  };
  let hasWhiteSpace = str => {
    return /\s/g.test(str);
  };
  let isStreamingURL = Url => {
    let reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    if (reg.test(Url)) {
      return true;
    } else {
      toast.error(
        "invalid streaing Url, it should like Ex: https://google.com"
      );
      return false;
    }
  };
  return (
    <div>
      <h1 className="aling_cente">Welcome to Dashboard</h1>
      <div>
        <div>
          <div>
            <input
              type="text"
              className="Url_input"
              placeholder="Eneter streaming URL"
              value={streamingURl}
              onChange={eve => setStreamingURl(eve.target.value)}
            />
            <button className="add_keyword_btn" onClick={onOpenModal}>
              Add keyWords
            </button>
          </div>
          {returnKeywords()}
        </div>
        <div className="subscribe_section">
          <button onClick={sendSubscriptionData} className="subscribe_btn">
            subscribe
          </button>
        </div>
        <Modal open={modelStatus} onClose={onCloseModal} center>
          <div className="popup_sectioin">
            <input
              className="input_box"
              placeholder="Enter keywords"
              type="text"
              value={enteredKeyWord}
              onChange={onKeywordEnter}
            />
            <button className="add_btn" onClick={addKeyword}>
              Add
            </button>
            {returnKeywords()}
            <div className="Done_section">
              <button className="Done_btn" onClick={onCloseModal}>
                Done
              </button>
            </div>
          </div>
        </Modal>
      </div>
      {/* <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer /> */}
    </div>
  );
};

export default Dashboard;
