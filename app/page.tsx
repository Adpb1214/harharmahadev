/* eslint-disable react/no-unescaped-entities */
// app/page.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import './globals.css';

export default function Home() {
  const slideshowRef = useRef<HTMLDivElement>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true); // Welcome modal on first page
  const [showPopup, setShowPopup] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [showSecretBox, setShowSecretBox] = useState(false);
  const [secretMessage, setSecretMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const scrollToSlide = (index: number) => {
    if (slideshowRef.current) {
      const slideWidth = window.innerWidth;
      slideshowRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (slideshowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = slideshowRef.current;
      const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;
      
      if (isAtEnd && !hasReachedEnd) {
        setHasReachedEnd(true);
        setTimeout(() => setShowPopup(true), 500);
      }
    }
  };

  const sendSecretMessage = async () => {
    if (!secretMessage.trim()) return;
    
    setIsSending(true);
    
    try {
      // Send email using Formspree
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: secretMessage,
          timestamp: new Date().toLocaleString(),
          page: 'Memory Website - Secret Message'
        }),
      });
      
      if (response.ok) {
        setSendSuccess(true);
        setSecretMessage('');
        setTimeout(() => {
          setSendSuccess(false);
          setShowSecretBox(false);
          setShowPopup(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to send:', error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const slideshow = slideshowRef.current;
    if (slideshow) {
      slideshow.addEventListener('scroll', handleScroll);
      return () => slideshow.removeEventListener('scroll', handleScroll);
    }
  }, [hasReachedEnd]);

  return (
    <>
      {/* Welcome Modal - Opens on first page */}
      {showWelcomeModal && (
        <div className="welcome-overlay" onClick={() => setShowWelcomeModal(false)}>
          <div className="welcome-modal" onClick={(e) => e.stopPropagation()}>
            <button className="welcome-close" onClick={() => setShowWelcomeModal(false)}>✕</button>
            
            <div className="welcome-title">
              🤫 Way Down the memory lane?
            </div>
            
            <div className="welcome-text">
            May be for the lasttt time birokto korchi with another website(vercel o ebar khisti dicche)
              {/* <span className="welcome-highlight">⬅️ slide kor</span> */}
            </div>
            
            <div className="welcome-button" onClick={() => setShowWelcomeModal(false)}>
              shuru kori chol
            </div>
          </div>
        </div>
      )}

      {/* Navigation dots */}
      <div className="nav-dots">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="nav-dot" onClick={() => scrollToSlide(i)} />
        ))}
      </div>

      <div className="scroll-hint">← slide to navigate →</div>

      {/* Full-screen popup with obvious secret button */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={() => setShowPopup(false)}>✕</button>
            <div className="popup-message">
              <div className="popup-title">may be it's the last time</div>
              <div className="popup-text">
                i'm telling u to click korrrrr but the memories i shared with u be it small ones but it was always which i wanted to when i first saw u 2 years before i get to know you get to talk with you it's all i wanted always..
                <br /><br />
                jodi kokhono ojante dukkho diye thaki sorry jodi kokhono jene sune dukkho diyechi then khoma korisna!
                <br /><br />
                janina ar kono memories ki banabo ki na but ei 23 ta mmory with td23 is what i cans ay my best memories in kolkata till now by farrrr!
                <br /><br />
                <span className="popup-signature">
                  Thanks Ms.dutta and ba-byeeee to my favourite<br />
                  behala basiiiii
                </span>
              </div>
              
              {/* OBVIOUS secret button with pulsing animation and text */}
              <div className="secret-trigger-obvious" onClick={() => setShowSecretBox(true)}>
                <span className="secret-trigger-icon">🤫</span>
                <span className="secret-trigger-text">kichu miss korle? click here</span>
                <span className="secret-trigger-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secret message box */}
      {showSecretBox && (
        <div className="secret-overlay" onClick={() => setShowSecretBox(false)}>
          <div className="secret-box" onClick={(e) => e.stopPropagation()}>
            <button className="secret-close" onClick={() => setShowSecretBox(false)}>✕</button>
            
            <div className="secret-title">
              ami kichu miss korle tui add kore de!
              <span className="secret-subtitle">(don't worry - amar kache pouchabe na msg ta)</span>
            </div>
            
            {sendSuccess ? (
              <div className="secret-success">
                ✨ pouchabe na amar kache hoito, kintu tar mane aro kichu memories ami mis korechi ✨
              </div>
            ) : (
              <>
                <textarea
                  className="secret-textarea"
                  placeholder="likh... (secret...)"
                  value={secretMessage}
                  onChange={(e) => setSecretMessage(e.target.value)}
                  maxLength={500}
                  autoFocus
                />
                
                <button 
                  className="secret-send-btn"
                  onClick={sendSecretMessage}
                  disabled={isSending || !secretMessage.trim()}
                >
                  {isSending ? 'pathacchi...' : 'pathaye de'}
                </button>
              </>
            )}
            
           
          </div>
        </div>
      )}

      {/* Slideshow container */}
      <div className="slideshow-container" ref={slideshowRef}>
        {/* PAGE 1: Memories 1-2 - Dukkho & Promise */}
        <section className="slide page-1">
          <div className="bg-text-2025">2025</div>
          <div className="bg-text-2026">2026</div>
          
          <div className="floating-emoji huge-emoji" style={{ top: '10%', left: '5%' }}>🥀</div>
          <div className="floating-emoji huge-emoji" style={{ top: '20%', right: '8%' }}>💔</div>
          <div className="floating-emoji large-emoji" style={{ bottom: '15%', left: '10%' }}>✨</div>
          <div className="floating-emoji large-emoji" style={{ bottom: '25%', right: '15%' }}>🌟</div>
          
          <div className="floating-emoji medium-emoji" style={{ top: '40%', left: '20%' }}>🌙</div>
          <div className="floating-emoji medium-emoji" style={{ top: '60%', right: '25%' }}>⭐</div>
          
          <div className="glow-sphere"></div>
          
          <div className="memory-content">
            <p className="memory-line">1. Our late night such dukkho sharing on the last 2 days of 2025 which was a tough and exhausthing year for us a bit more for you than mine</p>
            <p className="memory-line">2. The promise we made on the last day of the year that on the new year we will only talk about positivity and will not look at our past and will only do things that will make us happy and will peace of our min and that 2026's Glow of yours to remain always</p>
            <p className="memory-tag">31st December, 11:57 PM</p>
          </div>
        </section>

        {/* PAGE 2: Memories 3-6 - Saiyaara, Late Nights, Songs, Kaga */}
        <section className="slide page-2">
          <div className="bg-film-reel">🎬🎞️🎬🎞️🎬</div>
          
          <div className="floating-emoji huge-emoji" style={{ top: '15%', left: '10%' }}>☎️</div>
          <div className="floating-emoji huge-emoji" style={{ top: '20%', right: '15%' }}>🎭</div>
          <div className="floating-emoji large-emoji" style={{ bottom: '30%', left: '5%' }}>😴</div>
          <div className="floating-emoji large-emoji" style={{ bottom: '20%', right: '10%' }}>🎤</div>
          
          <div className="floating-emoji medium-emoji" style={{ top: '50%', left: '20%' }}>🎸</div>
          <div className="floating-emoji medium-emoji" style={{ top: '70%', right: '20%' }}>😤</div>
          <div className="floating-emoji medium-emoji" style={{ top: '30%', left: '40%' }}>😂</div>
          <div className="floating-emoji medium-emoji" style={{ top: '80%', left: '50%' }}>💢</div>
          
          <div className="music-rain">♪ ♫ ♪ ♩ ♬</div>
          
          <div className="memory-content">
            <p className="memory-line">3. our late night saiyaara scene by scene discussions? the krish kapoooor frenzy we still live in</p>
            <p className="memory-line">4. some days we started talking at 8pm and it ended up at 4 am when one of us fall asleep while talking such was the days and talks</p>
            <p className="memory-line">5. remember our old bengalisong singings in chat? I do one line u do another? our sangeet bangla song collection can still will defeat many</p>
            <p className="memory-line">6. us cursing the whole academy and bloody kaga and you telling me what happended exactly line by line</p>
          </div>
        </section>

        {/* PAGE 3: Memories 7-10 - Git, Zips, Pithe, Dutta's */}
        <section className="slide page-3">
          <div className="bg-code">{'<git>'} {'{push}'} {'[commit]'}</div>
          
          <div className="floating-emoji huge-emoji" style={{ top: '10%', left: '5%' }}>💻</div>
          <div className="floating-emoji huge-emoji" style={{ top: '15%', right: '10%' }}>🗜️</div>
          <div className="floating-emoji large-emoji" style={{ bottom: '25%', left: '8%' }}>🫓</div>
          <div className="floating-emoji large-emoji" style={{ bottom: '30%', right: '5%' }}>☕</div>
          
          <div className="floating-emoji medium-emoji" style={{ top: '40%', left: '30%' }}>🤖</div>
          <div className="floating-emoji medium-emoji" style={{ top: '60%', right: '25%' }}>📦</div>
          <div className="floating-emoji medium-emoji" style={{ top: '75%', left: '40%' }}>🍚</div>
          <div className="floating-emoji medium-emoji" style={{ top: '50%', right: '40%' }}>🏪</div>
          
          <div className="zip-rain">🗜️ 🗜️ 🗜️ 🗜️</div>
          
          <div className="memory-content">
            <p className="memory-line">7. us learning git together in google meet may be the first time we talked other than WhatsApp and me trying to answer your questions using chatgpt</p>
            <p className="memory-line">8. uss sharing zips and zips of files as pushing codes and all is tooooo heavy a work the same zip been sent 10 times</p>
            <p className="memory-line">9. you sharing your great pithe making skill and showing me and I am on awe how can u manage to do all these and so gracefully and also misiing not being able to taste them (karon ami behala basi noiiii)</p>
            <p className="memory-line">10. our coffee shop opening planning with something named after dutta's offcoursse aslo planning for the monthly sip after yuvasathii</p>
          </div>
        </section>

        {/* PAGE 4: Memories 11-15 - Cinema, Mirroring, Rashi, Movie, Nandan */}
        <section className="slide page-4">
          <div className="bg-zodiac">♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓</div>
          
          <div className="floating-emoji huge-emoji" style={{ top: '5%', left: '10%' }}>🎬</div>
          <div className="floating-emoji huge-emoji" style={{ top: '15%', right: '5%' }}>🪞</div>
          <div className="floating-emoji large-emoji" style={{ bottom: '20%', left: '15%' }}>🎭</div>
          <div className="floating-emoji large-emoji" style={{ bottom: '25%', right: '10%' }}>🍿</div>
          
          <div className="floating-emoji medium-emoji" style={{ top: '40%', left: '5%' }}>♊</div>
          <div className="floating-emoji medium-emoji" style={{ top: '60%', right: '15%' }}>🎥</div>
          <div className="floating-emoji medium-emoji" style={{ top: '75%', left: '30%' }}>🍵</div>
          <div className="floating-emoji medium-emoji" style={{ top: '30%', right: '30%' }}>🥟</div>
          <div className="floating-emoji medium-emoji" style={{ top: '85%', right: '40%' }}>🫓</div>
          
          <div className="film-strip"></div>
          
          <div className="memory-content">
            <p className="memory-line">11. our love for cinema and endless talk about random movie and random scenes</p>
            <p className="memory-line">12. remember us mirroring each other while talking?</p>
            <p className="memory-line">13. our late night rashi nakshatra finding me by chatgpt u by your pure knowledge(still I feel my rashi showing wrong things as I am still losing people)</p>
            <p className="memory-line">14. our first movie of 2026 together and me getting surprised khud surprise dene gaya tha mai</p>
            <p className="memory-line">15. that tea at Nandan and veg momo and phuchka I still crave for that company that evening is still the best evening of my Kolkata days (started 2026 kolorob korte korte)</p>
          </div>
        </section>

        {/* PAGE 5: Memories 16-19 - Saiyaara, Stickers, Kolkata, Plans */}
        <section className="slide page-5">
          <div className="bg-kolkata">KOLKATA</div>
          
          <div className="floating-emoji huge-emoji" style={{ top: '10%', left: '5%' }}>😤</div>
          <div className="floating-emoji huge-emoji" style={{ top: '15%', right: '8%' }}>🎬</div>
          <div className="floating-emoji large-emoji" style={{ bottom: '20%', left: '10%' }}>❤️</div>
          <div className="floating-emoji large-emoji" style={{ bottom: '25%', right: '5%' }}>😂</div>
          
          <div className="floating-emoji medium-emoji" style={{ top: '40%', left: '20%' }}>🥺</div>
          <div className="floating-emoji medium-emoji" style={{ top: '60%', right: '15%' }}>📍</div>
          <div className="floating-emoji medium-emoji" style={{ top: '75%', left: '40%' }}>🍺</div>
          <div className="floating-emoji medium-emoji" style={{ top: '50%', right: '30%' }}>🍽️</div>
          <div className="floating-emoji medium-emoji" style={{ top: '30%', left: '60%' }}>🍿</div>
          
          <div className="sticker-rain">❤️ 😂 🥺 😍 🤌</div>
          
          <div className="memory-content">
            <p className="memory-line">16. mone achey how mad were u at me when I just show u a 20 sec clip of saiyaara and went onto watch the whole movie jak seta telegram er doulat a makeup hoye geche baba! nahole sedin e oi amader future coffee shop er coffe ta tor matha tei hoye amake chure mara hoto</p>
            <p className="memory-line">17. amader sei koto jug por kora sticker collection showing? kar kache ki ki sticker ache WhatsApp a?</p>
            <p className="memory-line">18. amake ekta sundorrrrr daknaaam bahannnnno dewa tor</p>
            <p className="memory-line">19. aamder pub a jawar plan kora,desi lane a buffet jawar plan,amar Ashoka te debut kora with coffee and popcorn</p>
          </div>
        </section>

        {/* PAGE 6: Memories 20-22 - Audio, Shantiniketan, Behala */}
        <section className="slide page-6">
          <div className="bg-behala-large-bold">বেহালা</div>
          <div className="bg-shantiniketan-large-bold">শান্তিনিকেতন</div>
          
          <div className="floating-emoji huge-emoji" style={{ top: '5%', left: '15%' }}>🎵</div>
          <div className="floating-emoji huge-emoji" style={{ top: '10%', right: '10%' }}>🔊</div>
          <div className="floating-emoji large-emoji" style={{ bottom: '15%', left: '5%' }}>🚂</div>
          <div className="floating-emoji large-emoji" style={{ bottom: '20%', right: '8%' }}>🌳</div>
          
          <div className="floating-emoji medium-emoji" style={{ top: '40%', left: '30%' }}>〰️</div>
          <div className="floating-emoji medium-emoji" style={{ top: '60%', right: '25%' }}>🎤</div>
          <div className="floating-emoji medium-emoji" style={{ top: '75%', left: '40%' }}>🏡</div>
          <div className="floating-emoji medium-emoji" style={{ top: '50%', right: '40%' }}>🌉</div>
          
          <div className="audio-wave-bg">〰️〰️〰️〰️〰️〰️〰️〰️</div>
          
          <div className="memory-content">
            <p className="memory-line">20. anar mone thakbe always that audio of 51 seconds jekhane I felt how much happy u were I will never forget your voice of that day never</p>
            <p className="memory-line">21. amader shantiniketan jawar plan kora ekdom sokal theke rat obdi jodio we both knew it's not possible still plan kora</p>
            <p className="memory-line">22. amar behala ke " onno desh" bola and after going there I felt this is the sweetest part of the Kolkata and sotti e eto byasto kolkatar moddhe ekta shanto sundor desh behala seta amake bojanor jonno</p>
          </div>
        </section>

        {/* PAGE 7: Memory 23 - Birthday */}
        <section className="slide page-7">
          <div className="bg-behala-full-bold">বেহালা</div>
          
          <div className="floating-emoji huge-emoji" style={{ top: '15%', left: '5%' }}>🎂</div>
          <div className="floating-emoji huge-emoji" style={{ top: '10%', right: '10%' }}>❤️</div>
          <div className="floating-emoji huge-emoji" style={{ bottom: '20%', left: '8%' }}>🏠</div>
          <div className="floating-emoji huge-emoji" style={{ bottom: '15%', right: '5%' }}>🎁</div>
          
          <div className="floating-emoji large-emoji" style={{ top: '40%', left: '20%' }}>🥳</div>
          <div className="floating-emoji large-emoji" style={{ top: '60%', right: '15%' }}>✨</div>
          <div className="floating-emoji large-emoji" style={{ top: '75%', left: '30%' }}>🎈</div>
          <div className="floating-emoji large-emoji" style={{ top: '50%', right: '25%' }}>🎉</div>
          
          <div className="birthday-confetti">🎂 🎈 🎁 🎊 ✨</div>
          
          <div className="memory-content highlight">
            <p className="memory-line large">23. and last but not the list amar firstime kono close friend er birthday tar sathe tar jaigai katano and tar sathe tar behala ghure dekha tar sathe cake kata and cha khawa tor kache theke treat newa I will always cherish 23rd of February every year this day will keep me smiling and cherishing this memory and yesss ami Sourav ganguly er bari dekhechiiiii ekhon proudly bole beracchi due to you</p>
            <p className="memory-tag highlight">23rd February — Ei din ta always mone thakbe amar</p>
          </div>
        </section>

        {/* PAGE 8: Final - Goodbye */}
        <section className="slide page-8">
          <div className="floating-emoji huge-emoji" style={{ top: '20%', left: '10%' }}>🕊️</div>
          <div className="floating-emoji huge-emoji" style={{ top: '30%', right: '15%' }}>🪶</div>
          <div className="floating-emoji huge-emoji" style={{ bottom: '25%', left: '20%' }}>🌅</div>
          <div className="floating-emoji huge-emoji" style={{ bottom: '15%', right: '10%' }}>⭐</div>
          
          <div className="floating-emoji medium-emoji" style={{ top: '50%', left: '40%' }}>💫</div>
          <div className="floating-emoji medium-emoji" style={{ top: '70%', right: '30%' }}>🌸</div>
          
          <div className="memory-content final">
            <p className="memory-line large">Ei kota din ar etoo memories</p>
            <p className="memory-line">Likhte likhte dekhi onek hoye geche. Ei website ta — ei sob memories — may be Amar jonno. Kintu tor sathe share korar ichhe holo.janina ei list ta 23 theke 52 obdi jabe kina.2026 r glow ta jeno chirokal thake.</p>
            <p className="memory-tag">Thanks for the memories Ms.Dutta</p>
          </div>
        </section>
      </div>
    </>
  );
}