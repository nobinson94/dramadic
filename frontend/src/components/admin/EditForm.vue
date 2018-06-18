<template>
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
			<table class="table table-sm table-hover">
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
						<td>{{ script.scriptNum }}</td>
						<td>{{ script.sTime }}</td>
						<td>{{ script.eTime }}</td>
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
							<input type="text" class="form-control form-control-sm" v-model="script.sentenceNum">
						</td>
					</tr>
				</tbody>
			</table>	
		</form>
	</div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
export default {
	computed: {
		scriptList() {
			return this.$store.getters.editScriptList;
			
		},
		video() {
			return this.$store.getters.editVideoInfo;
		}
	},
	components: {
    	VueTagsInput, 
 	},
};
</script>