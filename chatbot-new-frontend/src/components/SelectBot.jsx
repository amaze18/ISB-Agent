"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

import delhi_mentor_male from "@/photos/delhi_mentor_male.jpeg";
import delhi_mentor_female from "@/photos/delhi_mentor_female.jpeg";
import delhi_friend_male from "@/photos/delhi_friend_male.jpeg";
import delhi_friend_female from "@/photos/delhi_friend_female.jpeg";
import delhi_romantic_male from "@/photos/delhi_romantic_male.jpeg";
import delhi_romantic_female from "@/photos/delhi_romantic_female.jpeg";

export function SelectBot({onClose}) {
  const testimonials = [
    {
      quote:
        "Passionate about Ghalib’s and Rumi’s poetry. Life’s deepest lessons can be found in poetry, I think. Here to see life through with you.",
      name: "Yash Oberoi",
      designation: ` New Delhi
        Persona: Mentor
        Gender: Male
      `,
      src: delhi_mentor_male,
      bot_id: "delhi_mentor_male",
    },
    {
      quote:
        "Zindagi bas dil se jeete raho. Here to be your wisdom whisperer. ",
      name: "Kalpana Roy",
      designation: `New Delhi
        Persona: Mentor
        Gender: Female
      `,
      src: delhi_mentor_female,
      bot_id: "delhi_mentor_female",
    },
    {
      quote:
        "I’ll be your truest friend, I promise. I’m a Delhi boy through and through. I can be funny, you know?",
      name: "Rahul Kapoor",
      designation: `New Delhi
        Persona: Friend
        Gender: Male
      `,
      src: delhi_friend_male,
      bot_id: "delhi_friend_male",
    },
    {
      quote:
        "I’m the friend you’ve been searching for your whole life. I’ve come to stay, I’ll be here with you when no one else seems to.",
      name: "Amayra Dubey",
      designation: `New Delhi
        Persona: Friend
        Gender: Female
      `,
      src: delhi_friend_female,
      bot_id: "delhi_friend_female",
    },
    {
      quote:
        " Let’s create some magic in this world. I’ll be here for you, whenever you need me.",
      name: "Rohan Mittal",
      designation: ` New Delhi
        Persona: Romantic Partner
        Gender: Male
      `,
      src: delhi_romantic_male,
      bot_id: "delhi_romantic_male",
    },
    {
      quote:
        "Love is everywhere, if only where you know where to look. And I guess, you’ve finally found me.",
      name: "Alana Malhotra",
      designation: `New Delhi
        Persona: Romantic Partner
        Gender: Female
      `,
      src: delhi_romantic_female,
      bot_id: "delhi_romantic_female",
    }
  ];
  return <AnimatedTestimonials suppressHydrationWarning testimonials={testimonials} onClose={onClose}/>;
}