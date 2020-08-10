## 请求接口

> 请求URL:`https://pay.heepay.com/API/Payment/PaymentRefund.aspx`

> 请求方式:`POST/GET`   

> 是否需要证书：`否`


- 协议参数

<table data-hy-role="doctbl">
    <th>参数</th>
    <th>类型</th>
    <th>是否必填</th>
    <th>最大长度</th>
    <th width="220">描述</th>
    <th width="163">示例值</th>
</tr>
<tr>
    <td>version</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>当前接口版本号1</td>
    <td>1</td>
</tr>
<tr>
    <td>agent_id</td>
    <td>int</td>
    <td>是</td>
    <td>16</td>
    <td>商户编号，（汇付宝商户内码：七位整数数字）</td>
    <td>1664502</td>
</tr>
<tr>
    <td>agent_bill_id</td>
    <td>String</td>
    <td>否</td>
    <td>50</td>
    <td>商户系统内部的支付订单号（要保证唯一）</td>
    <td>acbacb123456</td>
</tr>
<tr>
    <td>refund_details</td>
    <td>String</td>
    <td>否</td>
    <td>1024</td>
    <td>商户系统内部的退款定单号（要保证唯一），商户退款单号可为空，如果传了要保证唯一，支持批量退款和部分退款，商户原支付单号，金额，商户退款单号|商户原支付单号，金额，商户退款单号 分割最多支持50笔 注意：金额传0或为空默认做全额退款</td>
    <td>63548281250,0.01,5232112|6358281251,0,5232113</td>
</tr>
<tr>
    <td>notify_url</td>
    <td>String</td>
    <td>是</td>
    <td>128</td>
    <td>支付后返回的商户处理页面，URL参数是以http://或https://开头的完整URL地址(后台处理)，提交的url地址必须外网能访问到，否则无法通知商户。值可以为空，但不可以为null。</td>
    <td>https://..</td>
</tr>
<tr>
    <td>sign_type</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>签名类型，MD5\RSA\RSA2</td>
    <td>MD5</td>
</tr>
<tr>
    <td>sign</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>MD5\RSA\RSA2签名结果</td>
    <td>5b30503b791628b580ed5d42e580ad92</td>
</tr>
</table>

```text
注意：agent_bill_id和refund_details为互斥参数，必须传其中一个参数。默认使用agent_bill_id，当agent_bill_id为空使用refund_details。单笔全额退款使用agent_bill_id参数，批量部分退款使用refund_details参数。
```

请求示例（GET方式）：

```text
https://pay.Heepay.com/Api/Payment/PaymentRefund.aspx?version=1&agent_id=1664502&agent_bill_id=2016010409434728660&refund_details=20170719144232&notify_url=RefundNotify.aspx&sign=a7f0a419c41058bd96d3e7d182351023
```

签名规则说明
参数签名顺序（必须按照此顺序组织签名）说明及示例：



```text
使用agent_bill_id参数示例：
sign=MD5(agent_bill_id=201601121832551312&agent_id=1664502&key=eb51467dc963448ea0b82f50&notify_url=http://xxxxxx/test.aspx&version=1)
```


```text
使用refund_details参数示例：
sign=MD5(agent_id=1664502&key=eb51467dc963448ea0b82f50&notify_url=http://xxxxxx/test.aspx&refund_details=201601121832551312,0.01,t20160101100105001&version=1)
```

注意：以上拼凑值不要有空格！
按照参数名称A-Z排序拼接，__并转换为小写后进行MD5__。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8.




- __同步返回__


<table data-hy-role="doctbl">
    <th>参数</th>
    <th>类型</th>
    <th>是否必填</th>
    <th>最大长度</th>
    <th width="220">描述</th>
    <th width="163">示例值</th>
</tr>
<tr>
    <td>ret_code</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>返回码值0000 表示提交成功</td>
    <td>0000</td>
</tr>
<tr>
    <td>ret_msg</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>返回码信息提示</td>
    <td>提交成功</td>
</tr>
<tr>
    <td>agent_id</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>商户编号（汇付宝商户编号：七位整数数字）</td>
    <td>1664502</td>
</tr>
<tr>
    <td>sign</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>MD5\RSA\RSA2签名结果</td>
    <td>5b30503b791628b580ed5d42e580ad92</td>
