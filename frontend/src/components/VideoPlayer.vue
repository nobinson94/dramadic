<template>
	<div>
		<div id="my-video">
		</div>
	</div>
</template>


<script>

import jwPlayer from "../lib/jwplayer/jwplayer.js";
export default {
	props: {
  		path: {
  			type: String,
  		},
  	},
  	created () {
  		const script = document.createElement('script');
  		script.src = "https://content.jwplatform.com/libraries/WcNjC1Qj.js"
		document.head.appendChild(script);
		jwplayer.key="/r/SfRDbt/9tP6f5ck8fXS0geEtmLdMuy8fc2ovsg8k=";
	},
	computed: {
		
	},
	methods: {
		cutVideo() {

		}
	},
	mounted () {
		var file = this.path;
		this.$nextTick(function () {
			jwplayer("my-video").setup({
			 //'provider': 'rtmp',
			 //'streamer': 'rtmp://s22mzdgskx7nd1.cloudfront.net/cfx/st/',
			 'file': 'http://dramadicbucket.s3.amazonaws.com/'+file,
			 'width': '600',
			 'height': '400',
			 'primary': 'flash',
			 'autostart': 'true',
			});
    	})
	}
		
}
</script>