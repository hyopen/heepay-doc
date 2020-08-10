
## 请求接口

- 获取商家用户授权码与银行信息

> 请求URL:`https://Pay.Heepay.com/API/ShortPay/ShortPayQueryAuthBanks.aspx`

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
    <td>agent_id</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>商户编号，（汇付宝商户内码：七位整数数字）</td>
    <td>1664502</td>
</tr>
<tr>
    <td>timestamp</td>
    <td>long</td>
    <td>是</td>
    <td>13</td>
    <td>时间戳，1970/1/1 0点到现在的毫秒值</td>
    <td>1576652262145</td>
</tr>
<tr>
    <td>version</td>
    <td>int</td>
    <td>是</td>
    <td>16</td>
    <td>版本号，固定为1</td>
    <td>1</td>
</tr>
<tr>
    <td>user_identity</td>
    <td>string</td>
    <td>是</td>
    <td>32</td>
    <td>商户下用户唯一标识，关联授权关系</td>
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


请求示例（GET方式）：

```text
https://pay.heepay.com/API/ShortPay/ShortPayQueryAuthBanks.aspx?agent_id=1664502&encrypt_data=DxmyAOeS5jQ6oYK1VV9HUH%2bzEuMoNDWyh5JPC0QQYgnqjCl15KVb57kLN50lLp%2bAao4MRTGTa4CIHwG1Tjd4tA%3d%3d&sign=4899c521b3cdc4804d320d7b796085ea
```

```text
快捷请求只有3个参数agent_id、encrypt_data、和sign。除去agent_id商户id和md5签名所得sign，其他请求参数进行aes加密得出的值就是encrypt_data。
```

签名规则说明
参数签名顺序（必须按照此顺序组织签名）说明及示例：

```text
sign=MD5(agent_id=1664502&key=e916b29a0bd241c6bcf61ea5&timestamp=1388473426630&user_identity=12321321&version=1)
```


注意：以上拼凑值不要有空格！
按照字母顺序排序从A-Z拼凑值，__其中不要有空格先转换成小写后__，再使用标准MD5算法对该字符串进行加密，加密结果全部转换成小写后，即为我们所需的签名值。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8。


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
    <td>string</td>
    <td>是</td>
    <td>16</td>
    <td>0000返回成功</td>
    <td>0000</td>
</tr>
<tr>
    <td>ret_msg</td>
    <td>string</td>
    <td>是</td>
    <td>32</td>
    <td>状态码，成功是为空</td>
    <td>-</td>
</tr>
<tr>
    <td>auth_uid_Info</td>
    <td>string</td>
    <td>是</td>
    <td>128</td>
    <td>授权码等银行信息，用AES密钥解密encrypt_data参数所得</td>
    <td>7_招商银行_4626_0_d21e42408919171111111112b9b1e9c5</td>
</tr>
<tr>
    <td>sign</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>MD5签名结果</td>
    <td>5b30503b791628b580ed5d42e580ad92</td>
</tr>
</table>

返回示例：

```text
<?xml version="1.0" encoding="utf-8"?><root><ret_code>0000</ret_code><ret_msg></ret_msg><encrypt_data><![CDATA[X7dWsDq38jqrunSFay5lKYzt+qf41BmpeTVrEga8pgA4a6YfCYEFoZthQxUIQ/ucOTd/IBk5ikTbnNxsXlmn8SlwrnFW86ofwkbq/JYRMlIY/FqAtxpXbGgzdlXCRUC9]]></encrypt_data><sign>6a7bd37ae6046e4dddce3f50d0222a2c</sign></root>
```

解密encrypt_data：

```text
ret_code=0000&ret_msg=&auth_uid_Info=7_招商银行_4626_0_d21e4240891917698db153c2b9b1e9c5
```
auth_uid_Info格式：银行ID_银行名称_卡号后四位_卡类型ID（0储蓄卡 1信用卡）_授权码。



- 支付请求接口协议

> 请求URL:`https://Pay.Heepay.com/ShortPay/SubmitOrder.aspx`

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
    <td>agent_id</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>商户编号，（汇付宝商户内码：七位整数数字）</td>
    <td>1664502</td>
