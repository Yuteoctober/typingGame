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
  BsStickiesFill,
  BsGithub,
  BsFacebook,
  BsTelegram,
  BsFillHouseHeartFill } from "react-icons/bs";




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
  const [timeId, setTimeId] = useState<NodeJS.Timeout | undefined>();
  const [theme, setTheme] = useState('dark')
  const [dropdown, setDropdown] = useState(false)
  const [about, setAbout] = useState(false)
  const [closeMedal, setCloseMedal] = useState(false)


  const timerExecuted = useRef(false)

  const formattedTime = timeLeft < 10? `0${timeLeft}` : timeLeft

  const twitterURL = `https://twitter.com/intent/tweet?text=${quote}&hashtags=Yute,IloveU`;

  const fetchData = async () => {
    const endpoint = 'https://api.quotable.io/random'

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




  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const type = e.target.value;
    let correctText = ''
   
  
    if (!timerExecuted.current) {
      // Only execute the timer block once
      setTimeLeft(timeCount)
      const timerId = setTimeout(() => {
        if (start) {
          setStart(false)
        }
  
        if (!result) {
          setResult(true)
        }
      }, timer)
      setTimeId(timerId)
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
      clearTimeout(timeId)
      console.log('hello timeout cancel')
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
      <section className={`section ${theme}` }>
      {about && (
        <>
          <div className='blur' onClick={() => {(about && closeMedal) && setCloseMedal(true); setAbout(false)}} >
            <div className={`about_text ${theme}`} 
              onClick={(e) => {
                              setCloseMedal(false)
                              e.stopPropagation();
               }}>
              <BsXCircleFill  className='exit_about' 
                              onClick={() => setAbout(false)}
                              />
              <h1>Type is Fun</h1>
                <p> Type is fun is an interactive typing 
                    practice app that enhances your skills 
                    while offering an enjoyable user experience. 
                </p>
                <br />
                <h1>Key features include:</h1>
                <p>Random Quotes: Get inspired with fresh quotes from the "quotable.io" API.</p>
                <p>Typing Challenge: Test your typing speed and accuracy by typing quotes quickly.</p>
                <p>Timer Options: Choose from 10s, 15s, or 20s timers for added challenge.</p>
                <p>Dynamic Themes: Personalize the app's look with themes like "Aurora" and "Cyberpace."</p>
                <p>Responsive Design: Enjoy a seamless experience on desktops, tablets, and mobiles.</p>
                <p>Result Analysis: View your typing speed, errors, and accuracy, plus share quotes on Twitter.</p>
                <p>About Section: Access additional information with a click.</p>
            </div>
          </div>
        </>
      )}
      
      <div className={`container_top ${theme}`}>
        <div className={`leftside ${theme}`}>
          <BsKeyboardFill className={`keyboard ${theme}`} />
          <span>Type is Fun</span>
        </div>
        <div className="rightside">
          <div className={`color_change ${theme}`}>
            <div className={`color_one ${theme}`}></div>
            <div className={`color_two ${theme}`}></div>
            <div className={`color_three ${theme}`}></div>
            <div className={`arrow_down ${theme}`}>
              <BsChevronDown onClick={() => setDropdown(!dropdown)} />
            </div>
          </div>
          {dropdown && (
            <>
              <div className={`dropdown_color ${theme}`}>
            <div className={`dark_theme ${theme}`} onClick={() => {setTheme('dark'); setDropdown(false)}}>
              <span>Aurora</span>
              <div className="color_one_dark"></div>
              <div className="color_two_dark"></div>
              <div className="color_three_dark"></div>
            </div>
            <div className={`purple_theme ${theme}`} onClick={() => {setTheme('purple'); setDropdown(false)}}>
              <span>Cyberpace</span>
              <div className="color_one_purple"></div>
              <div className="color_two_purple"></div>
              <div className="color_three_purple"></div>
            </div>
            <div className={`pink_theme ${theme}`} onClick={() => {setTheme('pink'); setDropdown(false)}}>
              <span>Cake</span>
              <div className="color_one_pink"></div>
              <div className="color_two_pink"></div>
              <div className="color_three_pink"></div>
            </div>
            <div className={`grey_theme ${theme}`} onClick={() => {setTheme('grey');setDropdown(false)}}>
              <span>Paper</span>
              <div className="color_one_grey"></div>
              <div className="color_two_grey"></div>
              <div className="color_three_grey"></div>
            </div>
          </div>
            </>
          )}
          
          <div className="about_icon_div">
            <BsFillQuestionCircleFill className="about_icon" onClick={() => setAbout(true)} />
          </div>
          
        </div>
      </div>
      <div className="container_mid">
        <div className={`timer_icon ${theme}`}>
          <BsClock />
        </div>
        <div className={`timer ${theme}`}>
          <span
            style={styleone ? { backgroundColor: 'rgba(255, 255, 255, 0.534)' } : {}}
            className={`timer_one ${theme}`}
            onClick={() => {
              setStyleone(true);
              setStyletwo(false);
              setStylethree(false);
              setTimer(10000);
              setTimeCount(10);
            }}
          >
            10s
          </span>
          <span
            style={styletwo ? { backgroundColor: 'rgba(255, 255, 255, 0.534)' } : {}}
            className={`timer_two ${theme}`}
            onClick={() => {
              setStyleone(false);
              setStyletwo(true);
              setStylethree(false);
              setTimer(15000);
              setTimeCount(15);
            }}
          >
            15s
          </span>
          <span
            style={stylethree ? { backgroundColor: 'rgba(255, 255, 255, 0.534)' } : {}}
            className={`timer_three ${theme}`}
            onClick={() => {
              setStyleone(false);
              setStyletwo(false);
              setStylethree(true);
              setTimer(20000);
              setTimeCount(20);
            }}
          >
            20s
          </span>
        </div>
      </div>
      <div className={`time_count ${theme}`}>
        <span>Time left: 00:{formattedTime}</span>
      </div>
      
        {!result && (
          <>
            <div
              className={`click_to_play ${theme}`}
              onClick={handleStart}
              style={{
              pointerEvents: !start && (styleone || styletwo || stylethree) ? 'auto' : 'none',
              color: !start && (styleone || styletwo || stylethree) ? 'white' : 'rgba(128, 128, 128, 0.9)',}}>
              <BsController className={`play_icon ${theme}`} />
              <span>click to start playing...</span>
            </div>
          </>
        )}
        
      {start && (
        <>
          <div className='main_game_container'>
            <textarea
              className={`main_game ${theme}`}
              value={text}
              onChange={handleTextareaChange}
            ></textarea>
            <textarea className={`main_game_two ${theme}`} placeholder={quote}></textarea>
          </div>
        </>
      )}
      {result && (
        <div className={`result_container ${theme}`}>
          <div className={`result ${theme}`}>
            <BsXCircleFill
              className={`close_result ${theme}`}
              onClick={() => {
                setResult(false);
                setText('');
                setStyleone(false);
                setStyletwo(false);
                setStylethree(false);
                timerExecuted.current = false;
              }}
            />
            <div className={`score_one ${theme}`}>
              <span>
                wmp / cpm <br />
                {text.length} / {quote.length}
              </span>
            </div>
            <div className={`score_two ${theme}`}>
              <span>
                error <br />
                {incorrect}
              </span>
            </div>
            <div className={`score_three ${theme}`}>
              <span>
                accuracy <br />
                {Math.ceil(((text.length - incorrect) / text.length) * 100)} %
              </span>
            </div>
            <p className='copy_result_p'>
              Copy this awesome quote
              <BsStickiesFill
                className={`copy_result ${theme}`}
                onClick={() => {
                  navigator.clipboard.writeText(quote);
                }}
              />
            </p>
            <h4>{quote}</h4>
            <a href={twitterURL} target="_blank" rel="noopener noreferrer">
              Share with your friends on twitter <BsTwitter className="twitter_icon" />
            </a>
          </div>
        </div>
      )}
      {!result && (
        <div className="btm_part">
        <div className="left_btm">
          <a href="" className='github'><BsGithub/></a> 
          <a href="" className='facebook'><BsFacebook/></a>
          <a href="" className='telegram'><BsTelegram/></a>
        </div>
        <div className="right_btm">
          <BsFillHouseHeartFill className='port'/>
          <a href='https://yute-dev.netlify.app/'> My Portfolio</a>
        </div>
      </div>
      )}
      </section>
    </>
  );
}

export default App;