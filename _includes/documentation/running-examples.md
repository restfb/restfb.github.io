RestFB provides a repository on Github with an <a href="https://github.com/restfb/restfb-examples" target="_blank">example project</a>. In this repository RestFB is used to fetch several pieces of information from Facebook, publish some information, and run a legacy example. The whole project is <a href="https://maven.apache.org/" target="_blank">Maven-based</a> and you may use this repository to start your own project using RestFB.

To run the examples you need to download the <a href="https://github.com/restfb/restfb-examples" target="_blank">restfb-examples project</a> as <a href="https://github.com/restfb/restfb-examples/archive/master.zip">zip file</a> or clone it from Github. Don't forget to replace the `MY_ACCESS_TOKEN` with your access token, otherwise the examples won't run.

{% highlight bash %}
$ mvn compile
$ mvn exec:java@run-reader-examples -Daccess_token=MY_ACCESS_TOKEN
$ mvn exec:java@run-publisher-examples -Daccess_token=MY_ACCESS_TOKEN
$ mvn exec:java@run-legacy-examples -Daccess_token=MY_ACCESS_TOKEN
{% endhighlight %}