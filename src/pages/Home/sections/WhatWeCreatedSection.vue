<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import SectionHeading from "../../../components/headings/SectionHeading.vue";
import ButtonPrimaryLight from "../../../components/buttons/ButtonPrimaryLight.vue";
import ButtonSectionSecondaryDark from "../../../components/buttons/ButtonSectionSecondaryDark.vue";
import AcheiversCollegeLogo from "../../../assets/img/logo/projects/AcheiversCollege.png";
import BoujeeLogo from "../../../assets/img/logo/clients/boujee.svg";
import McquelLogo from "../../../assets/img/logo/clients/mcquel.svg";
import DanpheLogo from "../../../assets/img/logo/clients/danphe.svg";

import AcheiversDesktop from "../../../assets/img/websites/AcheiversDesktop.png";
import AcheiversMobile from "../../../assets/img/websites/AcheiversMobile.png";
import DanpheDesktop from "../../../assets/img/websites/DanpheDesktop.png";
import DanpheMobile from "../../../assets/img/websites/DanpheMobile.png";
import McquelDesktop from "../../../assets/img/websites/McquelDesktop.png";
import McquelMobile from "../../../assets/img/websites/McquelMobile.png";
import BoujeeDesktop from "../../../assets/img/websites/BoujeeDesktop.png";
import BoujeeMobile from "../../../assets/img/websites/BoujeeMobile.png";

const originalCards = [
  {
    id: 1,
    year: "2026",
    title: "Achievers College | Website & SEO",
    description:
      "Delivered comprehensive website design and development for Achievers College Adelaide...",
    logo: AcheiversCollegeLogo,
    desktopImg: AcheiversDesktop,
    mobileImg: AcheiversMobile,
    link: "https://achieverscollege.com.au",
    external: true,
    gradient: {
      background:
        "linear-gradient(45deg, rgba(166, 192, 254, 0.3) 0%, rgba(255, 234, 246, 0.3) 100%), #ffffff",
      boxShadow: "0px -1px 10px -2px #00000024",
    },
  },
  {
    id: 2,
    year: "2025",
    title: "Danphe Staffing | Website & SEO",
    description:
      "Developed a professional website and SEO strategy for Danphe Staffing Australia...",
    logo: DanpheLogo,
    desktopImg: DanpheDesktop,
    mobileImg: DanpheMobile,
    link: "https://danphestaffing.com.au",
    external: true,
    gradient: {
      background:
        "linear-gradient(0deg, rgba(186, 228, 89, 0.16) 0%, rgba(168, 237, 234, 0.16) 100%), #ffffff",
      boxShadow: "0px -1px 10px -2px #00000024",
    },
  },
  {
    id: 3,
    year: "2025",
    title: "McQuel Healthcare | Marketing & Website",
    description:
      "Designed and executed comprehensive digital marketing and website solutions...",
    logo: McquelLogo,
    desktopImg: McquelDesktop,
    mobileImg: McquelMobile,
    link: "https://mcquelhealthcare.com.au",
    external: true,
    gradient: {
      background:
        "linear-gradient(90deg, rgba(76, 131, 160, 0.16) 35.74%, rgba(246, 164, 77, 0.16) 120.56%), #ffffff",
      boxShadow: "0px -1px 10px -2px #00000024",
    },
  },
  {
    id: 4,
    year: "2023",
    title: "Boujee Home Loan | Marketing & Website",
    description:
      "Built a comprehensive website and digital strategy for Boujee Home Loan Australia...",
    logo: BoujeeLogo,
    desktopImg: BoujeeDesktop,
    mobileImg: BoujeeMobile,
    link: "https://boujeehomeloans.com.au/",
    external: true,
    gradient: {
      background:
        "linear-gradient(45deg, rgba(255, 108, 108, 0.16) 0%, rgba(221, 123, 255, 0.16) 100%), #ffffff",
      boxShadow: "0px -1px 10px -2px #00000024",
    },
  },
];

const sectionRef = ref(null);
const scrollProgress = ref(0);

const handleScroll = () => {
  if (!sectionRef.value) return;
  const rect = sectionRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const totalScrollableHeight = rect.height - windowHeight;
  const currentScroll = -rect.top;
  const progress = Math.min(
    Math.max(currentScroll / totalScrollableHeight, 0),
    1,
  );
  scrollProgress.value = progress;
};

const activeIndex = computed(() => {
  const steps = originalCards.length;
  const index = Math.floor(scrollProgress.value * steps);
  return Math.min(index, steps - 1);
});

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <div ref="sectionRef" class="relative bg-[#FAFAFA] py-12">
    <div
      class="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center justify-between"
    >
      <SectionHeading span1="What We've<br>" span2="Created" />
      <div class="flex flex-col gap-5 md:gap-8 pt-2 md:pt-0 lg:pt-0">
        <p class="paragraph-20 paragraph-dark">
          Our portfolio demonstrates proven results across video production,
          digital marketing campaigns, and web development projects crafted to
          help Adelaide businesses achieve measurable growth through strategic
          content and data-driven execution.
        </p>
        <ButtonPrimaryLight label="View all projects" to="/work" />
      </div>
    </div>
  </div>

  <div class="relative">
    <div
      :key="card.id"
      v-show="index >= activeIndex"
      v-for="(card, index) in originalCards"
      class="sticky top-0 h-screen z-100 xl:z-0 flex flex-col items-center justify-center transition-all ease-in-out duration-700"
    >
      <div
        class="h-full grid grid-cols-1 sm:grid-cols-2 md:rounded-[40px] border border-gray-100 overflow-hidden transition-all duration-700"
        :style="card.gradient"
      >
        <div
          class="relative flex items-center justify-center max-w-[710px] scale-90 lg:scale-100"
        >
          <div class="relative z-10">
            <img
              :src="card.desktopImg"
              class="absolute top-[11%] left-[13%] w-[74%] h-[78%] z-10"
            />
            <img
              src="../../../assets/img/decor/macbook-air.png"
              class="relative z-20 w-[800px]"
            />
          </div>

          <div class="absolute left-[65%] right-0 z-30">
            <img
              :src="card.mobileImg"
              class="absolute top-[6.5%] left-[4%] w-[90%] xl:w-[80%] h-[87%] z-10 rounded-xl"
            />
            <img
              src="../../../assets/img/decor/galaxy-s9.png"
              class="relative z-20 w-[220px]"
            />
          </div>
        </div>

        <div
          class="flex flex-col md:py-22 md:px-14 pb-10 px-4 justify-center items-start gap-6 lg:gap-16"
        >
          <div class="flex w-full items-center justify-between">
            <div class="flex flex-col">
              <h6
                class="font-inter text-[16px] tracking-[0.07em] text-[#475467]"
              >
                Year
              </h6>
              <h6 class="font-outfit text-[24px] uppercase text-black">
                {{ card.year }}
              </h6>
            </div>
            <img :src="card.logo" class="w-28 h-auto object-contain" />
          </div>

          <div>
            <p class="font-outfit text-[32px] mb-4 text-gray-900 leading-tight">
              {{ card.title }}
            </p>
            <p class="paragraph-16 paragraph-dark max-w-md">
              {{ card.description }}
            </p>
          </div>

          <!-- <ButtonSectionSecondaryDark
            label="View Project"
            :to="card.link"
            :external="card.external"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>
