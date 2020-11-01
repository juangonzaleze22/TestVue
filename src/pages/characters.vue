<template>
  <div class="container bodyCharacters">
      <b-row >
        <b-col md="12">
          <div class="bodyCharacters__box d-flex align-items-center justify-content-between">
            <h2 class="bodyCharacters__box__title">characters</h2>
            <div class="d-flex align-items-center form-group w-100 mb-sm-0">
              <button class="bodyCharacters__box__button btn mr-3" @click="allData()">All</button>
              <input class="form-control" type="text" v-model="search" placeholder="Search"/>
            </div>
          </div>
        </b-col>
        <!-- Houses -->
        <b-col md="12">
          <div class="bodyCharacters__boxHouses" >
            <div class="box" v-for="item in dataHouses" :key="item.__id" @click="getDataHouse(item.name)" v-bind:class="{ active: isActive }">
              <img v-if="item.name == 'Gryffindor'" class="img-fluid" src="../assets/Gryffindor.jpg" alt="">
              <img v-if="item.name == 'Hufflepuff'" class="img-fluid" src="../assets/Hufflepuff.jpg" alt="">
              <img v-if="item.name == 'Ravenclaw'" class="img-fluid" src="../assets/Ravenclaw.jpg" alt="">
              <img v-if="item.name == 'Slytherin'" class="img-fluid" src="../assets/Slytherin.jpg" alt="">
              <div class="boxText" v-bind:class="{
                  Gryffindor: item.name == 'Gryffindor', 
                  Slytherin: item.name == 'Slytherin', 
                  Hufflepuff: item.name == 'Hufflepuff', 
                  Ravenclaw: item.name == 'Ravenclaw',}
                 ">
                <h5 class="card-title">{{item.name}}</h5>
                <p>Members: {{item.members.length}}</p>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="12" class="mx-auto" v-if="loading">
          <Loading></Loading>
        </b-col>
        <b-col md="6" sm="6" cols="12" v-for="item in filteredResources" :key="item.__id">
            <b-card
            v-if="!loading"
            class="cardCharacter"
              :title="item.name"
              style="margin-bottom: 30px;"
              v-bind:class="{
                  Gryffindor: item.house == 'Gryffindor', 
                  Slytherin: item.house == 'Slytherin', 
                  Hufflepuff: item.house == 'Hufflepuff', 
                  Ravenclaw: item.house == 'Ravenclaw',}
                 "
              >
              <b-card-text class="box-text" >
                <ul>
                  <li v-if="item.house">
                    <span>Blood status:</span> {{item.bloodStatus}}
                  </li>
                  <li v-if="!item.house">
                    <span>Unassigned blood</span>
                  </li>
                </ul>
              </b-card-text>
              <p class="house mb-0 text-right" v-if="item.house">{{item.house}}</p>
              <p class="house mb-0 text-right" v-if="!item.house">Unknow</p>
            </b-card>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import Loading from '../components/loading';
import CallsData from '../models/services';
const getData = new CallsData();

export default {
  name: 'characters',
   data: () => ({
    dataCharacter: null,
    dataHouses: null,
    dataFilterMembers: null,
    imgSrcHouses: '',
    search: '',
    nothing: false,
    houses: ['Gryffindor','Ravenclaw', 'Slytherin', 'Hufflepuff'],
    isActive: false, 
    loading: true
  }),
  async created() {
    this.dataCharacter =  await getData.getDataCharacter().finally(() => this.loading = false);
    this.dataHouses =  await getData.getDataHouses().finally(() => this.loading = false)
    this.dataFilterMembers =  await getData.getDataCharacter().finally(() => this.loading = false)
  },
  mounted() {

   
  
  },
  methods: {
    getDataHouse(data){
      this.search= '';
      let idMembers = this.dataHouses.filter((item => item.name == data));
       let datafilter = this.dataCharacter.filter((item => {
        if (idMembers[0].members.includes(item._id)){
          return item;
        }
      }))
      this.dataFilterMembers = datafilter;
    },
    async allData(){
      this.loading = true;
      return this.dataCharacter =  await getData.getDataCharacter().finally(() => this.loading = false);
    }
  },
  components: {
    Loading
  },
  computed: {
    filteredResources (){
      if(this.search){
      return this.dataCharacter.filter((item)=>{
        let datafilter = item.name.toLowerCase().includes(this.search.toLowerCase());
         return datafilter;
      })
      }else{
        return this.dataFilterMembers;
      }
    }
  },
  
}

