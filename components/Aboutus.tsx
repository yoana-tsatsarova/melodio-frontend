import React from "react";
import Member from "@/components/Member";
import Image from "next/image";

const Aboutus = () => {
    const Membermob   = [
        {
            id: "1",
            name: "Yoana Tsatsarova",
            href: "1",
            bio: "Hey there, I'm Yoana, a 20-year-old who's all about fun and learning! Programming is like an awesome game to me - I love solving problems and getting that sweet sense of achievement. Besides coding, I'm into reading, singing, dancing, and MUSIC! I'm always up for new challenges and working with others to achieve cool stuff together :rocket::smile:",
            link: "https://www.linkedin.com/in/jhon-doe/"
        },
        {
            id: "2",
            name: "Carolina Nichita",
            href: "1",
            bio: "Passionate about growth and learning, I boldly switched from accountancy to tech. :rocket:\n" +
                "SALT's internship fueled my problem-solving superpowers! :muscle:\n" +
                "With a curious mind and a knack for innovation, I'm always exploring new tech galaxies. :milky_way:\n" +
                "In dynamic teamwork, I deliver high-quality solutions that leave our projects soaring! :rocket::smile:",
            link: "https://www.linkedin.com/in/jhon-doe/"
        },
        {
            id: "3",
            name: "Togrul Hasanbeyli",
            href: "./images/IMG_1387.jpg",
            bio: "I am a Fullstack Java Developer with a background in Environmental Engineering. In my early years, I pursued a career in professional football, but after moving to another country, I discovered a passion for Photography and Cinema. I was honored with the title of Landscape Photographer of the year in 2017. This experience motivated me to dive into coding and create my own application, elevating photos with my lut packages. This journey led me to pursue a coding career, turning my passion into a profession.",
            link: "https://www.linkedin.com/in/jhon-doe/"
        },
        {
            id: "4",
            name: "Ryan Lisse",
            href: "1",
            bio: "Hi, I’m @RyanLisse\n" +
                "🏆 I’m a creative, marketer and a full-stack developer\n" +
                "Currently working as Software Consultant @ \"</ Salt>\"\n" +
                "👨🏾‍🦱👩🏾🐶 Proud father of two kids and a dog",
            link: "https://www.linkedin.com/in/jhon-doe/"
        },
    ];
  return (
    <section
      className={`flex flex-col min-h-screen bg-gray-100 text-gray-900 py-20 md:text-4xl text-3xl`}>
      <div className="container mx-auto px-11">
        <p className="leading-tight max-w-5xl tracking-tight mx-auto text-4xl">
          <strong> We will help you ship better apps, faster. </strong> Our team
          of expert engineers has created the best user experiences in some of
          the most popular apps worldwide.
        </p>
      </div>
      <div className="container mx-auto px-11 text-center mt-28">
        <h2>
          <strong>Our Team</strong>
        </h2>
        <div className="mt-2"> the &ldquo;spec-ops&rdquo;</div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-20">
        <Image src="/images/IMG_1387.jpg" alt="JaffaPuffs" />
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
