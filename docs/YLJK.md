
## 银联扫码

> 请求URL:`https://pay.heepay.com/Payment/Index.aspx`

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
    <td>pay_type</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>支付类型64</td>
    <td>64</td>
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
    <td>32</td>
    <td>商户系统内部的订单号（要保证唯一）</td>
    <td>acbacb123456</td>
</tr>
<tr>
    <td>agent_bill_time</td>
    <td>String</td>
    <td>是</td>
    <td>14</td>
    <td>提交单据的时间yyyyMMddHHmmss，该参数共计14位，当时不满14位时，在后面加0补足14位</td>
    <td>20100225102000</td>
</tr>
<tr>
    <td>pay_amt</td>
    <td>decimal</td>
    <td>是</td>
    <td>16</td>
    <td>订单总金额 不可为空，取值范围（0.01到10000000.00），单位：元，小数点后保留两位。</td>
    <td>10.00</td>
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
    <td>return_url</td>
    <td>String</td>
    <td>是</td>
    <td>128</td>
    <td>支付后返回的商户显示页面，URL参数是以http://或https://开头的完整URL地址(前台显示)，原则上该参数与notify_url提交的参数不一致。值可以为空，但不可以为null。</td>
    <td>https://..</td>
</tr>
<tr>
    <td>user_ip</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>用户所在客户端的真实ip其中的“.”替换为“_” 。因为近期我方发现用户在提交数据时，user_ip在网络层被篡改，导致签名错误，所以我们规定使用这种格式。</td>
    <td>127_127_12_12</td>
</tr>
<tr>
    <td>goods_name</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>商品名称，不能为空（不参加签名）</td>
    <td>100元话费</td>
</tr>
<tr>
    <td>goods_num</td>
    <td>int</td>
    <td>否</td>
    <td>20</td>
    <td>产品数量（不参加签名）</td>
    <td>1</td>
</tr>
<tr>
    <td>remark</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>商户自定义，原样返回,可以为空。（不参加签名）</td>
    <td>123</td>
