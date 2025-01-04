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
    }
  ];
  return <AnimatedTestimonials suppressHydrationWarning testimonials={testimonials} onClose={onClose}/>;
}
