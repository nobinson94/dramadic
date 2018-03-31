<template>
	<div class="word-box">
		<div class="row">
			<div class="col-md-12 d-flex">
				<h3> {{ word.name }} </h3>
				<div class="importance-degree d-flex">
					<img src="../assets/img/star.png" class="star-img" />
					<img src="../assets/img/star.png" class="star-img"/>
				</div>
				<div> [{{ word.pos }}] </div>
			</div>	
		</div>
		<div class="row" v-for="sense in senses">
			<div class="col-md-12">
				<div class="word-def">
					{{ sense.definition[0] }}
					
				</div>
			</div>
			<div class="col-md-12">
				<div class="word-def">
					<strong>{{ sense.translation[0].trans_word[0] }} </strong>: {{ sense.translation[0].trans_dfn[0] }}
				</div>
			</div>
		</div>
		<video-list v-if="word.videos" v-bind:videos="word.videos"/>
	</div>
</template>

<script>
import VideoList from './VideoList.vue'	
export default {
	data () {
		return {
		}
  	},
	props: {
		senses: {
			type: Array,
		},
  		word: {
  			type: Object,
  		},	
  	},
  	created () {
  	},
  	watch: {
  		
  	},
  	computed: {
  		
  	},
	components: {
  		VideoList,
	},
}
</script>

<style scoped>
.importance-degree {
	padding-left: 10px;
}
.star-img {
	height: 16px;
	width: 18px;
	padding-right: 2px;
}
.word-def {
	padding-bottom: 10px;
}
</style>