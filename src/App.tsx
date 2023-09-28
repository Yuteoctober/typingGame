import './App.css'
import { useState, useEffect, useRef } from 'react'
import { 
  BsController, 
  BsKeyboardFill, 
  BsFillQuestionCircleFill, 
  BsChevronDown, 
  BsClock, 
  BsXCircleFill,
  BsTwitter,
  BsStickiesFill } from "react-icons/bs";



function App() {
  const [quote, setQuote] = useState('')
  const [text, setText] = useState('')
  const [start, setStart] = useState(false)
  const [timer, setTimer] = useState(10000)
  const [result, setResult] = useState(false)
  const [styleone, setStyleone] = useState(false)
  const [styletwo, setStyletwo] = useState(false)
  const [stylethree, setStylethree] = useState(false)
  const [timeCount, setTimeCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [incorrect, setIncorrect] = useState(0)

  const timerExecuted = useRef(false)

  const formattedTime = timeLeft < 10? `0${timeLeft}` : timeLeft

  const twitterURL = `https://twitter.com/intent/tweet?text=${quote}&hashtags=React,TwitterShare`;


  const fetchData = async () => {
    const endpoint = 'http://api.quotable.io/random'

    try {
      const response = await fetch(endpoint)

      if (!response.ok) {
        throw Error(response.statusText)
      }

      const data = await response.json();

      if (data && data.content) {
        setQuote(data.content);
        console.log(data)
      }
    } catch (error) {
      console.error(error)
    }
  };

  
  function handleStart() {
    fetchData()
    setStart(true)
    setIncorrect(0)
  }




  function handleTextareaChange(e) {
    const type = e.target.value;
    let correctText = ''
   
  
    if (!timerExecuted.current) {
      // Only execute the timer block once
      setTimeLeft(timeCount)
      setTimeout(() => {
        if (start) {
          setStart(false)
        }
  
        if (!result) {
          setResult(true)
        }
      }, timer)
      timerExecuted.current = true; // Set the ref to true to prevent future executions
    }
  
    for (let i = 0; i < quote.length; i++) {
      if (i < type.length) {
        if (quote[i] === type[i]) {
          correctText += type[i]
          setText(correctText)
        } else {
          setIncorrect(incorrect + 1)
          console.log('incor' + incorrect)
        }
      }
    }
  
    if (correctText.length === quote.length) {
      setResult(true)
      setStart(false)
      setTimeLeft(0)
      setTimer(0)
    }
  }




  useEffect(() => { //timer countdown
     
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft -1)
      }, 1000)

      return () => clearTimeout(timerId)
      
    }
  }, [timeLeft])

  useEffect(() => {

    fetchData()

  }, [])



  return (
    <>
      <section>
        <div className="container_top"> 
          <div className="leftside"> 
            <BsKeyboardFill className='keyboard' /> 
            <span>
              Type is Fun
            </span>
          </div>
          <div className="rightside">
            <div className="color_change">
              <div className="color_one"></div>
              <div className="color_two"></div>
              <div className="color_three"></div>
              <div className="arrow_down"><BsChevronDown/></div>
            </div>
            <BsFillQuestionCircleFill className='about_icon' />
          </div>
        </div>
            <div className="container_mid">
            <div className='timer_icon'><BsClock/></div>
            <div className="timer">
              <span style={styleone ? { backgroundColor: 'rgba(255, 255, 255, 0.534)' } : {}} 
                    className='timer_one'
                     onClick={() => 
                      {setStyleone(true); 
                      setStyletwo(false); 
                      setStylethree(false); 
                      setTimer(10000)
                      setTimeCount(10)}}>10s
              </span>
              <span style={styletwo ? { backgroundColor: 'rgba(255, 255, 255, 0.534)' } : {}} 
                    className='timer_two' 
                    onClick={() => 
                    {setStyleone(false); 
                    setStyletwo(true);
                    setStylethree(false);
                    setTimer(15000)
                    setTimeCount(15)}}>15s
              </span>
              <span style={stylethree ? { backgroundColor: 'rgba(255, 255, 255, 0.534)' } : {}}
                    className='timer_three' 
                    onClick={() => 
                    {setStyleone(false); 
                    setStyletwo(false); 
                    setStylethree(true); 
                    setTimer(20000)
                    setTimeCount(20)}}>20s
              </span>
            </div>
          </div>
          <div className="time_count">
            <span>Time left: 00:{formattedTime}</span>
          </div>
          <div  className="click_to_play" 
                onClick={handleStart}
                style={{pointerEvents: timeCount < 1 || start? 'none': ''}}>
           <BsController className='play_icon'/>
            <span>click to start playing...</span>
          </div>
          {start && 
          (
          <>
            <div>
          <textarea 
           className="main_game" 
            value={text}
            onChange={handleTextareaChange}> 
          </textarea>
          <textarea 
           className="main_game_two" 
            placeholder={quote}>
          </textarea>
        </div>
          </>
        )}
        {result && (
        <div className='result_container'>
            <div className="result">
              <BsXCircleFill 
                    className='close_result'
                    onClick={() => {setResult(false); 
                    setText('');
                    timerExecuted.current = false
                  }}
                  />
              <div className="score_one">
                <span>
                  wmp / cpm <br />
                  {text.length} / {quote.length}
                </span>
              </div>
              <div className="score_two">
                <span>
                  error <br />
                  {incorrect}
                </span>
                </div>
              <div className="score_three">
                <span>
                  accuracy <br />
                  {Math.ceil( (text.length - incorrect)/text.length *100)} %
                </span>
              </div>
              <p>Copy this awesome quote 
                <BsStickiesFill 
                className='copy_result'
                onClick={() => {navigator.clipboard.writeText(quote)}} 
                />
                </p>
              <h4>{quote}</h4>
              <a href={twitterURL} target="_blank" rel="noopener noreferrer">
                Share with your friends on twitter <BsTwitter className='twitter_icon' />
              </a>
          </div>
        </div>
        )}
      </section>
    </>
  );
}

export default App;