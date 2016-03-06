See <a target="_blank" href="http://developers.facebook.com/docs/api#reading">Graph API documentation</a>

If you fetch a type from Facebook you get a prefilled version. With Graph API 2.4 Facebook changed the behavior and
you get only a very minimalistic object. The basic idea of this approach is to save bandwidth and make the
transfer much faster, but you have to tell Facebook which fields you need. The requested fields have to be
provided as comma separated list.

Basically you should add the `fields` parameter on every request. So you can be sure to get
the right information. The fields a type supports can be found in the Graph API Reference.

#### Request with fields (first level)

A simple example looks like the following snippet. A user is fetched with `id`, `name` and `email` field filled.

{% highlight java %}
// fetch user type with id, name and email prefilled
User user = facebookClient.fetchObject("me", User.class,
     Parameter.with("fields", "id,name,email")); 

out.println("User name: " + user.getName());
{% endhighlight %}

#### Request with fields (limit)


A even more interesting feature is the `limit(x)` method. If a type contains a field that
represents a list of other types, for example the comments field on a post, you can limit the transferred
objects with the `limit()`. This sounds very complicated and abstract but is very easy to use.
To show the usage we have a simple example.

{% highlight java %}
// fetch post type with from, to and two comments prefilled
Post post = facebookClient.fetchObject("74133697733_10152424266332734", Post.class,
     Parameter.with("fields", "from,tp,comments.limit(2)"));
{% endhighlight %}

#### Request with fields (second level)

Now we go a step further and have a look at the second level of the fields. Until now we worked only
with the first level, but Facebook supports more levels. In this example we use the second level.
The next level is added with the curly brackets and they encapsulate the fields of the next level type.
This sounds complicated too, but is easy as soon as you see a example. And here we go:

{% highlight java %}
// fetch post type with from, to and two comments prefilled,
// the comments contain only the from and message fields
Post post = facebookClient.fetchObject("74133697733_10152424266332734", Post.class,
     Parameter.with("fields", "comments.limit(2){from,message}"));
{% endhighlight %}

#### Request with fields (third to n-th level)

And the last example is the third level. Now we take the last example and request only the `id` from the `from` field. This is similar to the second level and so you get a idea how the different levels work and so you can work with n-levels if necessary.

{% highlight java %}
// fetch post type with from, to and two comments prefilled,
// the comments contain only the from and message fields
// the inner from field contains only the id
Post post = facebookClient.fetchObject("74133697733_10152424266332734", Post.class,
     Parameter.with("fields", "comments.limit(2){from{id},message}"));
{% endhighlight %}
