## 接口规则

<table data-hy-role="doctbl">
    <tr>
        <th>规则</th>
        <th>描述</th>   
    </tr>
    <tr>
        <td>传输方式</td>
        <td>为保证交易安全性，采用HTTPS传输</td>
    </tr>
    <tr>
        <td>提交方式</td>
        <td>POST和GET方法提交</td>
    </tr>
    <tr>
        <td>数据格式</td>
        <td>参数之间用&符链接</td>
    </tr>
    <tr>
        <td>字符编码</td>
        <td>请求参数中的汉字采用GB2312字符编码，签名串使用UTF-8字符编码</td>
    </tr>
    <tr>
        <td>签名算法</td>
        <td>MD5，后续会兼容SHA1、SHA256、HMAC等。</td>
    </tr>
    <tr>
        <td>签名要求</td>
        <td>请求和接收数据均需要校验签名，详细方法请参考：MD5签名规则。</td>
    </tr>
    <tr>
        <td>判断逻辑</td>
        <td>先判断协议字段返回，再判断业务返回，最后判断交易状态</td>
    </tr>
</table>