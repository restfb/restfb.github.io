{% highlight java %}
// Fetching Insights data is as simple as fetching a Connection

Connection<Insight> insights = 
	facebookClient.fetchConnection("PAGE_ID/insights", Insight.class);

for (Insight insight : insights.getData())
  out.println(insight.getName());
{% endhighlight %}