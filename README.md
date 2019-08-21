# AC SAML Helper
Takes an valid SAML Response XML (or JSON) and converts into a payload necessary for the actual HTTP call

## Usage
It is recommended to use an XML file.

```
node index.js --fromXML --file XMLFILE
// -> PHNhbWx.... // encoded string
```

Now, use this generated  string to send it (as parameter SAMLReponse) and application/x-www-form-urlencoded to your API processing the SAML callback
```
POST /processCallback (API processing the SAML response)

curl --request POST \
  --url https://XXXX/processCallback \
  --header 'Accept-Encoding: gzip, deflate' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'Origin: https://adfs4.admiralcloud.com' \
  --data SAMLResponse=PHNhbWx....

```

## Links
- [Website](https://www.admiralcloud.com/)
- [Twitter (@admiralcloud)](https://twitter.com/admiralcloud)
- [Facebook](https://www.facebook.com/MediaAssetManagement/)

## License
[MIT License](https://opensource.org/licenses/MIT) Copyright © 2009-present, AdmiralCloud, Mark Poepping