</tr>
<tr>
    <td>timestamp</td>
    <td>long</td>
    <td>是</td>
    <td>13</td>
    <td>时间戳，1970/1/1 0点到现在的毫秒值</td>
    <td>1576652262145</td>
</tr>
<tr>
    <td>version</td>
    <td>int</td>
    <td>是</td>
    <td>16</td>
    <td>版本号，固定为1</td>
    <td>1</td>
</tr>
<tr>
    <td>device_id</td>
    <td>string</td>
    <td>否</td>
    <td>50</td>
    <td>商户下用户唯一标识</td>
    <td>123</td>
</tr>
<tr>
    <td>hy_auth_uid</td>
    <td>string</td>
    <td>是</td>
    <td>64</td>
    <td>用户快捷支付的授权码,如果提交该参数并该授权码已经授权过，可扩展银行业务参数无实际意义</td>
    <td>d21e4240891917698db153c2b9b1e9c5</td>
</tr>
<tr>
    <td>device_type</td>
    <td>int</td>
    <td>是</td>
    <td>32</td>
    <td>设备类型：0=Wap，1=Web，2=AndroidApp</td>
    <td>1</td>
</tr>
<tr>
    <td>display</td>
    <td>int</td>
    <td>否</td>
    <td>32</td>
    <td>终端显示样式：0=Wap（默认）</td>
    <td>0</td>
</tr>
<tr>
    <td>return_url</td>
    <td>string</td>
    <td>是</td>
    <td>255</td>
    <td>同步通知地址，支付成功后先跳转到该地址，该地址通常不作为逻辑处理，只作为信息展示（该地址要外网可访问）。</td>
    <td>https://</td>
</tr>
<tr>
    <td>notify_url</td>
    <td>string</td>
    <td>是</td>
    <td>255</td>
    <td>异步通知地址，用户支付成功后会将支付结果发送到该页面，商户做后续的业务处理（该地址要外网可访问）。</td>
    <td>https://</td>
</tr>
<tr>
    <td>agent_bill_id</td>
    <td>string</td>
    <td>是</td>
    <td>50</td>
    <td>商户订单号，必须唯一</td>
    <td>123</td>
</tr>
<tr>
    <td>agent_bill_time</td>
    <td>string</td>
    <td>是</td>
    <td>16</td>
    <td>商户订单时间，格式为“yyyyMMddhhmmss”</td>
    <td>20200910170601</td>
</tr>
<tr>
    <td>pay_amt</td>
    <td>decimal</td>
    <td>是</td>
    <td>-</td>
    <td>支付金额，单位：元，保留二位小数</td>
    <td>1.00</td>
</tr>
<tr>
    <td>goods_name</td>
    <td>string</td>
    <td>是</td>
    <td>50</td>
    <td>商品名称</td>
    <td>金币</td>
</tr>
<tr>
    <td>goods_note</td>
    <td>string</td>
    <td>否</td>
    <td>50</td>
    <td>商品描述</td>
    <td>123</td>
</tr>
<tr>
    <td>goods_num</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>商品数量</td>
    <td>1</td>
</tr>
<tr>
    <td>user_ip</td>
    <td>string</td>
    <td>是</td>
    <td>-</td>
    <td>用户IP地址</td>
    <td>-</td>
</tr>
<tr>
    <td>auth_card_type</td>
    <td>int</td>
    <td>否</td>
    <td>50</td>
    <td>银行卡类型:0=储蓄卡（默认），1=信用卡，-1=未知</td>
    <td>-1</td>
</tr>
<tr>
    <td>ext_param1</td>
    <td>string</td>
    <td>否</td>
    <td>50</td>
    <td>商户保留，交易备注，支付完成后的通知会将该参数原样返回给商户</td>
    <td>123</td>
</tr>
<tr>
    <td>ext_param2</td>
    <td>string</td>
    <td>否</td>
    <td>50</td>
    <td>商户保留，交易备注，支付完成后的通知会将该参数原样返回给商户</td>
    <td>123</td>
</tr>
<tr>
    <td>bank_card_no</td>
    <td>string</td>
    <td>否</td>
    <td>20</td>
    <td>银行卡号码，可扩展银行业务参数</td>
    <td>-</td>
