export default {
  // getUsers() {
  //   return this.$axios.$get("/v1/user");
  // },


  getUsers(context, filter) {



    console.log("filter", filter)

    return this.$axios.$get("/v1/user", {
      params: {
        "filterName": (filter && filter.filterName) ?? "",
        "roleId": (filter && filter.roleId) ?? "",
        "regionId": (filter && filter.regionId) ?? null,
        "status": (filter && filter.status) ?? null,
      }
    });

  },
  sendNewUser(context, data) {
    return this.$axios.$post("/v1/user", data);
  },

  deleteUser(context, id) {
    return this.$axios.$delete(`/v1/user/${id}`)

  },
  editUser(context, { id, data }) {

    console.log("data", id, data)
    return this.$axios.$put(`/v1/user/${id}`, data)
  }
}





// {
//   "name": "teste",
//   "email": "teste",
//   "cpf": "teste",
//   "userLogin": "teste",
//   "password": "teste",
//   "roleName": "teste role",
//   "rhCode": 0,
//   "regionName": "POA",
//   "status": 0,
//   "dateAction": "2023-03-11T16:14:58.942Z",
//   "lastAccess": "2023-03-11T16:14:58.942Z"
// }