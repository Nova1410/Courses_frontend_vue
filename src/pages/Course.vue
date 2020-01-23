<template>
<q-page padding>
  <div class="doc-container">
    <div class="row q-pa-md">
      <div class="col-6">
        <q-input class="q-mr-md" v-model="search_term" debounce="250" @input="searchCourses" label="Search all courses">
          <template v-slot:prepend>
            <q-icon color="blue-5" name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <q-infinite-scroll ref="scroll" class="row justify-center q-mt-xl" @load="getCourses" :offset="200">  
          <div v-for="course in courses" :key="course.id" class="col-4 q-pa-lg">
            <q-card class="q-pa-md">
              <div class="absolute-top grayBox">
              </div> 

              <div class="row no-wrap items-center">
                <div class="col">
                  <q-img class="q-ml-md" :src="course.image" style="height: 100px; max-width: 100px" />
                </div>
                <div class="col-auto self-start vertical-top text-grey text-subtitle2">
                    <q-chip  outline text-color="grey-8" v-if="course.credits > 1">{{course.credits}} CREDITS</q-chip>
                    <q-chip  outline text-color="grey-8" v-else>{{course.credits}} CREDIT</q-chip>
                </div>
              </div>
              <q-card-section>

                <div class="row no-wrap items-center">
                  <div class="col text-h6 ellipsis">
                    {{course.name}}
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="text-subtitle1 text-grey">
                {{course.provider}}
                </div>
              </q-card-section>

              <q-card-actions class="justify-between">
                <div class="q-mt-md q-ml-sm">  
                  <p v-if="course.price > 0" class="text-blue text-bold text-h6">${{course.price}}</p>
                  <p v-else class="text-blue text-bold text-h6">FREE</p>
                </div>     
                <q-rating v-model="course.rate" :max="5" color="yellow" size="32px" icon-selected="star" icon-half="star_half"/>
              </q-card-actions>
            </q-card>
          </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
    </q-infinite-scroll>
  </div>
</q-page>
</template>

<script>
export default {
    data() {
      return {
        // variable to save the search writed in the input
        search_term: '',
        // Array to save the courses obtained from the responses
        courses:[],
        // Variable to save the next url
        next: 'courses/?limit=&offset=',
        // Flag to control the infinite scrolling
        scrollStop: false
      }
    },
    created() {
    },
    methods: {
      /**
       * Method to get the courses
       * @param index index of the infinite scroll
       * @param done function to tell the scroll that the data is loaded
       */
      getCourses(index, done) {
        let path = ''
        // If there's a new index (Need load more data), get the next url to load
        if(/^\d+$/.test(index)){
          path = this.next
        }
        // Get the courses
        this.$axios.get(path)
          .then(response => {
            // If there's no more data, stop the infinite scroll and put the flag in true 
            // to tell other functions that the scroll is stopped
            if(response.data.next == null && !this.scrollStop && this.courses.length > 0){
              this.scrollStop = true
              this.$refs.scroll.stop()
            }else{
              // If there's data, map the courses and add to the courses array
              response.data.courses.map(course => {
                this.courses.push(course)
              })
              // Get the next url
              this.next = response.data.next
              // Tell the infinite scroll that the data is loaded  
              done()
            }
          })
          .catch(error => {
            console.log(error)
            this.$q.notify({
              message: 'Error getting the courses',
              color: 'blue-10',
              icon: 'error'
            })
          })
      },
      // Method to get filter courses
      searchCourses() {
        // If there´s something writted in the search_term put the next url to load the courses with the filter
        if (this.search_term !== '') {
          this.next = `courses/?search=${this.search_term}`
          // Clear courses array
          this.courses = []
          // If the infinite scroll is stopped, reset the index and resume the scroll
          if(this.scrollStop){
            this.$refs.scroll.reset()
            this.$refs.scroll.resume()
            this.scrollStop = false
            // Get the filter courses
            this.getCourses(1,(stop) => void 0)
          } else {
            // Get the filter courses
            this.getCourses(1,(stop) => void 0)
          }
        }else{
          // If there´s nothing in the search_term, load the first page of courses
          this.next = 'courses/?limit=&offset='
          // Clear the courses array
          this.courses = []
          // If the infinite scroll is stopped, reset the index and resume the scroll
          if(this.scrollStop){
            this.$refs.scroll.reset()
            this.$refs.scroll.resume()
            this.scrollStop = false
            // Get the courses
            this.getCourses(1,(stop) => void 0)
          } else {
            // Get the courses
            this.getCourses(1,(stop) => void 0)
          }
        }
      }
    }
}
</script>

<style scoped>
.grayBox{
  height: 80px;
  background-color:whitesmoke;
}
</style>