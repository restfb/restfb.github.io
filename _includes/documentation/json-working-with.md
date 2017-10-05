Because of the architecture of RestFB a JSON mapper is used to convert the Facebook JSON into Java objects and convert them afterwards in the RestFB types according to defines rules.

In RestFB 1.x a modified json.org implementation is used to map the JSON to Java. In the past this was a reliable and stable way to work with JSON in Java, but nowadays there are more requirements.

So in RestFB 2.x a new mapper is introduced. We decided to use [minimal-json](https://github.com/ralfstx/minimal-json) because it is not only a implementation that has rather small code base, but it is a [fast mapper](https://github.com/ralfstx/minimal-json#performance) and we expect a performance boost in comparison to the old json.org implementation of RestFB 1.x. 
Moreover the complete minimal-json code is covered by junit tests.
