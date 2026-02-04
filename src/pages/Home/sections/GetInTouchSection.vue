<template>
  <section class="relative bg-gradient-to-b from-white to-sky-50 py-20">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div class="flex flex-col justify-between">
          <div class="flex flex-col gap-4">
            <SectionHeading span1="Get in Touch with" span2="connect nation" />
            <ul class="md:mt-8 space-y-4 sm:space-y-6">
              <li
                v-for="(item, index) in contactItems"
                :key="index"
                class="flex items-center gap-3 sm:gap-4"
              >
                <img
                  :src="item.icon"
                  :alt="item.label"
                  class="h-9 w-9 sm:h-11 sm:w-11 rounded-lg bg-black p-2"
                />
                <span
                  class="font-inter font-normal text-[18px] sm:text-[22px] leading-[22px] sm:leading-[26px]"
                  :class="item.textColor ? item.textColor : 'text-black'"
                >
                  {{ item.value }}
                </span>
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-6 mt-10">
            <h3
              class="text-[#0C111D] font-outfit font-bold text-[48px] leading-[66px]"
            >
              Have a project in mind?
            </h3>
            <p
              class="text-[#0C111D] font-caveat font-normal text-[40px] leading-[100%]"
            >
              Get in touch and let’s build something impactful together.
            </p>
          </div>
        </div>

        <div
          style="box-shadow: 0px 0px 64px -12px #10182824"
          class="bg-white/10 rounded-lg shadow-lg p-8 flex flex-col gap-12"
        >
          <div class="flex flex-col gap-3">
            <h3
              class="font-outfit font-semibold text-[22px] leading-[100%] uppercase text-[#2B317F]"
            >
              SEND US A MESSAGE
            </h3>
            <p class="paragraph-17">
              Got an idea or need support? Drop us a message and let’s start the
              conversation. We’d love to hear from you.
            </p>
          </div>

          <form
            class="flex flex-col gap-8 z-100 transition-all ease-in-out duration-700"
            method="POST"
            @submit.prevent="submitForm"
          >
            <Transition name="fade">
              <p
                v-if="status.message"
                :class="
                  status.success
                    ? 'text-green-600 font-medium'
                    : 'text-red-600 font-medium'
                "
                class="mt-2 transition-all ease-in-out duration-700"
              >
                {{ status.message }}
              </p>
            </Transition>
            <div class="flex flex-col gap-2">
              <label class="form-label">Name *</label>
              <input
                type="text"
                v-model="form.name"
                name="name"
                required
                placeholder="Your full name"
                class="w-full h-[40px] bg-white border border-[#56BEB7] rounded-[8px] shadow-[0_1px_2px_0_#1018280D] px-[12px] py-[8px]"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="form-label">Email *</label>
              <input
                v-model="form.email"
                type="email"
                name="email"
                placeholder="you@example.com"
                class="w-full h-[40px] bg-white border border-[#56BEB7] rounded-[8px] shadow-[0_1px_2px_0_#1018280D] px-[12px] py-[8px]"
                required
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="form-label">Subject</label>
              <input
                v-model="form.subject"
                type="text"
                name="subject"
                placeholder="What can we help you with?"
                class="w-full h-[40px] bg-white border border-[#56BEB7] rounded-[8px] shadow-[0_1px_2px_0_#1018280D] px-[12px] py-[8px]"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="form-label">Message *</label>
              <textarea
                v-model="form.body"
                rows="4"
                name="message"
                placeholder="Tell us about your project or ask any questions..."
                class="w-full bg-white border border-[#56BEB7] rounded-[8px] shadow-[0_1px_2px_0_#1018280D] px-[12px] py-[8px] resize-none"
                required
              ></textarea>
            </div>
            <span class="transition-all ease-in-out duration-700">{{
              loading ? "Sending..." : ""
            }}</span>
            <ButtonPrimaryLight
              :disabled="loading"
              label="Send Message"
              to="/submit"
            />
          </form>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 h-[300px] overflow-hidden hidden lg:block"
    >
      <img
        src="../../../assets/img/decor/sky.png"
        alt=""
        class="w-full h-full object-cover"
        style="
          mask-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0)
          );
          -webkit-mask-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0)
          );
        "
      />
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import SectionHeading from "../../../components/headings/SectionHeading.vue";
import { postDataToApi } from "../../../utils/api";
import MailIcon from "../../../assets/img/icons/mail.svg";
import PhoneIcon from "../../../assets/img/icons/phone.svg";
import LocationIcon from "../../../assets/img/icons/location.svg";
import ClockIcon from "../../../assets/img/icons/clock.svg";
import ButtonPrimaryLight from "../../../components/buttons/ButtonPrimaryLight.vue";
const form = reactive({
  name: "",
  email: "",
  subject: "",
  body: "",
});

const loading = ref(false);
const status = reactive({
  message: "",
  success: false,
});

const submitForm = async () => {
  loading.value = true;
  status.message = "";

  try {
    const res = await postDataToApi("contact", form);

    if (res.success) {
      status.message = "Message sent successfully!";
      status.success = true;

      // reset form
      form.name = "";
      form.email = "";
      form.subject = "";
      form.body = "";
    } else {
      status.message = res.message || "Failed to send message.";
      status.success = false;
    }
  } catch (err) {
    status.message = err.message || "An error occurred while sending.";
    status.success = false;
  } finally {
    loading.value = false;
  }
};

const contactItems = [
  {
    icon: MailIcon,
    label: "Email",
    value: "admin@connectnation.com.au",
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: "0451 244 441",
  },
  {
    icon: LocationIcon,
    label: "Address",
    value: "23 Kent Road, Macdonald Park SA 5121",
  },
  {
    icon: ClockIcon,
    label: "Response time",
    value: "Response within 24 hours",
  },
];
</script>
<style>
/* Fade for status messages */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Spin fade for loader */
.fade-spin-enter-active,
.fade-spin-leave-active {
  transition: opacity 0.2s ease;
}
.fade-spin-enter-from,
.fade-spin-leave-to {
  opacity: 0;
}
</style>
