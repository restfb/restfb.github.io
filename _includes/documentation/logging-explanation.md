<div class="rfb-callout info">
	<h4>
		Before we go further, a few words about logging...
	</h4>
	<p>
		RestFB uses <code>java.util.logging</code> to log the data that's sent over the wire to and from Facebook. It's often helpful to look at the log output so you can make sure that RestFB is sending the data as you expect it to and that Facebook is returning the correct JSON.
	</p>
	<p>
		Want to use <a target="_blank" href="http://logging.apache.org/log4j/1.2/">Log4j</a> instead of java.util.logging? No problem! You can disable java.util.logging for RestFB and use <a target="_blank" href="http://www.slf4j.org/">SLF4J</a> to re-route (bridge) all logging calls to Log4j. You may <a href="examples/RestFB%20Log4j%20Example.zip">download an example project which demonstrates this process</a>.
	</p>
	<p>
		If you're curious about how this works, <a target="_blank" href="http://slf4j.org/legacy.html">here's more information about SLF4J bridging.</a>
	</p>
	<p>
		If you're concerned about SLF4J bridging performance, check out <a href="http://logback.qos.ch/manual/configuration.html#LevelChangePropagator" target="_blank">this section of the SLF4J manual</a>.<br>
		Thanks to Chris Pruett for the heads-up about that.
	</p>
</div>
