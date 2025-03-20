'use client';

import Image from "next/image";
import Script from "next/script";
import dynamic from "next/dynamic";
import venue_map from "../../image/map.jpg";
import { useScript } from "../hooks/useScript";
import React, { useRef, useState, FormEvent } from "react";

export default function Home() {
  useScript("script.js");

  function addChat(palette: HTMLElement, startFrom: string, sentence: string, effect: string) {
    const chat = document.createElement("div");
    chat.classList.add("speech-bubble");
    chat.classList.add(startFrom === "groom" ? "groombubble" : "bridebubble");
    if (effect !== "") chat.classList.add(effect);
    chat.innerText = sentence;
    chat.style.animation = "popup 0.5s ease-out";
    palette.appendChild(chat);
  }

  function clearChat(palette: HTMLElement) {
    const chats = palette.getElementsByClassName("speech-bubble");
    Array.from(chats).forEach(chat => chat.remove());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.querySelector("input[name=rsvp-name]") as HTMLInputElement).value;
    const attend = (form.querySelector("input[name=rsvp-attend]:checked") as HTMLInputElement)?.id || "";
    const eNum = (form.querySelector("input[name=rsvp-number]:checked") as HTMLInputElement);
    const num = eNum ? eNum.id : "0";

    await fetch("/api/write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, attend, num }),
    });
  }

  async function writeStory() {
    // Implement story writing functionality
  }

  async function getStory(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    const type = event.currentTarget.getAttribute("data-type") || "";

    const response = await fetch("/api/story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
    
    const rtrn = await response.json();
    if (rtrn.result) {
      const data = rtrn.result;
      const field = document.getElementById("story") as HTMLElement;
      clearChat(field);
      if (Array.isArray(data)) {
        data.forEach(({ speaker, message, effect }) => {
          setTimeout(() => addChat(field, speaker, message, effect), 500);
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
              <div className="tag">이건호</div>
              <div id="groom" className="character"></div>
              <div id="bride" className="character"></div>
              <div className="tag">전시은</div>
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
            <div id="btn-map">🚗</div>
            <div id="btn-rsvp">💌</div>
            <div id="btn-photo">📷</div>
            <div id="btn-money">💵</div>
            <div id="btn-story" onClick={getStory} data-type="groom">🤵</div>
            <div id="btn-story" onClick={getStory} data-type="bride">👰</div>
            <div id="btn-story" onClick={getStory} data-type="love">💍</div>
            <div id="btn-write" onClick={writeStory}>✈️</div>
          </div>
          <div id="rsvp" className="contentbox palette">
            <button className="close-btn">X</button>
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
                <label htmlFor="3">3명 이상</label>
              </div>
              <div id="rsvp-name">
                <p>By.</p>
                <input type="text" name="rsvp-name" defaultValue="성함" />
                <input type="submit" value="💗" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
