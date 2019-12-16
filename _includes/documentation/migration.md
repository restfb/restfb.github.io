<div class="alert alert-warning">
	<h4>Important migration information from 1.x to 2.x</h4>
	<div>
		For RestFB 2.0.0 we provide a <a href="https://github.com/restfb/restfb/blob/master/migrations.md">migration guide</a> in which you'll find the notable changes to the RestFB API.<br/><br/>
		The most important change is the migration to a new JSON parser. With RestFB 2.x we use the very fast <a href="https://github.com/ralfstx/minimal-json#performance">minimal-json</a> library. That's the reason why the <code>JsonObject</code> and the other objects found in <code>com.restfb.json</code> have a different API. Please have a look at their <a href="https://github.com/ralfstx/minimal-json">GitHub repository</a> to get a sense of how that API looks. 
	</div>
</div>

<div class="alert alert-info">
	<h4>Migration from 2.x to 3.x</h4>
	<div>
		<p>
		The migration from 2.x to 3.x works without major changes in the API. There are some minor changes in the types, but they are all explained in the javadoc.
	</p>
	<p>	
		The biggest change is the Java 8 source level. RestFB 3.0.0 is the first version that needs at least Java 8. You can now use all the fancy Java 8 stuff like streams, lambda functions and so on.
	</p>
	</div>
</div>