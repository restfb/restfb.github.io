To make the configuration of our logging more easy for the developers, we don't use
loggers that are initialized with the name of the class they are created in. Our loggers have fixed
names and the therefore the logging is clustered into categories.

In the RestFB version 1.x line we named the categories after the former class names so we don't break
the current logging configurations. With the next major update this will change.

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
			com.restfb.DefaultJsonMapper
		</h4>
		<p class="list-group-item-text" markdown="1">
			The `JsonMapper` is used to convert JSON to the RestFB types. Because the conversion contains many interesting steps, we provide a special logger. If everything works as is should the logger is very silent, but the developer may change the log level to `DEBUG` or `TRACE` to get much more information what's going on in the mapping process. You should do this only if you run into problems and like to track them down to a special conversion step.
		</p>
	</div>
	<div class="list-group-item">
		<h4 class="list-group-item-heading" markdown="1">
			com.restfb.UTILITY
		</h4>
		<p class="list-group-item-text" markdown="1">
			The logger is used in our utilities. We have utilities for date conversion, base64 calculations and some more. Just check the `com.restfb.util` package. These utilities log some information and use this special logger to not pollute the other logs with not so important information.
		</p>
	</div>
	<div class="list-group-item">
		<h4 class="list-group-item-heading" markdown="1">
			com.restfb.DefaultFacebookClient
		</h4>
		<p class="list-group-item-text">
			This logger provides information about the communication between the application and RestFB.
		</p>
	</div>
	<div class="list-group-item">
		<h4 class="list-group-item-heading" markdown="1">
			com.restfb.types.webhook.ChangeValueFactory
		</h4>
		<p class="list-group-item-text" markdown="1">
			The log messages in the `ChangeValueFactory` are used to notify the developer about some problems with the conversion of a object that is received via webhook. Maybe RestFB does not support this special value object and the developer get the information to send a special String to the RestFB team. Because this is different to the normal logging, we provide a special logger and the developer may filter these messages and log them in a different log file.
		</p>
	</div>
</div>

As you can see, all loggers use the package structure with the prefix `com.restfb.`. With this it is  possible to change the log level of all loggers at once.

{% highlight java %}
# Example logging.properties entries
# ==================================

# to log the call to facebook including their responses
# you can change the com.restfb.HTTP log level accordingly during development time
com.restfb.HTTP.level=ALL

# the complete restfb package logging can be configured like this
com.restfb.level=WARNING
{% endhighlight %}