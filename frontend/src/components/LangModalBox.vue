<template>
	<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              언어 / Language
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
            	<div class="list-group" id="list-tab" role="tablist">
                <button class="list-group-item list-group-item-action" v-for="lang in langs" v-bind:class="{active: lang.active}" data-toggle="list" :key="lang.name" @click="selectLang(lang.id)">
                  {{ lang.kor }} / {{ lang.for }}
                </button>
				      </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="hideModal">
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
	created() {
    var currentLang = this.$store.getters.lang.id;
    for(let lang of this.langs) {
      if(lang.id === currentLang)
        lang.active = true;
    }
	},
  mounted() {

  },
  computed: {
    langs() {
      return this.$store.getters.langlist;
    }
  },
	methods: {
		hideModal() {
			this.$store.commit('hideModal')
		},
    selectLang : function(id) {
      localStorage.setItem("lang", JSON.stringify(this.langs[id-1]));
      this.$store.commit('updateLang', this.langs[id-1]);
      this.$store.commit('hideModal');
      this.$router.go(this.$router.currentRoute);
    }
	}
}
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
  width: 300px;
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