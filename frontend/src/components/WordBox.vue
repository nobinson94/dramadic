<template>
	<div class="word-box">
		<div class="row">
			<div class="col-md-12 d-flex">
				<h3> {{ word.name }} </h3>
				<div class="sup-no" v-if="word.sup_no!==0">
					{{ word.sup_no }}
				</div>
				<div v-if="word.pron"> [{{ word.pron }}]</div>
				<div class="importance-degree d-flex">
					<div v-for="n in word.grade">
						<img src="../assets/img/star.png" class="star-img" />	
					</div>
				</div>
			</div>	
		</div>
		<div class="row" v-for="(sense , n) in word.sense_arr">
			<div class="col-md-12"> 
			{{n+1}} ({{ word.pos }}) {{ sense.def }} 
			</div>
			<div class="col-md-12">
				<div class="word-def">
					<strong>{{ sense.trans.word }} </strong> <span v-if="sense.trans.word">: </span> {{ sense.trans.dfn }}
				</div>
			</div>
		</div>
		<video-list v-if="word.videoList" v-bind:videos="word.videoList" :wordcode="word.code" />
	</div>
</template>

<script>
import VideoList from './VideoList.vue'	
export default {
	props: {
  		word: {
  			type: Object,
  		},	
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