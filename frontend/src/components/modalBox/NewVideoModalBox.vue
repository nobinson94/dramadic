<template>
	<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <strong>새로운 영상 등록하기</strong>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div>
                <form enctype="multipart/form-data">
                  <div class="form-group">
                    <label>Main Title</label>
                    <input type="text" class="form-control" v-model="file.main_title" placeholder="시리즈 제목">
                  </div>
                  <div class="form-group">
                    <label>Sub Title</label>
                    <input type="text" class="form-control" v-model="file.sub_title" placeholder="에피소드 제목">
                  </div>
                  <div class="form-group">
                    <label>Category</label>
                    <select class="custom-select" v-model="file.category">
                      <option selected>Choose...</option>
                      <option value="교양">교양</option>
                      <option value="예능">예능</option>
                      <option value="드라마">드라마</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Video File</label>
                    <input type="file" class="form-control" @change="processVideoFile($event)">
                  </div>
                  <div class="form-group">
                    <label>Script File</label>
                    <input type="file" class="form-control" @change="processScriptFile($event)">
                  </div>

                </form>
              </div>
              <div>
                
              </div>
            </slot>
          </div>
          <div class="err-msg-box" v-if="errors.length">
            <div class="err-msg" v-for="error in errors">
              {{ error }}              
            </div>            
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button btn btn-outline-primary" @click="enrollVideo">
                등록
              </button>
              <button class="modal-default-button btn btn-outline-dark" @click="hideModal">
              	취소
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>

export default {
  data () {
    return {
      file: {
        main_title: '',
        sub_title: '',
        category: '',
        scriptfile: null,
        videofile: null,
      },
      errors: [],
    }
  },
	created() {
    
	},
  mounted() {

  },
  computed: {
    
  },
	methods: {
		hideModal() {
			this.$store.commit('hideNewVideoModal');
		},
    checkForm() {
      this.errors = [];
      if(!this.file.main_title) this.errors.push('Write main title of new video');
      if(!this.file.sub_title) this.errors.push('Write sub title of new video');
      if(!this.file.category) this.errors.push('Choose the category of new video');
    },
    enrollVideo() {
      this.checkForm();
      if(this.errors.length === 0) {
        console.log("UPLOAD START");
        
        let formData = new FormData();
        formData.append('maintitle', this.file.main_title);
        formData.append('subtitle', this.file.sub_title);
        formData.append('category', this.file.category);
        formData.append('videofile', this.file.videofile);
        //formData.append('scriptfile', this.file.scriptfile);

        let baseURL = this.$http.options.root;
        this.$http.post(`${baseURL}/api/upload/tmp`, 
          formData ,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
          console.log(response);
          console.log("UPLOAD SUCCESS");
        })
        .catch(()=> {
          console.log("UPLOAD FAIL");
        })
      }
    },
    processScriptFile(event) {
      this.file.scriptfile = event.target.files[0];
    },
    processVideoFile(event) {
      this.file.videofile = event.target.files[0];
    }
  }
};

</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>