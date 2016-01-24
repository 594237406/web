##客户端浏览器（ip为192.168.2.33）与服务器的交互过程：

1. 浏览器 向DNS服务器发出查询请求
1. DNS服务器返回应答
1. 浏览器（192.168.2.33）向服务器（220.181.50.118）发出连接请求。此为TCP三次握手第一步，此时从图中可以看出，为SYN，seq:X （x=0）
1. 服务器（220.181.50.118）回应了浏览器（192.168.2.33）的请求，并要求确认，此时为：SYN，ACK，此时seq：y（y为0），ACK：x+1（为1）。此为三次握手的第二步
1. 浏览器（192.168.2.33）回应了服务器（220.181.50.118）的确认，连接成功。为：ACK，此时seq：x+1（为1），ACK：y+1（为1）。此为三次握手的第三步
1. 浏览器（192.168.2.33）发出一个页面HTTP请求
1. 服务器（220.181.50.118）确认
1. 服务器（220.181.50.118）发送数据
1. 客户端浏览器（192.168.2.33）确认
1. 客户端（192.168.2.33）发出一个图片HTTP请求
1. 服务器（220.181.50.118）发送状态响应码200 OK
1. 响应完毕后，浏览器向服务器发出结束请求，FIN
1. 服务器返回结束请求确认，FIN-ACK
1. 浏览器回应服务器确认，为ACK，连接关闭

    *FIN：结束标志
        带有该标志置位的数据包用来结束一个TCP回话，但对应端口仍处于开放状态，准备接收后续数据。
    *SYN：同步标志
    同步序列编号(Synchronize Sequence Numbers)栏有效。该标志仅在三次握手建立TCP连接时有效。它提示TCP连接的服务端检查序列编号，该序列编号为TCP连接初始端(一般是客户端)的初始序列编号。在这里，可以把 TCP序列编号看作是一个范围从0到4，294，967，295的32位计数器。通过TCP连接交换的数据中每一个字节都经过序列编号。在TCP报头中的序列编号栏包括了TCP分段中第一个字节的序列编号。
    *ACK：确认标志
    确认编号(Acknowledgement Number)栏有效。大多数情况下该标志位是置位的。TCP报头内的确认编号栏内包含的确认编号(w+1，Figure-1)为下一个预期的序列编号，同时提示远端系统已经成功接收所有数据。

##头部信息
###请求头
	
	Accept：浏览器可接受的MIME类型
	Accept-Charset：浏览器可接受的字符集；
	Accept-Encoding：浏览器能够进行解码的数据编码方式，比如gzip。Servlet能够向支持gzip的浏览器返回经gzip编码的HTML页面。许多情形下这可以减少5到10倍的下载时间；
	Accept-Language：浏览器所希望的语言种类，当服务器能够提供一种以上的语言版本时要用到；
	Authorization：授权信息，通常出现在对服务器发送的WWW-Authenticate头的应答中；
	Connection：表示是否需要持久连接。如果Servlet看到这里的值为“Keep-Alive”，或者看到请求使用的是HTTP 1.1（HTTP 1.1默认进行持久连接），它就可以利用持久连接的优点，当页面包含多个元素时（例如Applet，图片），显著地减少下载所需要的时间。要实现这一点，Servlet需要在应答中发送一个Content-Length头，最简单的实现方法是：先把内容写入ByteArrayOutputStream，然后在正式写出内容之前计算它的大小；
	Content-Length：表示请求消息正文的长度；
	Cookie：这是最重要的请求头信息之一；
	From：请求发送者的email地址，由一些特殊的Web客户程序使用，浏览器不会用到它；
	Host：初始URL中的主机和端口；
	If-Modified-Since：只有当所请求的内容在指定的日期之后又经过修改才返回它，否则返回304“Not Modified”应答；
	Pragma：指定“no-cache”值表示服务器必须返回一个刷新后的文档，即使它是代理服务器而且已经有了页面的本地拷贝；
	Referer：包含一个URL，用户从该URL代表的页面出发访问当前请求的页面。
	User-Agent：浏览器类型，如果Servlet返回的内容与浏览器类型有关则该值非常有用；
	UA-Pixels，UA-Color，UA-OS，UA-CPU：由某些版本的IE浏览器所发送的非标准的请求头，表示屏幕大小、颜色深度、操作系统和CPU类型。
