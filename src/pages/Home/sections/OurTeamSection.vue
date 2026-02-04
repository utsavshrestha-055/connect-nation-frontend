<template>
  <section class="bg-[#FAFAFA]">
    <div class="container flex flex-col gap-5">
      <div
        class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center justify-between"
      >
        <SectionHeading span1='Meet<br class="desktop-br">' span2="Our Team" />
        <div class="flex flex-col gap-5 md:gap-8 pt-2 md:pt-0 lg:pt-0">
          <p class="paragraph-20 paragraph-dark">
            A passionate group of creative minds, technical experts, and
            marketing specialists driving success for our clients.
          </p>
          <div class="w-full h-full flex justify-end items-center">
            <div class="hidden lg:flex gap-5">
              <button
                @click="scrollLeft"
                class="cursor-pointer group w-[44px] h-[44px] rounded-sm bg-[#EAECF0] flex justify-center items-center hover:bg-black transition-colors duration-300 ease-in-out"
              >
                <img
                  src="../../../assets/img/icons/LeftArrow.svg"
                  alt=""
                  class="transition-all duration-300 ease-in-out group-hover:invert"
                />
              </button>
              <button
                @click="scrollRight"
                class="cursor-pointer group w-[44px] h-[44px] rounded-sm bg-[#EAECF0] flex justify-center items-center hover:bg-black transition-colors duration-300 ease-in-out"
              >
                <img
                  src="../../../assets/img/icons/RightArrow.svg"
                  alt=""
                  class="filter invert transition-all duration-300 ease-in-out group-hover:invert-0"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref="carousel"
        class="flex gap-3 overflow-x-auto w-full h-[550px] relative scroll-smooth snap-x snap-mandatory lg:snap-none"
      >
        <div
          v-for="(member, index) in visibleTeam"
          :key="index"
          @mouseenter="activeIndex = index"
          class="relative overflow-hidden rounded-lg transition-all duration-700 ease-in-out cursor-pointer flex-[1] snap-start max-lg:min-w-[85%] max-lg:snap-center"
          :class="activeIndex === index ? 'flex-[3]' : 'bg-[#F2F4F7]'"
          :style="activeIndex === index ? activeGradient : ''"
        >
          <div
            class="p-6 flex flex-col gap-2 transition-opacity duration-500 delay-200 opacity-100 lg:opacity-0"
            :class="activeIndex === index ? 'lg:opacity-100' : ''"
          >
            <p
              class="font-inter font-medium text-[16px] leading-[100%] tracking-[0.05em] uppercase text-[#41468C] whitespace-nowrap"
            >
              {{ member.role }}
            </p>
            <p
              class="font-outfit font-medium text-[24px] leading-[100%] tracking-[0.02em] capitalize text-black whitespace-nowrap"
            >
              {{ member.name }}
            </p>
          </div>

          <img
            :src="member.image"
            alt="Team Member"
            class="absolute top-[40%] sm:top-[20%] md:top-[22%] left-1/2 -translate-x-1/2  bottom-0 min-w-full object-cover transition-all duration-700 ease-in-out"
            :class="[
              activeIndex === index
                ? ' filter scale-190 sm:scale-120 lg:top-[0%] grayscale-0 saturate-100'
                : ' h-full filter grayscale translate-y-[6%]',
            ]"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import SectionHeading from "../../../components/headings/SectionHeading.vue";

const activeIndex = ref(2);
const carousel = ref(null);

const activeGradient = {
  background: `linear-gradient(to bottom, rgba(86, 190, 183, 0.9), rgba(122, 204, 199, 0.9)),
               radial-gradient(circle at top right, rgba(55, 63, 164, 0.4) 0%, transparent 40%),
               radial-gradient(circle at bottom right, rgba(55, 63, 164, 0.4) 0%, transparent 40%)`,
  backgroundBlendMode: "overlay",
};

import member1 from "../../../assets/img/teamMembers/member1.png";
import member3 from "../../../assets/img/teamMembers/member3.png";
import member5 from "../../../assets/img/teamMembers/member5.png";
import member7 from "../../../assets/img/teamMembers/member7.png";

const team = [
  {
    name: "Sarin Tamang",
    role: "Chief Executive Officer (CEO)",
    image: member1,
  },
  { name: "Rohit Rajput", role: "IT Analyst", image: member3 },
  { name: "Narayan Oli", role: "Marketing Officer", image: member5 },
  { name: "Sanjib Zimba", role: "CFO", image: member7 },
];

const visibleTeam = ref(team); // show all items, scrolling handles visibility

const scrollAmount = 320; // approx card width, tweak if needed
const isDesktop = () => window.innerWidth >= 1024;

const scrollLeft = () => {
  if (!isDesktop()) return;

  activeIndex.value =
    activeIndex.value > 0 ? activeIndex.value - 1 : team.length - 1;
};

const scrollRight = () => {
  if (!isDesktop()) return;

  activeIndex.value =
    activeIndex.value < team.length - 1 ? activeIndex.value + 1 : 0;
};
</script>
