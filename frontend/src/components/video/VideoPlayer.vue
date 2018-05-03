<template>
	<div>
		<div id="my-video">
		</div>
		<div id="my-subtle">
			{{ matchSubtle }}
		</div>
	</div>
</template>


<script>

import jwPlayer from "../../lib/jwplayer/jwplayer.js";
export default {
	data() {
		return {
			video_rendered: false,
			currentTime: 0,
			startTime: 0,
			matchSubtle: '',
		}
	},
	props: {
  		path: {
  			type: String,
  		},
  		subtle: {
  			type: Array,
  		}
  	},
  	created () {
  		const script = document.createElement('script');
  		script.src = "https://content.jwplatform.com/libraries/WcNjC1Qj.js"
		document.head.appendChild(script);
		jwplayer.key="/r/SfRDbt/9tP6f5ck8fXS0geEtmLdMuy8fc2ovsg8k=";
		this.startTime = this.subtle[0].stime;
	},
	computed: {
		state() {
			return jwplayer("my-video").getState();
		}
	},
	methods: {
		timeMsg() {
			setTimeout(()=> {
				this.alertMsg();
				this.changeSubtle();
			}, 100);
		},
		alertMsg() {
			this.currentTime = jwplayer("my-video").getPosition();	
		},
		changeSubtle() {
			let tempTime = this.startTime + this.currentTime;
			let matchSubtleData = this.subtle.filter(obj => {
				return (obj.stime < tempTime && tempTime < obj.etime); 
			});
			if(matchSubtleData[0]) this.matchSubtle = matchSubtleData[0].text;
			this.timeMsg();
		}
	},
	mounted () {
		let file = this.path;
		this.$nextTick(function () {
			jwplayer("my-video").setup({
			 //'provider': 'rtmp',
			 //'streamer': 'rtmp://s22mzdgskx7nd1.cloudfront.net/cfx/st/',
			 'file': 'http://dramadicbucket.s3.amazonaws.com/'+file,
			 'width': '100%',
			 'primary': 'flash',
			 'autostart': 'true',
			});
			this.timeMsg();
			this.video_rendered = true;
    	})
	}
		
}
</script>