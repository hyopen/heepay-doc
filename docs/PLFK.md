## 请求接口

> 请求URL:

小额正式交易地址：`https://Pay.heepay.com/API/PayTransit/PayTransferWithSmallAll.aspx`

大额正式交易地址：`https://Pay.heepay.com/API/PayTransit/PayTransferWithLargeWork.aspx`

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
    <td>当前接口版本号3</td>
    <td>3</td>
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
    <td>batch_no</td>
    <td>String</td>
    <td>是</td>
    <td>10-50</td>
    <td>批量付款订单号（要保证唯一）。最大长度50个字符，最小长度10个字符</td>
    <td>acbacb123456</td>
</tr>
<tr>
    <td>batch_amt</td>
    <td>decimal</td>
    <td>是</td>
    <td>14</td>
    <td>付款总金额不可为空，单位：元，小数点后保留两位。</td>
    <td>1.00</td>
</tr>
<tr>
    <td>batch_num</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>该次付款总笔数，付给多少人的数目，“单笔数据集”里面的数据总笔数</td>
    <td>1</td>
</tr>
<tr>
    <td>detail_data</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>批付到银行帐户格式:“商户流水号^银行编号^对公对私^收款人帐号^收款人姓名^付款金额^付款理由^省份^城市^收款支行名称”来组织数据，每条整数据间用“|”符号分隔，商户流水号长度最长20字符。省市格式请严格按照省市查询接口中的说明填写。注：整理好信息之后，需要对此数据进行3DES加密，具体加密方式参考：接口规则-参数规定10 3DES加密机制,银行编号和对公对私对应数值请在 接口规则-参数规定8和9。汉字编码是GBK</td>
    <td>A123456^3^0^6214851201404626^张三^0.01^商户付款^河北省^唐山市^中国农业银行玉田县支行</td>
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
    <td>ext_param1</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>商户自定义原样返回</td>
    <td>123</td>
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
友情提示：单笔批付付款总金额小于五万的走小额通道，大于等于五万的走大额通道，小额批付7x24小时处理，到账快，大额批付仅工作日处理，到账慢。
如需添加批付IP白名单（该商户账号下只有白名单内的IP可发起批付）可联系我方商务人员添加
```

> 省市查询：`https://pay.heepay.com/API/PayTransit/QueryProvincesAndCities.aspx`

请求示例（GET方式）：

```text
https://Pay.heepay.com/API/PayTransit/PayTransferWithSmallAll.aspx?version=3&agent_id=1664502&batch_no=20170718080721&batch_amt=0.01&batch_num=1&detail_data=848163D73BA0FABEEAA1F950B159B1E8AC95057794DEBD5592192974A329DAC2EEF200D91FE721B90DF548B0FF51F422A6E711D08B937D3B9C82E543CC122829E8FE8615AF2087D1BD8B6E07B366506710F99C0DC187E38D&notify_url=http://www.xxx.com/xxx.aspx&ext_param1=%b2%e2%ca%d4&sign=e6e9a7d9c23e2b4b99bfaf3f7bbf4ebe
```

签名规则说明
参数签名顺序（必须按照此顺序组织签名）说明及示例：

```text
sign=MD5(agent_id=1664502&batch_amt=0.01&batch_no=20170718080721&batch_num=1&detail_data=A123456^3^0^6214851201404626^张三^0.01^商户付款^河北省^唐山市^中国农业银行玉田县支行&ext_param1=测试&key=d77686b728a6470e9e4e3f9a&notify_url=http://www.xxx.com/xxx.aspx&version=3)
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
<?xml version="1.0" encoding="utf-8"?>
<root>
<ret_code>E104</ret_code>
<ret_msg>detail_data 参数，商户未设置相应付款理由</ret_msg>
<sign>2ffe9e7d2ecf1e20bf3408d8ffe4679b</sign>
</root>
```

```text
参数签名顺序（必须按照此顺序组织签名）说明及示例：
sign=MD5(key=d77686b728a6470e9e4e3f9a&ret_code=e104&ret_msg=detail_data 参数，商户未设置相应付款理由）
```

注意：以上拼凑值不要有空格！
按照参数名称A-Z排序拼接，__并转换为小写后进行MD5__。



- 返回码