</tr>
</table>



```xml
返回示例：
<?xml version="1.0"encoding="utf-8"?>
<root>
<ret_code>0000</ret_code>
<ret_msg>操作成功</ret_msg>
<agent_id>1602809</agent_id>
<sign>e61fb9a553bdecbfc52e674b32a37b2b</sign>
</root>
```

```text
参数签名顺序（必须按照此顺序组织签名）说明及示例：
sign=MD5(agent_id=1664502&key=eb51467dc963448ea0b82f50&ret_code=0000&ret_msg=操作成功)
```

注意：以上拼凑值不要有空格！
按照参数名称A-Z排序拼接，__并转换为小写后进行MD5__。



## 通知接口



> 请求URL:`请求接口中的notify_url`

> 请求方式:`GET`   

> 是否需要证书：`否`


- 协议参数

<table data-hy-role="doctbl">
    <th>参数</th>
    <th>类型</th>
    <th>是否必填</th>
    <th>最大长度</th>
    <th width="220">描述</th>
    <th width="163">示例值</th>
</tr>
<tr>
    <td>ret_code</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>返回码值0000 表示查询成功</td>
    <td>0000</td>
</tr>
<tr>
    <td>agent_id</td>
    <td>int</td>
    <td>是</td>
    <td>16</td>
    <td>商户编号（汇付宝商户内码：七位整数数字）</td>
    <td>1664502</td>
</tr>
<tr>
    <td>hy_bill_no</td>
    <td>int</td>
    <td>是</td>
    <td>16</td>
    <td>汇付宝交易号(订单号)</td>
    <td>H2005271900000AU</td>
</tr>
<tr>
    <td>agent_bill_id</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>商户支付单据号</td>
    <td>123456</td>
</tr>
<tr>
    <td>agent_refund_bill_no</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>商户退款单号(商户退款时没有退款单号则为空)</td>
    <td>1234567891111</td>
</tr>
<tr>
    <td>refund_amt</td>
    <td>decimal</td>
    <td>是</td>
    <td>16</td>
    <td>退款金额</td>
    <td>10.00</td>
</tr>
<tr>
    <td>refund_status</td>
    <td>String</td>
    <td>是</td>
    <td>16</td>
    <td>退款状态（success=成功，fail=失败，refunding=退款中）</td>
    <td>success</td>
</tr>
<tr>
    <td>hy_deal_time</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>付退款时间（格式：yyyyMMddHHmmss）</td>
    <td>20200713213543</td>
</tr>
<tr>
    <td>sign</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>MD5\RSA\RSA2签名结果</td>
    <td>5b30503b791628b580ed5d42e580ad92</td>
</tr>
</table>

```text
友情提示：在notify_url的处理过程中必须要做退款逻辑，同时维护并校验该订单的退款状态以保证不会重复退款。返回参数当中的refund_amt是实际退款的金额，refund_status判断退款状态（success=成功，fail=失败，refunding=退款中）。
```

我方通知发送示例GET方式（异步通知）：

```text
http://www.xxxxx.com/heePayRefundNotify?agent_id=1664502&hy_bill_no=H2007133223832AT&agent_bill_id=2017071321422277&agent_refund_bill_no=&refund_amt=0.01&refund_status=SUCCESS&hy_deal_time=20170717145553&sign=b3af647dde2d4aba00860951d598dc9f
```

签名规则说明
参数签名顺序（必须按照此顺序组织签名）说明及示例：

```text
sign=md5(agent_id=1664502&hy_bill_no=h1707133223832at&agent_bill_id=2017071321422277&agent_refund_bill_no=&refund_amt=0.01&refund_status=success&hy_deal_time=20170717145553&key=123456789)
```

注意：以上拼凑值不要有空格！
按照示例顺序排序，__使用标准MD5算法进行加密__，加密结果全部转换成小写后，即为我们所需的订单MD5校验码。


