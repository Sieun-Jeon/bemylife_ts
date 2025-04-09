'use client'

// import { useRouter } from "next/router";
import Image from "next/image";
import Script from "next/script";
import dynamic from "next/dynamic";
import venue_map from "../../image/map.jpg";
import { useScript } from "../hooks/useScript";
import React from "react";
import Link from "next/link";

import ImageCarousel from "./component/carousel";
import confetti from "canvas-confetti";


export default function Home() {
  useScript("script.js");

  // const router = useRouter();
  // // Access the query parameter 'isBack'
  // isBack = router.query['isBack'];


  function addChat(
		palette: HTMLElement,
		startFrom: string,
		sentence: string,
		effect: string
	  ) {
		const chat = document.createElement("div");
		chat.classList.add("speech-bubble");
		chat.classList.add(startFrom === "groom" ? "groombubble" : "bridebubble");
		if (effect !== '') chat.classList.add(effect);
		chat.innerText = sentence;
		chat.style.animation = "popup 0.3s ease-out";
		palette.appendChild(chat);
	  }

	  function clearChat(palette: HTMLElement) {
		const chats = palette.getElementsByClassName("speech-bubble");
		Array.from(chats).forEach((chat) => chat.remove());
	  }
	
  function copyAcnt(type:string){
    var account;
    switch(type){
      case "b":account="신한 110483943969 전시은";break;
      case "g":account="신한 110373943891 이건호";break;
      default:account="";
    }
    navigator.clipboard.writeText(account);
	  
  }

  function popConfetti()
  {
	confetti();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
	let element = document.getElementById("rsvp");
	if (element!==null)
	{
		element.classList.remove("appear-down-centered");
		element.classList.add("disappear-up-centered");
	}
	element = document.getElementById("couple");
	if (element!==null){
		  element.classList.remove("sad");
	}
	
	confetti();

    const form = event.currentTarget;
    const name = (form.querySelector("input[name=rsvp-name]") as HTMLInputElement)?.value;
    const attend = (form.querySelector("input[name=rsvp-attend]:checked") as HTMLInputElement)?.id;
    const eNum = form.querySelector("input[name=rsvp-number]:checked") as HTMLInputElement;
    const num = eNum ? eNum.id : '0';

    await fetch("/api/write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, attend, num }),
    });
  }

