<template>
  <section class="bg-[#FAFAFA]">
    <div class="container flex flex-col gap-5">
      <div
        class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center justify-between"
      >
        <SectionHeading span1="Our" span2="Clients" />
        <div class="flex flex-col gap-5 md:gap-8 pt-2 md:pt-0 lg:pt-0">
          <p class="paragraph-20 paragraph-dark">
            Collaborate with Adelaide businesses and leading global platforms to
            deliver results that set new standards
          </p>
        </div>
      </div>

      <!-- Clients -->
      <div class="w-full overflow-hidden">
        <!-- <div
          ref="carousel"
          class="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide"
          @mouseenter="pause = true"
          @mouseleave="pause = false"
        >
          <div
            v-for="(client, i) in duplicatedClients"
            :key="i"
            class="flex cursor-pointer items-center justify-center rounded-[5px] bg-white transition-shadow hover:shadow-2xl p-10"
          >
            <img
              :src="client.src"
              :alt="client.alt"
              class="w-[200px] h-[186px] object-cover"
            />
          </div>
        </div> -->
        <div
          ref="carousel"
          class="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide"
          @mouseenter="pause = true"
          @mouseleave="pause = false"
        >
          <div
            v-for="(client, i) in duplicatedClients"
            :key="i"
            style="
              width: 276px;
              height: 198px;
              angle: 0 deg;
              opacity: 1;
              border-radius: 4.78px;
              padding-top: 47px;
              padding-right: 47.79px;
              padding-bottom: 47px;
              padding-left: 47.79px;
            "
            class="flex cursor-pointer items-center justify-center rounded-[5px] bg-white transition-shadow hover:shadow-2xl flex-none"
          >
            <img
              :src="client.src"
              :alt="client.alt"
              class="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import SectionHeading from "../../../components/headings/SectionHeading.vue";

import Boujee from "../../../assets/img/logo/clients/boujee.svg";
import Achievers from "../../../assets/img/logo/clients/achievers.svg";
import Mcquel from "../../../assets/img/logo/clients/mcquel.svg";
import Danphe from "../../../assets/img/logo/clients/danphe.svg";
import Royalhealth from "../../../assets/img/logo/clients/royalhealth.svg";
import Harcourt from "../../../assets/img/logo/clients/harcourt.jpeg";
import Vital from "../../../assets/img/logo/clients/vital-care.png";
import Bhoye from "../../../assets/img/logo/clients/bhoye.png";
import Events from "../../../assets/img/logo/clients/events.png";
import Quesoft from "../../../assets/img/logo/clients/quesoft.png";
import Everest from "../../../assets/img/logo/clients/everest.jpg";
import Everest2 from "../../../assets/img/logo/clients/everest2.jpg";
import Zeroone from "../../../assets/img/logo/clients/zeroone.svg";

const clients = [
  { src: Boujee, alt: "Boujee" },
  { src: Achievers, alt: "Achievers" },
  { src: Mcquel, alt: "Mcquel" },
  { src: Danphe, alt: "Danphe" },
  { src: Royalhealth, alt: "Royalhealth" },
  { src: Zeroone, alt: "Zeroone" },
  { src: Harcourt, alt: "Harcourt" },
  { src: Vital, alt: "Vital" },
  { src: Bhoye, alt: "Bhoye" },
  { src: Events, alt: "Events" },
  { src: Quesoft, alt: "Quesoft" },
  { src: Everest, alt: "Everest" },
  { src: Everest2, alt: "Everest2" },
];

// Duplicate for infinite scroll
const duplicatedClients = computed(() => [...clients, ...clients]);

const carousel = ref(null);
const pause = ref(false);

let animationId;

function autoScroll() {
  if (!carousel.value || pause.value) {
    animationId = requestAnimationFrame(autoScroll);
    return;
  }

  carousel.value.scrollLeft += 0.5;

  // Reset seamlessly
  if (carousel.value.scrollLeft >= carousel.value.scrollWidth / 2) {
    carousel.value.scrollLeft = 0;
  }

  animationId = requestAnimationFrame(autoScroll);
}

onMounted(() => {
  animationId = requestAnimationFrame(autoScroll);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
/* Hide scrollbar but keep scroll functionality */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