<table data-hy-role="doctbl">
    <tr>
        <th>返回码</th>
        <th>说明</th>   
    </tr>
    <tr>
        <td>0000</td>
        <td>执行成功，表示提交成功</td>
    </tr>
    <tr>
        <td>E100</td>
        <td>商户未授权或没有开通API接口</td>
    </tr>
    <tr>
        <td>E101</td>
        <td>签名验证错误</td>
    </tr>
    <tr>
        <td>E102</td>
        <td>数据解密错误</td>
    </tr>
    <tr>
        <td>E103</td>
        <td>时间戳过期</td>
    </tr>
    <tr>
        <td>E104</td>
        <td>输入参数验证错误</td>
    </tr>
    <tr>
        <td>E105</td>
        <td>银行返回的具体错误描述</td>
    </tr>
    <tr>
        <td>E106</td>
        <td>风险控制错误</td>
    </tr>
    <tr>
        <td>E107</td>
        <td>授权过期</td>
    </tr>
    <tr>
        <td>E108</td>
        <td>限制错误</td>
    </tr>
    <tr>
        <td>E109</td>
        <td>商户账户资金不足，账户金额不足以支持此次批付</td>
    </tr>
    <tr>
        <td>E110</td>
        <td>单据号已经存在，调用查询接口确认订单状态</td>
    </tr>
    <tr>
        <td>U999</td>
        <td>未知错误，调用查询接口确认订单状态</td>
    </tr>
    </table>



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
    <td>ret_msg</td>
    <td>String</td>
    <td>否</td>
    <td>32</td>
    <td>返回码信息提示</td>
    <td>查询成功</td>
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
    <td>hy_bill_no</td>
    <td>int</td>
    <td>是</td>
    <td>16</td>
    <td>汇付宝交易号(订单号)</td>
    <td>120123456</td>
</tr>
<tr>
    <td>status</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>-1=无效，0=未处理，1=成功</td>
    <td>1</td>
</tr>
<tr>
    <td>batch_no</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>商户系统内部的订单号</td>
    <td>1234567891111</td>
</tr>
<tr>
    <td>batch_amt</td>
    <td>decimal</td>
    <td>是</td>
    <td>16</td>
    <td>成功付款金额</td>
    <td>10.00</td>
</tr>
<tr>
    <td>batch_num</td>
    <td>String</td>
    <td>是</td>
    <td>16</td>
    <td>成功付款数量</td>
    <td>1</td>
</tr>
<tr>
    <td>detail_data</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>付款明细，单笔数据集里面按照“商户流水号^收款人帐号^收款人姓名^付款金额^付款状态”来组织数据，每条整数据间用“|”符号分隔，付款状态S表示付款成功，状态F代表失败</td>
    <td>20170713213543213514^6230521000000000005171^张三^0.01^S^</td>
</tr>
<tr>
    <td>ext_param1</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>商家数据包，原样返回</td>
    <td>测试</td>
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
友情提示：请按notify_url返回的参数为准，在notify_url的处理过程中必须要做处理逻辑，同时维护并校验该订单的付款状态以保证不会重复付款。返回参数当中的detail_data来判断是否批付成功（付款状态S表示付款成功，状态F代表失败）。
```

我方通知发送示例GET方式（异步通知）：

```text
http://www.xxx.com/xxx.aspx?ret_code=0000&ret_msg=查询成功&agent_id=1664502&hy_bill_no=
5540780&status=1&batch_no=2017071819424142224&batch_amt=0.01&batch_num=1&detail_data=20170713213543213514^6230521000000000005171^张三^0.01^S^&ext_param1=测试&sign=b1cd61750ca1f16db54c861400616c7d
```

签名规则说明
参数签名顺序（必须按照此顺序组织签名）说明及示例：

```text
sign=MD5(ret_code=0000&ret_msg=查询成功&agent_id=1664502&hy_bill_no=5540780&status=1&batch_no=2017071819424142224&batch_amt=0.01&batch_num=1&detail_data=20170713213543213514^6230521000000000005171^张三^0.01^S^&ext_param1=测试&key=d77686b728a6470e9e4e3f9a)
```

注意：以上拼凑值不要有空格！
按照示例顺序排序，__先转小写再使用标准MD5算法进行加密__，加密结果全部转换成小写后，即为我们所需的订单MD5校验码。


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



## 订单查询

> 请求URL:`https://Pay.heepay.com/API/PayTransit/QueryTransfer.aspx`

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
    <td>batch_no</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>批量付款订单号</td>
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
https://Pay.heepay.com/API/PayTransit/QueryTransfer.aspx?version=3&agent_id=1664502&batch_no=H1499308580335&sign=6d02acb1d3358fabb3f71f61193bfd49
```

签名规则说明
参数签名顺序（必须按照此顺序组织签名）说明及示例：

```text
sign=MD5(agent_id=1664502&batch_no=h1499308580335&key=d77686b728a6470e9e4e3f9a&version=3)
```


注意：以上拼凑值不要有空格！
按照示例顺序排序，__先转小写再使用标准MD5算法进行加密__，加密结果全部转换成小写后，即为我们所需的订单MD5校验码。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8




- **查询返回**

数据将以字符串形式在同一会话中同步返回
```text
例如：
<?xml version="1.0" encoding="utf-8"?>
<root>
<ret_code>0000</ret_code>
<ret_msg></ret_msg>
<agent_id>1664502</agent_id>
<hy_bill_no>5512409</hy_bill_no>
<batch_no>H1499308580335</batch_no>
<batch_amt>0.02</batch_amt>
<batch_num>1</batch_num><detail_data>65084245BBCD5670DA48F44852C52410434FA8CABB871319ADEBEFA046811136910CCACBA62E5C51</detail_data>
<ext_param1></ext_param1>
<sign>3013585bb81ad1725a6e15ae01ef714b</sign>
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
    <td>hy_bill_no</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>汇付宝交易号(订单号)</td>
    <td>120123456</td>