</tr>
<tr>
    <td>bank_user</td>
    <td>string</td>
    <td>否</td>
    <td>50</td>
    <td>银行卡户名，可扩展银行业务参数</td>
    <td>-</td>
</tr>
<tr>
    <td>cert_no</td>
    <td>string</td>
    <td>否</td>
    <td>20</td>
    <td>身份证号，可扩展银行业务参数</td>
    <td>-</td>
</tr>
<tr>
    <td>mobile</td>
    <td>string</td>
    <td>否</td>
    <td>30</td>
    <td>手机号，可扩展银行业务参数</td>
    <td>13800000000</td>
</tr>
<tr>
    <td>bank_id</td>
    <td>int</td>
    <td>否</td>
    <td>30</td>
    <td>签约的银行ID 默认为0 ，用户没有签约时在汇付宝页面进行签约的情况下使用该属性可以直接跳转到指定的商家支持的银行进行签约支付。</td>
    <td>0</td>
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


商户可以扩展银行业务参数，自定义用户支付的银行与身份信息，如提交订单的参数hy_auth_uid赋值并已经授权过，可扩展银行业务参数参数无实际意义。

__友情提示__ 以上请求参数最后都是小写形式的，汉字格式编码均为 __GB2312__，如agent_bill_id=ABC123456，最好转化为agent_bill_id=abc123456，汉字格式在开发中无法确认的话建议进行url编码后再进行数据传递，这样开发会比较顺利。


请求示例（GET方式）：

```text
https://pay.heepay.com/ShortPay/SubmitOrder.aspx?agent_id=1664502&encrypt_data=DxmyAOeS5jQ6oYK1VV9HUIfy6UKUHX3p%2bxHqJz8NYRFLq%2f8xOafuxmL0mn%2b2GHjpHy6inqEYblPgYf0LX6XCyZwKp9OW9nLm3CBIBLvXnMgN5K3YLjeDpkdThVPs2wTpKIPIfBfaPbgfLYajQ3g5Cvv79ZD1wM5br6OG4eDqTUnsZoIIwKnLlvF1SSzV7fMzmct2wC%2byDvHBTB4NSj0g3lYggDTDsmPGoNkrlNgvb%2bRDVjYngOc2Atrc6dZEr5A81JtS8UPGtzUPBHwvY1%2bC1FvTeK1gaEWol9tDJ6VniJyAfdUo1ta5zWTIJNk2mqwEpf35C1NMA4TabIeK1VUy8rtSkfjmGgZd88KzJLLsn0dMG0JaOD4JJvSHv3m9L6lBcvba7BOvkfTsgA%2bUDZqLqStUA%2fL%2fOfacVDEUiA%2fUDEl%2f436YMU%2fuspgk302hd%2f5N79Un%2bnmseJGh3vKuhmJr91kyFWJ6G20oKZlFImnu6pTuS5tB3lifUutUadCrz4LipplQJLNmK3fgmaiodo8TspFeavYmJ158ml7%2fF68Gdf4bk1kL1yAtkABz654HsgYDX%2
fW7ZLE8yXOzo%2fGLcc9gb6Uhz27k0iSIFX%2fwabvrmLKgSGh36Ajm0pK%2bIC8BTrWQ&sign=548091e08d8e3473a784a943410224cc
```

```text
快捷请求只有3个参数agent_id、encrypt_data、和sign。除去agent_id商户id和md5签名所得sign，其他请求参数进行aes加密得出的值就是encrypt_data。
```

签名规则说明
若请求参数中传入选填参数签名串中也需要加入参数进行签名，签名排序a-z排序。
参数签名顺序（必须按照此顺序组织签名）说明及示例：

```text
sign=md5（agent_bill_id=201310091354102&agent_bill_time=20131009015413&agent_id=1023&auth_card_type=0&custom_page=1&device_id=&device_type=0&ext_param1=&ext_param2=&goods_name=testgoods&goods_note=testnote&goods_num=1&hy_auth_uid=&key=A810E85881C74460BD6E0397&mobile=&notify_url=http://www.xxx.com/heepay1.aspx&pay_amt=0.01&return_url=http://www.xxx.com/heepay2.aspx&timestamp=1381298053260&user_identity=&user_ip=127_0_0_1&version=1)
```


