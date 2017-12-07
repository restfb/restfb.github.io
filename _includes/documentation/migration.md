<div class="alert alert-warning">
	<h4>Important migration information</h4>
	<div>
		For RestFB 2.0.0 we provide a <a href="https://github.com/restfb/restfb/blob/master/migrations.md">migration guide</a> and you'll find the changes on the RestFB API in that guide.<br/><br/>
		The most important part is the migration to the new JSON parser. With RestFB 2.x we use the very fast <a href="https://github.com/ralfstx/minimal-json#performance">minimal-json</a> lib. That's the reason why the <code>JsonObject</code> and the other objects found in <code>com.restfb.json</code> have a different API. Please have a look at their <a href="https://github.com/ralfstx/minimal-json">GitHub repository</a> to get an impression how they their API looks like. 
	</div>
</div>