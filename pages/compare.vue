<template>
  <div class="comparePage">
    <Head><Title> Jämförelsesida</Title></Head>
    <Meta
      name="description"
      :content="'Some information about compare page here'"
    />
    <h1 class="comparePage__header">Jämför produkter</h1>
    <div>
      <ClientOnly>
        <CompareTable />
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="less">
.comparePage__header {
  margin-bottom: @indent__m;
}
</style>