注意：以上拼凑值不要有空格！
按照字母顺序排序从A-Z拼凑值，__其中不要有空格先转换成小写后__，再使用标准MD5算法对该字符串进行加密，加密结果全部转换成小写后，即为我们所需的签名值。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8。


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
    <td>string</td>
    <td>是</td>
    <td>16</td>
    <td>0000返回成功</td>
    <td>0000</td>
</tr>
<tr>
    <td>ret_msg</td>
    <td>string</td>
    <td>是</td>
    <td>32</td>
    <td>返回码信息提示</td>
    <td>提交待授权支付订单成功</td>
</tr>
<tr>
    <td>encrypt_data</td>
    <td>string</td>
    <td>是</td>
    <td>128</td>
    <td>用AES密钥解密encrypt_data参数，得到redirect_url，重定向此交易地址，需要请求此url完成交易，</td>
    <td></td>
</tr>
<tr>
    <td>sign</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>MD5签名结果</td>
    <td>5b30503b791628b580ed5d42e580ad92</td>
</tr>
</table>

返回示例：

```text
<?xml version="1.0" encoding="utf-8"?><root><ret_code>0000</ret_code><ret_msg>提交待授权支付订单成功</ret_msg><encrypt_data><![CDATA[X7dWsDq38jqrunSFay5lKdMafl66q43CQrl2SHDq1hvRlUH6xha4FoFU5tr/qzRBBdov7ghTOdmk3TwSApXFUw9ji2fWgVsZfMBDBXXmOZHAcIvcn8iNMn3jZn2T+cw1qPtJG31P9MyLea32A80eC5eyJKxXQBqXd3YOBtz49FDiE/R5fOy5uALN5t0Armbo7Ns7aL79fJX9cku+Xc1C/kJ52onm5X0K41p7zsa04/VA391V0XHI8RzB713wp65dtPZEL5wxKBBo8QmDqf5vK91OLnLi0WpeBjG/1C3jlebPl57tdwQEQXf0w3qOpgqMZgprkIni3K89ZnzdRE/606csmi/CK8SKZjD9tNCSjpYHORS/qtwZt36VicMKbhGtHCtREVKk57WBYPdmjPa6TT3uh3VjLyJkRP/K5JEURZbuy/8Is4BcGzqLe01AIZyGbsPTQsgKa32hr1E/wiKkLitMU6PV8HY4hGAebKVwoaPmu7j+vZViVFdjPl4E0Dv0czNg0Q74O3fv0GHZ2U97LSVQ3s2AToFqlzzINWoQNKCmYa5opSBDSobVQl2zx5/8KPnXPRh457jPKux077EGQSuFBI/9qcvJw4nwjHoVoY/XhktBaatgBOhBtGSEJZm1mOJ01brRW6QBSUBZkGlyybDoueZ8rpWqGVraBS2h/WbBLym63hW6GYhZgkyWwBmjhMC00EPVE/hFybB4Z4uXoAAxAwyNoZb/m7PLyEHFG7wy/NDD5sjn2xTmXyV840mO1Ppimmgts7WAycr2uFePjZCYsd0bfkdCmEWTUPDU7obzRc+Ow2ss+KeXEN+Jn7xPuLwD1VfQNru9FcJTr7g2VpeOSG3ol7GwGzGQ+tLAteY7Skm4LCB8k4gxOiLFS3scp5jMt2QjTv2gq+Nc4MFCMWH7SMfieuYIUndmBOD2fiD/EN7FWeZBecpT/QXOgl4H4PagezGauvwrPYA9IFYrXdIRlwMbaEJz7AZxRuAzVyQg9EfCMctebwaw2QhgMp7Q4B5Jvd3VGjZvberrMpKm/fCGhyIP2AosfTfBaVGPR4aQnqFntMz/DQM36gc5aQ5RHcFTzSO5dwmHJkAKIjqFHsjYPTPM/LajfV8hfX0Y33Myqis/l7vQrPruIUCOMoq8tLUB2dt3506jgZ2IMHh1BCBE8ZzZWCfeKpRy57iSoz0=]]></encrypt_data><sign>1f23a1608711fc651d502868e000b82e</sign></root>
```

解密encrypt_data：

