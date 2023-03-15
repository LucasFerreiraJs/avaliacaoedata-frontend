export default {
  getRegions() {
    return this.$axios.$get("/v1/region")
      .then(res => res.data.regions)
      .catch(err => []);
  }
}

