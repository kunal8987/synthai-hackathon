import { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "../Components/Style.css";
import send from "../images/send.svg";
import bot from "../images/bot.png";
import user from "../images/user.png";

function HomePage() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [micro, setMicro] = useState(false);

  useEffect(() => {
    document.querySelector(".layout").scrollTop =
      document.querySelector(".layout").scrollHeight;
  }, [posts, micro, text]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const handleMicro = () => {
    if (micro == false) {
      setMicro(true);
      SpeechRecognition.startListening();
    } else if (micro == true) {
      setMicro(false);
      SpeechRecognition.stopListening();
    }
  };

  const getBotData = async () => {
    // const data= await axios.get(
    //   `http://localhost:8888/chat?prompt=${text}`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    let res=await fetch(`http://localhost:8888/chat?prompt=${text}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    let data=await res.json()
    console.log("data",data)
    return data;
  };
  console.log("text",text)

  const handleSubmit = () => {
    if (micro) {
      if (transcript.trim() === "") {
        return;
      }
      managePost(transcript);

      managePost("Loading....", false, true);

      setText("");

      getBotData()
        .then((res) => {
          console.log("res",res)
          let name=res?.choices[0].message?.content
          console.log("name",name)
          managePost(name.trim(), true, false);
        })
        .catch((err) => {
          managePost("There is Some Error....", true, false);

          console.log(err);
        });
    } else {
      if (text.trim() === "") {
        return;
      }
      managePost(text);

      managePost("Loading....", false, true);

      setText("");

      getBotData()
        .then((res) => {
          console.log("res",res)
          let name=res?.choices[0].message?.content
          console.log("name",name)
          managePost(name.trim(), true, false);
        })
        .catch((err) => {
          managePost("There is Some Error....", true, false);

          console.log(err);
        });
    }
  };

  const managePost = (post, bot, isLoading) => {
    if (bot) {
      AutoTypingBot(post);
    } else {
      setPosts((prevState) => {
        return [
          ...prevState,
          {
            type: isLoading ? "loading" : "user",
            post,
          },
        ];
      });
    }
  };

  const AutoTypingBot = (text) => {
    let index = 0;
    let interval = setInterval(() => {
      if (index < text.length) {
        setPosts((prevState) => {
          let lastItem = prevState.pop();
          if (lastItem.type !== "bot") {
            prevState.push({
              type: "bot",
              post: text.charAt(index - 1),
            });
          } else {
            prevState.push({
              type: "bot",
              post: lastItem.post + text.charAt(index - 1),
            });
          }
          return [...prevState];
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleSubmit();
    }
  };

  console.log("posts", posts);
  return (
    <div className="main">
      <h1 className="heading">Synth AI</h1>
      <div className="maincontainer">
        <div className="layout">
          {posts &&
            posts.map((el, index) => (
              <div key={index}>
                {/* {el.type}-{el.post} */}
                <div className="postImage">
                  <img
                    className="postImage-img"
                    src={el.type == "user" ? user : bot}
                    alt="postImage"
                  />
                  <h1 className="postImage-h1">{el.post}</h1>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="inputbox">
        <div className="input-button">
          <input
            className="inputbox-input-div"
            type="text"
            autoFocus
            placeholder="Send a message..."
            onKeyUp={handleEnter}
            value={micro ? transcript : text}
            onChange={(e) => setText(e.target.value)}
          />
           <button onClick={handleSubmit} className="inputbox-input-button">
            {/* <img className="send-button" src={send} /> */}
            Send
          </button>
        </div>
        <div className="micro" onClick={handleMicro}>
          <img
            className="w-10"
            src={
              micro
                ? "https://cdn-icons-png.flaticon.com/128/9456/9456964.png"
                : "https://cdn-icons-png.flaticon.com/128/3293/3293623.png"
            }
            alt=""
          />
        </div>
      </div>
      <br />
    </div>
  );
}
export default HomePage;
