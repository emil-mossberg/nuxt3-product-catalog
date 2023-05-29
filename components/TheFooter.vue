<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__columns">
        <BaseFooterColumn
          ><template #header>GENVÄGAR</template
          ><template #content>
            <div
              v-for="(data, index) in column1"
              :key="index"
              class="footer__row"
            >
              <BaseFooterLink :href="data.url">{{
                data.urlText
              }}</BaseFooterLink>
            </div></template
          ></BaseFooterColumn
        >
        <BaseFooterColumn
          ><template #header>KONTAKT LANTBRUK</template>
          <template #content>
            <div
              v-for="(data, index) in column2"
              :key="index"
              class="footer__row"
            >
              <span>{{ data.label }}</span>
              <BaseFooterLink
                :href="data.url"
                :target="data.newWindow ? '_target' : ''"
                >{{ data.urlText }}</BaseFooterLink
              >
            </div>
          </template>
        </BaseFooterColumn>
        <BaseFooterColumn
          ><template #header>FÖLJ OSS</template
          ><template #content>
            <div
              v-for="(data, index) in column3"
              :key="index"
              class="footer__row"
            >
              <BaseFooterLink :href="data.url"
                >{{ data.urlText }} <IconLink
              /></BaseFooterLink></div></template
        ></BaseFooterColumn>
      </div>
      <div class="footer__copyrightRow">
        <span class="footer__coprightText">© Copyright Lantmännen</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const column1 = [
  {
    urlText: "Om oss",
    url: "https://www.lantmannen.se/om-lantmannen/organisation-och-verksamhet/division-lantbruk/",
    newWindow: true,
  },
  {
    urlText: "Bli kund hos Lantmännen",
    url: "https://www.lantmannenlantbrukmaskin.se/om-oss/kontoansokan/",
    newWindow: true,
  },
  {
    urlText: "Jobba hos hos",
    url: "https://www.lantmannenlantbrukmaskin.se/om-oss/jobba-hos-oss/",
    newWindow: true,
  },
  {
    urlText: "Anläggningar",
    url: "https://www.lantmannenlantbrukmaskin.se/kontakt/anlaggningar/",
    newWindow: true,
  },
];

const column2 = [
  {
    label: "Växel: ",
    urlText: "010-556 56 00",
    url: "tel:010-556 56 00",
    newWindow: false,
  },
  {
    label: "Kundtjänst: ",
    urlText: "0771-111 222",
    url: "tel:0771-111 222",
    newWindow: false,
  },
  {
    label: "Besöksadress: ",
    urlText: "Neptunigatan 47, Malmö",
    url: "https://www.google.com/maps/place/Neptunigatan+47,+211+18+Malm%C3%B6/@55.6075804,12.986419,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a40105e591a3:0x5abd2937d18db3ee!8m2!3d55.6075804!4d12.986419",
    newWindow: true,
  },
  {
    label: "Postadress: ",
    urlText: "SE-205 03 Malmö",
    url: "#",
    newWindow: true,
  },
  {
    label: "Epost: ",
    urlText: "lantbruk.kundtjanst@lantmannen.com",
    url: "mailto:lantbruk.kundtjanst@lantmannen.com",
    newWindow: true,
  },
];

const column3 = [
  {
    urlText: "Facebook",
    url: "https://www.facebook.com/jordtillbord/",
  },
  { urlText: "Instagram", url: "https://www.instagram.com/jordtillbord/" },
  { urlText: "Linkedin", url: "https://www.linkedin.com/company/lantmannen/" },
];
</script>

<style lang="less">
.footer {
  display: flex;
  justify-content: center;

  &__content {
    width: min(90%, 1440px);
    padding: @indent__base;
  }

  &__columns {
    border-top: 1px solid @color__border_primary;
    padding-top: @indent__m;
    padding-bottom: @indent__xxl;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  &__row {
    margin: @indent__xs 0;
  }

  &__copyrightRow {
    padding-bottom: @indent__l;
    font-size: 12px;
  }
}
</style>
