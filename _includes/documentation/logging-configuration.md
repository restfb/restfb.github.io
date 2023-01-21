To make it easier for developers to configure our logging, we don't use loggers 
that are initialised with the name of the class they were created in. Our loggers 
have fixed names and therefore the logging is clustered into categories.

<div class="list-group">
	<div class="list-group-item">
		<h4 class="list-group-item-heading" markdown="1">
			com.restfb.HTTP
		</h4>
		<p class="list-group-item-text">
			The HTTP logger is used to keep track of the communication between RestFB and the Facebook Graph API. In the log file you'll find the requests/responses, header information and more.
		</p>
	</div>
	<div class="list-group-item">
		<h4 class="list-group-item-heading" markdown="1">
			com.restfb.JSON_MAPPER
		</h4>
		<p class="list-group-item-text" markdown="1">
		 	The `JsonMapper` is used to convert JSON to RestFB types. Because the conversion involves many interesting steps, we provide a special logger. When everything is working as it should, the logger is very quiet, but the developer can change the log level to `DEBUG` or `TRACE` to get much more information about what's going on during the mapping process. You should only do this if you run into problems and want to trace them back to a specific conversion step.
		</p>
	</div>
	<div class="list-group-item">
		<h4 class="list-group-item-heading" markdown="1">
			com.restfb.UTILITY
		</h4>
		<p class="list-group-item-text" markdown="1">
			The logger is used in our utilities. We have utilities for date conversion, base64 calculations and more. Just have a look at `com.restfb.util` package. These utilities log some information and use this special logger to not clutter the other logs with less important information.
		</p>
	</div>
	<div class="list-group-item">
		<h4 class="list-group-item-heading" markdown="1">
			com.restfb.CLIENT
		</h4>
		<p class="list-group-item-text">
			This logger provides information about the communication between the application and RestFB.
		</p>
	</div>
	<div class="list-group-item">
		<h4 class="list-group-item-heading" markdown="1">
			com.restfb.types.CHANGE_VALUE_FACTORY
		</h4>
		<p class="list-group-item-text" markdown="1">
			The log messages in the `ChangeValueFactory` are used to inform the developer about some problems with the conversion of an object that is received via a webhook. Maybe RestFB does not support this special value object and the developer can capture the log output to send a special String to the RestFB team. As this is different from the normal logging, we provide a special logger and the developer can filter these messages and log them to a different log file.
		</p>
	</div>
</div>

As you can see, all loggers use the package structure with the `com.restfb.` prefix. This makes it possible to change the log level of all loggers at once.

{% highlight java %}
# Example logging.properties entries
# ==================================

# to log the call to facebook including their responses
# you can change the com.restfb.HTTP log level accordingly during development time
com.restfb.HTTP.level=ALL

# the complete restfb package logging can be configured like this
com.restfb.level=WARNING
{% endhighlight %}