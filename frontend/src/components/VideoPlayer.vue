<template>
	<div>
		<div id="my-video">
		</div>
		<!--<div>
			<video id="clip" controls preload=auto width=640 height=264 data-setup="{}">
    			<source src="http://d1m31uchl59ope.cloudfront.net/sebasi_e244.mp4" type='video/mp4'/>        
			</video>
		</div>-->
	</div>
</template>


<script src="https://content.jwplatform.com/libraries/WcNjC1Qj.js"></script>
<script>jwplayer.key="/r/SfRDbt/9tP6f5ck8fXS0geEtmLdMuy8fc2ovsg8k=";</script>
<script>	
export default {
	props: {
  		path: {
  			type: String,
  		},
  		starttime: {
  			type: String,
  		},
  		endtime: {
  			type: String,
  		}
  	},
  	created () {
  		this.setupPlayer();
	},
	watch: {
   
  	},
	computed : {
		
	},
	methods: {
		setupPlayer: function (){
    		var filename = this.path;
    		jwplayer("my-video")
    		.setup({
			 'provider': 'rtmp',
			 'streamer': 'rtmp://s22mzdgskx7nd1.cloudfront.net/cfx/st/',
			 'file': 'sebasi_e244.mp4',
			 'width': '720',
			 'height': '480',
			 'primary': 'flash',
			 'autostart': 'true'
			});
    	}	
	}
}
</script>