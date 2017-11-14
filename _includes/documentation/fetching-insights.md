Insights work almost like any other connections, but the `Insight` type contains a list of `JsonObject`. The reason for this unusual approach is the dynamic nature of the different insights. They returned values are not all of the same structure and
not defined in the Graph API reference.

To fetch some page insights you simply have to call the endpoint of a page. But don't forget to add the `metrics` parameter if you are using Graph API 2.6 or later. An example of this looks like:

{% highlight java %}
Connection<Insight> insightsConnection = 
	facebookClient.fetchConnection("PAGE_ID/insights", 
	      Insight.class, // the insight type
	      Parameter.with("metric", "page_fan_adds_unique,page_fan_adds"));

for (List<Insight> insights: insightsConnection) {
  for (Insight insight : insights) {
    out.println(insight.getName());
  }
}
{% endhighlight %}