</tr>
<tr>
    <td>batch_no</td>
    <td>int</td>
    <td>是</td>
    <td>16</td>
    <td>商户系统内部的订单号</td>
    <td>11111123456798</td>
</tr>
<tr>
    <td>batch_amt</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>成功付款金额</td>
    <td>1.00</td>
</tr>
<tr>
    <td>batch_num</td>
    <td>String</td>
    <td>是</td>
    <td>16</td>
    <td>成功付款数量</td>
    <td>1</td>
</tr>
<tr>
    <td>detail_data</td>
    <td>decimal</td>
    <td>是</td>
    <td>1024</td>
    <td>付款明细，如果是批付中不返回此参数，有具体结果返回。单笔数据集里面按照“商户流水号^收款人帐号^收款人姓名^付款金额^付款状态”来组织数据，每条整数据间用“|”符号分隔，付款状态S表示付款成功，状态F代表失败。如果参数值为空，表示批付单没有状态返回，可以判断为处理中，如果提示其他错误，请找客服查询！</td>
    <td>10.00</td>
</tr>
<tr>
    <td>ext_param1</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>商户自定义，原样返回。请求接口传入的值</td>
    <td>测试</td>
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
sign=MD5(agent_id=1664502&batch_amt=0.02&batch_no=H1499308580335&batch_num=1&detail_data=qq111177^6228480365412348888^李四^0.01^S^&ext_param1=&hy_bill_no=5512409&key=123456&ret_code=0000&ret_msg=)
```

注意：以上拼凑值不要有空格！
按照示例顺序排序，__先转小写再使用标准MD5算法进行加密__，加密结果全部转换成小写后，即为我们所需的订单MD5校验码。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8

__注意事项：调用查单接口，当订单状态为成功时，需校验支付金额与下单金额是否一致，有任何不符，请与我方核对后再做处理。__





## 卡BIN查询

> 请求URL:`https://Pay.heepay.com/API/PayTransit/QueryBankCardInfo.aspx`

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
    <td>bank_card_no</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>银行卡号（对私），只支持对私银行卡查询</td>
    <td>6214851201404626</td>
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
https://Pay.heepay.com/API/PayTransit/QueryBankCardInfo.aspx?version=3&agent_id=1664502&bank_card_no=6214851201404626&sign=98eb33a125024c048955095bc229d450
```

签名规则说明
参数签名顺序（必须按照此顺序组织签名）说明及示例：

```text
sign=md5(agent_id=1664502&bank_card_no=6214851201404626&key=CC08C5E3E69F4E6B85F1DC0B&version=3)
```


注意：以上拼凑值不要有空格！
按照示例顺序排序，__先转小写再使用标准MD5算法进行加密__，加密结果全部转换成小写后，即为我们所需的订单MD5校验码。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8




- **查询返回**

数据将以字符串形式在同一会话中同步返回

```XML
例如：
<?xml version="1.0" encoding="utf-8"?>
<root>
<ret_code>0000</ret_code>
<ret_msg></ret_msg>
<agent_id>1664502</agent_id>
<bank_card_no>6214851201404626</bank_card_no>
<bank_name>招商银行</bank_name>
<bank_type>7</bank_type>
<bank_card_type>0</bank_card_type>
<sign>1fb892f93a901f6b014b7f0a8730c60d</sign>
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
    <td>bank_card_no</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>所查询银行卡号，查询成功时返回)</td>
    <td>6214851201404626</td>
</tr>
<tr>
    <td>bank_name</td>
    <td>int</td>
    <td>是</td>
    <td>16</td>
    <td>所属银行名称，查询成功时返回</td>
    <td>招商银行</td>
</tr>
<tr>
    <td>bank_type</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>银行我方对应编号，查询成功时返回</td>
    <td>7</td>
</tr>
<tr>
    <td>bank_card_type</td>
    <td>String</td>
    <td>是</td>
    <td>16</td>
    <td>银行卡类型（0=储蓄卡,1=信用卡），查询成功时返回</td>
    <td>0</td>
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
sign=MD5(agent_id=1001&bank_card_no=6214851201404626&bank_card_type=0&bank_name=工商银行&bank_type=1&key=123456&ret_code=0000&ret_msg=)
```

注意：以上拼凑值不要有空格！
按照示例顺序排序，__先转小写再使用标准MD5算法进行加密__，加密结果全部转换成小写后，即为我们所需的订单MD5校验码。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8

__注意事项：调用查单接口，当订单状态为成功时，需校验支付金额与下单金额是否一致，有任何不符，请与我方核对后再做处理。__



