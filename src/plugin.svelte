<script lang="ts">
	import * as pckg from "../package.json";
	import "./app.css"
	
	
	interface Props {
		// Inputs
		doc: XMLDocument | undefined;
		editCount: number;
	}

	// let { doc, editCount }: Props = $props();
</script>


<h2>Welcome to oscd-io-centern</h2>


<input type="hidden" name="package-name" value={pckg.name} />
<input type="hidden" name="package-version" value={pckg.version} />