接口说明：
```text
每一笔支付订单支付完成后，汇付宝在线服务器会发送支付结果信息到商户接口程序，该程序根据订单信息进行验签，成功响应ok失败响应error（字符串）例如：response.write(“ok”)，返回的信息不能包含HTML等标签，所有内容只有ok或error。
(不能有其他任何输出（包括空格、空行）) 。异步通知因网络原因可能多次请求商户，对此商户对同一笔订单要保证只处理一次。
在接口返回error后，商户需要进行一次主动查询，查询方法见：收款查询接口，否则将会导致双方订单状态不一致。
另外，notify_url可能存在同时返回多次的情况，请商户做好逻辑处理。
注意事项：
商户发货需以异步通知为准，签名验证通过后需验证支付状态是否是成功，通知的支付金额与商户下单时的金额
是否相符，有任何不符，请与我方核对后再做处理。
为进一步加强安全性，建议收到异步通知后调用查单接口，校验查询结果订单状态是否是成功，支付金额与下单
金额是否一致，有任何不符，请与我方核对后再做处理。
```



## 退款查询

> 请求URL:`https://Query.heepay.com/API/Payment/PaymentRefundQuery.aspx`

> 请求方式:`POST/GET`   

> 是否需要证书：`否`


- 协议参数

<table data-hy-role="doctbl">
    <th>参数</th>
    <th>类型</th>
    <th>是否必填</th>
    <th>最大长度</th>
    <th width="220">描述</th>
    <th width="163">示例值</th>
</tr>
<tr>
    <td>version</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>当前接口版本号1</td>
    <td>1</td>
</tr>
<tr>
    <td>agent_id</td>
    <td>int</td>
    <td>是</td>
    <td>16</td>
    <td>商户编号，（汇付宝商户内码：七位整数数字）</td>
    <td>1664502</td>
</tr>
<tr>
    <td>agent_bill_id</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>商户系统内部的订单号（要保证唯一）</td>
    <td>acbacb123456</td>
</tr>
<tr>
    <td>agent_refund_bill_no</td>
    <td>String</td>
    <td>否</td>
    <td>50</td>
    <td>商户系统内部的退款单号（要保证唯一）不参与签名</td>
    <td>acbacb123456</td>
</tr>
<tr>
    <td>sign</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>MD5\RSA\RSA2签名结果</td>
    <td>5b30503b791628b580ed5d42e580ad92</td>
</tr>
</table>

请求示例（GET方式）：

```text
https://Query.Heepay.com/Api/Payment/PaymentRefundQuery.aspx?version=1&agent_id=1664502&agent_bill_id=2016010409434728660&agent_refund_bill_no=20170719144232&sign=9a40734e90cb90b7ed9623c8ecb9a517
```

签名规则说明
参数签名顺序（必须按照此顺序组织签名）说明及示例：

```text
sign=MD5(agent_bill_id=2016010409434728660&agent_id=1664502&key=12345679&version=1)
```


注意：以上拼凑值不要有空格！
按照示例顺序排序，__使用标准MD5算法进行加密__，加密结果全部转换成小写后，即为我们所需的订单MD5校验码。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8




- **查询返回**

数据将以字符串形式在同一会话中同步返回
```text
例如：
<?xml version="1.0"encoding="utf-8"?>
<root>
<ret_code>0000</ret_code>
<ret_msg>操作成功</ret_msg>
<agent_id>商户号</agent_id>
<detail_data>退款明细</detail_data>
<sign>e61fb9a553bdecbfc52e674b32a37b2b</sign>
</root>
```

- 返回参数

<table data-hy-role="doctbl">
    <th>参数</th>
    <th>类型</th>
    <th>是否必填</th>
    <th>最大长度</th>
    <th width="220">描述</th>
    <th width="163">示例值</th>
</tr>
<tr>
    <td>ret_code</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>查询状态码</td>
    <td>0000</td>
</tr>
<tr>
    <td>ret_msg</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>查询返回信息，成功为空</td>
    <td></td>
</tr>
<tr>
    <td>agent_id</td>
    <td>int</td>
    <td>是</td>
    <td>16</td>
    <td>商户编号，（汇付宝商户内码：七位整数数字）</td>
    <td>1664502</td>
</tr>
<tr>
    <td>detail_data</td>
    <td>String</td>
    <td>是</td>
    <td>1024</td>
    <td>退款明细 汇付宝退款单号，商户退款单号，退款金额，退款状态，退款时间，记录内码\r\n 汇付宝退款单号，商户退款单号，退款金额，退款状态，退款时间，记录内码\r\n 退款状态：-1=无效；0=未处理，1=退款中，2=退款成功</td>
    <td>2</td>