```text
ret_code=0000&ret_msg=提交待授权支付订单成功&redirect_url=`http://pay.heepay.com:80/MSite/ShortPay/BankSelect.aspx?`agent_id=1664502&encrypt_data=TVS9SRTIF0lSrxaJBZnRLeckerUP205kLqDzRBHaysxfRMeU2HQ0qnU0TTe4ovr9lYCxef0kDNPQKKk94n79uNDJLU4YNFlz9NygXrSYIKi4PhsZxz
+8DjGxd2pNneiElFz6AeMmohBYNLRh0KcnUN04Nm4pMU9vIh4lepiGCS9zz4Avbi2KiZKPIwHLilyneGoHX0MwUAB3aaVjtdM6Ht8g6A1WLPzwggE3VveqyXKEQ5RQmOb8GvP5XpKdeMateTjJsYeeYvjqI8L8MON1hUG5RN4xjK7DYMO2+Z8i/Xk1TJC1sKalH3HGSFpwePKmTQfyg3/KP3iTXNo64AdWeLlc/5ofkiyCO/sdEQlSsn5UgzuV/GrQ2VqfpX/k6dVFw4LP4XM1VN3OlOE9gpNsYG5JjbtRcigbz6YYAwYAaSnN7sgAbyalaKhuJedyHge+4zJXHwwDgrsY/+QfgcAhiA==&sign=4b21553800ed5b687d35e504cd5b1990&pre_auth_uid=pre-0789db03120b44fa931f206226de268c&hy_auth_uid=pre-0789db03120b44fa931f206226de268c&agent_bill_id=201707051124142&hy_token_id=H1707057642735AN_b8ecebc9b7ea765daf0393a2880d65da
```

重定向访问encrypt_data后面的所有值

```text
重定向请求：http://pay.heepay.com:80/MSite/ShortPay/BankSelect.aspx?agent_id=1664502&encrypt_data=TVS9SRTIF0lSrxaJBZnRLeckerUP205kLqDzRBHaysxfRMeU2HQ0qnU0TTe4ovr9lYCxef0kDNPQKKk94n79uNDJLU4YNFlz9NygXrSYIKi4PhsZxz+8DjGxd2pNneiElFz6AeMmohBYNLRh0KcnUN04Nm4pMU9vIh4lepiGCS9zz4Avbi2KiZKPIwHLilyneGoHX0MwUAB3aaVjtdM6Ht8g6A1WLPzwggE3VveqyXKEQ5RQmOb8GvP5XpKdeMateTjJsYeeYvjqI8L8MON1hUG5RN4xjK7DYMO2+Z8i/Xk1TJC1sKalH3HGSFpwePKmTQfyg3/KP3iTXNo64AdWeLlc/5ofkiyCO/sdEQlSsn5UgzuV/GrQ2VqfpX/k6dVFw4LP4XM1VN3OlOE9gpNsYG5JjbtRcigbz6YYAwYAaSnN7sgAbyalaKhuJedyHge+4zJXHwwDgrsY/+QfgcAhiA==&sign=4b21553800ed5b687d35e504cd5b1990&pre_auth_uid=pre-0789db03120b44fa931f206226de268c&hy_auth_uid=pre-0789db03120b44fa931f206226de268c&agent_bill_id=201707051124142&hy_token_id=H1707057642735AN_b8ecebc9b7ea765daf0393a2880d65da
进入支付页面完成支付。
```


## 通知接口

> 请求URL:`请求接口中的notify_url和return_url`

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
    <td>agent_id</td>
    <td>string</td>
    <td>是</td>
    <td>16</td>
    <td>商户编号，（汇付宝商户内码：七位整数数字）</td>
    <td>1664502</td>
</tr>
<tr>
    <td>agent_bill_id</td>
    <td>string</td>
    <td>是</td>
    <td>16</td>
    <td>商户系统内部的订单号</td>
    <td>abc123456</td>
</tr>
<tr>
    <td>agent_bill_time</td>
    <td>string</td>
    <td>是</td>
    <td>16</td>
    <td>商户订单时间，格式为“yyyyMMddhhmmss”</td>
    <td>20200910170601</td>
</tr>
<tr>
    <td>hy_bill_no</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>汇付宝交易号(订单号)</td>
    <td>H1705271900000AU</td>
</tr>
<tr>
    <td>hy_deal_time</td>
    <td>string</td>
    <td>是</td>
    <td>-</td>
    <td>汇元网订单处理时间，格式为“yyyyMMddhhmmss”</td>
    <td>20200727120211</td>
</tr>
<tr>
    <td>hy_deal_note</td>
    <td>string</td>
    <td>是</td>
    <td>-</td>
    <td>处理描述</td>
    <td>支付成功</td>
</tr>
<tr>
    <td>pay_amt</td>
    <td>decimal</td>
    <td>是</td>
    <td>16</td>
    <td>支付金额，单位：元</td>
    <td>10.00</td>
</tr>
<tr>
    <td>real_amt</td>
    <td>decimal</td>
    <td>是</td>
    <td>16</td>
    <td>实际支付金额，单位：元</td>
    <td>10.00</td>
</tr>
<tr>
    <td>status</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>订单状态：SUCCESS-支付成功，WFPAYMENT-等待支付，CLOSED-取消</td>
    <td>SUCCESS</td>
</tr>
<tr>
    <td>ext_param1</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>请求接口的值原样返回给商户</td>
    <td>测试</td>
</tr>
<tr>
    <td>ext_param2</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>请求接口的值原样返回给商户</td>
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
MD5支付通知
目的URL：notify_url和return_url
友情提示：notify_url返回的参数与return_url返回的参数，原则上是一致，如有不一致情况，请按notify_url返回的参数为准，在notify_url的处理过程中必须要做发货逻辑，同时维护并校验该订单的发货状态以保证不会重复发货。返回参数当中的pay_amt是用户实际支付的金额，此金额和商户前面请求的pay_amt订单总金额有可能不一致。
```

