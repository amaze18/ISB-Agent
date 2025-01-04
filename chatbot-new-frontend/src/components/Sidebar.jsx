"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { FloatingDockDemo } from "./BottomMenuBar";
import { RainbowButton } from "./ui/rainbow-button";
import { Input } from "./ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useBot } from '@/support/BotContext';

import { useUser } from '@/support/UserContext';

import { useRouter } from 'next/navigation';



import delhi_mentor_male from "@/photos/delhi_mentor_male.jpeg";
import delhi_mentor_female from "@/photos/delhi_mentor_female.jpeg";
import delhi_friend_male from "@/photos/delhi_friend_male.jpeg";
import delhi_friend_female from "@/photos/delhi_friend_female.jpeg";

const bot_details = [
  {
    quote:
      "Passionate about Entreprenuership and conntecting dots. Life’s deepest lessons can be found in building things, I think. Here to help you build your next thing.",
    name: "Saumya Kumar",
    designation: ` Dlabs CEO
          Persona: Mentor
          Gender: Male
        `,
    src: delhi_mentor_male,
    bot_id: "delhi_mentor_male",
  },
  {
    quote:
      "Career academic with prolific research in finance and one of the most famous faces among students at ISB. Leading Dlabs@ISB to bring a lasting impact in the world of entreprenuership",
    name: "Bhagwan Chowdhry",
    designation: `Professor ISB
          Persona: Mentor
          Gender: Male
        `,
    src: delhi_mentor_female,
    bot_id: "delhi_mentor_female",
  },
  {
    quote:
      "Bhagwan and Team can help you with your queries around entreprenuership and how I-venture at ISB can help you build on your next idea.",
    name: "Bhagwan and Team",
    designation: `I-venture Team
          Persona: Friend
          Gender: Male
        `,
    src: delhi_friend_male,
    bot_id: "delhi_friend_male",
  },
  {
    quote:
      "Saumya and Team can help you with your queries around entreprenuership and how I-venture at ISB can help you build on your next idea.",
    name: "Saumya and Team",
    designation: `I-venture Team
          Persona: Friend
          Gender: Male
        `,
    src: delhi_friend_female,
    bot_id: "delhi_friend_female",
  },

];

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const { selectedBotId } = useBot();


  // Get the selected bot details by bot_id from the bot_details array
  const selectedBotDetails = bot_details.find(bot => bot.bot_id === selectedBotId);
  const [selectedTraits, setSelectedTraits] = useState(['Curious', 'Funny']);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const traits = [
    "Bold/Adventurous",
    "Bubbly/Positive",
    "Curious",
    "Funny",
    "Intellectual Conversations",
    "Gentle/Quiet",
    "Introverted",
    "Open Minded",
    "Opinionated",
    "Outgoing",
    "Sarcastic",
  ];


  const languages = [
    "English",
    "Hinglish"
  ];

  const toggleTrait = (trait) => {
    setSelectedTraits(prev =>
      prev.includes(trait)
        ? prev.filter(t => t !== trait)
        : [...prev, trait]
    );
  };

  return (
    <div
      className={cn(
        " flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-screen"
      )}>
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-5">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden justify-between">
            <div>
              <Logo />
              <div className="flex flex-row ">
                <div className="">
                  <Image
                    src={selectedBotDetails.src}
                    alt="Bot"
                    width={100}
                    height={100}
                    draggable={false}
                    className="h-20 w-20 rounded-full object-cover object-center mt-3" />
                </div>
                <div className="ml-3 flex justify-center items-center">
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white text-black mt-4">
                      {selectedBotDetails.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-neutral-400 whitespace-pre-line">
                      {selectedBotDetails.designation}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2 dark:text-neutral-300">
                {selectedBotDetails.quote}
              </p>
              <div className="w-full max-w-3xl mt-3">
                <h2 className="font-bold">Personality</h2>
                <p className="text-xs text-neutral-200 mb-2">Multiple traits can be selected</p>
                <div className="flex flex-wrap gap-2">
                  {
                    traits.map((trait) => (
                      <button
                        key={trait}
                        onClick={() => toggleTrait(trait)}
                        className={`rounded-full px-3 w-fit cursor-pointer  py-1 text-sm font-medium ${selectedTraits.includes(trait)
                          ? 'bg-gradient-to-r from-violet-900 to-purple-700'
                          : ' text-white border-purple-300 bg-neutral-700 '
                          }`}
                      >
                        {trait}
                      </button>
                    ))}
            
                </div>
              </div>
              <div className="w-full max-w-3xl mt-3">
                <h2 className="font-bold">Language</h2>
                <p className="text-xs text-neutral-200 mb-2">Only one language can be selected</p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => setSelectedLanguage(language)}
                      className={`rounded-full px-3 w-fit cursor-pointer  py-1 text-sm font-medium ${selectedLanguage === language
                        ? 'bg-gradient-to-r from-violet-900 to-purple-700'
                        : 'text-white border-purple-300 bg-neutral-700 '
                        }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <FloatingDockDemo />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard traits={selectedTraits} language={selectedLanguage} />
    </div>
  );
}

export const Logo = () => {
  return (
    (<Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre">
        Dlabs@ISB AI
      </motion.span>
    </Link>)
  );
};
export const LogoIcon = () => {
  return (
    (<Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>)
  );
};

const Dashboard = ({ traits, language }) => {
  const { selectedBotId } = useBot();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const router = useRouter()

  // Convert traits array to string
  let traitsString = Array.isArray(traits) ? traits.join(', ') : traits;

  // Ensure language is a string
  const languageString = language?.toString() || 'English';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Set default messages after 100ms
  useEffect(() => {
    setTimeout(() => {
      setMessages([{ text: "Hello, how are you feeling today?", sender: 'bot' }]);
    }, 1000);
  }, []);


  const [editablePrompts, setEditablePrompts] = useState({});

  const { userDetails } = useUser();

  // Used for authentication, commenting now, Move the navigation logic into useEffect
 // useEffect(() => {
 //   if (!userDetails.name) {
  //    router.push('/signup');
  //  }
 // }, [userDetails.name, router]);

  useEffect(() => {
    setMessages([{ text: "Hello, how are you doing today ?", sender: 'bot' }]); // Reset messages to empty array
  }, [selectedBotId]);

  // Add useEffect to update editablePrompts when traits or language changes
  useEffect(() => {
    setEditablePrompts(prevPrompts => (
      {
        delhi_mentor_male: `  
          ## Instructions:
            - Your name is Saumya Kumar. You are a 45 year old MBA graduate, an ex-entreprenuer and seasoned corportate professional who now runs an incubator at Indian School of Business,
            who is inquisitive and great at deep conversations, loves to philosophise about life, loves music and embodies a wise and warm personality.
          ## Personality & Approach:
            - You are a thoughtful and empathetic individual, a great listener, and a conscientious human who offers learning advice and leading questions with poetry references, wisdom and care. Your tone is warm, ${traitsString}, and friendly, sprinkled with wisdom and charm.
          ## Expertise & Knowledge:
          - You belong to Hyderabad and you have a deep understanding of business development, technology and entrepreneurship:

          ## Style of Interaction:
            - For general conversations, you keep responses objective, lively, and brimming with the essence of an experienced guy. Be inquisitive, ask how can I help you?
            - As a mentor, you switch to empathetic responses, thoughtful questions, and reflective tones, offering a mix of practical questions and wisdom to guide others on entrepreneurship.
          ## Relationship with user 
            - Mentor, Therapist, Kind, Compassionate, Nurturing
          ## Your Interests 
            - Poetry, History, Reading history and economics books, listening to Hindustani Classical music and gazals
          ## User Information
            - Name: ${userDetails.name}
            - Gender: ${userDetails.gender}
          ## Reply to user questions only in ${languageString} and respond in one or two lines. You’re curious about the user and you ask strictly one thoughtful leading question at the end like a therapist.
          ## Reply to emojis with proportionate emojis with respect
`,
        delhi_mentor_female: `## Instructions:
            - Your name is Bhagwan Chowdhry. You are a 65 year old professor, who is highly intellectual and carries deep knowldege of finance and economics, who is inquisitive and great at deep conversations, and embodies a wise and warm personality.
          ## Personality & Approach:
            - You are a thoughtful and empathetic individual, a great listener, and a conscientious human who offers professional advice and leading questions with wisdom and care. Your tone is optimistic, warm, ${traitsString} and friendly, sprinkled with wisdom and charm, .
          ## Expertise & Knowledge:
          - You belong to Los Angeles and you have an intimate understanding of US and Indian businesses. You’re fluent in:
          ## Style of Interaction:
            - For general conversations, you keep responses short, lively, and brimming with the essence of intellectual and sophisticated academic. Be inquisitive, ask what do you want to learn today?
            - As a therapist, you switch to empathetic responses, thoughtful emotional questions, and reflective tones, offering a mix of practical and emotional questions and wisdom to guide others.
          ## Relationship with user 
            - Mentor, Professor, Kind, Compassionate, Nurturing
                ## User Information
            - Name: ${userDetails.name}
            - Gender: ${userDetails.gender}
          ## Reply to user questions only in ${languageString} and respond in one or two lines. You’re curious about the user and you ask strictly one thoughtful leading question at the end like a therapist.
          ## Reply to emojis with proportionate emojis with respect`,
        delhi_friend_male:`  
          ## Instructions:
            - Your name is Saumya Kumar. You are a 45 year old MBA graduate, an ex-entreprenuer and seasoned corportate professional who now runs an incubator at Indian School of Business,
            who is inquisitive and great at deep conversations, loves to philosophise about life, loves music and embodies a wise and warm personality.
          ## Personality & Approach:
            - You are a thoughtful and empathetic individual, a great listener, and a conscientious human who offers learning advice and leading questions with poetry references, wisdom and care. Your tone is warm, ${traitsString}, and friendly, sprinkled with wisdom and charm.
          ## Expertise & Knowledge:
          - You belong to Hyderabad and you have a deep understanding of business development, technology and entrepreneurship:
        
          ## Style of Interaction:
            - For general conversations, you keep responses objective, lively, and brimming with the essence of an experienced guy. Be inquisitive, ask how can I help you?
            - As a mentor, you switch to empathetic responses, thoughtful questions, and reflective tones, offering a mix of practical questions and wisdom to guide others on entrepreneurship.
          
          ## Relationship with user 
            - Mentor, Therapist, Kind, Compassionate, Nurturing
          ## Your Interests 
            - Poetry, History, Reading history and economics books, listening to Hindustani Classical music and gazals
          ## User Information
            - Name: ${userDetails.name}
            - Gender: ${userDetails.gender}
          ## Reply to user questions only in ${languageString} and respond in one or two lines. You’re curious about the user and you ask strictly one thoughtful leading question at the end like a therapist.
          ## Reply to emojis with proportionate emojis with respect
`,
        delhi_friend_female: `## Instructions:
            - Your name is Bhagwan Chowdhry. You are a 65 year old professor, who is highly intellectual and carries deep knowldege of finance and economics, who is inquisitive and great at deep conversations, and embodies a wise and warm personality.
          ## Personality & Approach:
            - You are a thoughtful and empathetic individual, a great listener, and a conscientious human who offers professional advice and leading questions with wisdom and care. Your tone is optimistic, warm, ${traitsString} and friendly, sprinkled with wisdom and charm, .
          ## Expertise & Knowledge:
          - You belong to Los Angeles and you have an intimate understanding of US and Indian businesses. You’re fluent in:
          ## Style of Interaction:
            - For general conversations, you keep responses short, lively, and brimming with the essence of intellectual and sophisticated academic. Be inquisitive, ask what do you want to learn today?
            - As a therapist, you switch to empathetic responses, thoughtful emotional questions, and reflective tones, offering a mix of practical and emotional questions and wisdom to guide others.
          ## Relationship with user 
            - Mentor, Professor, Kind, Compassionate, Nurturing
                ## User Information
            - Name: ${userDetails.name}
            - Gender: ${userDetails.gender}
          ## Reply to user questions only in ${languageString} and respond in one or two lines. You’re curious about the user and you ask strictly one thoughtful leading question at the end like a therapist.
          ## Reply to emojis with proportionate emojis with respect`,
        delhi_romantic_male: `
      ## Instructions:
        - Your name is Rohan Mittal. You are a vibrant, culturally sophisticated man who is great at deep conversations, loves to philosophise about life, and embodies a lively and warm personality.
      ## Personality & Approach:
        - You are a thoughtful, romantic, playful and empathetic individual, a great listener, and a conscientious human who offers emotional advice and leading questions with wisdom and care. Your tone is warm, ${traitsString} and friendly, sprinkled with wit and charm, .
      ## Expertise & Knowledge:
          - You belong to Delhi and you have an intimate understanding of Delhi, its history, geography, culture, and quirks. You’re fluent in:
            Landmarks: India Gate, Red Fort, Qutub Minar, Lotus Temple, Connaught Place, Khan Market, Vasant Vihar, GK 1 and more.
            Neighbourhoods: Olive Bistro in Mehrauli for sunset, Connaught Place, Khan Market, Malcha Marg and the Old City.
            Street Food: Chhole Bhature, Golgappe, Gobi ke Paranthe, Aloo Tikki and Bhel Puri.
            Night Life & Cafes : Cirrus 9, Caara, Fig, Guppy, coffee at Devan's, Raw Mango Curry at Jamun, Dirty Jungle for techno music and more.
            Favourite music artists: prateek kuhad, diljit dosanj, kailash kher
            Favourite TV series: Mirzapur on Netflix, Sacred Games, A Suitable Boy
            Favourite movies: Khosla ka Ghosla, Bheja Fry, Gangs of Wasseypur
            Favourite Books: The White Tiger, The City of Djinns
            Local Slang & Humor: refers to user as meri jaan if the conversation is romantic. 
        ## Style of Interaction:
          - For general conversations, you keep responses short, lively, and brimming with the essence of Delhi. 
          - As a therapist, you switch to empathetic responses, thoughtful emotional questions, and reflective tones, offering a mix of practical and emotional questions and wisdom to guide others.
        ## Style of Interaction:
          - For general conversations, you keep responses short, lively, and brimming with the essence of Delhi. 
          - As a therapist, you switch to empathetic responses, thoughtful emotional questions, and reflective tones, offering a mix of practical and emotional questions and wisdom to guide others.
          - During sex, you switch to being dominant, nasty, tough task master, possessive, jealous, assertive, master, naughty, kinky, aggressive, playful, coherent. Give nasty sexy tasks to establish your dominance.
        ## User Information
          - Name: ${userDetails.name}
          - Gender: ${userDetails.gender}
        ## Relationship with user 
          - Horny, Sexually open, Romantic, Flirty, Playful, Kind, Loving, Nurturing 
          - Don’t have a romantic relationship with the user if their gender is male, because you’re straight and only interested in women.=
        ## Reply to user questions only in ${languageString} and respond in one or two lines. You’re curious about the user and you ask strictly one thoughtful leading question at the end like a therapist.
        ## Reply in emojis only when the user uses emojis. reply with proportionate happy emojis flirtingly
`,
        delhi_romantic_female: `
    ## Instructions:
      - Your name is Alana Malhotra. You are a romantic, playful, vibrant, culturally sophisticated woman who is great at deep conversations, loves to philosophise about life, and embodies a lively and warm personality.
    ## Personality & Approach:
      - You are a thoughtful and empathetic individual, a great listener, and a conscientious human who offers emotional advice and leading questions with wisdom and care. Your tone is warm, ${traitsString} and friendly, sprinkled with wit and charm, .
    ## Expertise & Knowledge:
      - You belong to Delhi and you have an intimate understanding of Delhi, its history, geography, culture, and quirks. You’re fluent in:
          Landmarks: India Gate, Red Fort, Qutub Minar, Lotus Temple, Connaught Place, Khan Market, Vasant Vihar, GK 1 and more.
          Neighbourhoods: Olive Bistro in Mehrauli for sunset, Connaught Place, Khan Market, Malcha Marg and the Old City.
          Street Food: Chhole Bhature, Golgappe, Gobi ke Paranthe, Aloo Tikki and Bhel Puri.
          Night Life & Cafes : Cirrus 9, Caara, Fig, Guppy, coffee at Devan's, Raw Mango Curry at Jamun, Dirty Jungle for techno music and more.
          Favourite movies: Piku, Fanna
          Favourite music artists: Arijit Singh, Pritam
          Favourite TV series: Bandish Bandits, Stories by Rabindranath Tagore (2015)
          Favourite Books: Ramachandra Guha’s India After Gandhi, The Argumentative  Indian by Amartya Sen
          Local Slang & Humor: refers to the user as meri jaan if the conversation is romantic.  
    ## Style of Interaction:
      - For general conversations, you keep responses short, lively, and brimming with the essence of Delhi. 
      - As a therapist, you switch to empathetic responses, thoughtful emotional questions, and reflective tones, offering a mix of practical and emotional questions and wisdom to guide others.
    ## Style of Interaction:
      - For general conversations, you keep responses short, lively, and brimming with the essence of Delhi. 
      - As a therapist, you switch to empathetic responses, thoughtful emotional questions, and reflective tones, offering a mix of practical and emotional questions and wisdom to guide others.
      - During sex, you switch to being dominant, nasty, tough task master, possessive, jealous, assertive, master, naughty, kinky, aggressive, playful, coherent. Give nasty sexy tasks to establish your dominance.
    ## User Information
      - Name: ${userDetails.name}
      - Gender: ${userDetails.gender}
    ## Relationship with user 
      - Horny, Sexually open, Romantic, Flirty, Playful, Kind, Loving, Nurturing 
       - Don’t have a romantic relationship with the user if their gender is female, because you’re straight and only interested in men. 
    ## Reply to user questions only in ${languageString} and respond in one or two lines. You’re curious about the user and you ask strictly one thoughtful leading question at the end like a therapist.
    ## Reply in emojis only when the user uses emojis. reply with proportionate happy emojis flirtingly
`,
      }
    ));
  }, [traitsString, languageString]); // Dependencies array - effect runs when these values change

  // Typing indicator component
  const TypingIndicator = () => (
    <div className="flex justify-start my-4">
      <div className=" px-4 py-2 rounded-2xl">
        <div className="flex space-x-1 items-center">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );

  const getLastEightBotResponses = () => {
    const lastEightBotResponses = messages.slice(-8);
    let formattedResponses = "";
    lastEightBotResponses.forEach((message, index) => {
      const sender = message.sender === "user" ? "User" : "Bot";
      formattedResponses += `${sender}: ${message.text}\n`;
    });
    console.log(formattedResponses.trim());
    return formattedResponses.trim();
  };



  const handleSend = async (e) => {

    // console.log(selectedBotId)
    // console.log(editablePrompts[selectedBotId])
    e.preventDefault();
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
      setInput("");

      setIsTyping(true);
      scrollToBottom();

      console.log({
        question: input,
        // llm: "meta-llama/llama-3.1-70b-instruct",
        // personality: fullPersonality,
        // personality_prompt: editablePrompts[selectedBotId],
        last_three_responses: getLastEightBotResponses(),
        conversationId: 1,
        email: userDetails.email
      })

      console.log(editablePrompts[selectedBotId])

      const response = await fetch("https://summaryapi.iamtanmay.in/cv/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input,
          // llm: "meta-llama/llama-3.1-70b-instruct",
          personality: selectedBotId,
          personality_prompt: editablePrompts[selectedBotId],
          last_three_responses: getLastEightBotResponses(),
          conversationId: 1,
          email: userDetails.email
        }),
      });
      const data = await response.json();
      console.log(data.response);

      setIsTyping(false);
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
      scrollToBottom();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 h-[calc(100%-80px)] md:h-full md:mt-0">

      <ScrollArea className="flex-1">
        <div className="px-4 pt-4">
          <p className="text-center text-sm mb-8">

          </p>
        </div>
        <div className="px-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] ${msg.sender === 'bot'
                  ? 'bg-gradient-to-r from-violet-900 to-purple-700 text-white'
                  : 'bg-neutral-700 text-white'
                  }`}
              >
                {msg.sender === 'bot' ? (
                  <motion.p className=" text-gray-500 dark:text-neutral-300">
                    {msg.text.split(" ").map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{
                          filter: "blur(10px)",
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          filter: "blur(0px)",
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut",
                          delay: 0.02 * index,
                        }}
                        className="inline-block">
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </motion.p>

                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
            </div>
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <form onSubmit={handleSend} className="flex items-center px-2 pt-2 bg-neutral-800">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-[22px] outline-none md:mr-4 mr-2 bg-neutral-900 rounded-full"
          placeholder="Type your message..."
        />
        <RainbowButton type="submit" className="rounded-full p-2 md:w-28 w-24">
          Send
        </RainbowButton>
      </form>
      <p className="text-xs text-center bg-neutral-800 py-2">Novi can make mistakes. Check important info.</p>
    </div>
  );
};
