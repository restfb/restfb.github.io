Generating a `SimpleDateFormat` instance is incredibly expensive and you should not generate a new formatter for every date string you have to parse. Therefore RestFB provides the possibility to replace the old and slow parsing with a faster solution. But you have to take care of some cleanup because the higher speed can result in a small memory leak. Of course RestFB provides everything you need to do it right.

With version 1.7.0 you can decide which <a target="_blank" href="/javadoc-2/com/restfb/util/DateFormatStrategy.html">`DateFormatStrategy`</a> you use. The default strategy is the <a target="_blank" href="/javadoc-2/com/restfb/util/SimpleDateFormatStrategy.html">`SimpleDateFormatStrategy`</a>. It's almost the same behavior as in the versions before 1.7.0 and you don't need to change anything.

The faster strategy is called <a target="_blank" href="/javadoc-2/com/restfb/util/CachedDateFormatStrategy.html">`CachedDateFormatStrategy`</a>. You have to set this manually in the <a target="_blank" href="/javadoc-2/com/restfb/util/DateUtils.html">`DateUtils`</a> singleton and call the `clearThreadLocal` method at the end of a thread to prevent the memory leak mentioned above. You should have a look at the code example below.

Because we provide the <a target="_blank" href="/javadoc-2/com/restfb/util/DateFormatStrategy.html">`DateFormatStrategy`</a> as an interface you can implement your own strategy.

{% highlight java %}
DateUtils.setDateFormatStrategy(new CachedDateFormatStrategy());
// do your normal stuff in that thread
...
// clean the thread local cache just before you finish the thread
DateFormatStrategy strategy = DateUtils.getDateFormatStrategy();
if (strategy instanceof CachedDateFormatStrategy)
  ((CachedDateFormatStrategy)strategy).clearThreadLocal();
{% endhighlight %}