###响应头
	Allow：服务器支持哪些请求方法（如GET、POST等）；
	Content-Encoding：文档的编码（Encode）方法。只有在解码之后才可以得到Content-Type头指定的内容类型。利用gzip压缩文档能够显著地减少HTML文档的下载时间。Java的GZIPOutputStream可以很方便地进行gzip压缩，但只有Unix上的Netscape和Windows上的IE 4、IE 5才支持它。因此，Servlet应该通过查看Accept-Encoding头（即request.getHeader("Accept-Encoding")）检查浏览器是否支持gzip，为支持gzip的浏览器返回经gzip压缩的HTML页面，为其他浏览器返回普通页面；
	Content-Length：表示内容长度。只有当浏览器使用持久HTTP连接时才需要这个数据。如果你想要利用持久连接的优势，可以把输出文档写入ByteArrayOutputStram，完成后查看其大小，然后把该值放入Content-Length头，最后通过byteArrayStream.writeTo(response.getOutputStream()发送内容；
	Content-Type： 表示后面的文档属于什么MIME类型。Servlet默认为text/plain，但通常需要显式地指定为text/html。由于经常要设置Content-Type，因此HttpServletResponse提供了一个专用的方法setContentTyep。 可在web.xml文件中配置扩展名和MIME类型的对应关系；
	Date：当前的GMT时间。你可以用setDateHeader来设置这个头以避免转换时间格式的麻烦；
	Expires：指明应该在什么时候认为文档已经过期，从而不再缓存它。
	Last-Modified：文档的最后改动时间。客户可以通过If-Modified-Since请求头提供一个日期，该请求将被视为一个条件GET，只有改动时间迟于指定时间的文档才会返回，否则返回一个304（Not Modified）状态。Last-Modified也可用setDateHeader方法来设置；
	Location：表示客户应当到哪里去提取文档。Location通常不是直接设置的，而是通过HttpServletResponse的sendRedirect方法，该方法同时设置状态代码为302；
	Refresh：表示浏览器应该在多少时间之后刷新文档，以秒计。除了刷新当前文档之外，你还可以通过setHeader("Refresh", "5; URL=http://host/path")让浏览器读取指定的页面。注意这种功能通常是通过设置HTML页面HEAD区的<META HTTP-EQUIV="Refresh" CONTENT="5;URL=http://host/path">实现，这是因为，自动刷新或重定向对于那些不能使用CGI或Servlet的HTML编写者十分重要。但是，对于Servlet来说，直接设置Refresh头更加方便。注意Refresh的意义是“N秒之后刷新本页面或访问指定页面”，而不是“每隔N秒刷新本页面或访问指定页面”。因此，连续刷新要求每次都发送一个Refresh头，而发送204状态代码则可以阻止浏览器继续刷新，不管是使用Refresh头还是<META HTTP-EQUIV="Refresh" ...>。注意Refresh头不属于HTTP 1.1正式规范的一部分，而是一个扩展，但Netscape和IE都支持它。
###实体头
实体头用坐实体内容的元信息，描述了实体内容的属性，包括实体信息类型，长度，压缩方法，最后一次修改时间，数据有效性等。

	Allow：GET,POST
	Content-Encoding：文档的编码（Encode）方法，例如：gzip，见“2.5 响应头”；
	Content-Language：内容的语言类型，例如：zh-cn；
	Content-Length：表示内容长度，eg：80，可参考“2.5响应头”；
	Content-Location：表示客户应当到哪里去提取文档，例如：http://www.dfdf.org/dfdf.html，可参考“2.5响应头”；
	Content-MD5：MD5 实体的一种MD5摘要，用作校验和。发送方和接受方都计算MD5摘要，接受方将其计算的值与此头标中传递的值进行比较。Eg1：Content-MD5: <base64 of 128 MD5 digest>。Eg2：dfdfdfdfdfdfdff==；
	Content-Range：随部分实体一同发送；标明被插入字节的低位与高位字节偏移，也标明此实体的总长度。Eg1：Content-Range: 1001-2000/5000，eg2：bytes 2543-4532/7898
	Content-Type：标明发送或者接收的实体的MIME类型。Eg：text/html; charset=GB2312       主类型/子类型；
	Expires：为0证明不缓存；
	Last-Modified：WEB 服务器认为对象的最后修改时间，比如文件的最后修改时间，动态页面的最后产生时间等等。例如：Last-Modified：Tue, 06 May 2008 02:42:43 GMT.
###扩展头
在HTTP消息中，也可以使用一些再HTTP1.1正式规范里没有定义的头字段，这些头字段统称为自定义的HTTP头或者扩展头，他们通常被当作是一种实体头处理。
现在流行的浏览器实际上都支持Cookie,Set-Cookie,Refresh和Content-Disposition等几个常用的扩展头字段。

	Refresh：1;url=http://www.dfdf.org  //过1秒跳转到指定位置；
	Content-Disposition：头字段,可参考“2.5响应头”；
	Content-Type：WEB 服务器告诉浏览器自己响应的对象的类型。
	eg1：Content-Type：application/xml ；
	eg2：applicaiton/octet-stream；
	Content-Disposition：attachment; filename=aaa.zip。



##Cookie和Session
Cookie和Session都为了用来保存状态信息，都是保存客户端状态的机制，它们都是为了解决HTTP无状态的问题而所做的努力。
Session可以用Cookie来实现，也可以用URL回写的机制来实现。用Cookie来实现的Session可以认为是对Cookie更高级的应用。
###两者比较
Cookie和Session有以下明显的不同点：

1）Cookie将状态保存在客户端，Session将状态保存在服务器端

2）Cookies是服务器在本地机器上存储的小段文本并随每一个请求发送至同一个服务器。Cookie最早在RFC2109中实现，后续RFC2965做了增强。网络服务器用HTTP头向客户端发送cookies，在客户终端，浏览器解析这些cookies并将它们保存为一个本地文件，它会自动将同一服务器的任何请求缚上这些cookies。Session并没有在HTTP的协议中定义

3）Session是针对每一个用户的，变量的值保存在服务器上，用一个sessionID来区分是哪个用户session变量,这个值是通过用户的浏览器在访问的时候返回给服务器，当客户禁用cookie时，这个值也可能设置为由get来返回给服务器

4）就安全性来说：当你访问一个使用session 的站点，同时在自己机子上建立一个cookie，建议在服务器端的SESSION机制更安全些.因为它不会任意读取客户存储的信息


    
###使用URL回显来实现
URL回写是指服务器在发送给浏览器页面的所有链接中都携带JSESSIONID的参数，这样客户端点击任何一个链接都会把JSESSIONID带会服务器。
如果直接在浏览器输入服务端资源的url来请求该资源，那么Session是匹配不到的。
Tomcat对Session的实现，是一开始同时使用Cookie和URL回写机制，如果发现客户端支持Cookie，就继续使用Cookie，停止使用URL回写。如果发现Cookie被禁用，就一直使用URL回写。jsp开发处理到Session的时候，对页面中的链接记得使用response.encodeURL() 。




##协议详解篇
1. HTTP/1.0和HTTP/1.1的比较
RFC 1945定义了HTTP/1.0版本，RFC 2616定义了HTTP/1.1版本。
笔者在blog上提供了这两个RFC中文版的下载地址。

RFC1945下载地址：
http://www.blogjava.net/Files/amigoxie/RFC1945（HTTP）中文版.rar

RFC2616下载地址：
http://www.blogjava.net/Files/amigoxie/RFC2616（HTTP）中文版.rar

####建立连接方面

HTTP/1.0 每次请求都需要建立新的TCP连接，连接不能复用。HTTP/1.1 新的请求可以在上次请求建立的TCP连接之上发送，连接可以复用。优点是减少重复进行TCP三次握手的开销，提高效率。
注意：在同一个TCP连接中，新的请求需要等上次请求收到响应后，才能发送。

####Host域

HTTP1.1在Request消息头里头多了一个Host域, HTTP1.0则没有这个域。
Eg：
    GET /pub/WWW/TheProject.html HTTP/1.1
    Host: www.w3.org

可能HTTP1.0的时候认为，建立TCP连接的时候已经指定了IP地址，这个IP地址上只有一个host。

####日期时间戳
(接收方向)
无论是HTTP1.0还是HTTP1.1，都要能解析下面三种date/time stamp：
Sun, 06 Nov 1994 08:49:37 GMT ; RFC 822, updated by RFC 1123
Sunday, 06-Nov-94 08:49:37 GMT ; RFC 850, obsoleted by RFC 1036
Sun Nov 6 08:49:37 1994       ; ANSI C's asctime() format
       (发送方向)
HTTP1.0要求不能生成第三种asctime格式的date/time stamp；
HTTP1.1则要求只生成RFC 1123(第一种)格式的date/time stamp。
1. 状态响应码
状态响应码100 (Continue) 状态代码的使用，允许客户端在发request消息body之前先用request header试探一下server，看server要不要接收request body，再决定要不要发request body。
客户端在Request头部中包含
Expect: 100-continue
       Server看到之后呢如果回100 (Continue) 这个状态代码，客户端就继续发request body。这个是HTTP1.1才有的。
另外在HTTP/1.1中还增加了101、203、205等等性状态响应码
####请求方式
HTTP1.1增加了OPTIONS, PUT, DELETE, TRACE, CONNECT这些Request方法.
	
	Method         = "OPTIONS"                ; Section 9.2
	              | "GET"                    ; Section 9.3
	              | "HEAD"                   ; Section 9.4
	              | "POST"                   ; Section 9.5
	              | "PUT"                    ; Section 9.6
	              | "DELETE"                 ; Section 9.7
	              | "TRACE"                  ; Section 9.8
	              | "CONNECT"                ; Section 9.9
	              | extension-method
	extension-method = token

####HTTP请求消息

#####HTTP请求格式:

	<request-line>
	<headers>
	<blank line>
	[<request-body>]
说明:第一行必须是一个请求行(request-line),用来说明请求类型,要访问的资源以及所使用的HTTP版本.紧接着是一个首部(header)小节,用来说明服务器要使用的附加信息.之后是一个空行.再后面可以添加任意的其他数据[称之为主体(body)].

	//例1 GET请求:
	
	GET / HTTP/1.1
	Accept: */*
	Accept-Language: zh-cn
	Accept-Encoding: gzip, deflate
	User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)
	Host: www.google.cn
	Connection: Keep-Alive
	说明:请求的第一部分说明了该请求是一个GET请求.该行的第二部分是一个斜杠(/),用来说明请求的是该域名的根目录.该行的最后一部分说明使用的是HTTP1.1版本(另一个可选荐是1.0).
	      第2行是请求的第一个首部,HOST将指出请求的目的地.User-Agent,服务器端和客户端脚本都能访问它,它是浏览器类型检测逻辑的重要基础.该信息由你的浏览器来定义,并且在每个请求中自动发送.Connection,通常将浏览器操作设置为Keep-Alive
	      第三部分,空行,即使不存在请求主体,这个空行也是必需的.

----------


	//例2 POST请求:
	
	POST / HTTP1.1
	Host:www.wrox.com
	User-Agent:Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)
	Content-Type:application/x-www-form-urlencoded
	Content-Length:40
	Connection: Keep-Alive
	
	name=Professional%20Ajax&publisher=Wiley
	说明:请求行开始处的GET改为POST,以表示不同的请求类型.
	      Content-Type说明了请求主体的内容是如何编码的.浏览器始终以application/x-www-form-urlencoded的格式编码来传送数据,这是针对简单URL编码的MIME类型.Content-Length说明了请求主体的字节数.
	      最后请求主体.名称-值对的形式.

#####HTTP响应格式:
	<status-line>
	<headers>
	<blank line>
	[<response-body>]

----------


	//例:
	
	HTTP/1.1 200 OK
	Date: Fri, 22 May 2009 06:07:21 GMT
	Content-Type: text/html; charset=UTF-8
	
	<html>
	      <head></head>
	      <body>
	            <!--body goes here-->
	      </body>
	</html>
	说明:HTTP状态码200,找到资源,并且一切正常.
	      Date:生成响应的日期和时间.
	      Content-Type:指定了MIME类型的HTML(text/html),编码类型是UTF-8
	      HTML源文体.