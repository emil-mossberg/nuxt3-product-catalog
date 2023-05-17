<template>
  <div class="startPage">
    <Head><Title>Lantmännnen Lantbruk Produktkatalog</Title></Head>
    <Meta
      name="description"
      content="Öppen sajt för av visa Lantmännen lantbruks sortiment"
    />
    <BaseTextCard
      ><template #header>Produktkatalogen</template
      ><template #content
        ><p>
          Här har vi samlat all information om våra produkter. Det som visas ut
          är ett standardsortiment, vilket kan innebära att tillgången är
          begränsad eller att den inte säljs i ditt område. Om du saknar den
          produkt du söker efter kontakta din
          <a
            href="https://www.lantmannenlantbrukmaskin.se/kontakt/lantbrukssaljare/
"
            >säljare</a
          >
          eller kundtjänst på
          <a
            href="tel:0771-111
        22"
            >0771-111 222</a
          >
        </p>

        <p>
          För att handla i vår e-handeln krävs ett konto i vår kundportal LM2
          <a href="https://lm2.lantmannen.com/extern/aktivera-konto/">här</a>,
          registrera dig i LM2 här eller ansök om ett kundnummer
          <a href="https://www.lantmannenlantbrukmaskin.se/om-oss/kontoansokan/"
            >här</a
          >.
        </p>
      </template></BaseTextCard
    >

    <div class="startPage__imageBlock">
      <img
        alt="content image"
        class="startPage__image"
        :src="'/startpage_1.jpg'"
      />
    </div>
  </div>
</template>

<style lang="less">
.startPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  &__image {
    max-width: 100%;
    display: block;
  }
}

@media only screen and (min-width: @breakpoint__mobile) {
  .startPage {
    flex-direction: row;
    align-items: normal;
    gap: 0px;

    &__image {
      max-width: unset;
    }
  }
}
</style>
