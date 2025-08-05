import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faAngular,
  faJs,
  faPython,
  faHtml5,
  faCss3Alt,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDatabase,
  faServer,
  faFeather,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

const allSkill = [
  { name: "React", icon: faReact,src:'./images/skills/react-svgrepo-com.svg' },
  { name: "Angular", icon: faAngular,src:'./images/skills/angular-svgrepo-com.svg' },
  { name: "TypeScript", icon: faFeather ,src:'./images/skills/typescript-icon-svgrepo-com.svg'}, // alternatif ikon
  { name: "JavaScript", icon: faJs,src:'./images/skills/js.svg' },
  { name: "Python", icon: faPython,src:'./images/skills/python-svgrepo-com.svg' },
  { name: "HTML", icon: faHtml5 ,src:'./images/skills/html.svg'},
  { name: "CSS", icon: faCss3Alt,src:'./images/skills/css-3-svgrepo-com.svg' },
  { name: "MsSQL", icon: faDatabase,src:'./images/skills/sql.svg' },
  { name: "MongoDB", icon: faDatabase,src:'./images/skills/mongodb.svg' },
  { name: "Cpp", icon: faNodeJs,src:'./images/skills/cpp-svgrepo-com.svg' },
  { name: "Office", icon: faServer,src:'./images/skills/office-1-logo-svgrepo-com.svg' },
  { name: "Git", icon: faServer,src:'./images/skills/git-svgrepo-com.svg' },
];

function Skills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const groupSize = 4;
  const totalGroups = Math.ceil(allSkill.length / groupSize);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalGroups);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const groupedSkills = [];
  for (let i = 0; i < allSkill.length; i += groupSize) {
    groupedSkills.push(allSkill.slice(i, i + groupSize));
  }

  const translateX = `-${currentIndex * 33}%`;

  return (
    <div className="w-full overflow-hidden py-12">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(${translateX})`,
          width: `${100 * totalGroups}%`,
        }}
      >
        {groupedSkills.map((group, groupIdx) => (
          <div
            key={groupIdx}
            className="w-full flex justify-center gap-[200px]"
          >
            {group.map((skill, idx) => (
              <div
                key={idx}
                className=" hover:scale-105 transition"
              >
<div className="relative group cursor-pointer w-fit">
 <img src={skill.src} alt="" className="h-28 w-auto cursor-pointer"  />  

  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-stone-800 text-white text-xs rounded px-3 py-1 whitespace-nowrap z-10">
    {skill.name}
  </div>
</div>

                
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
