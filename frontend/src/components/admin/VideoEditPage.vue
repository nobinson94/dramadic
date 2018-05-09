<template>
	<div>
		<div class="title-box">
			<h5>영상 수정하기</h5>
		</div>
		<div class="form-box">
			<form>
				<div class="row">
					<div class="col-md-5 form-group">
						<label for="mainTitle">Main Title</label>
						<input type="text" class="form-control" v-model="video.VIDEO_Main_Title">
					</div>
					<div class="col-md-5 form-group">
						<label for="mainTitle">Sub Title</label>
						<input type="text" class="form-control" v-model="video.VIDEO_Sub_Title">
					</div>
					<div class="col-md-2 form-group">
						<label for="mainTitle">Category</label>
						<input type="text" class="form-control" v-model="video.VIDEO_Category">
					</div>					
				</div>
				<table class="table table-sm">
					<thead>
						<th>#</th>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Text</th>
						<th>Keywords</th>
						<th>Sentence Num</th>
					</thead>
					<tbody>
						<tr v-for="script in scriptList">
							<td>{{ script.script_num }}</td>
							<td>{{ script.Start_time }}</td>
							<td>{{ script.End_time }}</td>
							<td>
								<input type="text" class="form-control" v-model="script.text">
							</td>
							<td>
								<vue-tags-input
								v-if="script.keywords"
								v-model="script.keyword"
								:tags="script.keywords"
      							@tags-changed="newTags => script.keywords = newTags"
    							/>
							</td>
							<td>
								<input type="text" class="form-control" v-model="script.sentence_id">
							</td>
						</tr>
					</tbody>
				</table>
				
			</form>
		</div>
	</div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
	data() {
		return {
		}
	},
	created() {
		this.fetchData(0);
	},
	methods: {
		fetchData: function(startid) {
			let videoid = this.$route.query.videoid;
			this.$store.dispatch('getEditScriptList', {
				videoid: videoid,
				start: startid,
			});
			this.$store.dispatch('getEditVideoInfo', {
				videoid: videoid
			});
		},

	},
	computed: {
		scriptList: {
			set(val) {
				console.log(val);
				this.$store.commit('updateEditScriptInfo', val);
			},
			get() {
				return this.$store.getters.editScriptList;
			}
		},
		video: {
			set(val) {
				console.log(val);
				this.$store.commit('updateEditVideoInfo', val);
			},
			get() {
				return this.$store.getters.editVideoInfo;
			}
		}
	},
	components: {
    	VueTagsInput,
 	},
}
</script>

<style scoped>
.title-box {
	height: 50px;
	margin-top:20px;
}
</style>