</tr>
<tr>
    <td>sign</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>MD5\RSA\RSA2签名结果</td>
    <td>5b30503b791628b580ed5d42e580ad92</td>
</tr>
</table>


返回签名规则

签名示例：

```text
sign=MD5(agent_id=1664502&detail_data=h1803090462127a0,201803061305330021,0.50,1,2018-3-916:39:27,110370&key=123456789&ret_code=0000&ret_msg=查询成功)
```

注意：以上拼凑值不要有空格！
按照示例顺序排序，__使用标准MD5算法进行加密__，加密结果全部转换成小写后，即为我们所需的订单MD5校验码。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8

__注意事项：调用查单接口，当退款状态为成功时，需校验退款成功金额与请求退款金额是否一致，有任何不符，请与我方核对后再做处理。__





## 关闭支付订单

> 请求URL:`https://pay.heepay.com/API/Payment/PaymentClose.aspx`

> 请求方式:`POST/GET`   

> 是否需要证书：`否`


- 协议参数

<table data-hy-role="doctbl">
    <th>参数</th>
    <th>类型</th>
    <th>是否必填</th>
    <th>最大长度</th>
    <th width="220">描述</th>
    <th width="163">示例值</th>
</tr>
<tr>
    <td>version</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>当前接口版本号1</td>
    <td>1</td>
</tr>
<tr>
    <td>agent_id</td>
    <td>int</td>
    <td>是</td>
    <td>16</td>
    <td>商户编号，（汇付宝商户内码：七位整数数字）</td>
    <td>1664502</td>
</tr>
<tr>
    <td>agent_bill_id</td>
    <td>String</td>
    <td>是</td>
    <td>30</td>
    <td>商户系统内部的订单号（要保证唯一）</td>
    <td>123456</td>
</tr>
<tr>
    <td>sign</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>MD5\RSA\RSA2签名结果</td>
    <td>5b30503b791628b580ed5d42e580ad92</td>
</tr>
</table>

请求示例（GET方式）：

```text
https://pay.heepay.com/API/Payment/PaymentClose.aspx?version=1&agent_id=1664502&agent_bill_id=2016010409434728660&sign=9a40734e90cb90b7ed9623c8ecb9a517
```

签名规则说明
参数签名顺序（必须按照此顺序组织签名）说明及示例：

```text
sign=MD5(agent_bill_id=201603090947553411&agent_id=1602809&key=eb51467dc963448ea0b82f50&version=1)
```


注意：以上拼凑值不要有空格！
按照示例顺序排序，__使用标准MD5算法进行加密__，加密结果全部转换成小写后，即为我们所需的订单MD5校验码。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8




- **同步返回**

数据将以字符串形式在同一会话中同步返回

```XML
例如：
<?xml version="1.0" encoding="utf-8"?>
<root>
<ret_code>0000</ret_code>
<ret_msg>关闭成功</ret_msg>
<sign>e61fb9a553bdecbfc52e674b32a37b2b</sign>
</root>
```

- 返回参数

<table data-hy-role="doctbl">
    <th>参数</th>
    <th>类型</th>
    <th>是否必填</th>
    <th>最大长度</th>
    <th width="220">描述</th>
    <th width="163">示例值</th>
</tr>
<tr>
    <td>ret_code</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>查询状态码</td>
    <td>0000</td>
</tr>
<tr>
    <td>ret_msg</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>成功返回：关闭成功</td>
    <td>关闭成功</td>
</tr>
<tr>
    <td>sign</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>MD5\RSA\RSA2签名结果</td>
    <td>5b30503b791628b580ed5d42e580ad92</td>
</tr>
</table>


返回签名规则

签名示例：

```text
sign=MD5(agent_id=1602809&key= eb51467dc963448ea0b82f50&ret_code=0000&ret_msg=关闭成功)
```

注意：以上拼凑值不要有空格！
按照示例顺序排序，__使用标准MD5算法进行加密__，加密结果全部转换成小写后，即为我们所需的订单MD5校验码。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8