请求示例（GET方式）：

```text
http://www.xxx.com/heepay1.aspx?agent_id=1664502&encrypt_data=j6DNym8%2fpjypzWctXa1RP2IWDzBlInMaAlin%2fhsLpg%2btbfje7RKxpj8KqaSQ8OznreLckIEb%2buiqareji0664e%2brW2A84P5aCrAfX5MQahTvb7LWl5Zs50Nc0ZcwUlaof3HccTeyP%2bKKR5SxCVUCsW2I15mn9C9ObbKNPVx%2fw%2f1ab3253j6TilJj9cliTjThK5U%2bhFokqFkWs1hj1f7FGHxx3434j5FhVEir6lLucE6PIj4pRiSfVlk3%2bykad2A3DfNOhdGK7%2bmvBgWK%2fVkmU2F61OEow%2fKryd%2fuMa8F%2fus%3d&sign=c6c6f291c4d9074caa71b4742150111d
```

签名规则说明
参数签名顺序（必须按照此顺序组织签名）说明及示例：

```text
sign=MD5(result=1&agent_id=1234567&jnet_bill_no=H1705271900000AU&agent_bill_id=123456789&pay_type=20&pay_amt=0.1&remark=测试&key=1234567890)

注意：以上拼凑值不要有空格！
使用标准MD5算法对该字符串进行加密，即为我们所需的订单MD5校验码。
```

接口说明：
```text
每一笔支付订单支付完成后，汇付宝在线服务器会发送支付结果信息到商户接口程序，该程序根据订单信息进行验签，成功响应ok失败响应error（字符串）例如：response.write(“ok”)，返回的信息不能包含HTML等标签，所有内容只有ok或error。
(不能有其他任何输出（包括空格、空行）) 。异步通知因网络原因可能多次请求商户，对此商户对同一笔订单要保证只处理一次。
在接口返回error后，商户需要进行一次主动查询，查询方法见：收款查询接口，否则将会导致双方订单状态不一致。
另外，notify_url和return_url可能存在同时返回的情况，请商户做好逻辑处理。
注意事项：
商户发货需以异步通知为准，签名验证通过后需验证支付状态是否是成功，通知的支付金额与商户下单时的金额
是否相符，有任何不符，请与我方核对后再做处理。
为进一步加强安全性，建议收到异步通知后调用查单接口，校验查询结果订单状态是否是成功，支付金额与下单
金额是否一致，有任何不符，请与我方核对后再做处理。
```
