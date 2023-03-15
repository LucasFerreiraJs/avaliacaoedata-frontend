export default {
  getRoles() {
    return this.$axios.$get("/v1/role")
      .then(res => res.data.roles)
      .catch(err => []);
  }
}

