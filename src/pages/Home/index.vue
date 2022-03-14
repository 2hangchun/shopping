<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  async mounted() {
    this.$store.dispatch("floorList");
    try {
      // 如果已经登陆，则需要发送请求获取用户信息
      if (this.$store.state.user.token) {
        await this.$store.dispatch("getUserInfo");
      }
    } catch (error) {
      console.error(error.message);
    }
  },
  computed: {
    ...mapState({ floorList: (state) => state.home.floorList }),
  },
};
</script>

<style></style>
