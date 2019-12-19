First you need an access token with the `manage_pages` and the `instagram_basic` permissions. With those permissions it is possible to fetch the needed page access token including the instagram id. For this we simply call:

{% highlight java %}
FacebookClient client = new DefaultFacebookClient("<user access token>", Version.VERSION_5_0);

Connection<Page> pageConnection = client.fetchConnection("/me/accounts/", Page.class, Parameter.with("fields","id,name,access_token,instagram_business_account"));

List<Page> instaPageList = StreamSupport.stream(pageConnection.spliterator(), false)
	.flatMap(List::stream)
	.filter((p) -> p.getInstagramBusinessAccount() != null)
    .collect(Collectors.toList());
{% endhighlight %}

Now you have a list of pages, containing the page access token and the instagram account id. 