function showContents(event: React.MouseEvent<HTMLDivElement>){
	event.preventDefault();
	event.currentTarget.id;
	var field;
	const elementId = event.currentTarget.id.split("-")[1];
	    
	document.querySelectorAll<HTMLElement>(".contentbox").forEach((box) => {
      box.style.display = "none";
      field = document.getElementById("story");
	  if (field!=null) clearChat(field);
    });
	field = document.getElementById(elementId);

    if (field) {
	  field.classList.remove("disappear-up-centered");
	  field.classList.add("appear-down-centered");
      field.style.opacity = "1";
      field.style.display = "block";
    }	   
}
function hideContents(){
	const contents=document.querySelectorAll<HTMLElement>(".contentbox");
	contents.forEach((box)=>{
		 if (box.style.display !== "none") 
		 {
			box.classList.remove("appear-down-centered");
			box.classList.add("disappear-up-centered");
		  setTimeout(() => {
			box.style.display = "none";
		  }, 300); 
		 }
	});
}
	
  async function getStory(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
	  showContents(event);
    const type = event.currentTarget.getAttribute("data-type");

    const response = await fetch("/api/story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });

    const rtrn = await response.json();
    if (rtrn.result) {
      const data = rtrn.result;
      const field = document.getElementById("story");
      if (Array.isArray(data)) {
        data.forEach(({ speaker, message, effect }: any, index: number) => {
          setTimeout(() => {
            addChat(field, speaker, message, effect);
          }, 300 * index);
        });
      } else {
        const { speaker, message, effect } = data;
        addChat(field, speaker, message, effect);
      }
    }
  }


  return (
    <>
      <div className="container">
        <div id="information">06. 14 6PM 💒 세인트메리엘 2F</div>
		<div id="illust">
			<div id="groomtag" className="tag">이건호</div>
			<div id="bridetag" className="tag">전시은</div>
		  <div className="background">
            <div className="door"></div>
            <div className="rug"></div>
          </div>
          <div className="foreground">
            <div id="bouncer" className="bouncer">
              <div className="head">
                <div className="neck"></div>
                <div className="eye left"></div>
                <div className="eye right"></div>
                <div className="ear"></div>
              </div>
              <div className="body"></div>
              <div className="arm"></div>
            </div>
            <div id="couple">
              <div id="groom">
                <div className="head">
                  <div className="hair"></div>
                  <div className="hair-2"></div>
                  <div className="neck"></div>
                  <div className="eye left"></div>
                  <div className="eye right"></div>
                  <div className="mouth"></div>
                  <div className="ear"></div>
                </div>
                <div className="body"></div>
                <div className="arm"></div>
              </div>
              <div id="bride">
                <div className="head">
                  <div className="hair"></div>
                  <div className="hair-2"></div>
                  <div className="neck"></div>
                  <div className="eye left"></div>
                  <div className="eye right"></div>
                  <div className="mouth"></div>
                  <div className="ear"></div>
                </div>
                <div className="body"></div>
                <div className="arm"></div>
              </div>
            </div>
            <div className="poles">
              <div className="pole left"></div>
              <div className="pole right"></div>
              <div className="rope"></div>
            </div>
          </div>
        </div>
        <div id="contents">
          <div id="menu" className="speech-bubble bridebubble">
            <div id="btn-map" onClick={showContents}>🚗</div>
            <div id="btn-rsvp" onClick={showContents}>💌</div>
            <div id="btn-photo" onClick={showContents}>📷</div>
            <div id="btn-money" onClick={showContents}>💵</div>
            <div id="btn-story" onClick={getStory} data-type="groom">🤵</div>
            <div id="btn-story" onClick={getStory} data-type="bride">👰</div>
            <div id="btn-story" onClick={getStory} data-type="love">💍</div>
            <div id="btn-joy" onClick={popConfetti}>🎉</div>
          </div>
          <div id="rsvp" className="contentbox palette">
            <button className="close-btn" onClick={hideContents}>X</button>
            <form onSubmit={handleSubmit}>
              <div id="rsvp-attend">
                <input type="radio" name="rsvp-attend" id="yes" />
                <label htmlFor="yes">참석 가능해요</label>
                <input type="radio" name="rsvp-attend" id="no" />
                <label htmlFor="no">마음으로 함께할게요</label>
              </div>
              <div id="rsvp-number">
                <input type="radio" name="rsvp-number" id="1" />
                <label htmlFor="1">1명</label>
                <input type="radio" name="rsvp-number" id="2" />
                <label htmlFor="2">2명</label>
                <input type="radio" name="rsvp-number" id="3" />
                <label htmlFor="3">3+</label>
			</div>
				
              <div id="rsvp-name">
                <p>By.</p>
                <input type="text" name="rsvp-name" defaultValue="성함" />
                <input type="submit" value="💗" />
              </div>
            </form>
          </div>
          <div id="photo" className="contentbox palette">
            <button className="close-btn" onClick={hideContents}>X</button>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageCarousel></ImageCarousel>
      </div>
          </div>
          <div id="map" className="contentbox palette">
            <button className="close-btn" onClick={hideContents}>X</button>
            <img
              src="image/map.jpg"
              alt="map"
            />
            <p>강남역 1번출구에서 셔틀버스를 운행합니다</p>
          </div>
          <div id="money" className="contentbox palette">
          <button className="close-btn" onClick={hideContents}>X</button>
          <div>
            마음 전하시는곳
            <button className="bubbly-button" onClick={() => copyAcnt('g')} >신랑에게 보내기</button>
            <button className="bubbly-button" onClick={() => copyAcnt('b')} >신부에게 보내기</button>
          </div>
        </div>
          <div id="story" className="contentbox story"></div>
		  <div id="joy" className="contentbox"></div>
        </div>
      </div>
    </>
  );
}