</script>

<style lang="scss">
/* Medias */
@mixin respond ($breakpoint) {
  @if $breakpoint==tablet-sm {
    @media only screen and (max-width: 767px) {
      @content;
    }
  }

  @if $breakpoint==mobile {
    @media only screen and (max-width: 576px) {
      @content;
    }
  }
}

.bodyCharacters{
  &__box{
    margin-bottom: 15px;
    @include respond(mobile){
      flex-direction: column;
      
    }
    &__title{
      text-align: left;
      color: #343434;
      padding: 15px 0;
      text-transform: capitalize;
      width: 100%;
      font-size: 56px;
      @include respond(tablet-sm){
        font-size: 36px;
      }
      @include respond(mobile){
        text-align: center;
      }
    }
    &__button{
      background-color: transparent;
      border: none;
      color: var(--primary);
    }
    input{
      width: 100%;
      /* border-radius: 0; */
      border: none;
      font-size: 16px;
      border: 1px solid #d1d1d1;
      box-shadow: 2px 2px 10px #ccc;
      @include respond(mobile){
        max-width: calc(100% - 20px);
        /* margin-bottom: 30px; */
      }
      &:focus, &:hover, &:active{
        border-color: var(--primary);
        box-shadow: 2px 2px 10px #ccc;
      }
    }
  }

  /* Houses */
  &__boxHouses{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 25px;
    margin-bottom: 25px;
    border-bottom: 1px solid #ececec;
    @include respond (mobile){
      flex-wrap: wrap;
      justify-content: center;
    }
    .box{
      width: calc(25% - 20px);
      background: #fff;
      border: 1px solid #ececec;
      box-shadow: 2px 2px 10px #ccc;
      border-radius: 15px;
      overflow: hidden;
      transition: .3s ease-in-out;
      @include respond(tablet-sm){
        width: calc(25% - 15px);
        zoom: .8;
      }
      @include respond (mobile){
        width: calc(50% - 20px);
        margin: auto;
        &:nth-child(1),
        &:nth-child(2){
          margin-bottom: 15px;
        }
      }
      cursor: pointer;
      &:hover{ 
        transform: scale(1.025);
      }
      img{
        margin: auto;
        display: block;
        padding: 20px;
        height: 130px;
      }
      .boxText{
        color: #fff;
        text-align: center;
        padding: 10px 20px;
        overflow: hidden;
        .card-title{
          margin: 0;
          font-size: 18px;
        }
        p{
          margin: 0;
          font-size: 14px;
        }
      
      }
      .boxText.Gryffindor{
        background-image: var( --gradient-Gryffindor)
      }
      .boxText.Slytherin{
        background-image: var(--gradient-Slytherin);
      }
      .boxText.Hufflepuff{
        background-image: var(--gradient-Hufflepuff);
      }
      .boxText.Ravenclaw{
        background-image: var(--gradient-Ravenclaw);
      }
    }
  }

  .cardCharacter{
    border: 1px solid #ececec;
    box-shadow: 2px 2px 10px #ccc;
    .card-body{
      border-radius: 10px;
      padding: 10px 15px;
      ul{
        padding-left:0;
        list-style: none;
        font-size: 14px;
        opacity: .8;
      }
      p.house{
        font-weight: bold;
      }
    }
  }
  .cardCharacter.Gryffindor{
    p.house{
      color: var( --Gryffindor);
    }
  }
  .cardCharacter.Slytherin{
    p.house{
      color: var(--Slytherin);
    }
  }
  .cardCharacter.Hufflepuff{
    p.house{
      color: var(--Hufflepuff);
    }
  }
  .cardCharacter.Ravenclaw{
    p.house{
      color: var(--Ravenclaw);
    }
  }
}

</style>
