<template>
	<div class="word-box">
		<div class="row">
			<div class="col-md-12 d-flex">
				<h3> {{ word.name }} </h3>
				<div class="importance-degree d-flex">
					<img src="../assets/img/star.png" class="star-img" />
					<img src="../assets/img/star.png" class="star-img"/>
				</div>
			</div>	
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="word-def"> {{ word.def }} </div>
			</div>
		</div>
		<video-list/>
		<div class="row">
			<div class="col-md-12"><button type="button" class="btn btn-outline-dark float-right">More Videos</button></div>
		</div>
	</div>
</template>

<script>
import VideoList from './VideoList.vue'	
export default {
  props: {
  	word: {
  		type: Object,
  	}
  }, 
  components: {
  	VideoList,
  }
}
</script>

<style>
.importance-degree {
	padding-left: 10px;
}
.star-img {
	height: 16px;
	width: 18px;
	padding-right: 2px;
}
</style>