<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__columns">
        <div class="footer__column">
          <div class="footer__row">
            <span class="footer__columnHeader">GENVÄGAR</span>
          </div>
          <div
            v-for="(data, index) in column1"
            :key="index"
            class="footer__row"
          >
            <a target="_blank" class="footer__greenLink" :href="data.url">{{
              data.urlText
            }}</a>
          </div>
        </div>
        <div class="footer__column">
          <div class="footer__row">
            <span class="footer__columnHeader">KONTAKT LANTBRUK</span>
          </div>
          <div
            v-for="(data, index) in column2"
            :key="index"
            class="footer__row"
          >
            <span>{{ data.label }}</span>
            <a
              :target="data.newWindow ? '_target' : ''"
              class="footer__greenLink"
              :href="data.url"
              >{{ data.urlText }}</a
            >
          </div>
        </div>
        <div class="footer__column">
          <div class="footer__row">
            <span class="footer__columnHeader">FÖLJ OSS</span>
          </div>
          <div
            v-for="(data, index) in column3"
            :key="index"
            class="footer__row"
          >
            <a target="_blank" class="footer__greenLink" :href="data.url"
              >{{ data.urlText }} <IconLink />
            </a>
          </div>
        </div>
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
    url: "",
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

  &__column {
    flex-basis: 100%;
    margin-bottom: @indent__m;
  }

  &__row {
    margin: @indent__xs 0;
  }

  &__greenLink {
    color: @fun-green;
    font-weight: 700;
  }

  &__copyrightRow {
    padding-bottom: @indent__l;
    font-size: 12px;
  }
}

@media only screen and (min-width: @breakpoint__mobile) {
  .footer {
    &__column {
      flex-basis: 33.33%;
      margin-bottom: 0;
    }
  }
}
</style>