</tr>
<tr>
    <td>goods_note</td>
    <td>String</td>
    <td>否</td>
    <td>50</td>
    <td>支付说明，（不参加签名）</td>
    <td>购买商品</td>
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
友情提示：以上请求参数最好都是小写形式的，汉字格式编码均为GBK，如agent_bill_id=ABC123456，最好转化为agent_bill_id=abc123456，汉字格式在开发中无法确认的话建议进行url编码后再进行数据传递，这样开发会比较顺利。
```

请求示例（GET方式）：

```text
https://pay.heepay.com/Payment/Index.aspx?version=1&agent_id=1664502&agent_bill_id=20170704113016&agent_bill_time=20170704113016&pay_type=64&pay_amt=1&notify_url=http://www
.xxx.com/heepay1.aspx&return_url=http://www.xxx.com/heepay2.aspx&user_ip=192_168_2_154&goods_name=%b2%e2%ca%d4&goods_num=1&goods_note=%b2%e2%ca%d4&remark=%b2%e2%ca%d4&sign_type=MD5&sign=
ab1238c0dd9aaa72ee535baf273f356b
```

签名规则说明
参数签名顺序（必须按照此顺序组织签名）说明及示例：

```text
sign=MD5(version=1&agent_id=1664502&agent_bill_id=20170704113016&agent_bill_time=20170704113016&pay_type=64&pay_amt=1&notify_url=http://www.xxx.com/heepay1.aspx&return_url=http://www.xxx.com/heepay2.aspx&user_ip=192_168_2_154&key=123456)
```

```text
注意：以上拼凑值不要有空格！
使用标准MD5算法对该字符串进行加密，加密结果全部转换成小写后，即为我们所需的订单MD5校验码，将其写入sign字段即可。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8
```





## 银联WAP

> 请求URL:`https://pay.heepay.com/Payment/Index.aspx`

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
    <td>pay_type</td>
    <td>int</td>
    <td>是</td>
    <td>-</td>
    <td>支付类型19</td>
    <td>19</td>
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
    <td>32</td>
    <td>商户系统内部的订单号（要保证唯一）</td>
    <td>acbacb123456</td>
</tr>
<tr>
    <td>agent_bill_time</td>
    <td>String</td>
    <td>是</td>
    <td>14</td>
    <td>提交单据的时间yyyyMMddHHmmss，该参数共计14位，当时不满14位时，在后面加0补足14位</td>
    <td>20100225102000</td>
</tr>
<tr>
    <td>pay_amt</td>
    <td>decimal</td>
    <td>是</td>
    <td>16</td>
    <td>订单总金额 不可为空，取值范围（0.01到10000000.00），单位：元，小数点后保留两位。</td>
    <td>10.00</td>
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
    <td>return_url</td>
    <td>String</td>
    <td>是</td>
    <td>128</td>
    <td>支付后返回的商户显示页面，URL参数是以http://或https://开头的完整URL地址(前台显示)，原则上该参数与notify_url提交的参数不一致。值可以为空，但不可以为null。</td>
    <td>https://..</td>
</tr>
<tr>
    <td>user_ip</td>
    <td>String</td>
    <td>是</td>
    <td>32</td>
    <td>用户所在客户端的真实ip其中的“.”替换为“_” 。因为近期我方发现用户在提交数据时，user_ip在网络层被篡改，导致签名错误，所以我们规定使用这种格式。</td>
    <td>127_127_12_12</td>
</tr>
<tr>
    <td>goods_name</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>商品名称，不能为空（不参加签名）</td>
    <td>100元话费</td>
</tr>
<tr>
    <td>goods_num</td>
    <td>int</td>
    <td>否</td>
    <td>20</td>
    <td>产品数量（不参加签名）</td>
    <td>1</td>
</tr>
<tr>
    <td>remark</td>
    <td>String</td>
    <td>是</td>
    <td>50</td>
    <td>商户自定义，原样返回,可以为空。（不参加签名）</td>
    <td>123</td>
</tr>
<tr>
    <td>goods_note</td>
    <td>String</td>
    <td>否</td>
    <td>50</td>
    <td>支付说明，（不参加签名）</td>
    <td>购买商品</td>
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
友情提示：以上请求参数最好都是小写形式的，汉字格式编码均为GBK，如agent_bill_id=ABC123456，最好转化为agent_bill_id=abc123456，汉字格式在开发中无法确认的话建议进行url编码后再进行数据传递，这样开发会比较顺利。
```

请求示例（GET方式）：

```text
https://pay.heepay.com/Payment/Index.aspx?version=1&agent_id=1664502&agent_bill_id=20170704113016&agent_bill_time=20170704113016&pay_type=19&pay_amt=1&notify_url=http://www
.xxx.com/heepay1.aspx&return_url=http://www.xxx.com/heepay2.aspx&user_ip=192_168_2_154&goods_name=%b2%e2%ca%d4&goods_num=1&goods_note=%b2%e2%ca%d4&remark=%b2%e2%ca%d4&sign_type=MD5&sign=
ab1238c0dd9aaa72ee535baf273f356b
```

签名规则说明
参数签名顺序（必须按照此顺序组织签名）说明及示例：

```text
sign=MD5(version=1&agent_id=1664502&agent_bill_id=20170704113016&agent_bill_time=20170704113016&pay_type=19&pay_amt=1&notify_url=http://www.xxx.com/heepay1.aspx&return_url=http://www.xxx.com/heepay2.aspx&user_ip=192_168_2_154&key=123456)
```

```text
注意：以上拼凑值不要有空格！
使用标准MD5算法对该字符串进行加密，加密结果全部转换成小写后，即为我们所需的订单MD5校验码，将其写入sign字段即可。
MD5对比验证：字符串ABCabc123456生成的MD5字符串为123785419aed644018cfef182148e895，MD5前的签名串编码是UTF-8
```


