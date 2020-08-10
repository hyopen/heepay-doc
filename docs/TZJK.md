
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
    <td>result</td>
    <td>String</td>
    <td>是</td>
    <td>-</td>
    <td>支付结果，1=成功 其它为未知</td>
    <td>1</td>
</tr>
<tr>
    <td>pay_message</td>
    <td>String</td>
    <td>否</td>
    <td>-</td>
    <td>支付结果信息，支付成功时为空</td>
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
    <td>jnet_bill_no</td>
    <td>int</td>
    <td>是</td>
    <td>16</td>
    <td>汇付宝交易号(订单号)</td>
    <td>H1705271900000AU</td>
</tr>
<tr>
    <td>agent_bill_id</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>商户系统内部的订单号</td>
    <td>acbacb123456</td>
</tr>
<tr>
    <td>pay_type</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>支付类型</td>
    <td>20</td>
</tr>
<tr>
    <td>pay_amt</td>
    <td>decimal</td>
    <td>是</td>
    <td>16</td>
    <td>订单实际支付金额(注意：此金额是用户的实付金额)</td>
    <td>10.00</td>
</tr>
<tr>
    <td>remark</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>商户自定义，原样返回。请求接口传入的值</td>
    <td>123</td>
</tr>
<tr>
    <td>pay_user</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>支付人信息。不返回值说明此支付类型不支持</td>
    <td>123456</td>
</tr>
<tr>
    <td>trade_bill_no</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>上游通道支付单号</td>
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

```text
MD5支付通知
目的URL：notify_url和return_url
友情提示：notify_url返回的参数与return_url返回的参数，原则上是一致，如有不一致情况，请按notify_url返回的参数为准，在notify_url的处理过程中必须要做发货逻辑，同时维护并校验该订单的发货状态以保证不会重复发货。返回参数当中的pay_amt是用户实际支付的金额，此金额和商户前面请求的pay_amt订单总金额有可能不一致。
```

请求示例（GET方式）：

```text
http://www.xxx.com/heepay1.aspx?result=1&pay_message=&agent_id=1664502&jnet_bill_no=H20080371000000AG&agent_bill_id=200803000000000&pay_type=20&pay_amt=6000.00&remark=&pay_user=&trade_bill_no=050212020211111111111111000&sign=91d44a9def492a00fbc7c49d18e71ea9
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