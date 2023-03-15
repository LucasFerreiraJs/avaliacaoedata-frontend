<template>
  <div class="container">


    <div>
      <h1>:(</h1>
      <div class="message">
        <h1>400</h1>
        <p>Bad Request</p>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: "err"
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/config";
@import "~/assets/scss/variables";

.container {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 60vh;

  &> div h1 {

    /* margin-top: 5px; */
    font-family: $font-default;
    font-weight: $fw-bold;
    color: $secondary-grey-800;
    /* color: $red-600; */
    font-size: 70px;
    margin: 0;
    padding: 0;

  }

  &>div {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .message {

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    padding-top: 19px;

    h1 {
      /* margin-top: 5px; */
      font-family: $font-default;
      font-weight: $fw-bold;
      color: $secondary-grey-800;
      /* color: $red-600; */
      font-size: 70px;
      margin: 0;
      padding: 0;
      line-height: 38px;
    }

    p {
      font-family: $font-default;
      font-weight: $fw-medium;
      color: $secondary-grey-800;
      font-size: 24px;
      margin: 0;
      padding: 0;
    }
  }
}
</style>