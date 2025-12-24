"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(CustomEase, SplitText);

const splitTextElements = (
  selector: string,
  type = "words,chars",
  addFirstChar = false
) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    const splitText = new SplitText(element, {
      type,
      wordsClass: "word",
      charsClass: "char",
    });

    if (type.includes("char")) {
      console.log("🚀 ~ splitTextElements ~ splitText:", splitText, selector);
      splitText.chars.forEach((char, index) => {
        const originalText = char.textContent;
        char.innerHTML = `<span>${originalText}</span>`;

        if (addFirstChar && index === 0) {
          char.classList.add("first-char");
        }
      });
    }
  });
};

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    CustomEase.create("hop", ".8, 0, .3, 1");

    splitTextElements(".intro-title h1", "words,chars", true);
    splitTextElements(".outro-title h1");
    splitTextElements(".tag p", "words");

    const isMobile = window.innerWidth <= 1000;

    gsap.set(
      [
        ".split-overlay .intro-title .first-char span",
        ".split-overlay .outro-title .char span",
      ],
      { x: "0%" }
    );

    gsap.set(".split-overlay .intro-title .first-char", {
      x: isMobile ? "7.5rem" : "18rem",
      y: isMobile ? "-1rem" : "-2.5rem",
      fontWeight: "900",
      scale: 0.75,
    });

    gsap.set(".split-overlay .outro-title .char", {
      x: isMobile ? "-3rem" : "-8rem",
      fontSize: isMobile ? "6rem" : "14rem",
      fontWeight: "500",
    });

    const tl = gsap.timeline({ defaults: { ease: "hop" } });
    const tags: Element[] = gsap.utils.toArray(".tag") as Element[];

    tags.forEach((tag, index) => {
      tl.to(
        tag.querySelectorAll("p .word"),
        {
          y: "0%",
          duration: 0.75,
        },
        0.5 + index * 0.1
      );
    });

    tl.to(
      ".preloader .intro-title .char span",
      {
        y: "0%",
        duration: 0.75,
        stagger: 0.05,
      },
      0.5
    )
      .to(
        ".preloader .intro-title .char:not(.first-char) span",
        {
          y: "100%",
          duration: 0.75,
          stagger: 0.05,
        },
        2
      )
      .to(
        ".preloader .outro-title .char span",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.075,
        },
        2.5
      )
      .to(
        ".preloader .intro-title .first-char",
        {
          x: isMobile ? "7rem" : "21.25rem",
          duration: 1,
          fontSize: isMobile ? "9rem" : "14rem",
        },
        3.5
      )
      .to(
        ".preloader .outro-title .char",
        {
          x: isMobile ? "0rem" : "-7rem",
          duration: 1,
          fontSize: isMobile ? "9rem" : "14rem",
          // onComplete: () => {
          //   gsap.set(".preloader", {
          //     clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%",
          //   });

          //   gsap.set(".split-overlay", {
          //     clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
          //   });
          // },
        },
        3.5
      )
      .to(
        ".landing-page-container",
        {
          clipPath: "polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%",
          duration: 1,
        },
        4
      );

    tags.forEach((tag, index) => {
      tl.to(
        tag.querySelectorAll("p .word"),
        {
          y: "100%",
          duration: 0.75,
        },
        4.5 + index * 0.1
      );
    });

    tl.to(
      [".preloader", ".split-overlay"],
      {
        y: (i) => (i === 0 ? "-100%" : "100%"),
        duration: 1,
      },
      5
    ).to(
      ".landing-page-container",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
      },
      5
    );
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <div className='preloader'>
        <div className='intro-title'>
          <h1 className='uppercase font-semibold text-8xl h1-title'>
            Odhav Enterprise
          </h1>
        </div>
        <div className='outro-title'>
          <h1 className='uppercase font-semibold text-8xl h1-title'>E</h1>
        </div>
      </div>
      <div className='split-overlay'>
        <div className='intro-title'>
          <h1 className='uppercase font-semibold text-8xl h1-title'>
            Odhav Enterprise
          </h1>
        </div>
        <div className='outro-title'>
          <h1 className='uppercase font-semibold text-8xl h1-title'>E</h1>
        </div>
      </div>

      {/* TO show the Types of work we do */}
      <div className='tags-overlay'>
        <div className='tag tag-1'>
          <p className='uppercase text-sm font-medium'>Renewable Energy</p>
        </div>
        <div className='tag tag-2'>
          <p className='uppercase text-sm font-medium'>
            Wind Turbine Foundations
          </p>
        </div>
        <div className='tag tag-3'>
          <p className='uppercase text-sm font-medium'>Solar Installations</p>
        </div>
        <div className='tag tag-4'>
          <p className='uppercase text-sm font-medium'>Transmission Lines</p>
        </div>
        <div className='tag tag-5'>
          <p className='uppercase text-sm font-medium'>Wind Farm Development</p>
        </div>
      </div>
    </>
  );
}
