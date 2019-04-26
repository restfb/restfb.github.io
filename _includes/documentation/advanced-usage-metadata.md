See <a target="_blank" href="https://developers.facebook.com/docs/graph-api/using-graph-api#introspection" class="badge badge-primary">Graph API documentation</a>

The Facebook Graph API provides a great feature which permits deep insight into node data. This feature is called introspection and it works similarly to the well-known reflection techniques that are part of many programming languages.

To activate introspection, you simply need to add the `metadata` parameter with the value `1`. How this is done can be found in the *Passing Parameters* section or look at the example at the bottom of this section.

RestFB supports ths feature, too. All types that extend the `FacebookType` have access to the metadata and you simply need to call the `getMetadata` method. The returned `Metadata` contains all the `fields`, `connections` and the `type` of the requested object.

The `type` is very important if you don't know what kind of node an `id` represents. In this metadata field you'll find the node and you can use this information to send a more complex and type-dependent request to Facebook. For example, if you analyze a feed and its `from` fields, it is important to discriminate based on `type` because the `from` may contain a `User` or a `Page`. 

{% highlight java %}
// You can specify metadata=1 for many calls, not just this one.
// See the Facebook Graph API documentation for more details.

User userWithMetadata =
  facebookClient.fetchObject("me", User.class, Parameter.with("metadata", 1));

out.println("User metadata: has albums? "
  + userWithMetadata.getMetadata().getConnections().hasAlbums());
{% endhighlight %}