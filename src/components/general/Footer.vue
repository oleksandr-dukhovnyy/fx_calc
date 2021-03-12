<template>

	<div class="footer-contain">
		<div class="line"></div>
		<div class="copyright">
			SCRIPT developers studio <span>©</span>
			<span class="email">
				<a href="https://mail.google.com/mail/u/0/?tab=om#inbox?compose=CllgCHrgljwZRpXjNrvTSkgCLnPwzqrSdWkKwMNtFzHjCpsHVlLplGVvbjStzQRpNPbJjxRVljq"
					target="blank"
				>feat@vip-person.net</a>
			</span>
		</div>
	</div>

</template>

<script>
export default {
	name: 'Footer'
}
</script>

<style scoped>
	.footer-contain {
		position: fixed;
		bottom: 0px;

		color: black !important;
		width: 100%;
		margin: 8px 0px;
		text-align: center;
		opacity: 0.6;
	}
	.line {
		position: relative;
		top: 3px;

		height: 1px;
		width: calc( (97px * 2) );
		margin: 0 auto;
		/* background-color: rgba( 0, 0, 0, .5 ); */
	}
	.copyright {
		margin-top: 10px;
		font-size: 12px;
		color: black;
	}
	a.text:active,
	a.text:hover,
	a.text {
		color: black;
		text-decoration: underline;
		text-decoration: none;
	}
	a:-webkit-any-link {
		color: black;
	}

	.email {
		margin-left: 12px;
		margin-right: 3px;
	}

	@media ( max-device-height: 410px ) {
		.footer-contain {
			/* bottom: -50px; */
			position: relative;
			margin-top: 30px;
		}
	}

	@media ( max-device-width: 580px ) {
		.copyright {
			font-size: 14px;
		}
	}
</style>