<div class="rfb-callout info">
	<h4>
		Before we go further, a few words about logging...
	</h4>
	<p>
		With RestFB 2.x the logging framework used is slf4j as soon as it is found in the class path. If no slf4j is found, <code>java.util.logging</code> is used as fallback.  
	</p>
	<p>
		Both kinds of logging can beused to log the data that's sent over the wire to and from Facevook. It's often helpful to look at the log output so you can make sure that RestFB is sending the data as you expect it to and that Facebook is returning the correct JSON.
	</p>
	<p>
		Because RestFB supports the slf4j logging wrapper directly, it is possible to use any logging framework that works with slf4j. Logging RestFB log messages with your favorite logging framework is no problem. You have to change your logging configuration as you do with new project internal loggers.
	</p>
</div>
