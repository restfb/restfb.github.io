# restfb.github.io
The RestFB website

## how to generate the minimized files
The css and javascript files are generated from some easy to read files and combined afterwards by gradle.

To combine and minimize you only need to call

```shell
gradle
```

The default task builds the new css and javascript files and minimizes them, too.

### what about the css files
The css files can be found in the css directory. Only the combined and the minimized versions of the css files are placed. In the resources directory, the origin css files can be found. If you change something, change it there.

### what about the javascript files
The javascript files are combined and minimized and can be found in the js directory. The origin files can be found in the resources directory.


## Test the current webpage locally
To test the current restfb webpage you can simply run 

```shell
gradle jettyRun
```

A Jetty Server is started, that serves the webpage locally and you have to start the shown URL in your browser.


## known issues
* the ZeroClipboard-swf uses an absolute path, so the copy button is not working