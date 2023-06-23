import { useEffect, useState } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import send from "../images/send.svg";
import user from "../images/user.png";
import bot from "../images/bot.png";
import loadingIcon from "../images/loader.svg";
import "../Components/Style.css";

function Home() {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [inputField, setInputfield] = useState(false);
  const [micro, setMicro]=useState(false)

 

  useEffect(() => {
    document.querySelector(".layout").scrollTop =
      document.querySelector(".layout").scrollHeight;

  }, [posts,micro,input]);

 

  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
    const handleMicro=()=>{
      if(micro==false){
        setMicro(true)
         SpeechRecognition.startListening()
        
        }else if(micro==true){
          setMicro(false)
          SpeechRecognition.stopListening()
      }
    
    }

    
  const fetchBotResponse = async () => {
    const { data } = await axios.post(
      "https://autochat.onrender.com",

      { input },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(data.bot);
    return data;
  };

  const autoTypingBotResponse = (text) => {
    let index = 0;
    let interval = setInterval(() => {
      if (index < text.length) {
        setPosts((prevState) => {
          // console.log(prevState);
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
        setInputfield(() => false);
      }
    }, 20);
  };

  const onSubmit = () => {
    if(micro){
      if (transcript.trim() === "") return;
      updatePosts(transcript);
      setInputfield(() => true);
      updatePosts("loading....", false, true);
      setInput("");
      fetchBotResponse()
        .then((res) => {
          // console.log(res.bot.trim());
          updatePosts(res.bot.trim(), true, false);
        })
        .catch((err) => {
          updatePosts(
            "There is Some Error.....\nAsk Again........ ",
            true,
            false
          );
          setInputfield(() => false);
  
          console.log(err);
        });
    }else{
      if (input.trim() === "") return;
    updatePosts(input);
    setInputfield(() => true);
    updatePosts("loading....", false, true);
    setInput("");
    fetchBotResponse()
      .then((res) => {
        // console.log(res.bot.trim());
        updatePosts(res.bot.trim(), true, false);
      })
      .catch((err) => {
        updatePosts(
          "There is Some Error.....\nAsk Again........ ",
          true,
          false
        );
        setInputfield(() => false);

        console.log(err);
      });

    }
    

   
  };

  const updatePosts = (post, isBot, isLoading) => {
    if (isBot) {
      autoTypingBotResponse(post);
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

  const onKeyUp = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      onSubmit();
    }
  };

  console.log("input",input)
  return (
    <div className="max-w-1200 mx-auto px-4">
      {/* <h1 className="text-5xl p-5 font-bold font-serif text-center mt-6 flex gap-2 items-center justify-center">Synth AI</h1> */}
      <h1 className="text-4xl pt-10 pb-10 flex flex-row justify-center align-center font-bold pt-2 font-serif bg-opacity-10">
        Synth AI
      </h1>
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p> */}
      <br />
      <div className="chat-container">
        <div className="layout">
          {posts.map((el, index) => (
            <div
              key={index}
              className={`chat-bubble ${
                el.type === "bot" || el.type === "loading" ? "bot" : ""
              }`}
            >
              <div className="avatar">
                <img
                  src={el.type === "bot" || el.type === "loading" ? bot : user}
                  alt="send_logo"
                />
              </div>
              {el.type === "loading" ? (
                <div className="loader">
                  <img src={loadingIcon} alt="loader" />
                </div>
              ) : (
                <div className="post">{el.post}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center pr-[300px] pl-[350px]">
        <div className="footer">
          <input
            className="composebar"
            value={micro? transcript:input}
            autoFocus
            type="text"
            placeholder="Ask anything!"
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={onKeyUp}
            disabled={inputField}
          />
          <div className="send-button" onClick={onSubmit}>
            <img src={send} alt="send_logo" />
          </div>
        </div>
        <div className="cursor-pointer" onClick={handleMicro}>
          <img className="w-10"
            src={micro? "https://cdn-icons-png.flaticon.com/128/9456/9456964.png":"https://cdn-icons-png.flaticon.com/128/3293/3293623.png"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
export default Home;
