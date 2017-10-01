<div class="rfb-callout info">
	<h4>
		Before we go further, a few words about logging...
	</h4>
	<p>
		With RestFB 2.x the logging framework used is slf4j as soon as it is found in the class path. If no slf4j is found, java.util.logging is used as in RestFB 1.x.  
	</p>
	<p>
		RestFB 1.x uses <code>java.util.logging</code> to log the data that's sent over the wire to and from Facebook. It's often helpful to look at the log output so you can make sure that RestFB is sending the data as you expect it to and that Facebook is returning the correct JSON. <code>java.util.logging</code> is used by RestFB 2.x as fallback.
	</p>
	<p>
		Want to use <a target="_blank" href="http://logging.apache.org/log4j/1.2/">Log4j</a> instead of java.util.logging? No problem! You can disable java.util.logging for RestFB and use <a target="_blank" href="http://www.slf4j.org/">SLF4J</a> to re-route (bridge) all logging calls to Log4j. You may look at our <a target="_blank" href="https://github.com/restfb/restfb-examples">example project</a> which demonstrates this process</a>.
	</p>
	<p>
		If you're curious about how this works, <a target="_blank" href="http://slf4j.org/legacy.html">here's more information about SLF4J bridging.</a>
	</p>
	<p>
		If you're concerned about SLF4J bridging performance, check out <a href="http://logback.qos.ch/manual/configuration.html#LevelChangePropagator" target="_blank">this section of the SLF4J manual</a>.<br>
		Thanks to Chris Pruett for the heads-up about that.
	</p>
</div>
