import TextType from "../assets/components/ReactBits/TextAnimation/BlurText";

function About() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <section
      id="about"
      className="animation-about px-4  gap-10 flex flex-col items-center justify-center max-w-5xl min-h-screen z-1"
    >
      {/* Başlık */}
      <h1  className="text-4xl selection:text-[var(--color-100)] selection:bg-[var(--color-900)] sm:text-[18px] md:text-5xl font-bold text-[var(--color-900)]
          dark:text-[var(--color-200)]">
        I'M MUHAMMED EMIN ALDAŞ
      </h1>
     <h3 className="mb-6">
        <TextType
          className="a-title text-xl selection:text-[var(--color-r-200)] selection:bg-[var(--color-r-600)] sm:text-[18px] md:text-3xl font-bold text-[var(--color-r-600)]
          dark:text-[var(--color-r-300)]"
          textColors={[""]}
         text={[
  "Frontend Developer",
  "Full Stack Developer",
  "Software Engineer"
]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
      </h3>
      {/* Açıklama */}
      <p className="text-base sm:text-[16px] text-center text-[var(--color-800)] selection:text-[var(--color-50)] selection:bg-[var(--color-900)] leading-relaxed
      dark:text-[var(--color-50)]">
        I was born in Viranşehir, Şanlıurfa and I’m currently 20 years old. I’m a final-year
        Software Engineering student at Beykoz University.
        <br /><br />
        My curiosity about computers naturally led me to software development. Since starting
        university, I’ve been actively learning and building in this field.
        <br /><br />
        I enjoy writing code, solving problems, and continuously improving myself. I see software
        not only as a profession but also as a creative outlet.
        <br /><br />
        I’m open to innovation, eager to grow, and excited for what the future holds.
      </p>
      <div className="flex justify-center items-center p-10 gap-10">
        <button>
         
<div class="relative inline-flex items-center justify-center gap-4 group">
  <div
    class="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 dark:from-[var(--color-50)] dark:via-[var(--color-300)] dark:to-[var(--color-500)] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
  ></div>
  <a
    role="button"
    class="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30 dark:text-[var(--color-700)]  dark:bg-[var(--color-100)] dark:hover:bg-[var(--color-200)]"
    title="payment"
    href="#"
    >View Projects<svg
      aria-hidden="true"
      viewBox="0 0 10 10"
      height="10"
      width="10"
      fill="none"
      class="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
    >
      <path
        d="M0 5h7"
        class="transition opacity-0 group-hover:opacity-100"
      ></path>
      <path
        d="M1 1l4 4-4 4"
        class="transition group-hover:translate-x-[3px]"
      ></path>
    </svg>
  </a>
</div>
        </button>
<a class="bg-[var(--color-50)]/30 hover:bg-[var(--color-200)] text-[var(--color-500)] font-bold py-3 px-6 rounded-sm  cursor-pointer  hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce
dark:bg-[var(--color-700)]/30 dark:hover:bg-[var(--color-700)] dark:text-[var(--color-100)]" href="#contact">
  Contact
</a>

      </div>
    </section>
  );
}

export default About;
