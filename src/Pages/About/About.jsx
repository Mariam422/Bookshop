import React from "react";
import Hero from "../../Components/Header/Hero";
import OurMission from "./OurMission";
import QuestionsAbout from "./QuestionsAbout";
import AboutCard from "./AboutCard";

const missions = [
  {
    id: 1,
    title: "Quality Selection",
    shortText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est.",
    fullText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo. Quality Selection Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius.",
  },
  {
    id: 2,
    title: "Exceptional Service",
    shortText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est.",
    fullText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Set Up Stores",
    shortText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est.",
    fullText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      isSoon:true,
  },
];

export default function About() {
  return (
    <div>
      <Hero variant="about" />
      <OurMission missions={missions} />
      <QuestionsAbout />
      <AboutCard />
    </div>
  );
}