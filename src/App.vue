<template>
  <div id="app">
      <div class="bodyCharacters p-md-5">
        <b-row class="mx-0">
          <b-col md="12" lg="9" class="mx-auto">
            <router-view></router-view>
          </b-col>
        </b-row>
      </div>
  </div>
</template>

<script>
/* Imports */



export default {
  name: 'App',
   data: () => ({
    data: null
  }),
  mounted() {
    
  },
  components: {
  }
}

</script>

<style lang="scss">

:root{
  --primary: #845EC2;
  --secondary: #D16BA5;
  --gradient-Gryffindor: linear-gradient(to right top, #7f0909, #a63b09, #ca6701, #e89500, #ffc500);
  --gradient-Ravenclaw: linear-gradient(to bottom, #0e1a40, #272947, #3a394e, #4c4b56, #5d5d5d);
  --gradient-Slytherin: linear-gradient(to bottom, #1a472a, #1e4e2f, #225433, #265b38, #2a623d);
  --gradient-Hufflepuff: linear-gradient(to bottom, #ecb939, #d2a046, #b5894e, #957553, #726255);

  /* var primary house */

  --Gryffindor: #7f0909;
  --Ravenclaw: #0e1a40;
  --Slytherin: #1a472a;
  --Hufflepuff: #ecb939;
}

</style>
