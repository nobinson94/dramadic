<template>
	<div class="container">	
		<div class="new-video-btn-box">
			<button class="btn btn-outline-dark float-right" @click="showModal">새로운 영상 등록하기</button>	
		</div>
		<div class="video-list-box">

			<div class="collapse" id="filterBox">
				<div class="row">
					<div class="col-md-5">
						<form class="form-inline">
							<label for="title" class="col-sm-4">Title/제목</label>
							<input type="text" class="form-control col-sm-5" v-model="searchTitle">	
							<button class="btn btn-light" @click.prevent="searchByTitle">
								<div class="search-btn-img">
									<img src="../../assets/img/search-btn-black.png"/>
								</div>
							</button>
						</form>
					</div>
					<div class="col-md-5">
						<form class="form-inline">
						    <label for="category" class="col-sm-4">Category/분류</label>
						    <select class="custom-select col-sm-5" v-model="searchCategory">
		                      <option value="교양">교양</option>
		                      <option value="예능">예능</option>
		                      <option value="드라마">드라마</option>
		                    </select>
						    <button class="search-btn btn btn-light" @click.prevent="searchByCategory">
							  	<div class="search-btn-img">
									<img src="../../assets/img/search-btn-black.png"/>
								</div>
							</button>
						</form>
					</div>	
				</div>
			</div>
			
			<table class="table table-sm">
				<thead>
					<th>#</th>
					<th>Title / 제목</th>
					<th>Category / 분류</th>
					<th>
						<button class="float-right search-btn btn btn-light btn-sm">
							<div class="search-btn-img" data-toggle="collapse" data-target="#filterBox" aria-expanded="false" aria-controls="filterBox"><img src="../../assets/img/search-btn-black.png"/></div>
						</button>
					</th>
				</thead>
				<tbody>
					<tr v-for="(v, index) in videoList">
						<td>{{ index+1 }}</td>
						<td>&lt;{{ v.VIDEO_Main_Title }}&gt; {{ v.VIDEO_Sub_Title }}</td>
						<td>{{ v.VIDEO_Category }}</td>
						<td>
							<router-link :to="{path: `/admin/edit`, query: {videoid: v.VIDEO_INDEX} }" tag="button" class="btn btn-outline-dark btn-sm">Edit</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			searchTitle: '',
			searchCategory: '',
		}
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData: function() {
			this.$store.dispatch('getEditVideoList', {
				method: 'all',
				start: 0,
			});
		},
		showModal: function() {
			this.$store.commit('showNewVideoModal');
		},
		searchByTitle: function() {
			let targetTitle = this.searchTitle;
			this.$store.dispatch('getEditVideoList', {
				method: 'title',
				target: targetTitle,
				start: 0,
			})
		},
		searchByCategory: function() {
			let targetCat = this.searchCategory;
			this.$store.dispatch('getEditVideoList', {
				method: 'category',
				target: targetCat,
				start: 0,
			})
		}
	},
	computed: {
		videoList() {
			return this.$store.getters.editVideoList;
		}
	}
}
</script>

<style scoped>
img {
	width: 100%;
	height: 100%;
}
.search-btn {
	text-align: center;
	vertical-align: middle;	
}
.search-btn-img {
	margin-left:10%;
	margin-right:10%;
	width: 80%;
	height: 80%;
	text-align: center;
	vertical-align: middle;	
}
.video-list-box {
	margin-top: 10px;
}
.new-video-btn-box {
	height: 40px;
	padding-bottom: 15px;
}
</style>